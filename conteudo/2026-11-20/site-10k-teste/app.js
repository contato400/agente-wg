/* Black Caveira 2026 · página nova (20/11). Pixel, checkout, conferência do aluno, roda, hero e UTM.
   Atenção: a Atomicat apaga trechos "on<letras>=" ao salvar. Não usar textC, ,  etc. */
(function(w,d){if(w.__kmcTrk)return;w.__kmcTrk=1;var PX='4783151578430964',GA='G-XKTNRP8TCK';
if(!w.fbq){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n['vers'+'ion']='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(w,d,'script','https://connect.facebook.net/en_US/fbevents.js');}
fbq('init',PX);fbq('track','PageView');
if(!w.gtag){var g=d.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id='+GA;d.head.appendChild(g);w.dataLayer=w.dataLayer||[];w.gtag=function(){w.dataLayer.push(arguments)};gtag('js',new Date());}
gtag('config',GA);
var nome='Black Caveira 2026',preco=397;
function info(a){var o={content_name:nome,content_type:'product',value:preco,currency:'BRL'};try{var u=a?new URL(a.href):null,off=u?(u.searchParams.get('off')||(/greenn/.test(u.host)?u.pathname.split('/')[1]:null)):null;if(off)o['content_'+'ids']=[off]}catch(e){}return o}
function ga(o){var x={item_name:o.content_name,page_type:'venda',value:o.value,currency:'BRL'};if(o.content_ids)x.item_id=o.content_ids[0];return x}
var v=info(null);fbq('track','ViewContent',v);gtag('event','view_item',ga(v));
var sent=0;d.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('a[href*="pay.hotmart.com"],a[href*="payfast.greenn.com.br"]'):null;if(!a||sent)return;sent=1;var o=info(a);if(/payfast\.greenn\.com\.br\/201654/.test(a.href)){fbq('trackCustom','CliqueCheckout',o)}else{fbq('track','InitiateCheckout',o)}gtag('event','begin_checkout',ga(o))},true);
})(window,document);

(function(){
var $=function(s){return document.querySelector(s)},$$=function(s){return [].slice.call(document.querySelectorAll(s))};
function TX(el,s){el.innerText=s}
var M='https://media.atomicatmedia.net/u/yoRetjn6mOhzXGiNjxTeG9wI7g22/Pictures/mcp/';
/* checkout personalizado da Greenn: oferta da reabertura, checkout 145095 (aluno 145096) e os 3 order bumps */
var NA={o:'7T52i6',ch:'145095'},AL={o:'xv5IgL',ch:'145096'};
var BUMP=[['202271','8DFikc'],['202274','7huZXa'],['201669','FytpCL']];
var HM='https://pay.hotmart.com/H108520217H?off=';
var LINKS={greenn:'https://payfast.greenn.com.br/201654/offer/'+NA.o+'?utm_campaign=black-caveira-2026',hotmart:HM+'1eiqja8o&utm_campaign=black-caveira-2026',zap:'https://wa.me/5531993294274'};
function canon(a){var h=a.getAttribute('href');if(!h||h.indexOf('payfast.greenn.com.br/201654/offer/')<0)return;var u;try{u=new URL(h,location.href)}catch(e){return}
 var m=u.pathname.match(/^\/201654\/offer\/([A-Za-z0-9]+)/);if(!m)return;var g=(m[1]===AL.o||m[1]==='84mVU2')?AL:NA;u.pathname='/201654/offer/'+g.o;
 var n=new URLSearchParams();u.searchParams.forEach(function(v,k){if(!/^(b_id_\d+|b_offer_\d+|ch_id)$/.test(k))n.append(k,v)});n.set('ch_id',g.ch);BUMP.forEach(function(b,i){n.set('b_id_'+(i+1),b[0]);n.set('b_offer_'+(i+1),b[1])});u.search=n.toString();a.setAttribute('href',u.toString())}
$$('[data-link]').forEach(function(a){var l=LINKS[a.dataset.link];if(l){a.href=l;a.target='_blank';a.rel='noopener';canon(a)}});
document.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;if(a)canon(a)},true);

