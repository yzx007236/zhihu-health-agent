"""Authenticated course service shared by local HTTP and the cloud MCP gateway.

Local SQLite or private PostgreSQL transactions serialize roster limits,
grading, session checkpoints and audit writes. Cloud data never falls back to
ephemeral SQLite when PostgreSQL is configured but unavailable.
"""
from __future__ import annotations

import base64
import hashlib
import hmac
import json
import math
import os
import re
import secrets
import sqlite3
import threading
import time
import uuid
from pathlib import Path

from . import tools
from .classroom_exports import pdf, xlsx
from workbuddy_runtime import CLASSROOM_ACCESS, read_dialogue

LOCK = threading.RLock()
PUBLIC_USER = ('id', 'course_id', 'username', 'name', 'role', 'class_name', 'active', 'must_change')
ALLOWED_TOOLS = {
    'start_session', 'get_session_status', 'get_pretest', 'submit_pretest',
    'select_training_case', 'get_sp_state', 'advance_stage', 'append_exchange',
    'get_experience_references', 'score_session', 'generate_training_report',
}
DEMO_COURSE = {'code': 'DEMO2026', 'name': '演示课程'}
DEMO_USERS = (
    {'username': 'demo_teacher', 'name': '演示教师', 'password': 'DemoTeacher2026!Changed', 'role': 'teacher'},
    {'username': 'demo_student', 'name': '演示学生', 'class_name': '演示班', 'password': 'DemoStudent2026!', 'role': 'student'},
)
DEMO_TASK = {'title': '课程演示训练', 'class_name': '演示班', 'major': 'clinical_medicine', 'kind': 'quiz'}


class CourseError(ValueError):
    def __init__(self, message, code='invalid_request'):
        super().__init__(message)
        self.code = code


def require(ok, message, code='invalid_request'):
    if not ok:
        raise CourseError(message, code)


def uid():
    return uuid.uuid4().hex


def text(value, limit=100):
    value = str(value or '').strip()
    require(len(value) <= limit, f'文本长度不能超过{limit}字')
    return value


def password_hash(value, salt=None):
    require(isinstance(value, str) and 10 <= len(value) <= 128, '密码须为10至128位')
    salt = salt or secrets.token_hex(16)
    return salt + ':' + hashlib.scrypt(value.encode(), salt=salt.encode(), n=16384, r=8, p=1).hex()


def password_ok(value, hashed):
    if not isinstance(value, str) or not 10 <= len(value) <= 128:
        return False
    return hmac.compare_digest(password_hash(value, hashed.split(':')[0]), hashed)


