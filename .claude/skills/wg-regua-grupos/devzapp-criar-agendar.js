const J=JSON.parse(localStorage.__jobs)[IDX];const w=ms=>new Promise(r=>setTimeout(r,ms));const B=re=>[...document.querySelectorAll('button')].filter(b=>re.test((b.innerText||'').trim()));
for(let i=0;i<15&&!document.querySelector('textarea');i++)await w(700);
const ti=document.querySelector('input[type=text]'),ta=document.querySelector('textarea');
const typ=(el,v)=>{el.focus();document.execCommand('selectAll');document.execCommand('insertText',false,v);['keydown','keyup'].forEach(t=>el.dispatchEvent(new KeyboardEvent(t,{bubbles:true,key:'a',code:'KeyA'})));['input','change','blur'].forEach(t=>el.dispatchEvent(new Event(t,{bubbles:true})));};
typ(ti,J.title);await w(300);typ(ta,J.text);await w(500);
let R='';if(ta.value.replace(/\r/g,'')!==J.text)R='texto difere';
const c=document.querySelectorAll('input[type=checkbox]')[3];if(!R&&!c.checked)c.click();await w(400);if(!R&&!c.checked)R='mencao';
if(!R){B(/^Salvar$/).pop().click();let ag;for(let i=0;i<12&&!ag;i++){await w(700);ag=[...document.querySelectorAll('*')].filter(e=>/^Agendar envio/.test((e.innerText||'').trim())&&/PROGRAMADO/.test(e.innerText)&&!/INSTANT/.test(e.innerText)).pop();}
if(!ag)R='sem agendar';else{ag.click();await w(1500);
const P=()=>[...document.querySelectorAll('.cdk-overlay-pane')].filter(p=>(p.innerText||'').trim().length>20).pop();const PB=re=>[...P().querySelectorAll('button')].find(b=>re.test((b.innerText||'').trim()));
const sv=(el,v)=>{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);['input','change','blur'].forEach(t=>el.dispatchEvent(new Event(t,{bubbles:true})));};
for(let i=0;i<10&&!(P()&&/Configure data/.test(P().innerText));i++)await w(800);
sv(P().querySelector('input[type=date]'),J.date);await w(300);sv(P().querySelector('input[type=time]'),J.time);await w(800);
const ok=(P().innerText.match(/Agendado para\s*\n?\s*([^\n]+)/)||[])[1]||'';
if(!ok.includes(J.date.split('-').reverse().join('/'))||!ok.includes(J.time))R='data: '+ok;else{
PB(/Continuar/).click();for(let i=0;i<10&&!/Selecionar todos os grupos/.test(P().innerText);i++)await w(800);
const al=[...P().querySelectorAll('mat-checkbox,label,div,span')].find(e=>/^Selecionar todos os grupos$/.test((e.innerText||'').trim()));const cb=al.querySelector('input[type=checkbox]')||al.closest('mat-checkbox,label')?.querySelector('input');(cb||al).click();await w(900);
PB(/Continuar/).click();for(let i=0;i<10&&!/Confirme os detalhes/.test(P().innerText);i++)await w(800);
const cf=P().innerText;const ng=(cf.match(/Total de grupos:\s*\n?\s*(\d+ grupos)/)||[])[1];
if(!ng||ng.startsWith('0'))R='grupos?';else{localStorage.__last=J.title+' '+ng;R='ok '+J.title+' '+ng;PB(/Criar agendamento/).click();}}}}
R
