import json, os, subprocess, sys, html, re
from PIL import Image
from playwright.sync_api import sync_playwright

W = os.path.dirname(os.path.abspath(__file__))
OUT = "/home/claude/agente-wg/conteudo/2026-11-19/variacoes-presente"
L = os.path.join(W, "layers"); os.makedirs(L, exist_ok=True)
CARD_DUR = 2.5

FMT = {
    "9x16": dict(w=1080, h=1920, bar=(1150, 1515), cap=1128, crop=None),
    "4x5": dict(w=1080, h=1350, bar=(980, 1350), cap=958, crop=170),
}

FIX = {"vara": "Fala,", "clic": "Clique", "pique": "Clique", "pix": "Pix", "pix.": "Pix.", "pix,": "Pix,"}
KEY = {"23", "PROGRAMAS", "TREINAMENTO", "CURSO", "PIX", "PARCELADO", "PARCELAR", "CARTÃO", "BOTÃO", "URGENTE", "LIBERAR", "CRÉDITO"}

CSS = """
@font-face{font-family:Anton;src:url(data:font/ttf;base64,%s)}
html,body{margin:0;padding:0;background:transparent}
.cv{position:relative;overflow:hidden}
.band{position:absolute;left:0;right:0;background:#0a0a0a;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px}
.box{font-family:Anton;text-transform:uppercase;line-height:1.05;padding:10px 34px 14px;text-align:center}
.g{background:#119a1d;color:#fff}
.r{background:#c8141b;color:#fff}
.hook{font-family:Anton;color:#ffd21f;text-align:center;line-height:1.02;text-transform:uppercase}
.hook b{color:#fff;font-weight:normal}
.cap{position:absolute;left:110px;right:135px;text-align:center;font-family:'Inter Display';font-weight:900;font-size:68px;line-height:1.05;color:#fff;
 -webkit-text-stroke:12px #000;paint-order:stroke fill;text-transform:uppercase;letter-spacing:-0.5px}
.cap .k{color:#ffd21f}
""" % __import__("base64").b64encode(open(os.path.join(W,"fnt/Anton.ttf"),"rb").read()).decode()


def page_html(fmt, inner):
    f = FMT[fmt]
    return f"<html><head><meta charset='utf-8'><style>{CSS}</style></head><body><div class='cv' style='width:{f['w']}px;height:{f['h']}px'>{inner}</div></body></html>"


def bar_inner(fmt, kind):
    f = FMT[fmt]; y0, y1 = f["bar"]
    st = f"top:{y0}px;height:{y1-y0}px;"
    if fmt == "4x5":  # texto nunca abaixo de 1240
        st += "padding-bottom:70px;box-sizing:border-box;"
    if kind == "A":
        body = "<div class='box g'><div style='font-size:104px'>PRESENTE LIBERADO!</div><div style='font-size:66px;color:#0a0a0a'>ASSISTA ATÉ O FINAL</div></div>"
    elif kind == "B":
        body = "<div class='box g' style='font-size:96px'>PRESENTE LIBERADO</div><div class='box r' style='font-size:76px'>PARCELE NO PIX OU NO CARTÃO</div>"
    else:  # hook: (linha1, linha2)
        a, b = kind
        body = f"<div class='hook' style='font-size:118px'>{a}<br><b>{b}</b></div>"
    return f"<div class='band' style='{st}'>{body}</div>"


def cap_inner(fmt, words):
    f = FMT[fmt]
    t = " ".join(f"<span class='k'>{html.escape(w)}</span>" if re.sub(r"[^\wÀ-ú]", "", w) in KEY else html.escape(w) for w in words)
    return f"<div class='cap' style='top:{f['cap']}px;transform:translateY(-100%)'>{t}</div>"


def card_inner(fmt):
    f = FMT[fmt]
    top = 470 if fmt == "9x16" else 200
    return f"""<div style='position:absolute;inset:0;background:#0a0a0a'></div>
<div style='position:absolute;left:0;right:0;top:{top}px;text-align:center'>
 <div style='display:inline-block;background:#ffd21f;color:#0a0a0a;font-family:Anton;font-size:84px;padding:6px 36px 12px'>TOQUE EM SAIBA MAIS</div>
 <div style='font-family:Anton;color:#fff;font-size:118px;line-height:1.05;margin-top:46px'>E GARANTA OS<br><span style='color:#ffd21f'>23 TREINAMENTOS</span><br>DO MESTRE WESLEY</div>
 <div style='width:220px;height:10px;background:#c8141b;margin:46px auto'></div>
 <div style='font-family:"Inter Display";font-weight:800;color:#fff;font-size:50px;line-height:1.35'>1 ano de acesso<br>Certificado ao concluir<br>7 dias de garantia</div>
 <div style='font-family:"Inter Display";font-weight:700;color:#9a9a9a;font-size:32px;margin-top:{60 if fmt=="9x16" else 40}px;letter-spacing:1px'>MESTRE WESLEY GIMENEZ · KRAV MAGÁ CAVEIRA</div>
</div>"""