/* conferência do aluno pela ponte (mesma da página atual) */
var PNT='https://script.google.com/macros/s/AKfycbwXbXAveTefObBDrf5sMIVk7AykbgBl9Wc0_Kuh-9sZxIiH8Gg84vwhnxCtrzu43WCWAw/exec';
var LINKAL=/^https:\/\/payfast\.greenn\.com\.br\/201654\/offer\/[A-Za-z0-9]{6}\?/;
var F=$('#bk2alform'),E=$('#bk2alemail'),BT=$('#bk2albtn'),O=$('#bk2alres'),SUP='https://wa.me/5531993294274';
function evA(r){try{if(window.gtag)gtag('event','checagem_aluno',{resultado:r,page_type:'venda'});if(window.fbq)fbq('trackCustom','ChecagemAluno',{resultado:r})}catch(e){}}
function bt(href,txt,cls){return '<a class="btn'+(cls?' '+cls:'')+'" href="'+href+'" target="_blank" rel="noopener">'+txt+'</a>'}
function mostra(k,link){
 var hmA=bt(HM+'1s0ympc7&utm_campaign=black-caveira-2026','Sem limite no cartão? Parcele ➜<small>Cartão ou Pix em até 6x de R$ 68,34, sem travar o limite</small>','hm');
 var hmN=bt(LINKS.hotmart,'Sem limite no cartão? Parcele ➜<small>Cartão ou Pix em até 6x de R$ 78,19, sem travar o limite</small>','hm');
 if(k==='ok')O.innerHTML='<div class="al-box al-ok"><b>✓ Encontramos seu cadastro de Aluno Caveira!</b> Seu preço de aluno é:<div class="al-price">12x de R$ 35,68</div>ou <b>R$ 347 à vista</b>. São os mesmos 23 treinamentos, com 1 ano de acesso. Na compra, use este mesmo e-mail.<div class="botoes" style="margin-top:12px">'+bt(link,'Quero com preço de aluno ➜')+hmA+'</div></div>';
 else if(k==='no')O.innerHTML='<div class="al-box al-no"><b>Não encontramos um cadastro de Aluno Caveira com esse e-mail.</b> Confira se digitou certo. Se você ainda não é aluno, a condição da Black é <b>12x de R$ 40,82</b> ou R$ 397 à vista.<div class="botoes" style="margin-top:12px">'+bt(LINKS.greenn,'Quero meus 23 treinamentos ➜')+hmN+'</div><p class="mini">É aluno e não foi encontrado? Chame o suporte no WhatsApp <a href="'+SUP+'" target="_blank" rel="noopener">(31) 99329-4274</a>.</p></div>';
 else O.innerHTML='<div class="al-box al-er"><b>Não foi possível conferir agora.</b> Isso não quer dizer que você não seja aluno. Fale com o suporte no WhatsApp <a href="'+SUP+'" target="_blank" rel="noopener">(31) 99329-4274</a> ou siga com a condição da Black por R$ 397.<div class="botoes" style="margin-top:12px">'+bt(LINKS.greenn,'Seguir com R$ 397 ➜')+'</div></div>';
 O.querySelectorAll('a[href]').forEach(canon);
}
function libera(){BT.disabled=false;TX(BT,'Ver meu preço de aluno')}
F.addEventListener('submit',function(e){e.preventDefault();var em=(E.value||'').trim().toLowerCase();
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)){O.innerHTML='<div class="al-box al-er">Digite um e-mail válido, por exemplo: maria@gmail.com</div>';E.focus();return}
 var t=(location.search.match(/[?&]alunoteste=(sim|nao|erro)/)||[])[1];if(t){mostra(t==='sim'?'ok':(t==='nao'?'no':'er'),'https://payfast.greenn.com.br/201654/offer/'+AL.o+'?utm_campaign=black-caveira-2026');return}
 BT.disabled=true;TX(BT,'Conferindo...');O.innerHTML='';
 var acabou=0,to=setTimeout(function(){if(acabou)return;acabou=1;libera();mostra('er');evA('tempo')},10000);
 fetch(PNT,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({email:em}),redirect:'follow'}).then(function(r){return r.json()}).then(function(j){if(acabou)return;acabou=1;clearTimeout(to);libera();
  if(j&&j.ok&&j.aluno&&LINKAL.test(j.link||'')){mostra('ok',j.link);evA('aluno')}else if(j&&j.ok&&j.aluno===false){mostra('no');evA('nao_aluno')}else{mostra('er');evA('erro')}
 }).catch(function(){if(acabou)return;acabou=1;clearTimeout(to);libera();mostra('er');evA('erro')});
});

