# Reels "Golpe da falsa central · Parte 1" · gera quadros (Playwright), som (numpy) e MP4 (ffmpeg)
# Uso: python3 gerar.py [--so-som] [--quadros t1,t2,...]
import json, os, sys, subprocess, numpy as np, wave
from playwright.sync_api import sync_playwright

BASE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(BASE), 'wg_reel-golpe-central-parte1_9x16_v3-narrado_2026-11-18.mp4')
FR = '/tmp/claude-0/-home-claude/18ecb643-e46a-54b4-bb6c-bb4a8009ab64/scratchpad/frames_v3'
FPS, SR = 30, 44100
VOZ = '/tmp/claude-0/-home-claude/18ecb643-e46a-54b4-bb6c-bb4a8009ab64/scratchpad/voz/pt_BR-faber-medium.onnx'
NARR = os.environ.get('WG_NARRACAO')  # wav externo opcional (ex.: DaVinci) com os mesmos trechos, um por arquivo: narr_XX.wav
SEG = [  # (chave, texto falado, tipo)
  ('c0', 'Dona Maria atendeu essa ligação...', 'cap'),
  ('c1', 'Era o banco. O cartão dela tinha sido clonado.', 'cap'),
  ('b1', 'Aqui é da central de segurança. Detectamos uma compra no seu cartão.', 'tel'),
  ('c2', 'E pediram uma coisa só:', 'cap'),
  ('b2', 'Pra bloquear, me fala o código que chegou no seu celular.', 'tel'),
  ('c3', 'Ela já estava com o código na mão...', 'cap'),
  ('c4', 'Faltava um segundo para ela perder tudo.', 'cap'),
  ('c5', 'Mas aí... ela lembrou do que o Mestre Wesley ensina.', 'cap'),
  ('f1', 'O que ela fez em seguida salvou o dinheiro dela.', 'fin'),
  ('f2', 'Comente CAVEIRA para ver a parte dois.', 'fin'),
]
CAPTXT = {'c0': 'Dona Maria atendeu essa *ligação...', 'c1': 'Era o *banco. O cartão dela tinha sido *clonado.',
          'c2': 'E pediram uma coisa ^só:', 'c3': 'Ela já estava com o ^código na mão...',
          'c4': 'Faltava *UM segundo para ela perder *TUDO.', 'c5': 'Mas aí ela lembrou do que o ^Mestre ^Wesley ensina...'}
TMP = '/tmp/claude-0/-home-claude/18ecb643-e46a-54b4-bb6c-bb4a8009ab64/scratchpad/narr'
os.makedirs(TMP, exist_ok=True)
def ler_wav(path):
    d = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(d, np.int16).astype(np.float64) / 32768
falas = {}
for k, txt, tipo in SEG:
    raw = f'{TMP}/{k}.wav'
    subprocess.run(['python3', '-m', 'piper', '-m', VOZ, '-f', raw, '--length-scale', '1.0' if tipo != 'tel' else '0.95'], input=txt.encode(), check=True, capture_output=True)
    if tipo == 'tel':  # voz de telefone: faixa estreita e um pouco mais grave
        tel = f'{TMP}/{k}_tel.wav'
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', raw, '-af', 'asetrate=22050*0.93,aresample=44100,highpass=f=350,lowpass=f=3200,volume=1.6', tel], check=True)
        raw = tel
    x = ler_wav(raw)
    nz = np.where(np.abs(x) > 0.01)[0]  # corta silêncio das pontas
    falas[k] = x[max(0, nz[0] - 400): nz[-1] + 1200] if len(nz) else x
GAP = {'c0': 0.9, 'c1': 0.3, 'b1': 0.35, 'c2': 0.25, 'b2': 0.9, 'c3': 0.9, 'c4': 0.8, 'c5': 0.9, 'f1': 0.35, 'f2': 0.0}
t = 0.6; pos = {}
for k, txt, tipo in SEG:
    if k == 'c3': t += 0.3
    pos[k] = t; t += len(falas[k]) / SR + GAP[k]