def connect():
    if (os.environ.get('ZHIHU_CLASSROOM_DATABASE_URL', '').strip()
            or os.environ.get('ZHIHU_CLASSROOM_API_KEY', '').strip()):
        from . import classroom_postgres
        return classroom_postgres.connect()
    root = Path(os.environ.get('ZHIHU_CLASSROOM_STORE', str(Path.cwd() / '.zhihu-classroom'))).resolve()
    require(not (str(root).replace('\\', '/').startswith('/tmp/')), '课程数据库必须使用持久化目录', 'storage_configuration')
    if os.environ.get('ZHIHU_CLOUD_DEPLOYMENT') == '1':
        # A directory in a container image is not durable across replacements.
        # Require a mounted filesystem before accepting account or grade writes.
        mounted = any(os.path.ismount(p) for p in (root, *root.parents) if p != Path(p.anchor))
        require(mounted, '线上课程账号与成绩服务尚未连接持久化存储，暂不能开通或登录课程。可返回首页使用自主答题和病例训练。', 'storage_configuration')
    root.mkdir(parents=True, exist_ok=True)
    db = sqlite3.connect(root / 'classroom.sqlite3', timeout=30)
    db.row_factory = sqlite3.Row
    db.execute('PRAGMA journal_mode=WAL')
    db.executescript('''
        CREATE TABLE IF NOT EXISTS courses(id TEXT PRIMARY KEY, code TEXT UNIQUE, name TEXT, capacity INTEGER);
        CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY, course_id TEXT, username TEXT, name TEXT, role TEXT,
            class_name TEXT, password TEXT, active INTEGER, must_change INTEGER, UNIQUE(course_id,username));
        CREATE TABLE IF NOT EXISTS tokens(hash TEXT PRIMARY KEY, user_id TEXT, expires REAL);
        CREATE TABLE IF NOT EXISTS tasks(id TEXT PRIMARY KEY, course_id TEXT, title TEXT, class_name TEXT,
            major TEXT, kind TEXT, required_count INTEGER, active INTEGER, created REAL);
        CREATE TABLE IF NOT EXISTS runs(id TEXT PRIMARY KEY, course_id TEXT, user_id TEXT, task_id TEXT,
            session_id TEXT UNIQUE, kind TEXT, state TEXT, snapshot TEXT, version INTEGER, updated REAL);
        CREATE TABLE IF NOT EXISTS reviews(id TEXT PRIMARY KEY, run_id TEXT, teacher_id TEXT, teacher_name TEXT,
            before_score REAL, after_score REAL, reason TEXT, status TEXT, version INTEGER, created REAL);
        CREATE TABLE IF NOT EXISTS audit(id TEXT PRIMARY KEY, course_id TEXT, actor TEXT, action TEXT, detail TEXT, created REAL);
        CREATE TABLE IF NOT EXISTS login_failures(key TEXT PRIMARY KEY, count INTEGER, until REAL);
        CREATE INDEX IF NOT EXISTS runs_course ON runs(course_id,user_id,task_id);
    ''')
    db.execute('BEGIN IMMEDIATE')
    return db


def seed_demo_data():
    """Persist the built-in demonstration accounts without resetting existing data."""
    if os.environ.get('ZHIHU_CLASSROOM_DEMO', '1') != '1':
        return False
    with LOCK:
        db = connect()
        try:
            course = db.execute('SELECT id FROM courses WHERE code=?', (DEMO_COURSE['code'],)).fetchone()
            if course is None:
                course_id = uid()
                db.execute('INSERT INTO courses VALUES(?,?,?,400)', (course_id, DEMO_COURSE['code'], DEMO_COURSE['name']))
            else:
                course_id = course['id']
            for account in DEMO_USERS:
                exists = db.execute('SELECT 1 FROM users WHERE course_id=? AND username=?',
                                    (course_id, account['username'])).fetchone()
                if not exists:
                    add_user(db, course_id, account, account['role'])
            task = db.execute('SELECT 1 FROM tasks WHERE course_id=? AND title=?',
                              (course_id, DEMO_TASK['title'])).fetchone()
            if not task:
                db.execute('INSERT INTO tasks VALUES(?,?,?,?,?,?,?,?,?)',
                           (uid(), course_id, DEMO_TASK['title'], DEMO_TASK['class_name'],
                            DEMO_TASK['major'], DEMO_TASK['kind'], 1, 1, time.time()))
            db.commit()
            return True
        except Exception:
            db.rollback()
            raise
        finally:
            db.close()


def public_user(user):
    return {key: user[key] for key in PUBLIC_USER}


def audit(db, user, action, detail):
    db.execute('INSERT INTO audit VALUES(?,?,?,?,?,?)', (uid(), user['course_id'], user['id'], action, json.dumps(detail, ensure_ascii=False), time.time()))


def teacher(user):
    require(user['role'] == 'teacher', '此操作仅限本课程教师', 'forbidden')


def authenticate(db, token):
    token = str(token or '')
    require(20 <= len(token) <= 200, '请先登录课程', 'unauthorized')
    hashed = hashlib.sha256(token.encode()).hexdigest()
    user = db.execute('SELECT u.* FROM tokens t JOIN users u ON u.id=t.user_id WHERE t.hash=? AND t.expires>? AND u.active=1', (hashed, time.time())).fetchone()
    require(user is not None, '登录已失效，请重新登录', 'unauthorized')
    return user


