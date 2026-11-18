import subprocess, sys, os
from playwright.sync_api import sync_playwright
BASE='/home/claude/agente-wg/conteudo/teste-2026-11-18'
FR='/tmp/claude-0/-home-claude/18ecb643-e46a-54b4-bb6c-bb4a8009ab64/scratchpad/frames'
os.makedirs(FR,exist_ok=True)
TOTAL=29; FPS=30
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1920})
    pg.goto('file://'+BASE+'/codigo/reel.html'); pg.wait_for_timeout(500)
    for i in range(TOTAL*FPS):
        pg.evaluate(f'render({i/FPS})')
        pg.screenshot(path=f'{FR}/f{i:04d}.png')
    b.close()
# som: tic a cada placa (hook, numeros, dicas) e ding na CTA
tics=[0.0,3.5,5.2]+[7+3.4*k for k in range(5)]+[24.6]
inputs=[];fl=[]
for n,t in enumerate(tics):
    f=1500 if t<24 else 880
    d=0.07 if t<24 else 0.25
    inputs+=['-f','lavfi','-t',str(d),'-i',f'sine=frequency={f}:sample_rate=44100']
    ms=int(t*1000)
    fl.append(f'[{n}:a]afade=t=out:st=0:d={d},volume=0.35,adelay={ms}|{ms}[a{n}]')
mix=''.join(f'[a{n}]' for n in range(len(tics)))
fc=';'.join(fl)+f';{mix}amix=inputs={len(tics)}:normalize=0,apad,atrim=0:{TOTAL}[out]'
subprocess.run(['ffmpeg','-y','-loglevel','error']+inputs+['-filter_complex',fc,'-map','[out]',f'{BASE}/codigo/tics.wav'],check=True)
out=f'{BASE}/wg_reel-teste_9x16_v1_2026-11-18.mp4'
subprocess.run(['ffmpeg','-y','-loglevel','error','-framerate',str(FPS),'-i',f'{FR}/f%04d.png','-i',f'{BASE}/codigo/tics.wav',
 '-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','128k','-shortest','-movflags','+faststart',out],check=True)
print('ok',out)