TOTAL = t + 2.2
dur = lambda k: len(falas[k]) / SR
TL = {
  'cps': 26,
  'caps': [{'t': pos[k] - 0.1, 'h': CAPTXT[k]} for k in ['c0', 'c1', 'c2', 'c3', 'c4', 'c5']],
  'answer': pos['c1'] - 0.2,
  'b1': {'t': pos['b1'], 'txt': 'Aqui é da central de segurança. Detectamos uma compra no seu cartão.', 'cps': 68 / dur('b1')},
  'b2': {'t': pos['b2'], 'txt': 'Pra bloquear, me fala o código que chegou no seu celular.', 'cps': 57 / dur('b2')},
  'sms': pos['c3'] - 0.25, 'tense': pos['c4'] - 0.1, 'dim': pos['c5'] - 0.1, 'fin': pos['f1'] - 0.35, 'cta': pos['f2'] - 0.05,
}
# ---------------- som ----------------
N = int(TOTAL * SR)
mix = np.zeros(N)
rng = np.random.default_rng(7)
def at(t): return int(t * SR)
def add(sig, t, vol=1.0):
    i = at(t); j = min(N, i + len(sig))
    if i < N: mix[i:j] += sig[:j - i] * vol
def env(n, a=0.005, r=0.1):
    e = np.ones(n); A = max(1, int(a * SR)); R = max(1, int(r * SR))
    e[:A] = np.linspace(0, 1, A); e[-R:] *= np.linspace(1, 0, R); return e
def tone(f, d, a=0.005, r=0.1):
    t = np.arange(int(d * SR)) / SR; return np.sin(2 * np.pi * f * t) * env(len(t), a, r)
def noise(d): return rng.uniform(-1, 1, int(d * SR))
def lowpass(x, k):  # média móvel simples
    return np.convolve(x, np.ones(k) / k, mode='same')

# toque de telefone (padrão brasileiro: 1 s tocando, pausa) + vibração
for s in [0.25, 1.65]:
    t = np.arange(int(0.95 * SR)) / SR
    ring = (np.sin(2*np.pi*425*t) * (0.5 + 0.5*np.sign(np.sin(2*np.pi*25*t)))) * env(len(t), 0.01, 0.05)
    add(ring, s, 0.16)
    buzz = np.sin(2*np.pi*140*t) * (np.sin(2*np.pi*12*t) > 0) * env(len(t), 0.01, 0.05)
    add(buzz, s, 0.10)
# atender: clique + sopro
add(lowpass(noise(0.03), 3) * env(int(0.03*SR), 0.001, 0.02), TL['answer'], 0.5)
def whoosh(d=0.45, up=True):
    n = int(d*SR); x = noise(d)
    k = np.linspace(40, 4, n) if up else np.linspace(4, 40, n)
    y = np.array([0.0]*n); acc = 0.0
    for i in range(n):  # filtro passa-baixa variável
        a = 1.0 / k[i]; acc += a * (x[i] - acc); y[i] = acc
    return y * np.sin(np.linspace(0, np.pi, n)) * 3
for c in TL['caps'][1:]:
    add(whoosh(0.35), c['t'] - 0.1, 0.10)
# digitação: tecla por caractere
def key():
    d = 0.025; k = lowpass(noise(d), 2) * env(int(d*SR), 0.001, 0.02)
    return k + tone(rng.uniform(1800, 2600), d, 0.001, 0.02) * 0.2
for b in ['b1', 'b2']:
    t0, txt = TL[b]['t'], TL[b]['txt']
    for i, ch in enumerate(txt):
        if ch != ' ':
            add(key(), t0 + i / TL[b]['cps'] + rng.uniform(-0.008, 0.008), 0.10)
# SMS: plim
add(tone(1318.5, 0.18, 0.003, 0.15) + tone(2637, 0.18, 0.003, 0.15) * 0.3, TL['sms'], 0.35)
add(tone(1760, 0.3, 0.003, 0.25) + tone(3520, 0.3, 0.003, 0.25) * 0.3, TL['sms'] + 0.14, 0.35)
add(tone(2093, 0.25, 0.002, 0.2), TL['sms'] + 0.8, 0.12)  # brilho no código
# batimento do coração na tensão
def thump(f=55, d=0.16):
    t = np.arange(int(d*SR)) / SR
    return np.sin(2*np.pi*f*t*(1 - 0.4*t/d)) * np.exp(-t*22)
t = TL['tense']
while t < TL['fin'] - 0.1:
    add(thump(), t, 0.9); add(thump(50), t + 0.22, 0.6); t += 0.86