def add_user(db, course_id, row, role='student'):
    username, name, class_name = text(row.get('username')), text(row.get('name')), text(row.get('class_name'))
    require(re.fullmatch(r'[A-Za-z0-9._-]{1,64}', username), '账号只支持字母、数字、点、下划线和连字符')
    require(name, '请填写姓名')
    require(role in {'student', 'teacher'}, '账号角色不合法')
    password = row.get('password') or secrets.token_urlsafe(12)
    db.execute('INSERT INTO users (id,course_id,username,name,role,class_name,password,active,must_change) VALUES(?,?,?,?,?,?,?,?,?)',
               (uid(), course_id, username, name, role, class_name, password_hash(password), 1, 1))
    return {'username': username, 'name': name, 'class_name': class_name, 'password': password}


def login(db, payload):
    entry_role = payload.get('entry_role')
    if 'entry_role' in payload:
        require(isinstance(entry_role, str) and entry_role in {'student', 'teacher'}, '请选择学生或教师登录入口')
    code, username = text(payload.get('course_code')), text(payload.get('username'))
    key = hashlib.sha256((code + '/' + username).encode()).hexdigest()
    failure = db.execute('SELECT * FROM login_failures WHERE key=?', (key,)).fetchone()
    require(not failure or failure['count'] <= 7 or failure['until'] <= time.time(), '尝试次数过多，请15分钟后重试', 'rate_limited')
    user = db.execute('SELECT u.* FROM users u JOIN courses c ON c.id=u.course_id WHERE c.code=? AND u.username=?', (code, username)).fetchone()
    # Equal-cost password work even for an unknown account.
    valid = password_ok(payload.get('password'), user['password'] if user else '0' * 32 + ':' + '0' * 128)
    if not user or not user['active'] or not valid:
        count = failure['count'] + 1 if failure and failure['until'] > time.time() else 1
        db.execute('INSERT INTO login_failures VALUES(?,?,?) ON CONFLICT(key) DO UPDATE SET count=excluded.count, until=excluded.until', (key, count, time.time() + 900))
        db.commit()
        raise CourseError('课程代码、账号或密码不正确', 'unauthorized')
    if entry_role is not None:
        require(user['role'] == entry_role, '账号身份与所选入口不符，请切换到学生或教师对应入口登录', 'role_mismatch')
    db.execute('DELETE FROM login_failures WHERE key=?', (key,))
    db.execute('DELETE FROM tokens WHERE expires<?', (time.time(),))
    token = secrets.token_urlsafe(32)
    db.execute('INSERT INTO tokens VALUES(?,?,?)', (hashlib.sha256(token.encode()).hexdigest(), user['id'], time.time() + 8 * 3600))
    course = db.execute('SELECT * FROM courses WHERE id=?', (user['course_id'],)).fetchone()
    return {'token': token, 'user': public_user(user), 'course': dict(course)}


def get_run(db, user, run_id):
    row = db.execute('SELECT * FROM runs WHERE id=? AND course_id=?', (run_id, user['course_id'])).fetchone()
    require(row is not None and (user['role'] == 'teacher' or row['user_id'] == user['id']), '训练记录不存在或无权查看', 'forbidden')
    return row


def run_view(db, row, user, reviews=None):
    result = dict(row); result['snapshot'] = json.loads(result['snapshot'])
    if reviews is None:
        reviews = [dict(r) for r in db.execute('SELECT * FROM reviews WHERE run_id=? ORDER BY version', (row['id'],))]
    original = result['snapshot'].get('original_score')
    result.update(original_score=original, final_score=None, reviews=reviews)
    if reviews:
        result['final_score'] = reviews[-1]['after_score'] if reviews[-1]['status'] == 'published' else None
    if user['role'] == 'student':
        result['reviews'] = [r for r in reviews if r['status'] == 'published']
        # Full evidence is available only after the server has completed scoring.
        if original is None:
            result['snapshot'] = {}
    return result