/* prazo, livros e relógio */
var INI=Date.parse('2026-11-20T19:00:00-03:00'),FIMLIV=Date.parse('2026-11-21T00:00:00-03:00'),END=Date.parse('2026-11-23T19:00:00-03:00');
function p2(n){return String(n).padStart(2,'0')}
function relogio(){var now=Date.now(),l=END-now,R=$('#relogio'),A=$('#aviso');
 if(l<=0){TX(R,'A Black Caveira 2026 terminou.');TX(A,'A Black Caveira 2026 terminou.');return}
 var s=Math.floor(l/1000),dd=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),x=s%60;
 R.innerHTML='A condição acaba segunda, 23/11, às 19h. Faltam <b>'+(dd?dd+'d ':'')+p2(h)+':'+p2(m)+':'+p2(x)+'</b>';
 if(now<INI)A.innerHTML='Reabertura da Black Caveira: hoje, sexta 20/11, às 19h. A condição vale <b>até segunda, 23/11, às 19h</b>';
 else if(A.innerHTML.indexOf('reaberta')<0)A.innerHTML='Black Caveira reaberta: a condição vale até <b>segunda, 23/11, às 19h</b> (horário de Brasília)';
 var L=$('#premio-livros');if(L&&now>=FIMLIV&&!L.classList.contains('fim')){L.classList.add('fim');TX(L.querySelector('.tag'),'Prêmio encerrado');TX(L.querySelector('small'),'Valia para pagamentos aprovados até 23h59 de 20/11. Quem garantiu recebe na área do aluno.')}}
relogio();setInterval(relogio,1000);

