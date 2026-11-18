import w from './worker.js';
const kv=new Map([['conhecimento','BASE']]); const env={WG:{get:async k=>kv.get(k)??null,put:async(k,v)=>kv.set(k,v),delete:async k=>kv.delete(k)},
 VERIFY_TOKEN:'v',APP_SECRET:'s',WA_TOKEN:'t',ANTHROPIC_API_KEY:'a',PHONE_ID:'1',WABA_ID:'2',MODO:'teste',TESTE_FONES:'553190000000',ADMIN_FONE:'5531999999999'};
const enviados=[];
globalThis.fetch=async(u,o)=>{ if(String(u).includes('anthropic')){const b=JSON.parse(o.body); const last=b.messages.at(-1);
  if(JSON.stringify(last).includes('reembolso')&&!JSON.stringify(last).includes('tool_result')) return {ok:true,json:async()=>({content:[{type:'tool_use',id:'x',name:'passar_para_humano',input:{motivo:'reembolso',resumo:'quer reembolso'}}]})};
  return {ok:true,json:async()=>({content:[{type:'text',text:'Shalom, tudo bem?\n\nPosso ajudar — claro.'}]})};}
 if(o&&o.body){const b=JSON.parse(o.body); if(b.type==='text') enviados.push([b.to,b.text.body]);} return {ok:true,json:async()=>({}),text:async()=>''};};
setTimeout.__proto__; const st=globalThis.setTimeout; globalThis.setTimeout=(f)=>st(f,1);
async function sig(body){const k=await crypto.subtle.importKey('raw',new TextEncoder().encode('s'),{name:'HMAC',hash:'SHA-256'},false,['sign']);return 'sha256='+[...new Uint8Array(await crypto.subtle.sign('HMAC',k,new TextEncoder().encode(body)))].map(b=>b.toString(16).padStart(2,'0')).join('');}
async function msg(from,txt,id){const body=JSON.stringify({entry:[{changes:[{field:'messages',value:{contacts:[{wa_id:from,profile:{name:'Joao Silva'}}],messages:[{from,id,type:'text',text:{body:txt}}]}}]}]});
 const p=[]; const r=await w.fetch(new Request('https://x/webhook',{method:'POST',body,headers:{'x-hub-signature-256':await sig(body)}}),env,{waitUntil:x=>p.push(x)}); await Promise.all(p); return r.status;}
console.log('verif', await (await w.fetch(new Request('https://x/webhook?hub.mode=subscribe&hub.verify_token=v&hub.challenge=42'),env,{})).text());
console.log(await msg('553190000000','oi quero saber do curso','m1'));
console.log(await msg('5531800000000','numero fora do teste','m2'));
console.log(await msg('553190000000','quero reembolso','m3'));
console.log(await msg('553190000000','oi de novo','m4'));
const bad=await w.fetch(new Request('https://x/webhook',{method:'POST',body:'{}',headers:{'x-hub-signature-256':'sha256=00'}}),env,{waitUntil(){}}); console.log('assin ruim',bad.status);
console.log(JSON.stringify(enviados,null,0));