def dashboard(db, user):
    course_id = user['course_id']
    course = dict(db.execute('SELECT * FROM courses WHERE id=?', (course_id,)).fetchone())
    tasks = [dict(t) for t in db.execute('SELECT * FROM tasks WHERE course_id=? ORDER BY created DESC', (course_id,))
             if user['role'] == 'teacher' or not t['class_name'] or t['class_name'] == user['class_name']]
    users = [public_user(u) for u in db.execute('SELECT * FROM users WHERE course_id=? ORDER BY class_name,username', (course_id,))
             if user['role'] == 'teacher' or u['id'] == user['id']]
    review_map = {}
    for review in db.execute('SELECT r.* FROM reviews r JOIN runs x ON x.id=r.run_id WHERE x.course_id=? ORDER BY r.version', (course_id,)):
        review_map.setdefault(review['run_id'], []).append(dict(review))
    runs = [run_view(db, r, user, review_map.get(r['id'], [])) for r in db.execute('SELECT * FROM runs WHERE course_id=? ORDER BY updated DESC', (course_id,))
            if user['role'] == 'teacher' or r['user_id'] == user['id']]
    progress = []
    for student in users:
        if student['role'] != 'student':
            continue
        relevant = [t for t in tasks if t['active'] and (not t['class_name'] or t['class_name'] == student['class_name'])]
        counts = []
        for task in relevant:
            completed = sum(1 for r in runs if r['user_id'] == student['id'] and r['task_id'] == task['id'] and r['original_score'] is not None)
            counts.append({'task_id': task['id'], 'completed': min(completed, task['required_count']), 'required': task['required_count']})
        required = sum(x['required'] for x in counts); completed = sum(x['completed'] for x in counts)
        personal = [r for r in runs if r['user_id'] == student['id']]
        progress.append({**student, 'tasks': counts, 'completed': completed, 'required': required,
                         'percentage': round(completed / required * 100) if required else None,
                         'last_training': max((r['updated'] for r in personal), default=None),
                         'pending': sum(r['state'] == 'pending' for r in personal)})
    # Dashboard summaries omit large evidence; detail is loaded on demand.
    for run in runs:
        run['snapshot'] = {k: run['snapshot'].get(k) for k in ('case_id', 'case_title', 'kind', 'original_score')}
        run.pop('reviews')
    return {'course': course, 'user': public_user(user), 'users': users, 'tasks': tasks, 'runs': runs, 'progress': progress}


def snapshot(session, directory, result=None, kind='case'):
    score_path = directory / 'score_result.json'
    score = json.loads(score_path.read_text(encoding='utf-8')) if score_path.is_file() and kind == 'case' else None
    if kind == 'quiz':
        score = session.get('pretest_result')
    original = None
    if score:
        if kind == 'quiz':
            original = score.get('percentage')
            if original is None and score.get('max_score'):
                original = round(score['score'] / score['max_score'] * 100, 2)
        else:
            original = score.get('total_score')
    return {'kind': kind, 'case_id': session.get('case_id'), 'case_title': session.get('case_id'),
            'original_score': original, 'score': score, 'dialogue': read_dialogue(directory) if score else [],
            'rubric_version': session.get('rubric_version'), 'pretest': session.get('pretest_result')}


