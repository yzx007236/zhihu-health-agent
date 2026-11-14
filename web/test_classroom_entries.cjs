// Real course-page handlers in an isolated DOM and transport; no production account mutations.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const script = fs.readFileSync(__dirname + '/classroom.js', 'utf8');
const tick = () => new Promise(resolve => setImmediate(resolve));
function boot(search = '', options = {}) {
  const nodes = new Map(), storage = new Map(), calls = [];
  let setupRequired = options.setupRequired !== false;
  let actualRole = options.actualRole || 'student';
  if (options.cached) {
    storage.set('zhihu.course.token', 'cached-token');
    storage.set('zhihu.course.user', JSON.stringify({role:actualRole}));
  }
  function node(id) {
    const element = {id, _html:'', textContent:'', hidden:false, disabled:false, values:{},
      scrollIntoView() {}, querySelector() { return {disabled:false}; },
      querySelectorAll(selector) {
        if (selector !== '[data-action]') return [];
        return [...this._html.matchAll(/data-action="([^"]+)"(?: data-id="([^"]*)")?/g)].map(([,action, key]) => {
          const button = {dataset:{action,id:key || ''}, disabled:false};
          nodes.set('action:' + action + ':' + (key || ''), button); return button;
        });
      }
    };
    Object.defineProperty(element,'innerHTML',{get() {return this._html;},set(value) {
      if (id === 'classroom-app') nodes.clear();
      this._html = value; nodes.set(id, this);
    }});
    return element;
  }
  const host = node('classroom-app'); nodes.set('classroom-app',host);
  const bodyClasses=new Set();
  const document = {
    body:{classList:{add:name=>bodyClasses.add(name),remove:name=>bodyClasses.delete(name),contains:name=>bodyClasses.has(name)}},
    getElementById(id) {
      if (nodes.has(id)) return nodes.get(id);
      if (![...nodes.values()].some(n => (n._html || '').includes('id="' + id + '"'))) return null;
      const result = node(id); nodes.set(id,result); return result;
    },
  };
  const sessionStorage = {getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)};
  const window = {location:{search},__AGENT_API__:'/api/agent'};
  const sandbox = {window, document, URLSearchParams, sessionStorage, console, setTimeout,clearTimeout,
    FormData:class {constructor(form){this.values=form.values;} [Symbol.iterator](){return Object.entries(this.values)[Symbol.iterator]();}},
    async fetch(url, init) {
      const request = JSON.parse(init.body); calls.push(request);
      const {operation,payload} = request;
      let result = {status:'ok'};
      const person = {id:'test-user',course_id:'test-course',role:actualRole,name:'模拟账号',must_change:options.mustChange?1:0};
      if (operation === 'status') {
        if (options.statusUnavailable) throw new Error('模拟服务不可用');
        Object.assign(result,{setup_required:setupRequired,setup_key_required:true});
      } else if (operation === 'setup') setupRequired=false;
      else if (operation === 'login') {
        if (payload.entry_role !== actualRole && !options.legacyMismatch) result={status:'error',error:'role_mismatch',message:'账号身份与所选入口不符'};
        else Object.assign(result,{token:'new-test-token',user:person});
      } else if (operation === 'dashboard') Object.assign(result,{user:person,course:{code:'test',name:'测试课程',capacity:400},users:[person],tasks:[],runs:[],progress:[]});
      return {ok:result.status==='ok',json:async()=>result};
    }
  };
  vm.runInNewContext(script,sandbox,{filename:'classroom.js'});
  return {host,document,calls,storage,
    html:()=>[...nodes.values()].map(n=>n._html||'').join(''),
    async submit(id, values = {}) {
      const form = document.getElementById(id); assert(form,'Visible form ' + id); form.values=values;
      const button={disabled:false}; await form.onsubmit({preventDefault(){},submitter:button});
      assert.equal(button.disabled,false,'Submit re-enabled');
    },
    async logout() { await nodes.get('action:logout:').onclick(); }
  };
}
(async()=>{
  const choice=boot(); await tick();
  assert(choice.html().includes('请选择你的身份'));
  for (const role of ['student','teacher']) assert(choice.html().includes('classroom.html?role='+role));
  assert(!choice.html().includes('id="course-login"'));
  assert(!choice.html().includes('首次开通课程'));
  assert.equal(choice.calls.length,0,'Identity selection is available without calling the course service');
  const invalid=boot('?role=admin'); await tick(); assert(invalid.html().includes('请选择你的身份'));
  const student=boot('?role=student'); await tick();
  assert(student.document.body.classList.contains('course-auth-page'));
  assert(student.html().includes('auth-brand-panel') && student.html().includes('auth-form-panel'));
  assert(student.html().includes('让专业学习与') && student.html().includes('care-architecture.svg'));
  assert(student.html().includes('学生登录') && student.html().includes('学号 / 学生账号'));
  assert(!student.html().includes('首次开通课程'));
  assert(!student.document.getElementById('course-setup'));
  assert.equal(student.calls.length,0);
  await student.submit('course-login',{username:'student',password:'SyntheticPassword123',course_code:'test'});
  assert.equal(student.calls[0].payload.entry_role,'student');
  assert(student.html().includes('学生端') && student.html().includes('我的进度'));
  assert(!student.document.body.classList.contains('course-auth-page'),'Dashboard restores ordinary course shell');
  assert(!student.html().includes('账号管理'));
  await student.logout();
  assert(student.html().includes('请选择你的身份'));
  assert.equal(student.storage.size,0);
  const teacher=boot('?role=teacher',{actualRole:'teacher'}); await tick();
  assert(teacher.html().includes('教师登录') && teacher.html().includes('首次开通课程'));
  assert(teacher.html().includes('auth-brand-panel') && teacher.html().includes('auth-form-panel'));
  assert(teacher.html().includes('<details class="course-setup">'),'First setup stays available in a collapsed disclosure');
  assert(teacher.document.getElementById('course-setup'));
  await teacher.submit('course-setup',{code:'test'});
  assert(teacher.html().includes('教师登录'));
  assert(!teacher.document.getElementById('course-setup'),'Setup disappears once configured');
  assert(teacher.document.getElementById('course-notice').textContent.includes('课程已开通'));
  await teacher.submit('course-login',{username:'teacher'});
  assert(teacher.html().includes('教师端') && teacher.html().includes('账号管理'));
  assert(teacher.calls.some(c=>c.operation==='login' && c.payload.entry_role==='teacher'));
  const mismatch=boot('?role=teacher',{actualRole:'student'}); await tick();
  await mismatch.submit('course-login',{username:'student'});
  assert.equal(mismatch.storage.size,0);
  assert(mismatch.document.getElementById('course-notice').textContent.includes('身份'));
  assert(!mismatch.calls.some(c=>c.operation==='dashboard'));
  const legacy=boot('?role=teacher',{legacyMismatch:true}); await tick();
  await legacy.submit('course-login',{});
  assert.equal(legacy.storage.size,0,'Mismatched legacy API response cannot be stored as a teacher login');
  const first=boot('?role=student',{mustChange:true}); await tick(); await first.submit('course-login',{});
  assert(first.html().includes('首次登录 · 修改密码'));
  assert(first.html().includes('auth-brand-panel'),'Password change retains the split branding shell');
  assert(!first.calls.some(c=>c.operation==='dashboard'));
  const cached=boot('',{cached:true}); await tick(); assert(cached.html().includes('学生端'));
  const cachedWrong=boot('?role=teacher',{cached:true}); await tick();
  assert(cachedWrong.html().includes('教师登录'));
  assert.equal(cachedWrong.storage.size,0);
  const unavailable=boot('?role=teacher',{statusUnavailable:true}); await tick();
  assert(unavailable.document.getElementById('course-login'),'Status errors preserve the login form');
  assert(unavailable.document.getElementById('course-notice').textContent.includes('暂时无法查询'));
  console.log('[OK] Role selection, separate login forms, teacher-only setup, setup completion, real handler login/logout, mismatch rejection, first password change, cached roles and unavailable status');
})().catch(error=>{console.error(error);process.exitCode=1;});
