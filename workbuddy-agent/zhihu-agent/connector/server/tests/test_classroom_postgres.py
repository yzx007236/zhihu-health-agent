"""Real PostgreSQL integration tests. Set ZHIHU_TEST_PG_DSN to an empty test DB."""
import importlib.util
import json
import os
import shutil
import sqlite3
import unittest
from pathlib import Path
from unittest.mock import patch

from tests.test_classroom import ClassroomTests
from zhihu_mcp import classroom, classroom_postgres as pg, tools

DSN = os.environ.get('ZHIHU_TEST_PG_DSN')
SERVER = Path(__file__).resolve().parents[1]


class RegistryTests(unittest.TestCase):
    def test_registry_matches_runtime_queries(self):
        spec = importlib.util.spec_from_file_location('build_rpc', SERVER / 'migrations/build_rpc.py')
        builder = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(builder)
        self.assertEqual(builder.build(), (SERVER / 'migrations/002_classroom_rpc.sql').read_text(encoding='utf-8'))

    def test_cloud_unavailable_never_falls_back_or_exposes_credentials(self):
        with patch.dict(os.environ, {'ZHIHU_CLASSROOM_API_KEY': 'secret-not-for-clients',
                                    'ZHIHU_CLASSROOM_CLOUDBASE_ENV': 'invalid/host'}):
            result = classroom.request('status')
        self.assertEqual(result['error'], 'storage_unavailable')
        self.assertNotIn('secret-not-for-clients', json.dumps(result))


class LocalRpc(pg.RpcConnection):
    """Same Python adapter and SQL function, with a local PG transport."""
    def __init__(self):
        self.revision, self.writes, self.closed = None, [], False

    def _send(self, payload):
        import psycopg
        from psycopg.types.json import Jsonb
        with psycopg.connect(DSN) as connection:
            connection.execute('SET ROLE service_role')
            return connection.execute('SELECT public.zhihu_classroom_tx(%s,%s,%s,%s)', (
                payload['p_mode'], payload['p_revision'], Jsonb(payload['p_writes']),
                Jsonb(payload['p_query']))).fetchone()[0]