def training(db, user, payload):
    require(user['role'] == 'student', '请用学生账号进入课程训练', 'forbidden')
    name, args = payload.get('tool'), dict(payload.get('args') or {})
    require(name in ALLOWED_TOOLS, '课程训练不支持此操作')
    run_id = payload.get('run_id')
    context = CLASSROOM_ACCESS.set((user['course_id'], user['id']))
    try:
        if name == 'start_session' and not run_id:
            task = db.execute('SELECT * FROM tasks WHERE id=? AND course_id=? AND active=1', (payload.get('task_id'), user['course_id'])).fetchone()
            require(task and (not task['class_name'] or task['class_name'] == user['class_name']), '任务不可用或不属于你的班级', 'forbidden')
            if hasattr(db, 'restore_training'):
                db.restore_training(user, tools._store())
            result = tools.start_session(major=task['major'], mode='complete', learner_id='course-' + user['id'])
            session, directory = tools._store().load(result['session_id'])
            session['classroom_binding'] = {'course_id': user['course_id'], 'user_id': user['id']}
            tools._store().save(session, directory)
            run_id = uid()
            db.execute('INSERT INTO runs VALUES(?,?,?,?,?,?,?,?,?,?)', (run_id, user['course_id'], user['id'], task['id'], session['session_id'], task['kind'], 'training', '{}', 0, time.time()))
        else:
            row = get_run(db, user, run_id)
            require(row['state'] == 'training' or name in {'get_session_status', 'get_experience_references'}, '本次训练已提交；请从课程空间开始下一次训练')
            require(not args.get('session_id') or args['session_id'] == row['session_id'], '会话归属不匹配', 'forbidden')
            if hasattr(db, 'restore_training'):
                db.restore_training(user, tools._store(), row['session_id'])
            args['session_id'] = row['session_id']
            require(not any(key in args for key in ('learner_id', 'source_session_id', 'course_id', 'user_id')), '不能修改训练归属', 'forbidden')
            if name == 'start_session':
                args.pop('major', None); args['major'] = 'other'
            if name == 'get_pretest':
                existing, _ = tools._store().load(row['session_id'])
                require(not existing.get('pretest_result'), '本次自测已提交，请新建训练')
            if name == 'submit_pretest':
                existing, _ = tools._store().load(row['session_id'])
                require(not existing.get('pretest_result'), '请勿重复提交自测')
            if row['kind'] == 'quiz':
                require(name in {'get_session_status', 'get_pretest', 'submit_pretest', 'get_experience_references', 'start_session'}, '此任务为答题自测')
            result = getattr(tools, name)(**args)
            session, directory = tools._store().load(row['session_id'])
        row = get_run(db, user, run_id)
        saved = snapshot(session, directory, result, row['kind'])
        finished = saved['original_score'] is not None
        # First completed snapshot is immutable; subsequent reads cannot change it.
        if row['state'] == 'training':
            db.execute('UPDATE runs SET snapshot=?,state=?,updated=? WHERE id=?', (json.dumps(saved, ensure_ascii=False), 'pending' if finished else 'training', time.time(), run_id))
        if hasattr(db, 'save_training'):
            db.save_training(user, tools._store(), row['session_id'])
        return {'run_id': run_id, 'result': result}
    finally:
        CLASSROOM_ACCESS.reset(context)


