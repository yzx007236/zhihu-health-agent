"""Private PostgreSQL storage for the existing classroom service.

Business SQL stays parameterized. One transaction holds the classroom advisory
lock, including account limits, grading, reviews and session checkpoints. The
runtime account needs DML only; migrations run separately as the owner.
"""
from __future__ import annotations

import os
import sqlite3
import hashlib
import json
import urllib.request
from pathlib import Path

LOCK_ID = 734218603119
SESSION_FILES = frozenset({
    'session.json', 'dialogue.jsonl', 'case_variant.json',
    'evidence_candidates.json', 'score_result.json', 'report.json',
    'report.html', 'retrieval.jsonl',
})


def placeholders(sql):
    """Translate the service's SQLite placeholders outside quoted literals."""
    result, quoted, pos = [], False, 0
    while pos < len(sql):
        char = sql[pos]
        if char == "'":
            if quoted and pos + 1 < len(sql) and sql[pos + 1] == "'":
                result.append("''")
                pos += 2
                continue
            quoted = not quoted
        result.append('%s' if char == '?' and not quoted else '%%' if char == '%' else char)
        pos += 1
    return ''.join(result)


class Connection:
    def __init__(self, dsn):
        self.raw = None
        try:
            import psycopg
            from psycopg.conninfo import conninfo_to_dict
            from psycopg.rows import dict_row
            options = conninfo_to_dict(dsn)
            if os.environ.get('ZHIHU_CLOUD_DEPLOYMENT') == '1':
                if options.get('sslmode') != 'verify-full':
                    raise OSError('Cloud PostgreSQL requires sslmode=verify-full')
            self.driver = psycopg
            self.raw = psycopg.connect(dsn, connect_timeout=8, row_factory=dict_row,
                                      application_name='zhihu-classroom', prepare_threshold=None)
            self.raw.execute("SET LOCAL statement_timeout = '25s'")
            self.raw.execute("SET LOCAL lock_timeout = '8s'")
            self.raw.execute('SET LOCAL search_path = zhihu_classroom, pg_catalog')
            self.raw.execute('SELECT pg_advisory_xact_lock(%s)', (LOCK_ID,))
            row = self.raw.execute('SELECT version FROM schema_version WHERE id=1').fetchone()
            if not row or row['version'] != 1:
                raise OSError('Classroom schema version mismatch')
            self.raw.execute('SELECT revision FROM tx_revision WHERE id=1 FOR UPDATE')
        except Exception:
            if self.raw:
                self.raw.close()
            # Connection strings, driver diagnostics and passwords never go to clients.
            raise OSError('Course database is unavailable') from None

    def execute(self, sql, params=()):
        try:
            return self.raw.execute(placeholders(sql), params)
        except self.driver.IntegrityError:
            raise sqlite3.IntegrityError('Course data constraint failed') from None
        except self.driver.Error:
            raise OSError('Course database operation failed') from None

    def commit(self):
        try:
            self.raw.execute('UPDATE tx_revision SET revision=revision+1 WHERE id=1')
            self.raw.commit()
        except self.driver.Error:
            raise OSError('Course database commit failed') from None

    def rollback(self):
        try:
            self.raw.rollback()
        except self.driver.Error:
            pass

    def close(self):
        self.raw.close()

    def restore_files(self, user, scope, directory, allowed):
        """Replace disposable cache with the last committed checkpoint."""
        directory.mkdir(parents=True, exist_ok=True)
        rows = self.execute(
            'SELECT name,content FROM runtime_files WHERE course_id=? AND user_id=? AND scope=?',
            (user['course_id'], user['id'], scope))
        files = {row['name']: (bytes.fromhex(row['content'][2:]) if isinstance(row['content'], str)
                              else bytes(row['content'])) for row in rows}
        if not set(files) <= set(allowed):
            raise OSError('Invalid course checkpoint')
        if scope != '_profile' and 'session.json' not in files:
            raise OSError('Course session checkpoint is unavailable')
        for name in allowed:
            target = directory / name
            if target.is_symlink():
                raise OSError('Invalid cache path')
            if name in files:
                target.write_bytes(files[name])
            else:
                target.unlink(missing_ok=True)

    def save_files(self, user, scope, directory, allowed):
        self.execute('DELETE FROM runtime_files WHERE course_id=? AND user_id=? AND scope=?',
                     (user['course_id'], user['id'], scope))
        for name in allowed:
            path = directory / name
            if path.is_symlink():
                raise OSError('Invalid cache path')
            if path.is_file():
                self.execute('INSERT INTO runtime_files(course_id,user_id,scope,name,content) VALUES(?,?,?,?,?)',
                             (user['course_id'], user['id'], scope, name, path.read_bytes()))

    def restore_training(self, user, store, session_id=None):
        learner_file = 'course-' + user['id'] + '.json'
        self.restore_files(user, '_profile', store.root / '_learning_profiles', {learner_file})
        if session_id:
            self.restore_files(user, session_id, store.directory(session_id), SESSION_FILES)

    def save_training(self, user, store, session_id):
        self.save_files(user, session_id, store.directory(session_id), SESSION_FILES)
        learner_file = 'course-' + user['id'] + '.json'
        self.save_files(user, '_profile', store.root / '_learning_profiles', {learner_file})


