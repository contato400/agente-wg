# Monta o vídeo "como usar o Guia de 12 semanas": telas reais do guia + narração (piper) + legenda grande.
# Uso: python3 montar.py <pasta de trabalho com as telas e taps.json>
import json, os, re, sys, subprocess, wave
W = sys.argv[1]; AQUI = os.path.dirname(os.path.abspath(__file__))
VOZ = '/tmp/claude-0/-home-claude/18ecb643-e46a-54b4-bb6c-bb4a8009ab64/scratchpad/voz/pt_BR-faber-medium.onnx'
R = json.load(open(os.path.join(AQUI, 'roteiro.json')))['cenas']; TAPS = json.load(open(f'{W}/taps.json'))
def leg(h):
    h = re.sub(r'\*([^*]+)\*', r'<span style="color:#ff3b30">\1</span>', h)
    h = re.sub(r'\^(.+)$', r'<span style="color:#ffd27a">\1</span>', h)
    h = re.sub(r'\+(.+)$', r'<span style="color:#3ddc84">\1</span>', h)
    return h
CSS = """*{box-sizing:border-box;margin:0}body{width:1080px;height:1920px;overflow:hidden;background:radial-gradient(1200px 900px at 50% 0,#4a0a0e 0,#0b0b0c 60%);font-family:'Segoe UI',Roboto,system-ui,sans-serif;color:#fff}
.tag{position:absolute;left:110px;top:300px;background:#d71920;font-weight:800;font-size:28px;letter-spacing:2px;padding:8px 20px;border-radius:40px}
.cap{position:absolute;left:110px;right:135px;top:370px;font-weight:900;font-size:62px;line-height:1.08;text-shadow:0 4px 18px #000}
.ph{position:absolute;left:250px;top:560px;width:580px;height:922px;border-radius:44px;overflow:hidden;border:6px solid #2a2a2e;box-shadow:0 30px 80px #000}
.ph img{width:100%;height:100%;display:block}
.tap{position:absolute;width:110px;height:110px;margin:-55px 0 0 -55px;border-radius:50%;border:8px solid #ffd27a;background:rgba(255,210,122,.25)}
.fin{position:absolute;left:110px;right:135px;top:560px;text-align:center}.fin .big{font-weight:900;font-size:84px;line-height:1.05}
.fin .sub{margin-top:50px;font-size:38px;color:#cfcfd4;line-height:1.35}.fin .btn{display:inline-block;margin-top:60px;background:#d71920;font-weight:900;font-size:44px;padding:30px 50px;border-radius:24px}"""
def html(c, tap):
    if c.get('final'):
        body = f'<div class="tag">GUIA DE TREINO CAVEIRA</div><div class="fin"><div class="big">{leg(c["leg"])}</div><div class="sub">Responda 3 perguntas e siga a aula de cada dia, por 12 semanas.</div><div class="btn">Tamo junto, Caveira!</div><div class="sub" style="font-size:30px">Mestre Wesley Gimenez · Krav Magá Caveira</div></div>'
    else:
        t = ''
        if tap and c.get('tap'):
            p = TAPS[c['tap']]; t = f'<div class="tap" style="left:{250+6+p["x"]*568}px;top:{560+6+p["y"]*910}px"></div>'
        body = f'<div class="tag">GUIA DE TREINO CAVEIRA</div><div class="cap">{leg(c["leg"])}</div><div class="ph"><img src="file://{W}/{c["img"]}.png"></div>{t}'
    return f'<html><head><meta charset="utf-8"><style>{CSS}</style></head><body>{body}</body></html>'
# narração
falas = []
for i, c in enumerate(R):
    f = f'{W}/v{i:02d}.wav'
    subprocess.run(['python3', '-m', 'piper', '-m', VOZ, '-f', f, '--length-scale', '0.95'], input=c['fala'].encode(), check=True, capture_output=True)
    with wave.open(f) as w: falas.append((f, w.getnframes() / w.getframerate()))
# telas
from playwright.sync_api import sync_playwright
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(viewport={'width': 1080, 'height': 1920})
    for i, c in enumerate(R):
        for tap in (0, 1):
            open(f'{W}/st.html', 'w').write(html(c, tap)); pg.goto(f'file://{W}/st.html'); pg.wait_for_timeout(150)
            pg.screenshot(path=f'{W}/c{i:02d}_{tap}.png')
    # capa
    capa = f'<html><head><meta charset="utf-8"><style>{CSS}</style></head><body><div class="tag">GUIA DE TREINO CAVEIRA</div><div class="fin" style="top:520px"><div class="big" style="font-size:150px">GUIA<br><span style="color:#ff3b30">NOVO</span></div><div class="btn" style="background:#ffd27a;color:#111;margin-top:50px">12 SEMANAS · COMO USAR</div><div class="sub">Em 1 minuto</div></div></body></html>'
    open(f'{W}/st.html', 'w').write(capa); pg.goto(f'file://{W}/st.html'); pg.screenshot(path=os.path.join(AQUI, 'capa-guia-12-semanas.jpg'), type='jpeg', quality=92)
    b.close()
# cada cena vira um trecho de vídeo com zoom lento; o toque aparece na metade
partes = []; PAUSA = 0.35
for i, c in enumerate(R):
    d = falas[i][1] + PAUSA + (0.4 if i == 0 else 0) + (1.6 if c.get('final') else 0)
    lst = f'{W}/l{i:02d}.txt'
    if c.get('tap'):
        a = round(d * 0.55, 2); open(lst, 'w').write(f"file 'c{i:02d}_0.png'\nduration {a}\nfile 'c{i:02d}_1.png'\nduration {round(d-a,2)}\nfile 'c{i:02d}_1.png'\n")
    else:
        open(lst, 'w').write(f"file 'c{i:02d}_0.png'\nduration {round(d,2)}\nfile 'c{i:02d}_0.png'\n")
    o = f'{W}/p{i:02d}.mp4'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-vf',
        f"fps=30,scale=1080:1920,zoompan=z='1+0.02*on/({int(d*30)}+1)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps=30,format=yuv420p",
        '-t', str(round(d, 2)), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', o], check=True)
    sil = f'{W}/a{i:02d}.wav'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', falas[i][0], '-af', f"adelay={400 if i==0 else 0}|{400 if i==0 else 0},apad", '-t', str(round(d, 2)), '-ar', '44100', '-ac', '1', sil], check=True)
    partes.append((o, sil))
open(f'{W}/vlist.txt', 'w').write(''.join(f"file '{p[0]}'\n" for p in partes))
open(f'{W}/alist.txt', 'w').write(''.join(f"file '{p[1]}'\n" for p in partes))
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', f'{W}/vlist.txt', '-f', 'concat', '-safe', '0', '-i', f'{W}/alist.txt',
    '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-shortest', os.path.join(AQUI, 'guia-12-semanas-como-usar.mp4')], check=True)
print('ok', round(sum(d for _, d in falas), 1))