def handle(db, action, payload, token):
    if action == 'status':
        return {'setup_required': not bool(db.execute('SELECT 1 FROM courses LIMIT 1').fetchone()),
                'setup_key_required': bool(os.environ.get('ZHIHU_CLASSROOM_SETUP_KEY')), 'capacity': 400,
                'storage': 'postgresql' if hasattr(db, 'save_training') else 'sqlite'}
    if action == 'setup':
        expected = os.environ.get('ZHIHU_CLASSROOM_SETUP_KEY', '')
        local = os.environ.get('ZHIHU_CLASSROOM_LOCAL_SETUP') == '1' and os.environ.get('ZHIHU_CLOUD_DEPLOYMENT') != '1'
        require((expected and hmac.compare_digest(str(payload.get('setup_key', '')), expected)) or (local and not expected), '开通课程需要服务器配置的开通密钥', 'forbidden')
        require(not db.execute('SELECT 1 FROM courses LIMIT 1').fetchone(), '首个课程已开通，请登录教师账号创建其他课程')
        code, name = text(payload.get('code')), text(payload.get('name'))
        require(re.fullmatch(r'[A-Za-z0-9_-]{2,40}', code) and name, '请填写课程名称及2至40位课程代码')
        password_hash(payload.get('password'))
        course_id = uid()
        db.execute('INSERT INTO courses VALUES(?,?,?,400)', (course_id, code, name))
        add_user(db, course_id, {'username': payload.get('username'), 'name': payload.get('teacher_name'), 'password': payload.get('password')}, 'teacher')
        return {'message': '课程已开通，请使用教师账号登录'}
    if action == 'login':
        return login(db, payload)
    user = authenticate(db, token)
    if action == 'logout':
        db.execute('DELETE FROM tokens WHERE hash=?', (hashlib.sha256(str(token).encode()).hexdigest(),))
        return {}
    if action == 'change_password':
        require(password_ok(payload.get('old_password'), user['password']), '原密码不正确')
        hashed = password_hash(payload.get('password'))
        require(not password_ok(payload.get('password'), user['password']), '新密码应与原密码不同')
        db.execute('UPDATE users SET password=?,must_change=0 WHERE id=?', (hashed, user['id']))
        db.execute('DELETE FROM tokens WHERE user_id=? AND hash!=?', (user['id'], hashlib.sha256(str(token).encode()).hexdigest()))
        audit(db, user, 'change_password', {})
        return {}
    require(not user['must_change'], '首次登录请先修改密码', 'password_change_required')
    if action == 'dashboard':
        return dashboard(db, user)
    if action == 'create_course':
        teacher(user)
        code, name = text(payload.get('code')), text(payload.get('name'))
        require(re.fullmatch(r'[A-Za-z0-9_-]{2,40}', code) and name, '课程代码或名称不合法')
        course_id = uid(); db.execute('INSERT INTO courses VALUES(?,?,?,400)', (course_id, code, name))
        credentials = add_user(db, course_id, {'username': user['username'], 'name': user['name'], 'password': payload.get('password')}, 'teacher')
        audit(db, user, 'create_course', {'course_id': course_id})
        return {'course_code': code, 'credentials': credentials}
    if action in {'import_users', 'add_teacher'}:
        teacher(user)
        rows = payload.get('rows')
        require(isinstance(rows, list) and 1 <= len(rows) <= 400, '每次导入1至400条账号')
        role = 'teacher' if action == 'add_teacher' else 'student'
        if role == 'student':
            count = db.execute("SELECT COUNT(*) AS count FROM users WHERE course_id=? AND role='student'", (user['course_id'],)).fetchone()['count']
            capacity = db.execute('SELECT capacity FROM courses WHERE id=?', (user['course_id'],)).fetchone()['capacity']
            require(count + len(rows) <= capacity, '超过课程学生账号名额（最多400个，停用账号也占名额）')
        accounts = [add_user(db, user['course_id'], row, role) for row in rows]
        audit(db, user, action, {'count': len(accounts)})
        return {'accounts': accounts}
    if action in {'set_user_active', 'reset_password'}:
        teacher(user)
        target = db.execute('SELECT * FROM users WHERE id=? AND course_id=?', (payload.get('user_id'), user['course_id'])).fetchone()
        require(target and target['id'] != user['id'], '不能修改当前教师账号或课程外账号')
        if action == 'set_user_active':
            require(isinstance(payload.get('active'), bool), '账号状态不合法')
            db.execute('UPDATE users SET active=? WHERE id=?', (int(payload['active']), target['id']))
            answer = {}
        else:
            password = secrets.token_urlsafe(12)
            db.execute('UPDATE users SET password=?,must_change=1 WHERE id=?', (password_hash(password), target['id']))
            answer = {'password': password, 'username': target['username']}
        db.execute('DELETE FROM tokens WHERE user_id=?', (target['id'],))
        audit(db, user, action, {'user_id': target['id']})
        return answer
    if action == 'create_task':
        teacher(user)
        title, class_name, major, kind = (text(payload.get(k)) for k in ('title', 'class_name', 'major', 'kind'))
        count = payload.get('required_count', 1)
        require(title and kind in {'quiz', 'case'} and isinstance(count, int) and not isinstance(count, bool) and 1 <= count <= 100, '请填写任务名称、类型及1至100次训练要求')
        require(major in tools.list_majors(), '专业方向不合法')
        task_id = uid()
        db.execute('INSERT INTO tasks VALUES(?,?,?,?,?,?,?,?,?)', (task_id, user['course_id'], title, class_name, major, kind, count, 1, time.time()))
        audit(db, user, action, {'task_id': task_id})
        return {'task_id': task_id}
    if action == 'set_task_active':
        teacher(user)
        require(isinstance(payload.get('active'), bool), '任务状态不合法')
        result = db.execute('UPDATE tasks SET active=? WHERE id=? AND course_id=?', (int(payload['active']), payload.get('task_id'), user['course_id']))
        require(result.rowcount == 1, '任务不存在')
        audit(db, user, action, {'task_id': payload.get('task_id'), 'active': payload['active']})
        return {}
    if action == 'training':
        return training(db, user, payload)
    if action == 'run_detail':
        return {'run': run_view(db, get_run(db, user, payload.get('run_id')), user)}
    if action == 'review':
        teacher(user)
        row = get_run(db, user, payload.get('run_id'))
        current = run_view(db, row, user)
        require(current['original_score'] is not None, '训练尚未完成服务端评分')
        require(payload.get('version') == row['version'], '成绩已被其他教师更新，请刷新后再复核', 'conflict')
        score = payload.get('score'); reason = text(payload.get('reason'), 2000)
        require(isinstance(score, (int, float)) and not isinstance(score, bool) and math.isfinite(score) and 0 <= score <= 100 and reason, '请输入0至100的分数及复核理由')
        status = payload.get('status')
        require(status in {'draft', 'published'}, '复核状态不合法')
        before = current['reviews'][-1]['after_score'] if current['reviews'] else current['original_score']
        version = row['version'] + 1
        db.execute('INSERT INTO reviews VALUES(?,?,?,?,?,?,?,?,?,?)', (uid(), row['id'], user['id'], user['name'], before, round(score, 2), reason, status, version, time.time()))
        db.execute('UPDATE runs SET state=?,version=? WHERE id=?', (status, version, row['id']))
        audit(db, user, action, {'run_id': row['id'], 'version': version, 'status': status})
        return {'run': run_view(db, get_run(db, user, row['id']), user)}
    if action == 'export':
        fmt = payload.get('format')
        if fmt == 'xlsx':
            teacher(user); data = dashboard(db, user)
            class_filter = text(payload.get('class_name'))
            users = {u['id']: u for u in data['users']}; tasks = {t['id']: t for t in data['tasks']}
            rows = [['课程', '班级', '学号', '姓名', '任务', '训练编号', '类型', '程序原分', '教师复核分', '最终成绩', '状态', '成绩版本']]
            for run in data['runs']:
                student = users[run['user_id']]
                if class_filter and student['class_name'] != class_filter:
                    continue
                detail = run_view(db, get_run(db, user, run['id']), user)
                review_score = detail['reviews'][-1]['after_score'] if detail['reviews'] else None
                rows.append([data['course']['name'], student['class_name'], student['username'], student['name'], tasks[run['task_id']]['title'], run['id'], '答题' if run['kind'] == 'quiz' else '病例', run['original_score'], review_score, run['final_score'], {'training': '训练中', 'pending': '待复核', 'draft': '复核草稿', 'published': '已发布'}.get(run['state']), run['version']])
            rows.append([]); rows.append(['班级进度', '学号', '姓名', '完成次数', '要求次数', '完成率(%)', '待复核次数'])
            for progress in data['progress']:
                if not class_filter or progress['class_name'] == class_filter:
                    rows.append([progress['class_name'], progress['username'], progress['name'], progress['completed'], progress['required'], progress['percentage'], progress['pending']])
            raw, mime, filename = xlsx(rows), 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'course-grades.xlsx'
        else:
            require(fmt == 'pdf', '导出格式不支持')
            run = run_view(db, get_run(db, user, payload.get('run_id')), user)
            require(run['original_score'] is not None, '完成服务端评分后才能导出报告')
            student = db.execute('SELECT * FROM users WHERE id=?', (run['user_id'],)).fetchone()
            course = db.execute('SELECT * FROM courses WHERE id=?', (user['course_id'],)).fetchone()
            task = db.execute('SELECT * FROM tasks WHERE id=?', (run['task_id'],)).fetchone()
            lines = ['知护 - 课程训练与教师复核报告', '', f'课程：{course['name']}   班级：{student['class_name']}',
                     f'学生：{student['name']}   学号：{student['username']}', f'任务：{task['title']}',
                     f'训练编号：{run['id']}', f'程序原分：{run['original_score']} / 100',
                     f'最终成绩：{run['final_score'] if run['final_score'] is not None else "待教师发布"}   版本：{run['version']}',
                     '人工复核独立于程序原分；评分红线与封顶记录保留。', '', '评分依据']
            score_data = run['snapshot'].get('score') or {}
            for item in score_data.get('item_results', score_data.get('detail', [])):
                lines.append(f'{item.get("behavior") or item.get("question_id") or item.get("item_id", "")}：{item.get("score", item.get("correct", ""))} / {item.get("max_score", "")}')
                for evidence in item.get('evidence', []):
                    lines.append(f'  第{evidence.get("turn_id")}轮：{evidence.get("quote", "")}')
            lines.extend(['红线：' + json.dumps(score_data.get('red_lines', []), ensure_ascii=False), '封顶：' + json.dumps(score_data.get('caps', []), ensure_ascii=False), '', '教师复核记录'])
            for review in run['reviews']:
                lines.append(f'版本{review["version"]}  教师：{review["teacher_name"]}  {review["before_score"]} -> {review["after_score"]}  {review["status"]}')
                lines.append('理由：' + review['reason'])
            lines.extend(['', '训练对话'])
            for turn in run['snapshot'].get('dialogue', []):
                lines.append(f'{turn.get("turn_id")} {turn.get("speaker")}：{turn.get("raw_text", "")}')
            lines.extend(['', '仅供课程学习与合成病例训练，不构成医疗建议。'])
            raw, mime, filename = pdf(lines), 'application/pdf', 'training-report.pdf'
        audit(db, user, 'export', {'format': fmt, 'run_id': payload.get('run_id')})
        return {'file': base64.b64encode(raw).decode(), 'mime': mime, 'filename': filename}
    raise CourseError('未知课程操作')


