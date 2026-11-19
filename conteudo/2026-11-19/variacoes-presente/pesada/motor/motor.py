"""Motor de edição pesada WG v2: troca de cenário + efeitos 3D na fala (2 núcleos, otimizado).
Uso: python3 -I motor.py <config.json>
Passos:
 0) máscara bruta (mascara.py), uma vez por vídeo, pasta 'masks_raw'
 1) preparo da máscara, uma vez por vídeo e escala: fechamento, erosão, desfoque, escala do Wesley e borda
    de luz, tudo em meia resolução, gravado em 'prep' (canal 0 = máscara, canal 1 = borda)
 2) elementos 3D, legenda, faixa e cartão final no Playwright (cena.html), só quando o quadro muda
 3) composição: cenário (cenarios.py, camadas prontas) + camada de trás + Wesley + câmera/whip + frente
 4) som: voz + efeitos sintetizados + silêncio do cartão, loudnorm -14
 5) capa e folha de quadros
"""
import json, os, sys, subprocess, base64, html, re, math, wave, time
import numpy as np, cv2
from playwright.sync_api import sync_playwright

AQUI = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, AQUI)
from cenarios import SCENES
C = json.load(open(sys.argv[1]))
W, H, FPS = 1080, 1920, 30
HW, HH = W // 2, H // 2
FF = ["ffmpeg", "-nostdin", "-v", "error"]
src = C["video"]
vdur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src], capture_output=True, text=True).stdout)
NV = int(vdur * FPS)  # quadros com o Wesley
CARD = C.get("card", 2.5); dur = NV / FPS + CARD; N = int(round(dur * FPS))
work = C["trabalho"]; os.makedirs(work, exist_ok=True)
PS = C.get("person_scale", 0.86)
T0 = time.time()
def log(*a): print(f"[{time.time()-T0:6.0f}s]", *a, flush=True)

# ---------- 0. máscara bruta (compartilhada)
raw = C["masks_raw"]
if not os.path.exists(os.path.join(raw, f"m_{NV-1:05d}.png")):
    subprocess.run(["python3", "-I", os.path.join(AQUI, "mascara.py"), src, raw], check=True)

# ---------- 1. preparo da máscara em meia resolução (compartilhado)
prep = C["prep"]; os.makedirs(prep, exist_ok=True)
if not os.path.exists(os.path.join(prep, f"p_{NV-1:05d}.png")):
    A = np.float32([[PS, 0, HW / 2 * (1 - PS)], [0, PS, HH * (1 - PS)]])
    ramp = np.ones((HH, HW), np.float32); x0 = int(HW / 2 * (1 - PS)); r = np.linspace(0, 1, 20, dtype=np.float32)
    ramp[:, :x0] = 0; ramp[:, HW - x0:] = 0; ramp[:, x0:x0 + 20] *= r; ramp[:, HW - x0 - 20:HW - x0] *= r[::-1]
    kc = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15)); ke = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    for i in range(NV):
        m = cv2.imread(os.path.join(raw, f"m_{i:05d}.png"), 0)
        m = cv2.resize(m, (HW, HH), interpolation=cv2.INTER_AREA)
        m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, kc); m = cv2.erode(m, ke)
        m = cv2.GaussianBlur(m, (0, 0), 1.1).astype(np.float32) / 255
        m = cv2.warpAffine(m, A, (HW, HH), flags=cv2.INTER_LINEAR, borderValue=0) * ramp
        e = np.clip((m - cv2.GaussianBlur(m, (0, 0), 4.5)) * 2.2, 0, 1)
        out = np.zeros((HH, HW, 3), np.uint8); out[..., 2] = (m * 255).astype(np.uint8); out[..., 1] = (e * 255).astype(np.uint8)
        cv2.imwrite(os.path.join(prep, f"p_{i:05d}.png"), out)
    log("prep ok")

# ---------- legenda fiel à fala
FIX = {"vara": "Fala,", "clic": "Clique", "pique": "Clique", "clica": "Clique", "internamento": "treinamento"}
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
        end = out[i + 1][1] if i + 1 < len(out) else min(g[2] + 0.3, NV / FPS)
        txt = " ".join(f"<span class='k'>{html.escape(x[0])}</span>" if re.sub(r"[^\wÀ-ú]", "", x[0]) in KEY else html.escape(x[0]) for x in g[0])
        res.append([txt, g[1], end])
    return res
cfg = {"fx": C["fx"], "band": C["band"], "caps": groups(json.load(open(C["words"]))), "capY": C.get("capY", 1240), "cardT": NV / FPS if CARD else None}

# ---------- 2. camadas do navegador (só fotografa quando muda)
fdir = os.path.join(work, "frames"); os.makedirs(fdir, exist_ok=True)
anton = "data:font/ttf;base64," + base64.b64encode(open(os.path.join(AQUI, "Anton.ttf"), "rb").read()).decode()
open(os.path.join(work, "cena_pronta.html"), "w").write(open(os.path.join(AQUI, "cena.html")).read().replace("__ANTON__", anton).replace("__CFG__", json.dumps(cfg)))
LAYMAP = {}
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(viewport={"width": W, "height": H})
    pg.goto("file://" + os.path.join(work, "cena_pronta.html")); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(300)
    for lay_ in ("mid", "fg"):
        last_h, last_p = None, None
        for i in range(N):
            h_ = pg.evaluate(f"render({i / FPS},'{lay_}')")
            if not h_: LAYMAP[(lay_, i)] = None; continue
            if h_ != last_h:
                last_p = os.path.join(fdir, f"{lay_}_{i:05d}.png"); pg.screenshot(path=last_p, omit_background=True); last_h = h_
            LAYMAP[(lay_, i)] = last_p
    b.close()
