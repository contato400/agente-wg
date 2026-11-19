import json,sys
from playwright.sync_api import sync_playwright
FOTO='https://media.atomicatmedia.net/u/yoRetjn6mOhzXGiNjxTeG9wI7g22/Pictures/mcp/xkAs/wesley_hero-2.jpg?width=1200'
CSS="""*{margin:0;box-sizing:border-box}body{background:#000}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;background:radial-gradient(70% 55% at 70% 20%,#3a0b0e,#0b0b0d 70%);color:#f3efe7;font-family:Inter,sans-serif;padding:110px 90px}
.s:after{content:"";position:absolute;inset:0;opacity:.08;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.85'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")}
.tag{font:800 26px Inter;letter-spacing:.18em;color:#ff4d4d;text-transform:uppercase}
.n{font:400 150px Anton;color:#e3262f;line-height:1;margin:30px 0 10px}
h1{font:400 112px/1 Anton;text-transform:uppercase;margin-top:28px}
h1 em{font-style:normal;color:#e3262f}
h2{font:400 84px/1.04 Anton;text-transform:uppercase;margin:10px 0 34px}
p{font:500 46px/1.35 Inter;color:#d9d4cb;max-width:880px}
p b{color:#fff;font-weight:800}
.foto{position:absolute;right:-60px;bottom:0;height:820px;filter:drop-shadow(0 30px 60px #000)}
.capa{background:linear-gradient(180deg,rgba(11,11,13,.2),rgba(11,11,13,.95) 75%),url(FOTO) center 18%/cover}
.rod{position:absolute;left:90px;right:90px;bottom:70px;display:flex;justify-content:space-between;font:700 26px Inter;color:#8f8a82;letter-spacing:.08em;text-transform:uppercase;z-index:2}
.box{background:#fff;color:#111;border-radius:28px;padding:38px 42px;font:700 44px/1.3 Inter;margin-top:40px}
.cta{position:absolute;left:90px;right:90px;bottom:170px;background:#e3262f;border-radius:28px;padding:40px;font:800 46px/1.25 Inter;color:#fff;text-align:center}
.cta small{display:block;font:600 30px Inter;opacity:.9;margin-top:10px}
""".replace('FOTO',FOTO)
def render(nome, slides):
    html='<html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@500;600;700;800&display=swap" rel="stylesheet"><style>'+CSS+'</style></head><body>'
    for i,s in enumerate(slides):
        html+=f'<div class="s {s.get("cls","")}" id="s{i}">{s["html"]}<div class="rod"><span>Mestre Wesley Gimenez</span><span>{i+1}/{len(slides)}{" · arraste →" if i==0 else ""}</span></div></div>'
    html+='</body></html>'
    open(nome+'.html','w',encoding='utf-8').write(html)
    with sync_playwright() as p:
        b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1350})
        pg.goto('file://'+__import__('os').path.abspath(nome+'.html')); pg.wait_for_timeout(2500)
        for i in range(len(slides)): pg.locator(f'#s{i}').screenshot(path=f'{nome}-{i+1}.jpg',type='jpeg',quality=90)
        b.close()
CTA='<div class="cta">Manda para quem você ama.<br>Comente CAVEIRA<small>e eu te chamo no direct para entrar no grupo da condição especial de sexta, às 19h</small></div>'
render('inss',[
 {'cls':'capa','html':'<span class="tag">Alerta para a família</span><div style="position:absolute;left:90px;right:90px;bottom:170px"><h1>Bateram na porta dizendo que é do <em>INSS</em>. E agora?</h1></div>'},
 {'html':'<span class="tag">Primeiro, saiba</span><div class="n">01</div><h2>Quem pede seus dados não é do INSS</h2><p>Senha, cartão ou dados do banco <b>na porta, por telefone ou por mensagem</b>? Desconfie na hora.</p>'},
 {'html':'<span class="tag">Na porta</span><div class="n">02</div><h2>Não abra o portão</h2><p>Converse pela janela ou pelo interfone. <b>Peça para voltar outro dia</b> e chame alguém da família.</p>'},
 {'html':'<span class="tag">No telefone</span><div class="n">03</div><h2>Ligação sobre o seu 13º? Desliga.</h2><p>Ligue <b>você</b> para o número que está atrás do cartão. Na dúvida sobre o INSS, ligue <b>você mesmo</b> para a central <b>135</b>.</p>'},
 {'html':'<span class="tag">No caixa</span><div class="n">04</div><h2>Vá acompanhado e de dia</h2><p>E <b>não conte a ninguém</b> quanto vai sacar.</p><div class="box">Golpista tem pressa. Quem é de verdade espera você conferir.</div>'},
 {'html':'<span class="tag">Tamo junto, Caveira</span><h1 style="font-size:96px">Seu pai e sua mãe são o alvo preferido.</h1><p style="margin-top:30px">Uma conversa de 2 minutos evita um prejuízo enorme.</p>'+CTA},
])
render('pos-compra',[
 {'cls':'capa','html':'<span class="tag">Golpe da Black Friday</span><div style="position:absolute;left:90px;right:90px;bottom:170px"><h1>Você comprou. Dois dias depois, <em>toca o telefone.</em></h1></div>'},
 {'html':'<span class="tag">Como começa</span><h2 style="margin-top:60px">"Aqui é da central da loja"</h2><p>Dizem que tem um problema no seu pedido e que você precisa <b>fazer um Pix para liberar</b>.</p>'},
 {'html':'<span class="tag">Fique esperto</span><h2 style="margin-top:60px">A compra é de verdade. A ligação é falsa.</h2><p>O golpista sabe o que você comprou e usa isso para parecer de verdade.</p>'},
 {'html':'<span class="tag">Regra 1</span><div class="n">01</div><h2>Desliga e liga você</h2><p>Procure o número <b>no site oficial ou no cartão</b> e ligue você mesmo.</p>'},
 {'html':'<span class="tag">Regras 2 e 3</span><div class="n">02</div><h2>Ninguém sério pede Pix nem código por telefone</h2><div class="n">03</div><h2>Pressa é sinal de golpe</h2>'},
 {'html':'<span class="tag">Tamo junto, Caveira</span><h1 style="font-size:96px">Quem te liga nunca é quem você acha.</h1>'+CTA},
])
