// Automatic playback controller checks; simulated media does not verify decoding.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(__dirname + '/mascot.js', 'utf8');
const tick = () => new Promise(resolve => setImmediate(resolve));
function boot({reduced=false, blocked=false, saved=false} = {}) {
  function node() { return {hidden:false, attrs:{}, events:{}, textContent:'',
    setAttribute(k,v) {this.attrs[k]=v;}, addEventListener(k,fn) {this.events[k]=fn;},
    focus() {this.focused=true;} }; }
  const video=node(), expanded=node(), restore=node(), toggle=node(), minimize=node(), fallback=node();
  let plays=0, pauses=0, root=null;
  video.paused=true;
  video.play=async()=>{plays++;if(blocked)throw Error('blocked autoplay');video.paused=false;};
  video.pause=()=>{pauses++;video.paused=true;};
  const selectors={'video':video,'.mascot-expanded':expanded,'[data-mascot="restore"]':restore,
    '[data-mascot="play"]':toggle,'[data-mascot="minimize"]':minimize,'.mascot-fallback':fallback};
  const storage=new Map(saved?[['zhihu.mascot.minimized','1']]:[]);
  const motion={matches:reduced,addEventListener(type,fn){this.change=fn;}};
  const document={hidden:false,currentScript:{src:'http://localhost/mascot.abc123.js'},events:{},
    body:{appendChild(n){root=n;}}, getElementById:()=>root,
    createElement:()=>({...node(),querySelector:key=>selectors[key]}),
    addEventListener(k,fn){this.events[k]=fn;}};
  const window={events:{},matchMedia:()=>motion,location:{href:'http://localhost/index.html'},
    addEventListener(k,fn){this.events[k]=fn;}};
  const context={document,window,
    sessionStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},URL,console};
  vm.runInNewContext(source,context);
  return {video,expanded,restore,toggle,minimize,fallback,motion,document,storage,window,
    unblock(){blocked=false;},get markup(){return root.innerHTML;},
    runAgain(){vm.runInNewContext(source,context);},get plays(){return plays;},get pauses(){return pauses;}};
}
(async()=>{
  const a=boot();await tick();assert.equal(a.plays,1);assert.equal(a.video.muted,true);
  assert.equal(a.video.src,'http://localhost/zhihu-mascot.mp4');
  assert(a.video.autoplay && a.video.loop && a.video.playsInline);assert.equal(a.video.controls,false);
  assert(!a.markup.includes('data-mascot="play"'),'No playback button');
  a.document.events.pointerdown();await tick();assert.equal(a.plays,1,'Do not restart playing video');
  a.document.hidden=true;a.document.events.visibilitychange();assert(a.video.paused);
  a.document.hidden=false;a.document.events.visibilitychange();await tick();assert.equal(a.plays,2);
  a.minimize.events.click();await tick();assert(a.expanded.hidden && !a.restore.hidden);
  assert.equal(a.restore.attrs['aria-expanded'],'false');assert(a.restore.focused);assert.equal(a.storage.get('zhihu.mascot.minimized'),'1');
  const paused=a.plays;a.document.events.visibilitychange();await tick();assert.equal(a.plays,paused);
  a.restore.events.click();await tick();assert(!a.expanded.hidden && a.restore.hidden);assert(a.minimize.focused);
  a.runAgain();assert.equal(a.plays,paused+1,'Duplicate script does not create or play a second mascot');
  const b=boot({reduced:true});await tick();assert.equal(b.plays,1,'Explicit request uses continuous animation');
  const c=boot({blocked:true});await tick();assert.equal(c.plays,1);
  c.video.events.canplay();await tick();assert.equal(c.plays,2,'Readiness automatically retries');
  c.unblock();c.document.events.pointerdown();await tick();assert.equal(c.plays,3);assert(!c.video.paused);
  c.video.events.error();await tick();assert(c.video.hidden && !c.fallback.hidden);
  c.document.events.keydown();await tick();assert.equal(c.plays,3,'Failed media does not retry endlessly');
  const d=boot({saved:true});await tick();assert.equal(d.plays,0);assert(d.expanded.hidden && !d.restore.hidden);
  d.restore.events.click();await tick();assert.equal(d.plays,1);
  a.video.paused=true;a.window.events.pageshow();await tick();assert.equal(a.plays,paused+2);
  console.log('[OK] Automatic muted loop, no playback controls, background/pageshow resume, minimize/restore, autoplay recovery, media failure and saved state');
})().catch(error=>{console.error(error);process.exitCode=1;});
