// Tira as telas reais do guia num celular (390x620, dpr 2) e guarda onde tocar.
const {chromium}=require('playwright');const W=process.argv[2];
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:390,height:620},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await c.newPage();
const taps={};async function box(sel){const r=await p.locator(sel).first().boundingBox();return r?{x:(r.x+r.width/2)/390,y:(r.y+r.height/2)/620}:null}
async function shot(n){await p.waitForTimeout(250);await p.screenshot({path:`${W}/${n}.png`})}
await p.goto('file://'+W+'/g.html');await p.evaluate(()=>localStorage.clear());await p.reload();
await shot('start_top');await p.evaluate(()=>document.getElementById('b-go').scrollIntoView({block:'center'}));taps.start=await box('#b-go');await shot('start');
await p.click('#b-go');taps.q1=await box('.opt:has-text("Me defender")');await shot('q1');
await p.click('.opt:has-text("Me defender")');taps.q2=await box('.opt:has-text("3 dias")');await shot('q2');
await p.click('.opt:has-text("3 dias")');taps.q3=await box('.opt:has-text("Sozinho")');await shot('q3');
await p.click('.opt:has-text("Sozinho")');await p.evaluate(()=>scrollTo(0,0));taps.plan=await box('#t-open');await shot('plan');
await p.evaluate(()=>document.getElementById('t-done').scrollIntoView({block:'center'}));taps.done=await box('#t-done');await shot('pre_done');
await p.click('#t-done');await p.evaluate(()=>document.getElementById('t-card').scrollIntoView({block:'start'}));await shot('done');await p.waitForTimeout(2600);
await p.evaluate(()=>{const h=[...document.querySelectorAll('#v-plan h2')][1];window.scrollTo(0,h.getBoundingClientRect().top+scrollY-10)});await shot('weeks');
await p.evaluate(()=>{const h=[...document.querySelectorAll('#v-plan h2')][0];window.scrollTo(0,h.getBoundingClientRect().top+scrollY-10)});await shot('gains');
await p.evaluate(()=>{const c=[...document.querySelectorAll('#v-plan .card')].find(x=>/Perdeu um dia/.test(x.textContent));window.scrollTo(0,c.getBoundingClientRect().top+scrollY-120)});await shot('perdeu');
require('fs').writeFileSync(W+'/taps.json',JSON.stringify(taps));await b.close()})();
