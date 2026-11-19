// Teste da leitura pela YCloud (POST /yc): assinatura, filtro de número, envio pela YCloud, eco humano, e Meta de outro número ignorada.
import w from './worker.js';
const kv=new Map(); const env={WG:{get:async k=>kv.get(k)??null,put:async(k,v)=>kv.set(k,v),delete:async k=>kv.delete(k),list:async({prefix})=>({keys:[...kv.keys()].filter(k=>k.startsWith(prefix)).map(name=>({name}))})},
 VERIFY_TOKEN:'v',APP_SECRET:'s',WA_TOKEN:'t',YC_KEY:'yc',YC_WEBHOOK_SECRET:'whsec',YC_FROM:'+553193294274',ANTHROPIC_API_KEY:'a',MODO:'teste',TESTE_FONES:'553190000000',ADMIN_FONE:'5531999999999',AVISO_TOKEN:'av'};
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
await yreq(ent(20,'+5531999999999','+553193294274','#cliente')); const nSim=yc.length;
await yreq(ent(21,'+5531999999999','+553193294274','nao consigo entrar'));
r.push(['#cliente: responde como cliente (com ferramentas)', yc.length===nSim+1 && anth.at(-1).tools.length>0 && kv.has('hist:sim5531999999999')]);
await yreq(ent(22,'+5531999999999','+553193294274','#chefe')); await yreq(ent(23,'+5531999999999','+553193294274','status'));
r.push(['#chefe: volta ao modo chefe (ficha do chefe, ferramentas da equipe, data e hora)', anth.at(-1).tools.some(t=>t.name==='perguntar_agente') && anth.at(-1).system[1].text.includes('agente Chefe') && anth.at(-1).system[2].text.includes('AGORA:') && anth.at(-1).model.includes('fable')]);
await yreq(ent(24,'+5531999999999','+553193294274','#Financeiro')); await yreq(ent(25,'+5531999999999','+553193294274','quanto vendeu?'));
r.push(['#financeiro: fala só com o financeiro, histórico próprio', anth.at(-1).system[1].text.includes('agente Financeiro') && kv.has('hist:ag:financeiro-wg:5531999999999') && yc.at(-2).text.body.includes('Falando com Financeiro')]);
r.push(['cliente também vê data e hora', anth.find(a=>a.system.length===2).system[1].text.includes('AGORA:')]);
const av=async(path,metodo,corpo,tk='av')=>{const res=await w.fetch(new Request('https://x'+path,{method:metodo,body:corpo?JSON.stringify(corpo):undefined,headers:{authorization:'Bearer '+tk}}),env,{waitUntil:()=>{}});return res;};
r.push(['/avisar sem chave = 403', (await av('/avisar','POST',{de:'financeiro',texto:'oi chefe'},'x')).status===403]);
const n0=yc.length; const ra=await av('/avisar','POST',{de:'jurídico',texto:'Preciso da sua aprovação no item 3.'});
r.push(['/avisar manda ao Victor com o nome do agente', ra.status===200 && yc.length===n0+1 && yc.at(-1).to==='+5531999999999' && yc.at(-1).text.body.startsWith('[Jurídico]') && kv.has('hist:ag:juridico-wg:5531999999999')]);
r.push(['/equipe atualiza a memória', (await av('/equipe','POST',{memoria:'x'.repeat(60)})).status===200 && kv.get('equipe:memoria').length===60]);
const yp=yc.length; const rp=await av('/perguntar','POST',{agente:'financeiro',pergunta:'como esta o mes?'});const jp=await rp.json();
r.push(['/perguntar (Jarvis) responde como o agente, sem mandar WhatsApp', rp.status===200 && jp.agente==='Financeiro' && jp.resposta.length>0 && yc.length===yp && anth.at(-1).system[1].text.includes('agente Financeiro') && JSON.stringify(anth.at(-1).messages).includes('pelo Jarvis')]);
r.push(['/perguntar sem chave = 403', (await av('/perguntar','POST',{agente:'chefe',pergunta:'oi'},'x')).status===403]);
kv.set('recado:1',JSON.stringify({para:'rotina',recado:'teste'}));
const rr=await (await av('/recados?limpar=1','GET')).json();
r.push(['/recados devolve e limpa', rr.length===1 && !kv.has('recado:1')]);
const antes=yc.length; await yreq({type:'whatsapp.inbound_message.received',whatsappInboundMessage:{wamid:'wamid.dup',from:'+5531999999999',to:'+553193294274',type:'text',text:{body:'Oi'}}});
r.push(['inbound_message.received ignorado (evita duplicar)', yc.length===antes]);
for(const [n,ok] of r) console.log(ok?'OK    ':'FALHOU', n);
process.exit(r.every(x=>x[1])?0:1);
