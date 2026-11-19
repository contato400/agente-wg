"""Motor de edição pesada WG: troca de cenário + efeitos 3D na fala.
Uso: python3 -I motor.py <config.json>
Config (ver piloto_A1.json): video (corte limpo 720x1280), ss, dur, words (json de palavras do faster-whisper),
scene, fx (elementos 3D com t0/t1/layer), band, punches, whips, sfx, saida.
Passos: 1) máscara (mascara.py) 2) cenário e efeitos quadro a quadro no Playwright (cena.html)
3) composição numpy/cv2 (recorte com borda suave, luz de recorte, Wesley a 86%, câmera, whip) 4) som (voz + efeitos sintetizados, loudnorm -14) 5) folha.
"""
import json, os, sys, subprocess, base64, html, re, math
import numpy as np, cv2
from playwright.sync_api import sync_playwright

AQUI = os.path.dirname(os.path.abspath(__file__))
C = json.load(open(sys.argv[1]))
W, H, FPS = 1080, 1920, 30
work = C["trabalho"]; os.makedirs(work, exist_ok=True)
dur = C["dur"]; N = int(round(dur * FPS))
src = C["video"]

# ---------- 1. máscaras
mdir = os.path.join(work, "masks")
if not os.path.exists(os.path.join(mdir, f"m_{N-1:05d}.png")):
    subprocess.run(["python3", "-I", os.path.join(AQUI, "mascara.py"), src, mdir, str(C.get("ss", 0)), str(dur)], check=True)

# ---------- legenda (fiel à fala)
FIX = {"vara": "Fala,", "clic": "Clique", "pique": "Clique"}
KEY = set(C.get("keywords", []))
def groups(words):
    out, cur = [], []
    for i, w in enumerate(words):
        t = FIX.get(w["w"].lower(), w["w"]); t = "Caveira," if t.lower() == "caveira," else t
        cur.append((t.upper(), w["s"], w["e"]))
        nxt = words[i + 1]["s"] if i + 1 < len(words) else None
        if len(cur) >= 3 or t[-1] in ".,!?" or nxt is None or nxt - w["e"] > 0.35:
            out.append([cur, cur[0][1], cur[-1][2]]); cur = []
    res = []
    for i, g in enumerate(out):
        end = out[i + 1][1] if i + 1 < len(out) else g[2] + 0.3
        txt = " ".join(f"<span class='k'>{html.escape(x[0])}</span>" if re.sub(r"[^\wÀ-ú]", "", x[0]) in KEY else html.escape(x[0]) for x in g[0])
        res.append([txt, g[1], end])
    return res
ss = C.get("ss", 0)
words = [dict(w, s=w["s"] - ss, e=w["e"] - ss) for w in json.load(open(C["words"])) if ss <= w["s"] < ss + dur]
cfg = {"scene": C["scene"], "fx": C["fx"], "band": C["band"], "caps": groups(words), "capY": C.get("capY", 1240)}

# ---------- 2. quadros do cenário (bg) e da frente (fg)
fdir = os.path.join(work, "frames"); os.makedirs(fdir, exist_ok=True)
anton = "data:font/ttf;base64," + base64.b64encode(open(os.path.join(AQUI, "Anton.ttf"), "rb").read()).decode()
page_html = open(os.path.join(AQUI, "cena.html")).read().replace("__ANTON__", anton).replace("__CFG__", json.dumps(cfg))
open(os.path.join(work, "cena_pronta.html"), "w").write(page_html)
LAYMAP = {}  # (camada, i) -> png ou None; quadro igual ao anterior reaproveita o arquivo
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(viewport={"width": W, "height": H})
    pg.goto("file://" + os.path.join(work, "cena_pronta.html")); pg.wait_for_timeout(300)
    pg.evaluate("document.fonts.ready")
    for lay_ in ("mid", "fg"):
        last_h, last_p = None, None
        for i in range(N):
            h_ = pg.evaluate(f"render({i / FPS},'{lay_}')")
            if not h_: LAYMAP[(lay_, i)] = None; continue
            if h_ != last_h:
                last_p = os.path.join(fdir, f"{lay_}_{i:05d}.png"); pg.screenshot(path=last_p, omit_background=True); last_h = h_
            LAYMAP[(lay_, i)] = last_p
    b.close()
