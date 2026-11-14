-- Run as the database owner, outside the public PostgREST schema.
-- The application role receives no schema creation or public-table privileges.
BEGIN;
SELECT pg_advisory_xact_lock(734218603119);
CREATE SCHEMA IF NOT EXISTS zhihu_classroom;
REVOKE ALL ON SCHEMA zhihu_classroom FROM PUBLIC;
SET LOCAL search_path = zhihu_classroom, pg_catalog;
CREATE TABLE IF NOT EXISTS schema_version(id INTEGER PRIMARY KEY CHECK(id=1), version INTEGER NOT NULL);
INSERT INTO schema_version VALUES(1,1) ON CONFLICT(id) DO NOTHING;
CREATE TABLE IF NOT EXISTS courses(id TEXT PRIMARY KEY, code TEXT UNIQUE NOT NULL, name TEXT NOT NULL, capacity INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY, course_id TEXT NOT NULL REFERENCES courses(id), username TEXT NOT NULL,
    name TEXT, role TEXT CHECK(role IN ('student','teacher')), class_name TEXT, password TEXT NOT NULL,
    active INTEGER, must_change INTEGER, UNIQUE(course_id,username));
CREATE TABLE IF NOT EXISTS tokens(hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), expires DOUBLE PRECISION);
CREATE TABLE IF NOT EXISTS tasks(id TEXT PRIMARY KEY, course_id TEXT NOT NULL REFERENCES courses(id), title TEXT,
    class_name TEXT, major TEXT, kind TEXT, required_count INTEGER, active INTEGER, created DOUBLE PRECISION);
CREATE TABLE IF NOT EXISTS runs(id TEXT PRIMARY KEY, course_id TEXT NOT NULL REFERENCES courses(id), user_id TEXT NOT NULL REFERENCES users(id),
    task_id TEXT NOT NULL REFERENCES tasks(id), session_id TEXT UNIQUE, kind TEXT, state TEXT,
    snapshot TEXT, version INTEGER, updated DOUBLE PRECISION);
CREATE TABLE IF NOT EXISTS reviews(id TEXT PRIMARY KEY, run_id TEXT NOT NULL REFERENCES runs(id), teacher_id TEXT NOT NULL REFERENCES users(id),
    teacher_name TEXT, before_score DOUBLE PRECISION, after_score DOUBLE PRECISION, reason TEXT,
    status TEXT, version INTEGER, created DOUBLE PRECISION, UNIQUE(run_id,version));
CREATE TABLE IF NOT EXISTS audit(id TEXT PRIMARY KEY, course_id TEXT NOT NULL REFERENCES courses(id), actor TEXT,
    action TEXT, detail TEXT, created DOUBLE PRECISION);
CREATE TABLE IF NOT EXISTS login_failures(key TEXT PRIMARY KEY, count INTEGER, until DOUBLE PRECISION);
CREATE TABLE IF NOT EXISTS runtime_files(course_id TEXT NOT NULL REFERENCES courses(id), user_id TEXT NOT NULL REFERENCES users(id),
    scope TEXT NOT NULL, name TEXT NOT NULL, content BYTEA NOT NULL,
    PRIMARY KEY(course_id,user_id,scope,name));
CREATE INDEX IF NOT EXISTS runs_course ON runs(course_id,user_id,task_id);
CREATE INDEX IF NOT EXISTS users_course ON users(course_id,role);
CREATE INDEX IF NOT EXISTS reviews_run ON reviews(run_id,version);
REVOKE ALL ON ALL TABLES IN SCHEMA zhihu_classroom FROM PUBLIC;
COMMIT;
