/* Course identity, dashboards and bridge to the existing training application. */
(function () {
  'use strict';
  const API = window.__AGENT_API__ || 'https://pretty-camel-d2g0oe3e03341c0a4-1521569590.ap-shanghai.app.tcloudbase.com/api/agent';
  const host = document.getElementById('classroom-app');
  const query = new URLSearchParams(window.location.search);
  const active = query.has('course_task');
  let entryRole = ['student','teacher'].includes(query.get('role')) ? query.get('role') : null;
  const majors = {clinical_medicine:'临床医学',nursing:'护理学',medical_technology:'医学技术',traditional_chinese_medicine:'中医学',rehabilitation:'康复治疗',health_management:'健康服务与管理',other:'其他'};
  const statuses = {training:'训练中',pending:'待复核',draft:'复核草稿',published:'已发布'};
  let token = '', user = null, runId = null, data = null, currentTab = 'overview', classFilter = '';
  try { token = sessionStorage.getItem('zhihu.course.token') || ''; user = JSON.parse(sessionStorage.getItem('zhihu.course.user') || 'null'); } catch (_) {}
  function esc(value) {
    return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#39;");
  }
  function remember() {
    try {
      if (token) { sessionStorage.setItem('zhihu.course.token', token); sessionStorage.setItem('zhihu.course.user', JSON.stringify(user)); }
      else { sessionStorage.removeItem('zhihu.course.token'); sessionStorage.removeItem('zhihu.course.user'); }
    } catch (_) {}
  }
  async function api(operation, payload) {
    const response = await fetch(API, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'classroom',operation,payload:payload || {},token:token || null})});
    const result = await response.json();
    if (!response.ok || result.status !== 'ok') {
      const error = new Error(result.message || '课程服务暂时不可用，请稍后重试');
      error.code = result.error; throw error;
    }
    return result;
  }
  function notice(message, success) {
    const target = document.getElementById('course-notice');
    if (target) { target.className = 'course-alert' + (success ? ' course-success' : ''); target.textContent = message; target.hidden = false; target.scrollIntoView({block:'nearest'}); }
  }
  function bindForm(id, operation) {
    const form = document.getElementById(id);
    if (!form) return;
    form.onsubmit = async event => {
      event.preventDefault();
      const button = event.submitter || form.querySelector('button[type="submit"]');
      button.disabled = true;
      try { await operation(Object.fromEntries(new FormData(form))); }
      catch (error) { notice(error.message); }
      finally { button.disabled = false; }
    };
  }
  function actionButtons() {
    host.querySelectorAll('[data-action]').forEach(button => button.onclick = async () => {
      button.disabled = true;
      try {
        const operation = button.dataset.action, id = button.dataset.id;
        if (operation === 'tab') { currentTab = id; render(); }
        else if (operation === 'refresh') await load();
        else if (operation === 'logout') { await api('logout'); token=''; user=null; entryRole=null; currentTab='overview'; classFilter=''; remember(); await loginView(); }
        else if (operation === 'detail') await detail(id);
        else if (operation === 'back') render();
        else if (operation === 'password') passwordView(false);
        else if (operation === 'xlsx') download(await api('export', {format:'xlsx',class_name:classFilter}));
        else if (operation === 'pdf') download(await api('export', {format:'pdf',run_id:id}));
        else if (operation === 'reset') {
          const result = await api('reset_password',{user_id:id});
          notice('账号 ' + result.username + ' 的临时密码：' + result.password + '。请妥善交付，首次登录须修改。',true);
        } else if (operation === 'active') {
          await api('set_user_active',{user_id:id,active:button.dataset.active === '1'}); await load();
        } else if (operation === 'task-active') {
          await api('set_task_active',{task_id:id,active:button.dataset.active === '1'}); await load();
        }
      } catch (error) { notice(error.message); }
      finally { button.disabled = false; }
    });
  }
  function download(result) {
    const raw = Uint8Array.from(atob(result.file), c => c.charCodeAt(0));
    const url = URL.createObjectURL(new Blob([raw],{type:result.mime}));
    const link = document.createElement('a'); link.href=url; link.download=result.filename; link.click();
    setTimeout(() => URL.revokeObjectURL(url),1000);
  }
  function field(label, name, type, value) {
    return '<label>' + label + '<input name="' + name + '" type="' + (type || 'text') + '" value="' + esc(value || '') + '" required' + (type === 'password' ? ' minlength="10" maxlength="128" autocomplete="new-password"' : '') + '></label>';
  }
  function authLayout(content) {
    document.body?.classList?.add('course-auth-page');
    return '<div class="auth-shell"><aside class="auth-brand-panel" aria-label="知护，专业学习与实践">' +
      '<a class="auth-brand" href="index.html"><img src="care-brand.svg" alt=""><span>知护<small>ZHIHU CARE</small></span></a>' +
      '<div class="auth-brand-copy"><p>AI HEALTH LEARNING</p><h2>让专业学习与<br>实践能力<br>相互连接。</h2><div>Learn with Intelligence.<br>Grow with Practice.</div></div>' +
      '<img class="auth-architecture" src="care-architecture.svg" alt=""></aside><div class="auth-form-panel"><a class="auth-free-entry" href="index.html">自由学习入口 ↗</a>' + content + '<footer class="auth-footer">知护 · 让每一次练习都有收获</footer></div></div>';
  }
  async function loginView(role = entryRole) {
    entryRole = ['student','teacher'].includes(role) ? role : null;
    if (!entryRole) {
      document.body?.classList?.remove('course-auth-page');
      host.innerHTML = '<section class="course-card course-entry"><span class="course-tag">课程教学 · 师生专属</span><h1>请选择你的身份</h1><p class="muted">选择对应入口，登录你的课程空间。</p><div class="course-role-grid">' +
        '<a class="course-role-card" href="classroom.html?role=student"><span class="course-tag">学习与训练</span><h2>学生入口</h2><p>完成课程任务、开展答题与病例训练，查看个人进度、成绩和教师反馈。</p><span class="course-role-link">进入学生登录 →</span></a>' +
        '<a class="course-role-card" href="classroom.html?role=teacher"><span class="course-tag">教学与管理</span><h2>教师入口</h2><p>管理班级账号、布置训练任务，查看学习进度并复核成绩；首次使用可开通课程。</p><span class="course-role-link">进入教师登录 →</span></a>' +
        '</div><p class="course-help">学生账号由课程教师分配；请选择与账号身份相符的入口。</p></section>';
      return;
    }
    const isTeacher = entryRole === 'teacher';
    host.innerHTML = authLayout('<section class="course-card course-auth"><a class="course-entry-back" href="classroom.html">← 重新选择身份</a><span class="course-tag">' + (isTeacher ? '教师入口' : '学生入口') + '</span><h1>' + (isTeacher ? '教师登录' : '学生登录') + '</h1><p class="muted">' +
      (isTeacher ? '登录后管理课程、布置训练任务与复核学生成绩。' : '使用教师分配的课程代码和学号登录，继续训练并查看教师反馈。') + '</p><div id="course-notice" hidden></div><form id="course-login">' +
      field('课程代码','course_code','text') + field(isTeacher ? '教师账号' : '学号 / 学生账号','username','text') + field('密码','password','password').replace('autocomplete="new-password"','autocomplete="current-password"') + '<button type="submit">' + (isTeacher ? '登录教师端' : '登录学生端') + '</button></form>' +
      '<p class="muted">' + (isTeacher ? '你是学生？<a href="classroom.html?role=student">切换到学生登录</a>' : '你是教师？<a href="classroom.html?role=teacher">切换到教师登录</a>') + '</p>' +
      (isTeacher ? '<div id="course-setup-area"></div>' : '<p class="course-help">还没有账号？请联系任课教师获取课程代码、学号及初始密码。</p>') + '</section>');
    bindForm('course-login', async values => {
      const result = await api('login',{...values,entry_role:entryRole});
      if (!result.user || result.user.role !== entryRole) throw new Error('该账号与所选入口不符，请切换到对应身份入口登录。');
      token=result.token; user=result.user; currentTab='overview'; classFilter=''; remember();
      if (user.must_change) passwordView(true); else await load();
    });
    if (!isTeacher) return;
    // 开通状态失败时保留教师登录表单，避免将服务错误变成整页无法登录。
    try {
      const status = await api('status');
      const target = document.getElementById('course-setup-area');
      if (!target || entryRole !== 'teacher') return;
      if (status.setup_required) target.innerHTML = '<details class="course-setup"><summary>首次开通课程 <span aria-hidden="true">＋</span></summary><p class="muted">设置课程及首位教师账号。每个课程最多配置400个学生账号。</p><form id="course-setup">' +
        field('课程名称','name','text') + field('课程代码（字母、数字、下划线或连字符）','code','text') + field('教师姓名','teacher_name','text') + field('教师账号','username','text') + field('初始密码（至少10位）','password','password') +
        (status.setup_key_required ? field('开通密钥','setup_key','password') : '') + '<button type="submit">开通课程</button></form></details>';
      bindForm('course-setup', async values => {
        await api('setup',values); await loginView('teacher'); notice('课程已开通，请使用刚设置的教师账号登录。',true);
      });
    } catch (error) { notice('暂时无法查询课程开通状态，可重试登录。' + error.message); }
  }
  function passwordView(required) {
    host.innerHTML = authLayout('<section class="course-card course-auth"><h1>' + (required ? '首次登录 · 修改密码' : '修改登录密码') + '</h1><p class="muted">密码至少10位，修改后其他设备的旧登录将失效。</p><div id="course-notice" hidden></div><form id="course-password">' +
      field('原密码','old_password','password') + field('新密码','password','password') + field('再次输入新密码','confirm','password') + '<button type="submit">保存新密码</button></form>' +
      (!required ? '<p><button class="secondary" data-action="back">返回课程</button></p>' : '') + '</section>');
    bindForm('course-password',async values => {
      if (values.password !== values.confirm) throw new Error('两次输入的新密码不一致');
      await api('change_password',values); user.must_change=0; remember(); await load();
    }); actionButtons();
  }
  async function load() {
    try {
      data = await api('dashboard'); user=data.user;
      if (entryRole && user.role !== entryRole) {
        token=''; user=null; remember(); await loginView();
        notice('当前账号与所选入口不符，请使用对应身份的账号登录。'); return;
      }
      remember(); render();
    }
    catch (error) {
      if (error.code === 'password_change_required') passwordView(true);
      else if (error.code === 'unauthorized') { token=''; user=null; remember(); await loginView(); notice(error.message); }
      else throw error;
    }
  }
  function table(headings, rows) {
    if (!rows.length) return '<div class="course-empty">暂无记录</div>';
    return '<div class="course-table"><table><thead><tr>' + headings.map(h => '<th>' + esc(h) + '</th>').join('') + '</tr></thead><tbody>' +
      rows.map(row => '<tr>' + row.map(cell => '<td>' + cell + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
  }
  function btn(label, action, id, extra) { return '<button type="button" class="secondary" data-action="' + action + '" data-id="' + esc(id || '') + '" ' + (extra || '') + '>' + label + '</button>'; }
  function render() {
    document.body?.classList?.remove('course-auth-page');
    const isTeacher = user.role === 'teacher';
    const students = data.users.filter(u => u.role === 'student');
    const options = [...new Set(students.map(u => u.class_name))].sort();
    const chosen = id => data.users.find(u => u.id === id) || {};
    const taskName = id => (data.tasks.find(t => t.id === id) || {}).title || '';
    host.innerHTML = '<div class="course-subtitle"><div><span class="course-tag">' + (isTeacher ? '教师端' : '学生端') + ' · ' + esc(data.course.code) + '</span><h1>' + esc(data.course.name) + '</h1><p class="muted">' + esc(user.name) + '，欢迎回来。课程记录已按账号保存。</p></div><div class="course-actions">' +
      btn('刷新','refresh') + btn('修改密码','password') + btn('退出登录','logout') + '</div></div><div id="course-notice" hidden></div>' +
      '<div class="course-grid"><section class="course-card"><small>学生账号</small><div class="course-metric">' + (isTeacher ? students.length + ' / ' + data.course.capacity : '个人课程') + '</div></section><section class="course-card"><small>有效训练任务</small><div class="course-metric">' + data.tasks.filter(t => t.active).length + '</div></section><section class="course-card"><small>待教师复核</small><div class="course-metric">' + data.runs.filter(r => r.state === 'pending' || r.state === 'draft').length + '</div></section></div>' +
      '<nav class="course-tabs">' + [['overview',isTeacher?'班级进度':'我的进度'],['tasks','训练任务'],['runs',isTeacher?'成绩与复核':'我的成绩']].concat(isTeacher?[['accounts','账号管理'],['settings','课程设置']]:[]).map(t => '<button type="button" data-action="tab" data-id="' + t[0] + '" aria-current="' + (currentTab===t[0]?'page':'false') + '">' + t[1] + '</button>').join('') + '</nav>' +
      '<section class="course-card"><div id="course-content"></div></section>';
    const target = document.getElementById('course-content');
    const filter = isTeacher ? '<label>班级筛选<select id="course-filter"><option value="">全部班级</option>' + options.map(c => '<option value="' + esc(c) + '"' + (classFilter===c?' selected':'') + '>' + esc(c || '未分班') + '</option>').join('') + '</select></label>' : '';
    if (currentTab === 'overview') {
      target.innerHTML = '<h2>' + (isTeacher?'班级训练进度':'我的训练进度') + '</h2>' + filter + '<p class="course-help">完成率按有效任务要求的训练次数计算；重复练习最多计入该任务要求次数。没有任务时不计算完成率。</p>' +
        table(['班级','学号','姓名','训练进度','完成率','最近训练','待复核'], data.progress.filter(p => !classFilter || p.class_name===classFilter).map(p => [esc(p.class_name),esc(p.username),esc(p.name),p.completed+' / '+p.required,
          p.percentage == null ? '未布置任务' : '<progress max="100" value="' + p.percentage + '"></progress> ' + p.percentage + '%',
          p.last_training ? esc(new Date(p.last_training*1000).toLocaleString('zh-CN')) : '尚未开始',p.pending]));
    } else if (currentTab === 'tasks') {
      target.innerHTML = '<h2>课程训练任务</h2>' + table(['任务','班级','专业','类型','要求次数','操作'], data.tasks.map(t => [esc(t.title),esc(t.class_name || '全部班级'),esc(majors[t.major]),t.kind==='quiz'?'答题自测':'病例训练',t.required_count,
        isTeacher ? btn(t.active?'停用任务':'启用任务','task-active',t.id,'data-active="'+(t.active?'0':'1')+'"') : (t.active ? '<a class="button" href="index.html?course_task=' + encodeURIComponent(t.id) + '">开始新一轮训练</a>' : '任务已停用')])) +
        (isTeacher ? '<hr><h2>布置新任务</h2><form id="course-task">' + field('任务名称','title','text') + '<div class="course-grid"><label>班级（留空为全部班级）<input name="class_name"></label><label>专业<select name="major">' + Object.entries(majors).map(m => '<option value="'+m[0]+'">'+m[1]+'</option>').join('') + '</select></label><label>任务类型<select name="kind"><option value="quiz">答题自测</option><option value="case">病例训练</option></select></label><label>要求完成次数<input type="number" min="1" max="100" name="required_count" value="1" required></label></div><button type="submit">发布训练任务</button></form>' : '');
      bindForm('course-task',async values => { values.required_count=Number(values.required_count); await api('create_task',values); await load(); notice('训练任务已发布。',true); });
    } else if (currentTab === 'runs') {
      const runs = data.runs.filter(r => !classFilter || chosen(r.user_id).class_name===classFilter);
      target.innerHTML = '<div class="course-subtitle"><h2>训练成绩与报告</h2>' + (isTeacher?btn('导出 Excel 成绩表','xlsx'):'') + '</div>' + filter +
        table(['学生','任务','类型','程序原分','最终成绩','状态','成绩版本','操作'], runs.map(r => [esc(chosen(r.user_id).name),esc(taskName(r.task_id)),r.kind==='quiz'?'答题':'病例',esc(r.original_score ?? '—'),esc(r.final_score ?? '待发布'),'<span class="course-tag">'+esc(statuses[r.state])+'</span>',r.version,btn(isTeacher?'查看 / 复核':'查看报告','detail',r.id)]));
    } else if (currentTab === 'accounts' && isTeacher) {
      target.innerHTML = '<h2>师生账号管理</h2><p class="muted">学生名额按在册人数核定，当前上限400个；停用账号保留训练记录并占用名额。</p>' + filter +
        table(['账号','姓名','班级','角色','状态','操作'],data.users.filter(u=>!classFilter || u.class_name===classFilter).map(u=>[esc(u.username),esc(u.name),esc(u.class_name),u.role==='teacher'?'教师':'学生',u.active?'正常':'已停用',u.id===user.id?'当前账号':btn('重置密码','reset',u.id)+btn(u.active?'停用':'启用','active',u.id,'data-active="'+(u.active?'0':'1')+'"')])) +
        '<hr><h2>批量导入学生</h2><p class="course-help">从Excel复制三列，按“学号、姓名、班级”粘贴，每行一个学生。可带中文表头。系统生成独立临时密码，仅在导入成功时显示。</p><form id="course-roster"><label>学生名册<textarea name="roster" placeholder="2026001　张同学　一班" required></textarea></label><button type="submit">导入学生账号</button></form><div id="course-credentials"></div>' +
        '<hr><h2>添加本课程教师</h2><form id="course-teacher"><div class="course-grid">' + field('教师账号','username','text') + field('姓名','name','text') + '</div><button type="submit">创建教师账号</button></form>';
      bindForm('course-roster',async values=>{
        let rows=values.roster.trim().split(String.fromCharCode(10)).filter(line=>line.trim()).map(line=>line.trim().split(/[\t,，\u3000 ]+/));
        if (rows[0] && ['学号','账号','username'].includes(rows[0][0])) rows.shift();
        if (rows.some(row=>row.length!==3)) throw new Error('每行应包含学号、姓名、班级三列；含空格的名称请使用制表符分隔');
        const result=await api('import_users',{rows:rows.map(row=>({username:row[0],name:row[1],class_name:row[2]}))});
        await load(); credentials(result.accounts);
      });
      bindForm('course-teacher',async values=>{ const result=await api('add_teacher',{rows:[values]}); await load(); credentials(result.accounts); });
    } else if (currentTab === 'settings' && isTeacher) {
      target.innerHTML='<h2>开设其他课程空间</h2><p class="muted">新课程使用独立课程代码、账号名册和成绩记录。创建后，退出当前账号并用新课程代码登录。</p><form id="course-create">' +
        field('课程名称','name','text') + field('课程代码','code','text') + field('新课程教师初始密码','password','password') + '<button type="submit">创建课程空间</button></form>';
      bindForm('course-create',async values=>{ const result=await api('create_course',values); notice('新课程已创建。课程代码：'+result.course_code+'；教师账号：'+result.credentials.username+'。首次登录请修改初始密码。',true); });
    }
    const select=document.getElementById('course-filter');
    if (select) select.onchange=()=>{classFilter=select.value;render();};
    actionButtons();
  }
  function credentials(accounts) {
    const target=document.getElementById('course-credentials');
    if (!target) return;
    target.innerHTML='<h3>账号已创建 · 请保存临时密码</h3><p class="course-help">本次密码只在当前结果中显示；离开后可通过重置密码重新生成。</p>' +
      table(['账号','姓名','班级','临时密码'],accounts.map(a=>[esc(a.username),esc(a.name),esc(a.class_name),esc(a.password)]));
    const button=document.createElement('button');button.textContent='下载本次账号凭据';button.type='button';
    button.onclick=()=>{
      const lines=[['课程代码','账号','姓名','班级','临时密码']].concat(accounts.map(a=>[data.course.code,a.username,a.name,a.class_name,a.password]));
      const safe=value=>'"'+String(value ?? '').replaceAll('"','""')+'"';
      const csv=String.fromCharCode(0xfeff)+lines.map(row=>row.map(safe).join(',')).join(String.fromCharCode(13,10));
      const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
      const link=document.createElement('a');link.href=url;link.download='course-accounts.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    };target.appendChild(button);target.scrollIntoView({block:'nearest'});
  }
  async function detail(id) {
    const result=await api('run_detail',{run_id:id}), run=result.run, snapshot=run.snapshot;
    const isTeacher=user.role==='teacher', score=snapshot.score || {}, person=data.users.find(u=>u.id===run.user_id)||{};
    host.innerHTML='<div class="course-subtitle"><h1>'+(isTeacher?'训练复核':'训练报告')+'</h1>'+btn('返回课程','back')+'</div><div id="course-notice" hidden></div><section class="course-card"><h2>'+esc(person.name)+' · '+esc((data.tasks.find(t=>t.id===run.task_id)||{}).title)+'</h2><p>程序原分：<b>'+esc(run.original_score ?? '未完成')+'</b> / 100　最终成绩：<b>'+esc(run.final_score ?? '待教师发布')+'</b>　版本：'+run.version+'</p><p class="course-help">教师调整独立保留，程序原分、红线和封顶记录均可追溯。最终成绩由教师发布后生效。</p>'+
      (run.original_score != null ? btn('下载 PDF 报告','pdf',id) : '<p>学生尚未完成服务端评分。</p>')+
      '<h3>程序评分依据</h3><pre>'+esc(JSON.stringify(score,null,2))+'</pre><h3>训练对话</h3><pre>'+esc((snapshot.dialogue||[]).map(t=>String(t.turn_id)+' '+t.speaker+'：'+t.raw_text).join(String.fromCharCode(10)))+'</pre><h3>教师复核历史</h3>'+
      table(['版本','教师','原成绩','复核成绩','状态','时间','理由'],run.reviews.map(r=>[r.version,esc(r.teacher_name),r.before_score,r.after_score,r.status==='published'?'已发布':'草稿',esc(new Date(r.created*1000).toLocaleString('zh-CN')),esc(r.reason)]))+
      (isTeacher && run.original_score!=null ? '<hr><h2>复核与人工调分</h2><form id="course-review"><label>复核成绩（0至100）<input name="score" type="number" min="0" max="100" step="0.01" value="'+esc(run.reviews.length?run.reviews[run.reviews.length-1].after_score:run.original_score)+'" required></label><label>复核理由 / 教师评语<textarea name="reason" maxlength="2000" required></textarea></label><label>处理方式<select name="status"><option value="draft">保存复核草稿</option><option value="published">发布最终成绩</option></select></label><button type="submit">保存复核结果</button></form>' : '')+'</section>';
    bindForm('course-review',async values=>{await api('review',{...values,score:Number(values.score),run_id:id,version:run.version});data=await api('dashboard');await detail(id);notice('教师复核已保存。',true);});actionButtons();
  }
  const bridge={
    active, kind:null,
    storageKey:()=>user?'zhihu.progress.course.'+user.course_id+'.'+user.id:null,
    ready:async()=>{
      if (!token) throw new Error('请先从课程空间登录学生账号');
      const result=await api('dashboard');
      const task=result.tasks.find(t=>t.id===query.get('course_task') && t.active);
      if (result.user.role!=='student'||!task) throw new Error('该课程任务不可用，请返回课程空间选择任务');
      user=result.user;remember();bridge.kind=task.kind;
      const bar=document.createElement('div');bar.className='notice';bar.innerHTML='<b>课程训练：'+esc(task.title)+'</b> · '+esc(user.name)+'　<a href="classroom.html">返回课程空间查看进度与教师成绩</a>';
      document.querySelector('.shell').prepend(bar);
      const nav=document.getElementById('module-nav');if(nav)nav.hidden=true;
      return task;
    },
    call:async(tool,args)=>{
      const result=await api('training',{tool,args:args||{},run_id:runId,task_id:query.get('course_task')});
      runId=result.run_id;return result.result;
    },
    fail:message=>{
      const target=document.getElementById('app');
      if(target)target.innerHTML='<div class="card"><h2>课程训练需要检查</h2><p>'+esc(message)+'</p><p>请返回课程空间核对已保存的训练与成绩记录，再开始下一轮。</p><a class="btn" href="classroom.html">返回课程空间</a></div>';
    }
  };
  window.ZH_COURSE=bridge;
  if(host)(token?load():loginView()).catch(error=>{host.innerHTML='<div class="course-alert">'+esc(error.message)+'</div>';});
})();
