// Teste do envio pelo ManyChat e da trava de escopo (nao_responder).
import w from './worker.js';
const kv=new Map(); const env={WG:{get:async k=>kv.get(k)??null,put:async(k,v)=>kv.set(k,v),delete:async k=>kv.delete(k)},
 VERIFY_TOKEN:'v',APP_SECRET:'s',WA_TOKEN:'t',MC_TOKEN:'mc',ANTHROPIC_API_KEY:'a',PHONE_ID:'1',WABA_ID:'2',MODO:'teste',TESTE_FONES:'553190000000',ADMIN_FONE:'5531999999999'};
const mc=[], meta=[], buscas=[];
globalThis.fetch=async(u,o)=>{ u=String(u);
 if(u.includes('anthropic')){const s=JSON.stringify(JSON.parse(o.body).messages.at(-1));
   if(s.includes('kairos')&&!s.includes('tool_result')) return {ok:true,json:async()=>({content:[{type:'tool_use',id:'k',name:'nao_responder',input:{assunto:'Kairós'}}]})};
   return {ok:true,json:async()=>({content:[{type:'text',text:'Shalom, tudo bem?'}]})};}
 if(u.includes('findBySystemField')){buscas.push(u.split('?')[1]); const ok=u.includes('whatsapp_phone=%2B5531990000000'); return {ok:true,json:async()=>(ok?{status:'success',data:{id:'777'}}:{status:'success',data:[]})};}
 if(u.includes('sendContent')){mc.push(JSON.parse(o.body)); return {ok:true,text:async()=>'{"status":"success"}'};}
 meta.push(u); return {ok:true,json:async()=>({}),text:async()=>''};};
const st=globalThis.setTimeout; globalThis.setTimeout=f=>st(f,1);
async function sig(b){const k=await crypto.subtle.importKey('raw',new TextEncoder().encode('s'),{name:'HMAC',hash:'SHA-256'},false,['sign']);return 'sha256='+[...new Uint8Array(await crypto.subtle.sign('HMAC',k,new TextEncoder().encode(b)))].map(x=>x.toString(16).padStart(2,'0')).join('');}
async function msg(from,txt,id){const body=JSON.stringify({entry:[{changes:[{field:'messages',value:{metadata:{phone_number_id:'1'},contacts:[{wa_id:from,profile:{name:'Joao'}}],messages:[{from,id,type:'text',text:{body:txt}}]}}]}]});
 const p=[]; await w.fetch(new Request('https://x/webhook',{method:'POST',body,headers:{'x-hub-signature-256':await sig(body)}}),env,{waitUntil:x=>p.push(x)}); await Promise.all(p);}
await msg('553190000000','oi quero o curso','a1');                 // chega sem o 9, ManyChat tem com o 9
await msg('553190000000','sobre a mentoria kairos de amanha','a2'); // fora do escopo
const ok = mc.length===1 && mc[0].subscriber_id==='777' && mc[0].data.content.type==='whatsapp' && mc[0].data.content.messages[0].text==='Shalom, tudo bem?'
  && !meta.some(u=>u.includes('/messages')) && kv.get('mc:553190000000')==='777' && [...kv.keys()].some(k=>k.startsWith('fora:'));
console.log(ok?'OK':'FALHOU', JSON.stringify({mc, buscas:buscas.length, meta}));
process.exit(ok?0:1);
