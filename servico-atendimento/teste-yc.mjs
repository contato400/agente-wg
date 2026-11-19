// Teste do envio pela YCloud: lê pelo webhook da Meta, envia pela YCloud, sem depender de sinal do ManyChat.
import w from './worker.js';
const kv=new Map(); const env={WG:{get:async k=>kv.get(k)??null,put:async(k,v)=>kv.set(k,v),delete:async k=>kv.delete(k)},
 VERIFY_TOKEN:'v',APP_SECRET:'s',WA_TOKEN:'t',YC_KEY:'yc',MC_TOKEN:'mc',YC_FROM:'+5531973346056',ANTHROPIC_API_KEY:'a',PHONE_ID:'1',WABA_ID:'2',MODO:'teste',TESTE_FONES:'553190000000',ADMIN_FONE:'5531999999999'};
const yc=[], outros=[];
globalThis.fetch=async(u,o)=>{ u=String(u);
 if(u.includes('anthropic')) return {ok:true,json:async()=>({content:[{type:'text',text:'Shalom, tudo bem?'}]})};
 if(u.includes('ycloud')){yc.push({u,h:o.headers,b:JSON.parse(o.body)}); return {ok:true,text:async()=>'{"status":"accepted"}'};}
 outros.push(u); return {ok:true,json:async()=>({}),text:async()=>''};};
const st=globalThis.setTimeout; globalThis.setTimeout=f=>st(f,1);
async function sig(b){const k=await crypto.subtle.importKey('raw',new TextEncoder().encode('s'),{name:'HMAC',hash:'SHA-256'},false,['sign']);return 'sha256='+[...new Uint8Array(await crypto.subtle.sign('HMAC',k,new TextEncoder().encode(b)))].map(x=>x.toString(16).padStart(2,'0')).join('');}
const body=JSON.stringify({entry:[{changes:[{field:'messages',value:{metadata:{display_phone_number:'5531973346056'},contacts:[{wa_id:'553190000000',profile:{name:'Joao'}}],messages:[{from:'553190000000',id:'y1',type:'text',text:{body:'oi'}}]}}]}]});
const p=[]; await w.fetch(new Request('https://x/webhook',{method:'POST',body,headers:{'x-hub-signature-256':await sig(body)}}),env,{waitUntil:x=>p.push(x)}); await Promise.all(p);
const ok = yc.length===1 && yc[0].u.endsWith('/whatsapp/messages/sendDirectly') && yc[0].h['X-API-Key']==='yc' && yc[0].b.from==='+5531973346056' && yc[0].b.to==='+553190000000' && yc[0].b.text.body==='Shalom, tudo bem?' && !outros.some(u=>u.includes('manychat')||u.includes('/messages'));
console.log(ok?'OK':'FALHOU', JSON.stringify({yc,outros})); process.exit(ok?0:1);