def groups(words_json):
    W_ = json.load(open(words_json))
    out, cur = [], []
    for i, w in enumerate(W_):
        t = FIX.get(w["w"].lower(), w["w"])
        if t.lower() == "caveira,": t = "Caveira,"
        cur.append((t.upper(), w["s"], w["e"]))
        nxt = W_[i + 1]["s"] if i + 1 < len(W_) else None
        brk = len(cur) >= 3 or t[-1] in ".,!?" or nxt is None or nxt - w["e"] > 0.35
        if brk:
            out.append([[c[0] for c in cur], cur[0][1], cur[-1][2]]); cur = []
    # cada grupo fica até o próximo começar
    for i, g in enumerate(out):
        g[2] = out[i + 1][1] if i + 1 < len(out) else g[2] + 0.3
    return out


def run(code, src, fmt, kind, hook=None):
    f = FMT[fmt]
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src], capture_output=True, text=True).stdout)
    G = groups(src + ".words.json")
    pages = {}
    def lay(name, inner):
        p = os.path.join(L, f"{code}_{name}.png")
        pages[p] = page_html(fmt, inner)
        return p
    barp = lay("bar", bar_inner(fmt, kind))
    hookp = lay("hook", bar_inner(fmt, hook)) if hook else None
    capp = [lay(f"cap{i}", cap_inner(fmt, g[0])) for i, g in enumerate(G)]
    cardp = lay("card", card_inner(fmt))
    with sync_playwright() as pw:
        b = pw.chromium.launch(); pg = b.new_page(viewport={"width": f["w"], "height": f["h"]})
        for p, h in pages.items():
            pg.set_content(h); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(80)
            pg.screenshot(path=p, omit_background=True)
        b.close()
    # intervalos
    cuts = sorted({0.0, dur, *(g[1] for g in G), *(g[2] for g in G), *([3.0] if hook else [])})
    cuts = [c for c in cuts if 0 <= c <= dur]
    lst = os.path.join(L, f"{code}_list.txt"); lines = []
    for i in range(len(cuts) - 1):
        a, z = cuts[i], cuts[i + 1]
        if z - a < 0.005: continue
        mid = (a + z) / 2
        im = Image.new("RGBA", (f["w"], f["h"]), (0, 0, 0, 0))
        im.alpha_composite(Image.open(hookp if (hook and mid < 3.0) else barp))
        for j, g in enumerate(G):
            if g[1] <= mid < g[2]: im.alpha_composite(Image.open(capp[j]))
        p = os.path.join(L, f"{code}_f{i:03d}.png"); im.save(p)
        lines += [f"file '{p}'", f"duration {z-a:.4f}"]
    lines.append(lines[-2])
    open(lst, "w").write("\n".join(lines) + "\n")
    vchain = "scale=1080:1920:flags=lanczos" + (f",crop=1080:1350:0:{f['crop']}" if f["crop"] else "")
    out = os.path.join(OUT, f"wg_presente{code[0]}_{fmt}_v{code[1]}-{NAMES[code]}_2026-11-19.mp4")
    fc = (f"[0:v]{vchain},setsar=1[bg];[1:v]format=rgba[ov];[bg][ov]overlay=0:0:shortest=1,fps=30,format=yuv420p[mv];"
          f"[2:v]scale={f['w']}:{f['h']},fps=30,format=yuv420p,fade=t=in:d=0.2[cv];"
          f"[0:a]aformat=sample_rates=48000:channel_layouts=stereo[ma];[3:a]aformat=sample_rates=48000:channel_layouts=stereo[ca];"
          f"[mv][ma][cv][ca]concat=n=2:v=1:a=1[v][a0];[a0]loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-f", "concat", "-safe", "0", "-i", lst,
                    "-loop", "1", "-t", str(CARD_DUR), "-i", cardp, "-f", "lavfi", "-t", str(CARD_DUR), "-i", "anullsrc=r=48000:cl=stereo",
                    "-filter_complex", fc, "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-preset", "veryfast", "-crf", "20",
                    "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", out], check=True)
    base = out[:-4]
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "1.0", "-i", out, "-frames:v", "1", "-q:v", "3", base + "_capa.jpg"], check=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", out, "-vf", "fps=1/2,scale=270:-1,tile=6x2", "-frames:v", "1", "-q:v", "3", base + "_folha.jpg"], check=True)
    print(out)


NAMES = {"A1": "base", "A2": "gancho-pergunta", "A3": "gancho-trecho-forte", "A4": "formato-4x5",
         "B1": "base-sem-boleto", "B2": "gancho-condicao", "B3": "tamanho-curto"}
JOBS = {
    "A1": ("base.mp4", "9x16", "A", None),
    "A2": ("base.mp4", "9x16", "A", ("SABERIA SE DEFENDER", "DE UM ATAQUE?")),
    "A3": ("forte.mp4", "9x16", "A", ("23 TREINAMENTOS", "DO MESTRE WESLEY")),
    "A4": ("base.mp4", "4x5", "A", None),
    "B1": ("base.mp4", "9x16", "B", None),
    "B2": ("condicao.mp4", "9x16", "B", ("SEM CARTÃO?", "PARCELE NO PIX")),
    "B3": ("curto.mp4", "9x16", "B", None),
}
if __name__ == "__main__":
    for c in sys.argv[1:] or JOBS:
        s, fm, k, h = JOBS[c]
        run(c, os.path.join(W, s), fm, k, h)
