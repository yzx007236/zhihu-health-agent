"""Course-service regression tests with isolated databases and real quiz scoring.

Run with: python -B -m unittest discover -s
workbuddy-agent/zhihu-agent/connector/server/tests -p test_classroom.py -v
"""
import base64
import io
import os
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from zhihu_mcp import classroom, tools


class ClassroomTests(unittest.TestCase):
    def test_cloud_rejects_ephemeral_account_and_grade_storage(self):
        with patch.dict(os.environ, {'ZHIHU_CLOUD_DEPLOYMENT': '1'}), patch('os.path.ismount', return_value=False):
            for action in ('status', 'setup', 'login'):
                result = classroom.request(action, {})
                self.assertEqual(result['error'], 'storage_configuration')
                self.assertIn('持久化存储', result['message'])
        with patch.dict(os.environ, {'ZHIHU_CLOUD_DEPLOYMENT': '1'}), patch('os.path.ismount', return_value=True):
            self.assertEqual(classroom.request('status')['status'], 'ok')

    def setUp(self):
        # The real service rejects /tmp for course persistence. Keep isolated
        # fixtures inside the checkout so Linux exercises the same storage rule.
        self.temp = tempfile.TemporaryDirectory(prefix="zhihu-course-test-", dir=Path(__file__).parent)
        root = Path(self.temp.name)
        self.environment = patch.dict(os.environ, {
            "ZHIHU_CLASSROOM_STORE": str(root / "courses"),
            "ZHIHU_SESSION_STORE": str(root / "sessions"),
            "ZHIHU_CLASSROOM_LOCAL_SETUP": "1",
            "ZHIHU_CLASSROOM_SETUP_KEY": "",
            "ZHIHU_CLASSROOM_DEMO": "0",
        })
        self.environment.start()
        self.addCleanup(self.temp.cleanup)
        self.addCleanup(self.environment.stop)
        self.ok("setup", {
            "code": "course-one", "name": "测试课程",
            "username": "teacher", "teacher_name": "测试教师",
            "password": "TestInitial123!",
        })
        self.teacher_token, self.teacher = self.sign_in("teacher")

    def ok(self, action, payload=None, token=None):
        result = classroom.request(action, payload or {}, token)
        self.assertEqual(result.get("status"), "ok", result)
        return result

    def sign_in(self, username, password="TestInitial123!", course="course-one"):
        result = self.ok("login", {
            "course_code": course, "username": username, "password": password,
        })
        if result["user"]["must_change"]:
            self.ok("change_password", {
                "old_password": password, "password": "TestChanged456!",
            }, result["token"])
        return result["token"], result["user"]

    def add_student(self, username="student-one", class_name="一班"):
        self.ok("import_users", {"rows": [{
            "username": username, "name": "测试学生", "class_name": class_name,
            "password": "TestInitial123!",
        }]}, self.teacher_token)
        return self.sign_in(username)

    def add_task(self, kind="quiz", class_name="一班"):
        return self.ok("create_task", {
            "title": "基础答题" if kind == "quiz" else "病例训练",
            "class_name": class_name, "major": "clinical_medicine",
            "kind": kind, "required_count": 1,
        }, self.teacher_token)["task_id"]

    def test_demo_seed_is_idempotent_and_can_be_disabled(self):
        with patch.dict(os.environ, {"ZHIHU_CLASSROOM_DEMO": "1", "ZHIHU_CLOUD_DEPLOYMENT": "0"}):
            self.assertTrue(classroom.seed_demo_data())
            self.assertTrue(classroom.seed_demo_data())
            demo = self.ok("login", {
                "course_code": "DEMO2026", "username": "demo_teacher",
                "password": "DemoTeacher2026!Changed",
            })
            self.assertEqual(demo["user"]["role"], "teacher")
            self.assertEqual(demo["user"]["must_change"], 1)
            self.ok("change_password", {
                "old_password": "DemoTeacher2026!Changed",
                "password": "DemoTeacher2026!Second",
            }, demo["token"])
            self.assertTrue(classroom.seed_demo_data())
            self.ok("login", {
                "course_code": "DEMO2026", "username": "demo_teacher",
                "password": "DemoTeacher2026!Second",
            })
            dashboard = self.ok("dashboard", token=demo["token"])
            self.assertEqual([u["username"] for u in dashboard["users"] if u["role"] == "student"], ["demo_student"])
            self.assertEqual([t["title"] for t in dashboard["tasks"]], ["课程演示训练"])
            student = self.ok("login", {
                "course_code": "DEMO2026", "username": "demo_student",
                "password": "DemoStudent2026!",
            })
            self.assertEqual(student["user"]["role"], "student")
            self.assertEqual(student["user"]["must_change"], 1)
            db = classroom.connect()
            try:
                rows = db.execute("SELECT username,password FROM users WHERE course_id=?", (demo["user"]["course_id"],)).fetchall()
                self.assertEqual(len(rows), 2)
                self.assertTrue(all(":" in row["password"] for row in rows))
                self.assertNotIn("DemoStudent2026!", [row["password"] for row in rows])
            finally:
                db.close()
        with patch.dict(os.environ, {"ZHIHU_CLASSROOM_DEMO": "0"}):
            self.assertFalse(classroom.seed_demo_data())

    def test_shared_backend_initializes_demo_accounts_with_persistent_cloud_storage(self):
        with patch.dict(os.environ, {"ZHIHU_CLOUD_DEPLOYMENT": "1"}), patch('os.path.ismount', return_value=True):
            os.environ.pop("ZHIHU_CLASSROOM_DEMO", None)
            for username, password, role in (
                ("demo_teacher", "DemoTeacher2026!Changed", "teacher"),
                ("demo_student", "DemoStudent2026!", "student"),
            ):
                result = self.ok("login", {
                    "course_code": "DEMO2026", "username": username, "password": password,
                })
                self.assertEqual(result["user"]["role"], role)
                self.assertEqual(result["user"]["must_change"], 1)
                self.assertNotIn("password", result["user"])

    def quiz(self, student_token, task_id):
        started = self.ok("training", {
            "tool": "start_session", "task_id": task_id,
        }, student_token)
        run_id = started["run_id"]
        paper = self.ok("training", {
            "tool": "get_pretest", "run_id": run_id,
            "args": {"level": "basic", "question_count": 5},
        }, student_token)["result"]
        answers = {
            question["question_id"]: next(iter(question["options"]))
            for question in paper["questions"]
        }
        self.ok("training", {
            "tool": "submit_pretest", "run_id": run_id,
            "args": {"answers": answers},
        }, student_token)
        return run_id, started["result"]["session_id"]

    def test_quiz_review_progress_and_exports_share_the_same_grade(self):
        token, student = self.add_student()
        task_id = self.add_task()
        run_id, session_id = self.quiz(token, task_id)
        detail = self.ok("run_detail", {"run_id": run_id}, self.teacher_token)["run"]
        original = detail["original_score"]
        self.assertIsInstance(original, (int, float))
        self.assertEqual(detail["state"], "pending")
        data = self.ok("dashboard", token=self.teacher_token)
        self.assertEqual(data["progress"][0]["percentage"], 100)
        published = self.ok("review", {
            "run_id": run_id, "version": 0, "score": 87.5,
            "reason": "根据答题记录复核", "status": "published",
        }, self.teacher_token)["run"]
        self.assertEqual(published["original_score"], original)
        self.assertEqual(published["final_score"], 87.5)
        self.assertEqual(published["reviews"][0]["before_score"], original)
        visible = self.ok("run_detail", {"run_id": run_id}, token)["run"]
        self.assertEqual(visible["final_score"], 87.5)
        conflict = classroom.request("review", {
            "run_id": run_id, "version": 0, "score": 90,
            "reason": "过期页面不能覆盖新成绩", "status": "published",
        }, self.teacher_token)
        self.assertEqual(conflict["error"], "conflict")
        exported = self.ok("export", {"format": "xlsx"}, self.teacher_token)
        with zipfile.ZipFile(io.BytesIO(base64.b64decode(exported["file"]))) as archive:
            sheet = archive.read("xl/worksheets/sheet1.xml").decode("utf-8")
            self.assertIn("87.5", sheet)
            self.assertIn("已发布", sheet)
        report = self.ok("export", {"format": "pdf", "run_id": run_id}, token)
        raw = base64.b64decode(report["file"])
        self.assertTrue(raw.startswith(b"%PDF-"))
        self.assertIn("87.5".encode("utf-16-be").hex().encode(), raw)
        self.assertIn("根据答题记录复核".encode("utf-16-be").hex().encode(), raw)
        with self.assertRaises(tools.RuntimeErrorWithCode):
            tools.get_session_status(session_id)
        with self.assertRaises(tools.RuntimeErrorWithCode):
            tools._normalize_learner_id("course-" + student["id"])

    def test_student_and_class_boundaries(self):
        token, _ = self.add_student()
        other, _ = self.add_student("student-two", "二班")
        task_id = self.add_task()
        denied = classroom.request("training", {
            "tool": "start_session", "task_id": task_id,
        }, other)
        self.assertEqual(denied["error"], "forbidden")
        run_id, _ = self.quiz(token, task_id)
        for action, payload in [
            ("run_detail", {"run_id": run_id}),
            ("export", {"format": "pdf", "run_id": run_id}),
            ("review", {"run_id": run_id, "version": 0, "score": 100,
                        "reason": "学生不能调分", "status": "published"}),
            ("export", {"format": "xlsx"}),
        ]:
            self.assertEqual(classroom.request(action, payload, other)["error"], "forbidden")
        self.assertEqual(self.ok("dashboard", token=other)["runs"], [])

    def test_separate_login_entries_check_real_roles_before_issuing_tokens(self):
        self.add_student()

        def token_count():
            db = classroom.connect()
            try:
                return db.execute("SELECT COUNT(*) FROM tokens").fetchone()[0]
            finally:
                db.close()

        for username, role in [("teacher", "teacher"), ("student-one", "student")]:
            payload = {"course_code": "course-one", "username": username,
                       "password": "TestChanged456!", "entry_role": role}
            result = self.ok("login", payload)
            self.assertEqual(result["user"]["role"], role)
            self.assertEqual(self.ok("dashboard", token=result["token"])["user"]["role"], role)
            payload["entry_role"] = "student" if role == "teacher" else "teacher"
            before = token_count()
            denied = classroom.request("login", payload)
            self.assertEqual(denied["error"], "role_mismatch")
            self.assertNotIn("token", denied)
            self.assertEqual(token_count(), before, "Wrong portal cannot mint an authenticated session")
            payload["password"] = "WrongPassword123!"
            self.assertEqual(classroom.request("login", payload)["error"], "unauthorized")

        for invalid_role in ["admin", "", None, ["teacher"]]:
            denied = classroom.request("login", {"course_code": "course-one", "username": "teacher",
                "password": "TestChanged456!", "entry_role": invalid_role})
            self.assertEqual(denied["error"], "invalid_request")
        # Existing API clients may omit the portal hint; account permissions stay authoritative.
        legacy = self.ok("login", {"course_code": "course-one", "username": "teacher", "password": "TestChanged456!"})
        self.assertEqual(legacy["user"]["role"], "teacher")

    def test_student_entry_keeps_first_login_password_change_requirement(self):
        self.ok("import_users", {"rows": [{"username": "new-student", "name": "新学生",
            "password": "TestInitial123!"}]}, self.teacher_token)
        result = self.ok("login", {"course_code": "course-one", "username": "new-student",
            "password": "TestInitial123!", "entry_role": "student"})
        self.assertEqual(result["user"]["must_change"], 1)
        self.assertEqual(classroom.request("dashboard", {}, result["token"])["error"], "password_change_required")

    def test_course_isolation_and_revoked_login(self):
        token, user = self.add_student()
        run_id, _ = self.quiz(token, self.add_task())
        self.ok("create_course", {
            "code": "course-two", "name": "第二课程", "password": "TestInitial123!",
        }, self.teacher_token)
        second, _ = self.sign_in("teacher", course="course-two")
        denied = classroom.request("run_detail", {"run_id": run_id}, second)
        self.assertEqual(denied["error"], "forbidden")
        self.ok("set_user_active", {"user_id": user["id"], "active": False}, self.teacher_token)
        self.assertEqual(classroom.request("dashboard", {}, token)["error"], "unauthorized")

    def test_student_capacity_limit_and_atomic_roster_import(self):
        _, user = self.add_student()
        failed = classroom.request("import_users", {"rows": [
            {"username": "new-student", "name": "新学生"},
            {"username": "student-one", "name": "重复账号"},
        ]}, self.teacher_token)
        self.assertEqual(failed["error"], "duplicate")
        self.assertEqual(len(self.ok("dashboard", token=self.teacher_token)["progress"]), 1)
        db = classroom.connect()
        try:
            source = db.execute("SELECT * FROM users WHERE id=?", (user["id"],)).fetchone()
            for index in range(399):
                db.execute("INSERT INTO users VALUES(?,?,?,?,?,?,?,?,?)", (
                    classroom.uid(), user["course_id"], "fixture-" + str(index),
                    "名额边界测试", "student", "一班", source["password"], 1, 1,
                ))
            db.commit()
        finally:
            db.close()
        result = classroom.request("import_users", {"rows": [
            {"username": "student-401", "name": "超额学生"},
        ]}, self.teacher_token)
        self.assertEqual(result["status"], "error")
        self.assertIn("400", result["message"])
        self.assertEqual(len(self.ok("dashboard", token=self.teacher_token)["progress"]), 400)

    def test_initial_setup_requires_password_and_cloud_setup_key(self):
        with tempfile.TemporaryDirectory(prefix="zhihu-course-setup-") as root:
            with patch.dict(os.environ, {
                "ZHIHU_CLASSROOM_STORE": root,
                "ZHIHU_CLASSROOM_LOCAL_SETUP": "0",
                "ZHIHU_CLASSROOM_SETUP_KEY": "test-setup-key",
            }):
                payload = {"code": "new-course", "name": "新课程",
                           "username": "teacher", "teacher_name": "教师"}
                self.assertEqual(classroom.request("setup", payload)["error"], "forbidden")
                payload["setup_key"] = "test-setup-key"
                self.assertEqual(classroom.request("setup", payload)["status"], "error")
                self.assertTrue(classroom.request("status")["setup_required"])


if __name__ == "__main__":
    unittest.main()