CACHE = {}
def layer(lay_, i):
    p = LAYMAP[(lay_, i)]
    if p is None: return None
    if p not in CACHE:
        len(CACHE) > 6 and CACHE.clear(); im = cv2.imread(p, cv2.IMREAD_UNCHANGED).astype(np.float32); CACHE[p] = (im[..., :3], im[..., 3:4] / 255)
    return CACHE[p]
sys.path.insert(0, AQUI); from cenarios import SCENES
SC = SCENES[C["scene"]]()

# ---------- 3. composição
PS = C.get("person_scale", 0.86)
A_person = np.float32([[PS, 0, W / 2 * (1 - PS)], [0, PS, H * (1 - PS)]])  # escala presa na base, centralizada
rim_col = np.array(C.get("rim", [255, 45, 35]), np.float32)
cam_c = C.get("cam_center", [540, 1430]); cam_max = C.get("cam_max", 1.08)
def cam_scale(t):
    s = 1 + 0.025 * t / dur
    for p in C.get("punches", []):
        if t >= p[0]: s += p[1] * math.exp(-(t - p[0]) * 5)
    return min(s, cam_max)
def whip(t):
    for tw in C.get("whips", []):
        d = t - tw
        if -0.13 <= d < 0: return -700 * ((d + 0.13) / 0.13) ** 2, 1
        if 0 <= d < 0.13: return 700 * (1 - d / 0.13) ** 2, 1
    return 0, 0