log("camadas ok")
CACHE = {}
def layer(lay_, i):
    p = LAYMAP[(lay_, i)]
    if p is None: return None
    if p not in CACHE:
        if len(CACHE) > 6: CACHE.clear()
        im = cv2.imread(p, cv2.IMREAD_UNCHANGED)
        a = im[..., 3:4].astype(np.float32) / 255 if im.shape[2] == 4 else np.ones(im.shape[:2] + (1,), np.float32)
        CACHE[p] = (im[..., :3].astype(np.float32) * a, 1 - a)  # pré-multiplicado
    return CACHE[p]

# ---------- 3. composição
SC = SCENES[C["scene"]]()
rim_col = np.array(C.get("rim", [255, 45, 35]), np.float32)[::-1] * C.get("rim_k", 0.9)
side = np.linspace(0.55, 1.0, W, dtype=np.float32)[None, :, None]
cam_c = C.get("cam_center", [540, 1430]); cam_max = C.get("cam_max", 1.08)
def cam_scale(t):
    s = 1 + 0.025 * t / dur
    for p in C.get("punches", []):
        if t >= p[0]: s += p[1] * math.exp(-(t - p[0]) * 5)
    return min(s, cam_max)
def whip(t):
    for tw in C.get("whips", []):
        d = t - tw
        if -0.13 <= d < 0: return -700 * ((d + 0.13) / 0.13) ** 2
        if 0 <= d < 0.13: return 700 * (1 - d / 0.13) ** 2
    return 0
Ap = np.float32([[PS, 0, W / 2 * (1 - PS)], [0, PS, H * (1 - PS)]])
dec = subprocess.Popen(FF + ["-i", src, "-vf", f"scale={W}:{H}:flags=lanczos", "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
tmpv = os.path.join(work, "video_sem_som.mp4")
enc = subprocess.Popen(FF + ["-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p", tmpv], stdin=subprocess.PIPE)
for i in range(N):
    t = i / FPS
    comp = SC.frame(t)
    md = layer("mid", i)
    if md is not None: comp = md[0] + comp * md[1]
    if i < NV:
        fr = np.frombuffer(dec.stdout.read(W * H * 3), np.uint8).reshape(H, W, 3)
        fr = cv2.warpAffine(fr, Ap, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE).astype(np.float32)
        pm = cv2.resize(cv2.imread(os.path.join(prep, f"p_{i:05d}.png")), (W, H), interpolation=cv2.INTER_LINEAR).astype(np.float32) / 255
        m = pm[..., 2:3]; e = pm[..., 1:2]
        fr = (fr - 128) * 1.08 + 120 + e * side * rim_col
        comp = comp + (np.clip(fr, 0, 255) - comp) * m
        s = cam_scale(t); dx = whip(t)
        if s > 1.001 or abs(dx) > 0.5:
            M = np.float32([[s, 0, cam_c[0] * (1 - s) + dx], [0, s, cam_c[1] * (1 - s)]])
            comp = cv2.warpAffine(comp, M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
        if abs(dx) > 5:
            L = int(min(140, abs(dx) * 0.35)) | 1
            comp = cv2.blur(comp, (L, 1))
    fg = layer("fg", i)
    if fg is not None: comp = fg[0] + comp * fg[1]
    enc.stdin.write(np.clip(comp, 0, 255).astype(np.uint8).tobytes())
    if i % 90 == 0: log("quadro", i, "/", N)
enc.stdin.close(); enc.wait(); dec.kill()
log("video ok")

# ---------- 4. som
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
def chime(d=0.6):
    n = int(d * SR); tt = np.arange(n) / SR; return ((np.sin(2 * np.pi * 1318 * tt) + 0.6 * np.sin(2 * np.pi * 1975 * tt)) * env(n, 0.003, 0.18) * 0.5).astype(np.float32)
SFX = {"whoosh": whoosh, "hit": hit, "pop": pop, "chime": chime}
for name, tt, vol in C.get("sfx", []):
    s_ = SFX[name](); j = int(tt * SR); mix[j:j + len(s_)] += s_[:len(mix) - j] * vol
sfxw = os.path.join(work, "sfx.wav")
with wave.open(sfxw, "wb") as wv:
    wv.setnchannels(1); wv.setsampwidth(2); wv.setframerate(SR); wv.writeframes((np.clip(mix, -1, 1) * 32767).astype(np.int16).tobytes())
out = C["saida"]
subprocess.run(FF + ["-y", "-i", tmpv, "-i", src, "-i", sfxw, "-filter_complex",
                f"[1:a]aformat=sample_rates=48000:channel_layouts=stereo,afade=t=out:st={NV/FPS-0.12:.3f}:d=0.12,apad[v];[2:a]aformat=sample_rates=48000:channel_layouts=stereo[s];"
                f"[v][s]amix=inputs=2:duration=longest:normalize=0,atrim=0:{dur:.3f},loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]",
                "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", out], check=True)
# ---------- 5. capa e folha
subprocess.run(FF + ["-y", "-ss", str(C.get("capa_t", 2.0)), "-i", out, "-frames:v", "1", "-q:v", "3", out[:-4] + "_capa.jpg"], check=True)
subprocess.run(FF + ["-y", "-i", out, "-vf", f"fps=1/{C.get('folha_passo', 2)},scale=270:-1,tile=6x2", "-frames:v", "1", "-q:v", "3", out[:-4] + "_folha.jpg"], check=True)
log("pronto", out)