/* roda dos 23 treinamentos (mesma animação da página atual) */
var TR=[['Família',[['Protocolo Vida Segura','curso_vida_segura-1'],['Defesa Pessoal Kids','curso_kids-2'],['Primeiros Socorros + APH','curso_primeiros_socorros-3'],['Segurança de Comércios','curso_seguranca_comercios-4']]],
['Defesa pessoal',[['Defesa Pessoal Caveira 2.0','curso_dpc2-5'],['Contra Ataque Feminino','curso_contra_ataque_feminino-6'],['Modo Caveira','curso_modo_caveira-7'],['Briga de Rua','curso_briga_rua-8'],['Protocolo MCD','curso_protocolo_mcd-9'],['Jiu Jitsu x Krav Magá para Rua','curso_jiujitsu_kravmaga-10']]],
['Lâminas',[['Defesa Contra Lâminas','curso_defesa_laminas-11'],['Combate com Lâminas','curso_combate_laminas-12'],['Combate com Lâminas 2','curso_combate_laminas2-13']]],
['Golpes e técnica',[['Defesa de Socos','curso_defesa_socos-14'],['Socos 1','curso_socos1-15'],['Socos 2','curso_socos2-16'],['Os Segredos do Armlock','curso_armlock-17'],['Desafio Combate Caveira','curso_desafio_combate-18']]],
['Preparo e mente',[['Desafio 30 Dias','curso_desafio30dias-19'],['Preparação Física Caveira','curso_prep_fisica-20'],['Mentalidade Caveira','curso_mentalidade_caveira-1'],['O Código Caveira','curso_codigo_caveira-2'],['Combo com 7 Seminários','curso_7seminarios-3']]]];
var IT=[];TR.forEach(function(t,k){t[1].forEach(function(c){IT.push({a:c[0],s:M+'AinQ/'+c[1]+'.webp',t:k})})});
var RD=$('#roda');
RD.innerHTML='<div class="kmc-roda" role="img" aria-label="Capas dos 23 treinamentos da Black Caveira 2026"><div class="po-scene"><div class="po-orbit" aria-hidden="true">'+IT.map(function(x){return '<img class="po-card" src="'+x.s+'" alt="" loading="lazy" decoding="async">'}).join('')+'</div></div><div class="kr-mid"><strong>23</strong><span>treinamentos<br>em 5 trilhas</span></div></div><div class="kr-now" aria-hidden="true"><span></span><b></b></div><p class="kr-ask">Toque numa trilha e veja os treinamentos dela:</p><div class="kr-chips" role="group" aria-label="Escolha uma trilha"><button type="button" data-k="-1" class="on" aria-pressed="true">Todas <em>(23)</em></button>'+TR.map(function(t,k){return '<button type="button" data-k="'+k+'" aria-pressed="false"><i>0'+(k+1)+'</i>'+t[0]+' <em>('+t[1].length+')</em></button>'}).join('')+'</div><p class="kr-list" aria-live="polite"></p>';
var box=RD.querySelector('.kmc-roda'),scene=box.querySelector('.po-scene'),cards=[].slice.call(box.querySelectorAll('.po-card')),ns=RD.querySelector('.kr-now span'),nb=RD.querySelector('.kr-now b'),chips=[].slice.call(RD.querySelectorAll('.kr-chips button')),lst=RD.querySelector('.kr-list'),mid=box.querySelector('.kr-mid');
var calm=matchMedia('(prefers-reduced-motion: reduce)').matches,elapsed=0,offset=0,scale=1,last=null,raf=0,playing=!calm,visible=true,anim=0,lf=-1,tm=null;
function pulse(sec){var n=cards.length,beat=Math.max(0,sec)/1.25,fr=beat-Math.floor(beat),t=Math.max(0,(fr-.34)/(1-.34)),e=1+2.2*Math.pow(t-1,3)+1.2*Math.pow(t-1,2);return .0255+(Math.floor(beat)+e)*Math.PI*2/n}
function phase(){return -pulse(elapsed)+offset}
function paint(){var p=phase(),n=cards.length,best=-1,bs=-1;cards.forEach(function(c,i){var ang=i*Math.PI*2/n+p,dist=Math.abs(Math.atan2(Math.sin(ang),Math.cos(ang))),size=Math.max(8,194*(1-dist/Math.PI)),x=489.34+Math.cos(ang)*306.888-size/2,y=605.37+Math.sin(ang)*306.88-size/2;c.style.transform='translate3d('+x+'px,'+y+'px,0) scale('+(size/194)+')';c.style.zIndex=String(Math.round(size*10));if(size>bs){bs=size;best=i}});
 if(best!==lf){lf=best;var it=IT[best];if(it){TX(ns,'Trilha 0'+(it.t+1)+' · '+TR[it.t][0]);TX(nb,it.a)}}}
function fit(){var w=box.clientWidth,h=box.clientHeight;scale=Math.max(.01,Math.min(w/970,h/1202)*1.4);scene.style.transform='translate('+(w-970*scale)/2+'px,'+(h-1202*scale)/2+'px) scale('+scale+')';paint()}
function sched(){if(!raf&&playing&&visible&&!document.hidden)raf=requestAnimationFrame(tick)}
function tick(now){raf=0;if(last!==null&&playing)elapsed+=Math.min((now-last)/1000,.1);last=now;paint();sched()}
function setPlay(v){playing=v&&!calm;last=null;if(!playing){cancelAnimationFrame(raf);raf=0}sched()}
function goTo(i,ms){var step=Math.PI*2/cards.length,cur=phase(),tg=-i*step;tg+=Math.round((cur-tg)/(Math.PI*2))*Math.PI*2;var from=offset,to=offset+(tg-cur);cancelAnimationFrame(anim);if(!ms){offset=to;paint();return}var t0=performance.now();(function run(now){var t=Math.min(1,(now-t0)/ms),e=1+2.2*Math.pow(t-1,3)+1.2*Math.pow(t-1,2);offset=from+(to-from)*e;paint();if(t<1)anim=requestAnimationFrame(run)})(t0)}
function modo(k){clearInterval(tm);tm=null;chips.forEach(function(c){var ativo=+c.getAttribute('data-k')===k;c.classList.toggle('on',ativo);c.setAttribute('aria-pressed',ativo?'true':'false')});
 if(k<0){cards.forEach(function(c){c.classList.remove('kr-dim')});mid.innerHTML='<strong>23</strong><span>treinamentos<br>em 5 trilhas</span>';TX(lst,'');setPlay(true);return}
 var idx=[];IT.forEach(function(x,i){if(x.t===k)idx.push(i)});setPlay(false);cards.forEach(function(c,i){c.classList.toggle('kr-dim',idx.indexOf(i)<0)});
 mid.innerHTML='<strong>'+idx.length+'</strong><span>treinamentos<br>'+TR[k][0]+'</span>';TX(lst,idx.map(function(i){return IT[i].a}).join(' · '));
 var j=0;goTo(idx[0],calm?0:900);if(idx.length>1&&!calm)tm=setInterval(function(){j=(j+1)%idx.length;goTo(idx[j],900)},2200)}