def request(action, payload=None, token=None):
    """Only route entry. Never accept caller-selected identities or scores as originals."""
    with LOCK:
        db = None
        try:
            require(isinstance(payload or {}, dict), '请求格式错误')
            if str(action) in ('status', 'login'):
                seed_demo_data()
            db = connect()
            result = handle(db, str(action), payload or {}, token)
            db.commit()
            return {'status': 'ok', **result}
        except CourseError as exc:
            if db:
                db.rollback()
            return {'status': 'error', 'error': exc.code, 'message': str(exc)}
        except sqlite3.IntegrityError:
            if db:
                db.rollback()
            return {'status': 'error', 'error': 'duplicate', 'message': '课程代码或账号重复，本次操作未写入'}
        except OSError:
            if db:
                db.rollback()
            return {'status': 'error', 'error': 'storage_unavailable', 'message': '课程持久化存储暂不可用，本次操作未确认保存，请稍后刷新核对；自主训练仍可使用。'}
        except (ValueError, TypeError, KeyError, OSError, tools.RuntimeErrorWithCode) as exc:
            if db:
                db.rollback()
            return {'status': 'error', 'error': getattr(exc, 'code', 'operation_failed'), 'message': '操作未完成，请检查输入或训练阶段后重试'}
        finally:
            if db:
                db.close()