@unittest.skipUnless(DSN, 'Set ZHIHU_TEST_PG_DSN for integration')
class PostgresTests(unittest.TestCase):
    # Reuse complete business-flow assertions against the real RPC transaction layer.
    ok = ClassroomTests.ok
    sign_in = ClassroomTests.sign_in
    add_student = ClassroomTests.add_student
    add_task = ClassroomTests.add_task
    quiz = ClassroomTests.quiz
    test_grades_reviews_progress_and_exports = ClassroomTests.test_quiz_review_progress_and_exports_share_the_same_grade
    test_student_and_class_boundaries = ClassroomTests.test_student_and_class_boundaries
    test_course_isolation_and_revoked_login = ClassroomTests.test_course_isolation_and_revoked_login
    test_import_rollback_and_capacity = ClassroomTests.test_student_capacity_limit_and_atomic_roster_import

    @classmethod
    def setUpClass(cls):
        import psycopg
        with psycopg.connect(DSN, autocommit=True) as connection:
            connection.execute("DO $$ BEGIN CREATE ROLE service_role; EXCEPTION WHEN duplicate_object THEN NULL; END $$")
            connection.execute("DO $$ BEGIN CREATE ROLE anon; EXCEPTION WHEN duplicate_object THEN NULL; END $$")
            connection.execute("DO $$ BEGIN CREATE ROLE authenticated; EXCEPTION WHEN duplicate_object THEN NULL; END $$")
            for filename in ('001_classroom_postgres.sql', '002_classroom_rpc.sql'):
                connection.execute((SERVER / 'migrations' / filename).read_text(encoding='utf-8'))

    def setUp(self):
        import psycopg
        with psycopg.connect(DSN) as connection:
            connection.execute('TRUNCATE zhihu_classroom.courses CASCADE')
        self.mock_connect = patch.object(classroom, 'connect', side_effect=LocalRpc)
        self.mock_connect.start()
        self.addCleanup(self.mock_connect.stop)
        ClassroomTests.setUp(self)

    def test_import_rollback_and_capacity(self):
        # Fixture writes are owner-only SQL; the deployed RPC has no arbitrary SQL API.
        import psycopg
        self.add_student()
        failed = classroom.request('import_users', {'rows': [
            {'username': 'new-student', 'name': '新学生'},
            {'username': 'student-one', 'name': '重复学生'},
        ]}, self.teacher_token)
        self.assertEqual(failed['error'], 'duplicate')
        self.assertEqual(len(self.ok('dashboard', token=self.teacher_token)['progress']), 1)
        with psycopg.connect(DSN) as connection:
            connection.execute("INSERT INTO zhihu_classroom.users SELECT md5('fixture-'||n), course_id, 'fixture-'||n, '名额测试', 'student', '一班', password, 1, 1 FROM zhihu_classroom.users CROSS JOIN generate_series(1,399) n WHERE username='student-one'")
        failed = classroom.request('import_users', {'rows': [
            {'username': 'student-401', 'name': '超额学生'},
        ]}, self.teacher_token)
        self.assertIn('400', failed['message'])

    def test_checkpoints_restore_unfinished_quiz_and_published_grade(self):
        student_token, student = self.add_student()
        task_id = self.add_task()
        run_id = self.ok('training', {'tool': 'start_session', 'task_id': task_id}, student_token)['run_id']
        payload = {'tool': 'get_pretest', 'run_id': run_id, 'args': {'level': 'basic', 'question_count': 5}}
        paper = self.ok('training', payload, student_token)['result']
        root = tools._store().root
        shutil.rmtree(root)  # Isolated test cache, simulates container replacement.
        restored = self.ok('training', payload, student_token)['result']
        self.assertEqual(paper['questions'], restored['questions'])
        self.assertNotIn('answer', json.dumps(restored).lower())
        self.ok('training', {'tool': 'submit_pretest', 'run_id': run_id, 'args': {
            'answers': {q['question_id']: 'A' for q in paper['questions']}}}, student_token)
        self.ok('review', {'run_id': run_id, 'version': 0, 'score': 87.5,
                          'reason': '恢复验证', 'status': 'published'}, self.teacher_token)
        shutil.rmtree(root)
        teacher_token, _ = self.sign_in('teacher', 'TestChanged456!')
        result = self.ok('run_detail', {'run_id': run_id}, teacher_token)['run']
        self.assertEqual(result['final_score'], 87.5)
        status = self.ok('training', {'tool': 'get_session_status', 'run_id': run_id}, student_token)
        self.assertEqual(status['result']['session']['session_id'], result['session_id'])

    def test_preview_is_rolled_back_and_stale_revision_cannot_commit(self):
        first, second = LocalRpc(), LocalRpc()
        self.addCleanup(first.close)
        self.addCleanup(second.close)
        sql = 'SELECT * FROM courses WHERE id=?'
        course_id = self.teacher['course_id']
        first.execute(sql, (course_id,)).fetchone()
        first.execute('INSERT INTO courses VALUES(?,?,?,400)', ('preview-id', 'preview-code', 'preview'))
        self.assertIsNotNone(first.execute(sql, ('preview-id',)).fetchone())
        self.assertIsNone(second.execute(sql, ('preview-id',)).fetchone())
        second.execute('INSERT INTO courses VALUES(?,?,?,400)', ('second-id', 'second-code', 'second'))
        second.commit()
        with self.assertRaises(classroom.CourseError) as failure:
            first.commit()
        self.assertEqual(failure.exception.code, 'conflict')
        third = LocalRpc()
        self.assertIsNone(third.execute(sql, ('preview-id',)).fetchone())

    def test_sql_injection_is_data_and_unknown_sql_and_anon_are_rejected(self):
        import psycopg
        user_input = "测试'); DELETE FROM zhihu_classroom.users; -- @P2@ '"
        self.ok('create_task', {'title': user_input, 'class_name': '一班', 'major': 'clinical_medicine',
                               'kind': 'quiz', 'required_count': 1}, self.teacher_token)
        dashboard = self.ok('dashboard', token=self.teacher_token)
        self.assertEqual(dashboard['tasks'][0]['title'], user_input)
        self.assertTrue(dashboard['users'])
        with self.assertRaises(OSError):
            LocalRpc().execute('SELECT * FROM users').fetchall()
        with psycopg.connect(DSN) as connection:
            connection.execute('SET ROLE anon')
            with self.assertRaises(psycopg.errors.InsufficientPrivilege):
                connection.execute("SELECT public.zhihu_classroom_tx('query',null,'[]','{}')")
        with psycopg.connect(DSN) as connection:
            connection.execute('SET ROLE service_role')
            with self.assertRaises(psycopg.errors.InsufficientPrivilege):
                connection.execute('SELECT * FROM zhihu_classroom.users')


if __name__ == '__main__':
    unittest.main()