class Cursor:
    def __init__(self, result):
        self.result = result

    def _get(self):
        if callable(self.result):
            self.result = self.result()
        return self.result

    @property
    def rowcount(self):
        return self._get()['rowcount']

    def fetchone(self):
        rows = self._get()['rows']
        return rows[0] if rows else None

    def fetchall(self):
        return self._get()['rows']

    def __iter__(self):
        return iter(self.fetchall())


class RpcConnection(Connection):
    """Optimistic transactions over the supported CloudBase HTTPS RPC endpoint.

Each read checks the same database revision and previews pending writes in a
rolled-back PostgreSQL subtransaction. Commit rechecks the revision under a
row lock and applies all writes once in one real database transaction. The
server accepts only queries registered by the migration, never arbitrary SQL.
This preserves read-your-writes, atomic import and concurrent review checks.
"""
    def __init__(self):
        env = os.environ.get('ZHIHU_CLASSROOM_CLOUDBASE_ENV', '')
        if not env or not all(c.isalnum() or c == '-' for c in env):
            raise OSError('Invalid CloudBase environment')
        self.url = f'https://{env}.api.tcloudbasegateway.com/v1/rdb/rest/rpc/zhihu_classroom_tx'
        self.api_key = os.environ['ZHIHU_CLASSROOM_API_KEY']
        self.http = urllib.request.build_opener(urllib.request.ProxyHandler({}))
        self.revision = None
        self.writes = []
        self.closed = False

    def _call(self, mode, writes, query=None):
        result = self._send({'p_mode': mode, 'p_revision': self.revision,
                             'p_writes': writes, 'p_query': query})
        if result.get('error') == 'conflict':
            from .classroom import CourseError
            raise CourseError('课程记录刚被其他操作更新，本次未写入，请刷新后重试', 'conflict')
        if result.get('error') == 'duplicate':
            raise sqlite3.IntegrityError('Course data constraint failed')
        if result.get('error') or 'revision' not in result or 'result' not in result:
            raise OSError('Course database operation failed')
        self.revision = result['revision']
        return result['result']

    def _send(self, payload):
        body = json.dumps(payload).encode()
        req = urllib.request.Request(self.url, body, {
            'Content-Type': 'application/json', 'Authorization': 'Bearer ' + self.api_key,
        })
        try:
            with self.http.open(req, timeout=22) as response:
                return json.load(response)
        except Exception:
            # Never retry an uncertain commit or disclose authorization headers.
            raise OSError('Course database request failed') from None

    def execute(self, sql, params=()):
        if self.closed:
            raise OSError('Course transaction is closed')
        command = {'key': hashlib.sha256(sql.encode()).hexdigest(),
                   'params': ['\\x' + p.hex() if isinstance(p, bytes) else p for p in params]}
        if sql.lstrip().upper().startswith('SELECT '):
            return Cursor(self._call('query', self.writes, command))
        pending = self.writes[:]
        self.writes.append(command)
        return Cursor(lambda: self._call('query', pending, command))

    def commit(self):
        if self.writes:
            self._call('commit', self.writes)
        self.writes.clear()

    def rollback(self):
        self.writes.clear()

    def close(self):
        self.rollback()
        self.closed = True


def connect():
    if os.environ.get('ZHIHU_CLASSROOM_DATABASE_URL', '').strip():
        return Connection(os.environ['ZHIHU_CLASSROOM_DATABASE_URL'])
    return RpcConnection()