RD.querySelector('.kr-chips').addEventListener('click',function(e){var b=e.target.closest('button');if(b)modo(+b.getAttribute('data-k'))});
new ResizeObserver(fit).observe(box);new IntersectionObserver(function(es){visible=es[0].isIntersecting;last=null;if(!visible){cancelAnimationFrame(raf);raf=0}else sched()}).observe(box);
document.addEventListener('visibilitychange',function(){last=null;sched()});fit();sched();

/* depoimentos */
var DEP=['dep01-4','dep03-6','dep06-9','dep08-11','dep10-13'];
var car=$('#car');car.innerHTML=DEP.map(function(dp,i){return '<img src="'+M+'xkAs/'+dp+'.webp" alt="Mensagem de aluno '+(i+1)+'" loading="lazy" width="720" height="1280">'}).join('');
function passo(){return car.firstElementChild.getBoundingClientRect().width+12}
$('#car-ant').addEventListener('click',function(){car.scrollBy({left:-passo(),behavior:'smooth'})});$('#car-prox').addEventListener('click',function(){car.scrollBy({left:passo(),behavior:'smooth'})});

/* hero com vídeo que avança na rolagem */
var palco=$('#palco'),video=$('#v'),hero=$('#hero'),poster=$('.poster'),anel=$('.anel');
var clamp=function(v,a,b){return Math.min(b,Math.max(a,v))},sm=function(p,e0,e1){var t=clamp((p-e0)/(e1-e0),0,1);return t*t*(3-2*t)};
function rng(seed){var s=seed>>>0;return function(){return (s=(s*1664525+1013904223)>>>0)/4294967296}}
$$('.split').forEach(function(el){var r=rng(+el.dataset.seed||1),txt=el.innerText.trim(),ems=[].slice.call(el.querySelectorAll('.em')).map(function(e){return e.innerText.trim()}),words=txt.split(/ +/),n=words.length;el.setAttribute('aria-label',txt);
 el.innerHTML=words.map(function(wd,i){var em=ems.indexOf(wd)>-1,th=(i/n)*.5+r()*.06,jx=((r()*2-1)*60).toFixed(0);return '<span class="w'+(em?' em':'')+'" aria-hidden="true" style="--th:'+th.toFixed(3)+';--jx:'+jx+'px">'+wd+'</span>'}).join(' ')});
var bands=$$('.band').map(function(el,i,arr){return {el:el,a:+el.dataset.a,b:+el.dataset.b,first:i===0,last:i===arr.length-1,op:-1,k:-1,vis:null}});
var loadK=0,t0=performance.now(),target=0,shown=0,rafId=null,lastTick=0,heroOn=true;
function hp(){var r=hero.getBoundingClientRect(),tot=hero.offsetHeight-innerHeight;return tot>0?clamp(-r.top/tot,0,1):0}
function caps(p){bands.forEach(function(b){var f=Math.min(.02,(b.b-b.a)/3),op=(b.first?1:sm(p,b.a,b.a+f))*(b.last?1:1-sm(p,b.b-f,b.b));if(p<b.a&&!b.first)op=0;if(p>b.b&&!b.last)op=0;var k=clamp((p-b.a)/Math.min(.025,(b.b-b.a)*.35),0,1);if(b.first)k=Math.max(k,loadK);op=Math.round(op*1000)/1000;
 if(Math.abs(op-b.op)>.004){b.op=op;b.el.style.opacity=op}if(Math.abs(k-b.k)>.008||(k===1&&b.k!==1)){b.k=k;b.el.style.setProperty('--k',k.toFixed(3))}var vv=op>.5;if(vv!==b.vis){b.vis=vv;b.el.classList.toggle('on',vv)}})}