dec = subprocess.Popen(["ffmpeg", "-nostdin", "-v", "error", "-ss", str(ss), "-i", src, "-t", str(dur), "-vf", f"scale={W}:{H}:flags=lanczos", "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
tmpv = os.path.join(work, "video_sem_som.mp4")
enc = subprocess.Popen(["ffmpeg", "-nostdin", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p", tmpv], stdin=subprocess.PIPE)
_r = np.ones((H, W), np.float32); _x0 = int(W / 2 * (1 - PS)); _ramp = np.linspace(0, 1, 40, dtype=np.float32)
_r[:, _x0:_x0 + 40] *= _ramp[None, :]; _r[:, W - _x0 - 40:W - _x0] *= _ramp[::-1][None, :]; _r[:, :_x0] = 0; _r[:, W - _x0:] = 0
EDGE_RAMP = _r
k_close = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (31, 31)); k_er = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
for i in range(N):
    t = i / FPS
    fr = np.frombuffer(dec.stdout.read(W * H * 3), np.uint8).reshape(H, W, 3).astype(np.float32)
    m = cv2.imread(os.path.join(mdir, f"m_{i:05d}.png"), 0)
    m = cv2.resize(m, (W, H), interpolation=cv2.INTER_LINEAR)
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, k_close)       # fecha buraco de mão borrada
    m = cv2.erode(m, k_er)                                   # tira o halo do fundo antigo
    m = cv2.GaussianBlur(m, (0, 0), 2.2).astype(np.float32) / 255  # borda suave
    fr = cv2.warpAffine(fr, A_person, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)
    m = cv2.warpAffine(m, A_person, (W, H), flags=cv2.INTER_LINEAR, borderValue=0)
    m *= EDGE_RAMP  # some a quina do quadro original reduzido (ombro cortado na lateral)
    # cor do Wesley puxada para o ambiente escuro + luz de recorte
    fr = (fr - 128) * 1.08 + 120
    edge = np.clip(m - cv2.GaussianBlur(m, (0, 0), 9), 0, 1) * 2.2
    side = np.linspace(0.55, 1.0, W, dtype=np.float32)[None, :]
    fr = fr + (edge * side)[..., None] * rim_col[::-1][None, None, :] * C.get("rim_k", 0.9)
    bg = SC.frame(t)
    md = layer("mid", i)
    if md is not None: bg = bg * (1 - md[1]) + md[0] * md[1]
    comp = bg * (1 - m[..., None]) + np.clip(fr, 0, 255) * m[..., None]
    # câmera (punch-in) e whip
    s = cam_scale(t); dx, wflag = whip(t)
    M = np.float32([[s, 0, cam_c[0] * (1 - s) + dx], [0, s, cam_c[1] * (1 - s)]])
    comp = cv2.warpAffine(comp, M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
    if wflag and abs(dx) > 5:
        L = int(min(140, abs(dx) * 0.35)) | 1
        ker = np.zeros((1, L), np.float32); ker[0, :] = 1 / L
        comp = cv2.filter2D(comp, -1, ker)
    fg = layer("fg", i)
    if fg is not None: comp = comp * (1 - fg[1]) + fg[0] * fg[1]
    enc.stdin.write(np.clip(comp, 0, 255).astype(np.uint8).tobytes())
enc.stdin.close(); enc.wait(); dec.wait()

# ---------- 4. som: voz + efeitos discretos sintetizados (sem licença de terceiros)
SR = 48000; rng = np.random.default_rng(3)
mix = np.zeros(int((dur + 0.5) * SR), np.float32)
def env(n, a, r): e = np.ones(n, np.float32); na = max(1, int(a * SR)); e[:na] = np.linspace(0, 1, na); e *= np.exp(-np.arange(n) / (r * SR)); return e
def lp(x, k): return np.convolve(x, np.ones(k) / k, "same")
def whoosh(d=0.35):
    n = int(d * SR); x = rng.uniform(-1, 1, n).astype(np.float32); f = np.linspace(2, 40, n).astype(int); y = np.zeros(n, np.float32)
    for j in range(0, n, 2400): y[j:j + 2400] = lp(x[j:j + 2400], max(1, 42 - f[j]))
    return y * np.sin(np.linspace(0, np.pi, n)) ** 2
def hit(d=0.35):
    n = int(d * SR); tt = np.arange(n) / SR; return (np.sin(2 * np.pi * (70 - 30 * tt / d) * tt) * env(n, 0.002, 0.09) + lp(rng.uniform(-1, 1, n), 6) * env(n, 0.001, 0.02) * 0.5).astype(np.float32)
def pop(d=0.12):
    n = int(d * SR); tt = np.arange(n) / SR; return (np.sin(2 * np.pi * (900 - 600 * tt / d) * tt) * env(n, 0.001, 0.025)).astype(np.float32)
SFX = {"whoosh": whoosh, "hit": hit, "pop": pop}
for name, tt, vol in C.get("sfx", []):
    s_ = SFX[name](); j = int(tt * SR); mix[j:j + len(s_)] += s_[:len(mix) - j] * vol
sfxw = os.path.join(work, "sfx.wav")
import wave
with wave.open(sfxw, "wb") as wv:
    wv.setnchannels(1); wv.setsampwidth(2); wv.setframerate(SR); wv.writeframes((np.clip(mix, -1, 1) * 32767).astype(np.int16).tobytes())
out = C["saida"]; os.makedirs(os.path.dirname(out), exist_ok=True)
subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", tmpv, "-ss", str(ss), "-t", str(dur), "-i", src, "-i", sfxw,
                "-filter_complex", f"[1:a]aformat=sample_rates=48000:channel_layouts=stereo,afade=t=out:st={dur-0.15}:d=0.15[v];[2:a]aformat=sample_rates=48000:channel_layouts=stereo[s];"
                "[v][s]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]",
                "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", out], check=True)
# ---------- 5. folha de quadros (a cada 1 s no piloto, 2 s nos completos)
step = C.get("folha_passo", 2)
subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", out, "-vf", f"fps=1/{step},scale=270:-1,tile=6x2", "-frames:v", "1", "-q:v", "3", out[:-4] + "_folha.jpg"], check=True)
print(out)
