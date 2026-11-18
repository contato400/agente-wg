import os, json
from playwright.sync_api import sync_playwright
BASE=os.path.dirname(os.path.abspath(__file__))
TL={'cps':26,'caps':[{'t':0.1,'h':'x'}],'answer':9,'b1':{'t':99,'txt':''},'b2':{'t':99,'txt':''},'sms':99,'tense':99,'dim':99,'fin':99}
OVER='''
<div id="cv" style="position:absolute;inset:0;pointer-events:none">
 <div style="position:absolute;top:300px;left:50%;transform:translateX(-50%) rotate(-3deg);background:#ff3341;font:800 46px I;letter-spacing:4px;padding:12px 34px;border-radius:14px;box-shadow:0 10px 40px rgba(255,51,65,.5)">PARTE 1</div>
 <div style="position:absolute;top:410px;left:90px;width:900px;text-align:center;font:800 112px/1.0 I;letter-spacing:-3px;text-shadow:0 8px 40px rgba(0,0,0,.9)">ELA QUASE<br><span style="color:#ff3341">PERDEU TUDO</span></div>
 <div style="position:absolute;top:1450px;left:110px;width:860px;text-align:center"><span style="display:inline-block;background:#ffd23f;color:#0a0a0a;font:800 52px/1.15 I;padding:18px 30px;border-radius:18px;transform:rotate(-1.5deg)">O golpe da falsa<br>central do banco</span></div>
</div>'''
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1920})
    pg.goto('file://'+os.path.join(BASE,'reel.html')); pg.wait_for_timeout(600)
    pg.evaluate('tl=>{TL=tl}',TL); pg.evaluate('render(1.25)')
    pg.evaluate("""o=>{document.querySelector('#cap').style.display='none';document.querySelector('#tag').style.display='none';
      const ph=document.querySelector('#phone');ph.style.transform='translate(0,90px) rotate(-4deg) scale(.86)';ph.style.filter='none';
      document.querySelector('#redflash').style.opacity=.8;
      document.querySelector('#stage').insertAdjacentHTML('beforeend',o)}""",OVER)
    pg.wait_for_timeout(300)
    out=os.path.join(os.path.dirname(BASE),'capa_parte1_9x16.jpg')
    pg.screenshot(path=out,type='jpeg',quality=95); b.close(); print(out)