(function ramp(now){loadK=clamp((now-t0-250)/900,0,1);caps(target);if(loadK<1)requestAnimationFrame(ramp)})(t0);
function htick(now){var dt=Math.min(100,now-(lastTick||now));lastTick=now;shown+=(target-shown)*(1-Math.pow(1-.16,dt/16.667));if(Math.abs(target-shown)<.0005){shown=target;rafId=null;lastTick=0}else rafId=requestAnimationFrame(htick);seek(shown*(video.duration||0));caps(shown)}
function aoRolar(){target=hp();if(rafId===null&&heroOn)rafId=requestAnimationFrame(htick)}
new IntersectionObserver(function(e){heroOn=e[0].isIntersecting;if(heroOn)aoRolar()}).observe(hero);
var busy=false,pend=null;function seek(t){if(!video.duration||!isFinite(t))return;if(busy){pend=t;return}busy=true;video.currentTime=Math.min(t,video.duration-.04)}
video.addEventListener('seeked',function(){busy=false;if(pend!==null){var t=pend;pend=null;seek(t)}});
video.addEventListener('error',function(){busy=false;pend=null;palco.classList.add('video-failed');video.remove()});
var POSTER=M+'B5Cp/hero-poster-2.jpg',VIDEO=M+'B5Cp/hero-scrub-1.mp4',ini=false;
function initHero(){if(ini)return;ini=true;poster.style.backgroundImage="url('"+POSTER+"')";var img=new Image(),foi=false,go=function(){if(foi)return;foi=true;carregar().catch(falhou)};img.addEventListener('load',go);img.addEventListener('error',go);img.src=POSTER;setTimeout(go,4000)}
async function carregar(){var ctrl=new AbortController(),wd=setTimeout(function(){ctrl.abort()},20000);var res=await fetch(VIDEO,{priority:'low',signal:ctrl.signal});if(!res.ok)throw new Error('http');
 var total=+res.headers.get('Content-Length')||4795690,rd=res.body.getReader(),ch=[],got=0,lt=0;
 for(;;){var x=await rd.read();if(x.done)break;clearTimeout(wd);wd=setTimeout(function(){ctrl.abort()},20000);ch.push(x.value);got+=x.value.length;var fr=Math.min(1,got/total),now=performance.now();if(now-lt>100||fr===1){lt=now;anel.style.setProperty('--ld',Math.round(126*(1-fr)))}}
 clearTimeout(wd);anel.style.setProperty('--ld',0);video.src=URL.createObjectURL(new Blob(ch,{type:'video/mp4'}));video.load();
 video.addEventListener('canplay',function(){seek(hp()*video.duration);palco.classList.add('video-ready')},{once:true})}
function falhou(){palco.classList.add('video-failed');if(anel)anel.style.display='none'}
var GATES=['(max-width: 720px)','(orientation: portrait) and (max-width: 1024px)','(orientation: portrait) and (pointer: coarse)','(orientation: landscape) and (pointer: coarse) and (max-height: 560px)','(prefers-reduced-motion: reduce)'],scrubOn=false;
function liga(){if(scrubOn)return;scrubOn=true;initHero();addEventListener('scroll',aoRolar,{passive:true});bands.forEach(function(b){b.op=-1;b.k=-1});caps(hp());aoRolar()}
function desliga(){if(!scrubOn)return;scrubOn=false;removeEventListener('scroll',aoRolar);if(rafId!==null){cancelAnimationFrame(rafId);rafId=null}}
function modoHero(){if(GATES.some(function(q){return matchMedia(q).matches}))desliga();else liga()}
GATES.forEach(function(q){matchMedia(q).addEventListener('change',modoHero)});

var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});$$('.obs').forEach(function(el){io.observe(el)});