# impacto na virada da tensão
def impact(d=1.2):
    t = np.arange(int(d*SR)) / SR
    boom = np.sin(2*np.pi*48*t*(1 - 0.5*t/d)) * np.exp(-t*3.5)
    crack = lowpass(noise(d), 3) * np.exp(-t*25)
    return boom * 1.0 + crack * 0.5
add(impact(), TL['tense'], 0.75)
# subida antes da lembrança e batida
n = int(1.5*SR); rise = whoosh(1.5, up=True) * np.linspace(0.2, 1, n)
add(rise, TL['dim'] - 1.5, 0.22)
add(tone(880, 1.4, 0.002, 1.2) * 0.5 + tone(1320, 1.4, 0.002, 1.2) * 0.25, TL['dim'] + 0.05, 0.25)  # sino de "lembrou"
# final: impacto, pop do botão, seta
add(impact(1.4), TL['fin'], 0.7)
add(whoosh(0.4), TL['fin'] + 0.2, 0.12)
add(tone(660, 0.12, 0.002, 0.1) + tone(990, 0.12, 0.002, 0.1) * 0.5, TL['fin'] + 1.3, 0.35)
add(tone(1320, 0.18, 0.002, 0.15), TL['fin'] + 1.42, 0.25)

# trilha de fundo (feita aqui, sem licença de terceiros): pad grave em lá menor + pulso
tt = np.arange(N) / SR
pad = np.zeros(N)
for f, v in [(55, 0.5), (110, 0.35), (130.81, 0.22), (164.81, 0.2), (220, 0.08)]:
    pad += v * np.sin(2*np.pi*f*tt + np.sin(2*np.pi*0.2*tt) * 0.8)
pad *= 0.6 + 0.4 * np.sin(2*np.pi*0.12*tt)
lvl = np.interp(tt, [0, 0.5, TL['tense'] - 0.2, TL['tense'], TL['dim'], TL['fin'], TL['fin'] + 1, TOTAL - 1.2, TOTAL],
                     [0, 0.10, 0.12, 0.03, 0.05, 0.05, 0.12, 0.12, 0])
mix += pad * lvl
pulse_t = TL['answer']
while pulse_t < TL['tense'] - 0.3:
    add(thump(70, 0.12), pulse_t, 0.25); pulse_t += 0.6
pulse_t = TL['fin'] + 0.6
while pulse_t < TOTAL - 1.0:
    add(thump(65, 0.12), pulse_t, 0.18); pulse_t += 0.6
voz = np.zeros(N)
for k in falas:
    i = at(pos[k]); j = min(N, i + len(falas[k])); voz[i:j] += falas[k][:j - i]
voz = voz / max(1e-9, np.max(np.abs(voz))) * 0.95
mix = mix / max(1e-9, np.max(np.abs(mix))) * 0.55  # efeitos e trilha abaixo da voz
mix = mix + voz
mix = mix / max(1e-9, np.max(np.abs(mix))) * 0.89
WAV = os.path.join(BASE, 'som.wav')
with wave.open(WAV, 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype(np.int16).tobytes())
print('som ok')
if '--so-som' in sys.argv: sys.exit()

# ---------------- quadros ----------------
os.makedirs(FR, exist_ok=True)
only = None
if '--quadros' in sys.argv:
    only = [float(x) for x in sys.argv[sys.argv.index('--quadros') + 1].split(',')]
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1080, 'height': 1920})
    pg.goto('file://' + os.path.join(BASE, 'reel.html')); pg.wait_for_timeout(600)
    pg.evaluate('tl => { TL = tl }', TL)
    if only:
        for x in only:
            pg.evaluate(f'render({x})'); pg.screenshot(path=os.path.join(BASE, f'conf_{x}.png'))
        b.close(); print('quadros de conferência ok'); sys.exit()
    for i in range(int(TOTAL * FPS)):
        pg.evaluate(f'render({i / FPS})')
        pg.screenshot(path=f'{FR}/f{i:04d}.jpg', type='jpeg', quality=92)
    b.close()
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', str(FPS), '-i', f'{FR}/f%04d.jpg', '-i', WAV,
                '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p',
                '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', OUT], check=True)
print('ok', OUT)
