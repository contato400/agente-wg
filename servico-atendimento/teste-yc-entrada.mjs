// Teste da leitura pela YCloud (POST /yc): assinatura, filtro de número, envio pela YCloud, eco humano, e Meta de outro número ignorada.
import w from './worker.js';
const kv=new Map(); const env={WG:{get:async k=>kv.get(k)??null,put:async(k,v)=>kv.set(k,v),delete:async k=>kv.delete(k)},
 VERIFY_TOKEN:'v',APP_SECRET:'s',WA_TOKEN:'t',YC_KEY:'yc',YC_WEBHOOK_SECRET:'whsec',YC_FROM:'+553193294274',ANTHROPIC_API_KEY:'a',MODO:'teste',TESTE_FONES:'553190000000',ADMIN_FONE:'5531999999999'};
const yc=[], anth=[];
globalThis.fetch=async(u,o)=>{ u=String(u);
 if(u.includes('anthropic')){anth.push(JSON.parse(o.body)); return {ok:true,json:async()=>({content:[{type:'text',text:'Shalom, tudo bem?'}]})};}
 if(u.includes('ycloud')){yc.push(JSON.parse(o.body)); return {ok:true,text:async()=>'{"status":"accepted"}'};}
 return {ok:true,json:async()=>({}),text:async()=>''};};
const st=globalThis.setTimeout; globalThis.setTimeout=f=>st(f,1);
const hex=async(seg,txt)=>{const k=await crypto.subtle.importKey('raw',new TextEncoder().encode(seg),{name:'HMAC',hash:'SHA-256'},false,['sign']);return [...new Uint8Array(await crypto.subtle.sign('HMAC',k,new TextEncoder().encode(txt)))].map(x=>x.toString(16).padStart(2,'0')).join('');};
async function yreq(obj,seg='whsec'){const b=JSON.stringify(obj);const t=Math.floor(Date.now()/1000);const p=[];
 const r=await w.fetch(new Request('https://x/yc',{method:'POST',body:b,headers:{'YCloud-Signature':`t=${t},s=${await hex(seg,t+'.'+b)}`}}),env,{waitUntil:x=>p.push(x)});await Promise.all(p);return r.status;}
const ent=(id,from,to,txt)=>({type:'inbox.message.created',inboxMessage:{direction:'inbound',inbound:{id:'x'+id,wamid:'wamid.'+id,from,to,customerProfile:{name:'Joao Silva'},type:'text',text:{body:txt}}}});
const r=[];
r.push(['assinatura errada = 401', await yreq(ent(1,'+553190000000','+553193294274','oi'),'errado')===401 && yc.length===0]);
r.push(['msg de teste responde pela YCloud', await yreq(ent(2,'+553190000000','+553193294274','oi'))===200 && yc.length===1 && yc[0].from==='+553193294274' && yc[0].to==='+553190000000' && anth.at(-1).system[1].text.includes('Joao')]);
r.push(['msg para outro número ignorada', (await yreq(ent(3,'+553190000000','+5531973346056','oi')),yc.length===1)]);
r.push(['fora da lista de teste ignorada', (await yreq(ent(4,'+553188888888','+553193294274','oi')),yc.length===1)]);
await yreq({type:'whatsapp.smb.message.echoes',whatsappMessage:{from:'+553193294274',to:'+553190000000',type:'text',text:{body:'deixa comigo'}}});
r.push(['eco do celular pausa o agente', kv.get('humano:553190000000')==='1' && (await yreq(ent(5,'+553190000000','+553193294274','e ai')),yc.length===1)]);
const sig=async b=>'sha256='+await hex('s',b);
const mb=JSON.stringify({entry:[{changes:[{field:'messages',value:{metadata:{display_phone_number:'5531973346056',phone_number_id:'1'},contacts:[],messages:[{from:'553177777777',id:'m1',type:'text',text:{body:'oi'}}]}}]}]});
env.TESTE_FONES+=',553177777777'; const p=[]; await w.fetch(new Request('https://x/webhook',{method:'POST',body:mb,headers:{'x-hub-signature-256':await sig(mb)}}),env,{waitUntil:x=>p.push(x)}); await Promise.all(p);
r.push(['Meta do 97334-6056 ignorada', yc.length===1]);
r.push(['admin conversa com o chefe', (await yreq(ent(6,'+5531999999999','+553193294274','status')),yc.length===2 && yc[1].to==='+5531999999999')]);
await yreq({type:'inbox.message.created',inboxMessage:{direction:'inbound',inbound:{wamid:'wamid.i7',from:'+5531999999999',to:'+553193294274',customerProfile:{name:'Victor'},type:'text',text:{body:'Oi'}}}});
r.push(['inbox.message.created responde', yc.length===3]);
await yreq({type:'inbox.message.created',inboxMessage:{direction:'inbound',inbound:{wamid:'wamid.i7',from:'+5531999999999',to:'+553193294274',type:'text',text:{body:'Oi'}}}});
await yreq({type:'inbox.message.created',inboxMessage:{direction:'outbound',outbound:{from:'+553193294274',to:'+5531999999999'}}});
r.push(['repetido e saída ignorados', yc.length===3 && !kv.get('humano:5531999999999')]);
const antes=yc.length; await yreq({type:'whatsapp.inbound_message.received',whatsappInboundMessage:{wamid:'wamid.dup',from:'+5531999999999',to:'+553193294274',type:'text',text:{body:'Oi'}}});
r.push(['inbound_message.received ignorado (evita duplicar)', yc.length===antes]);
for(const [n,ok] of r) console.log(ok?'OK    ':'FALHOU', n);
process.exit(r.every(x=>x[1])?0:1);