/* lição: segurar para fechar a guarda */
var seg=$('#segure'),secG=$('#guarda'),rot=$('#seg-rot'),gg=0,seg2=false,raf2=null,feito=false,tl=0;
function setG(v){gg=v;seg.style.setProperty('--g',v.toFixed(3))}
function fecha(){feito=true;seg2=false;setG(1);secG.classList.add('aberta');rot.innerHTML='Guarda fechada!<small>Estas são as 3 primeiras aulas</small>'}
function loopG(now){var dt=Math.min(100,now-(tl||now));tl=now;if(seg2)setG(Math.min(1,gg+dt/1300));else setG(Math.max(0,gg-dt/700));if(gg>=1&&!feito)fecha();if((seg2||gg>0)&&!feito){raf2=requestAnimationFrame(loopG)}else{raf2=null;tl=0}}
function comeca(e){if(feito)return;if(e.cancelable)e.preventDefault();if(calm){fecha();return}seg2=true;if(!raf2)raf2=requestAnimationFrame(loopG)}
function solta(){seg2=false;if(!raf2&&!feito)raf2=requestAnimationFrame(loopG)}
seg.addEventListener('pointerdown',comeca);addEventListener('pointerup',solta);seg.addEventListener('pointerleave',solta);seg.addEventListener('pointercancel',solta);
seg.addEventListener('keydown',function(e){if((e.key===' '||e.key==='Enter')&&!e.repeat)comeca(e)});seg.addEventListener('keyup',function(e){if(e.key===' '||e.key==='Enter')solta()});
if(calm){fecha();$$('.obs').forEach(function(el){el.classList.add('in')})}
document.addEventListener('visibilitychange',function(){document.body.classList.toggle('paused',document.hidden)});
modoHero();
})();

/* repasse de UTM para os checkouts (mesmo da página atual) */
(function(w,d){if(w.__kmcUtmvc)return;w.__kmcUtmvc=1;var DOM=/(^|\.)(pay\.hotmart\.com|go\.hotmart\.com|payfast\.greenn\.com\.br|checkout\.payt\.com\.br)$/i;var slug=(location.pathname.replace(/^\/+|\/+$/g,'')||'home').replace(/\//g,'-');var p=new URLSearchParams(location.search);var ad={s:p.get('utm_source'),m:p.get('utm_medium'),c:p.get('utm_campaign'),ct:p.get('utm_content'),t:p.get('utm_term')};var isMeta=/\|\d{12,}/.test([ad.m,ad.c,ad.ct].join(' '))||/^fb[-_ ]/i.test(ad.m||'')||/\[DIOGO\]/i.test(ad.c||'');if(isMeta&&(!ad.s||ad.s.toLowerCase()==='vc'))ad.s='FB';var hasAd=!!(ad.s&&ad.s.toLowerCase()!=='vc');
function fix(a){if(!a||!a.href||a.__kmcOk)return;var u;try{u=new URL(a.href)}catch(e){return}if(!DOM.test(u.hostname))return;var q=u.searchParams;Array.from(q.keys()).forEach(function(k){if(/\{\{/.test(q.get(k)||''))q.delete(k)});
if(hasAd){q.set('utm_source',ad.s);q.set('utm_medium',ad.m||ad.s);if(ad.c)q.set('utm_campaign',ad.c);else if(!q.get('utm_campaign'))q.set('utm_campaign',slug);if(ad.ct)q.set('utm_content',ad.ct);if(ad.t)q.set('utm_term',ad.t)}else{q.set('utm_source','vc')}
if(hasAd){}else if(ad.s){if(ad.m)q.set('utm_medium',ad.m);else if(!q.get('utm_medium'))q.set('utm_medium','pagina-de-venda');if(ad.c)q.set('utm_campaign',ad.c);else if(!q.get('utm_campaign'))q.set('utm_campaign',slug);if(ad.ct)q.set('utm_content',ad.ct);if(ad.t)q.set('utm_term',ad.t)}else{if(!q.get('utm_medium'))q.set('utm_medium','pagina-de-venda');if(!q.get('utm_campaign'))q.set('utm_campaign',slug);if(ad.ct&&!q.get('utm_content'))q.set('utm_content',ad.ct);if(ad.t&&!q.get('utm_term'))q.set('utm_term',ad.t)}
if(!q.get('sck'))q.set('sck','pv_'+slug);a.href=u.toString();a.__kmcOk=1}
function all(){var L=d.querySelectorAll('a[href]');for(var i=0;i<L.length;i++)fix(L[i])}
all();w.addEventListener('load',all);
d.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;if(a)fix(a)},true);
})(window,document);