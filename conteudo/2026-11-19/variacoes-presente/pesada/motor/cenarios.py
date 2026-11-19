"""Cenários em código para trás do Wesley (sem IA, sem crédito): camadas pré-desenhadas + parallax por quadro.
Cada cenário é uma classe com frame(t) -> imagem BGR float32 1080x1920.
"""
import math, numpy as np, cv2

W, H, MARG = 1080, 1920, 120  # margem lateral para o parallax


def rgba_over(dst, layer, x):  # layer RGBA float (h, w+2*MARG) deslocado x px
    sl = layer[:, MARG - x:MARG - x + W] if 0 <= MARG - x <= 2 * MARG else layer[:, MARG:MARG + W]
    a = sl[..., 3:4]
    return dst * (1 - a) + sl[..., :3] * a


def shift(img, x):
    x = int(round(x)); x = max(-MARG, min(MARG, x))
    return img[:, MARG - x:MARG - x + W]


def vignette(k=0.75):
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    d = np.sqrt(((xx - 540) / 760) ** 2 + ((yy - 860) / 1150) ** 2)
    return (1 - k * np.clip(d - 0.35, 0, 1) ** 1.3)[..., None]


class Particulas:
    def __init__(self, n=140, cor=(170, 200, 255), seed=7, sobe=True):
        r = np.random.default_rng(seed)
        self.p = r.random((n, 4)); self.cor = np.array(cor, np.float32); self.sobe = sobe
        self.spr = {}
    def sprite(self, rad):
        if rad not in self.spr:
            s = rad * 3; g = np.zeros((2 * s + 1, 2 * s + 1), np.float32); cv2.circle(g, (s, s), rad, 1.0, -1)
            self.spr[rad] = cv2.GaussianBlur(g, (0, 0), rad * 0.8)
        return self.spr[rad]
    def draw(self, img, t, drift):
        for x0, y0, z, s in self.p:
            sp = 20 + 80 * z
            y = ((y0 * H - (t * sp if self.sobe else -t * sp)) % H)
            x = x0 * (W + 300) - 150 + math.sin(t * 0.6 + s * 6) * 30 * z + drift * 2.2 * z
            rad = int(2 + z * 6); sp_ = self.sprite(rad); a = 0.10 + 0.32 * z
            hh = sp_.shape[0] // 2; xi, yi = int(x), int(y)
            x0_, y0_, x1_, y1_ = max(0, xi - hh), max(0, yi - hh), min(W, xi + hh + 1), min(H, yi + hh + 1)
            if x1_ <= x0_ or y1_ <= y0_: continue
            sub = sp_[y0_ - (yi - hh):y1_ - (yi - hh), x0_ - (xi - hh):x1_ - (xi - hh)]
            img[y0_:y1_, x0_:x1_] += sub[..., None] * self.cor * a
        return img


class Tatame:
    """Academia escura: parede de ripas, neon vermelho, sacos de pancada balançando, tatame vermelho e preto, feixe de luz e poeira."""
    def __init__(self):
        WW = W + 2 * MARG
        far = np.zeros((H, WW, 3), np.float32)
        for y in range(H):
            f = y / H; far[y] = np.array([10, 9, 12]) * (1 - f) + np.array([8, 8, 22]) * f
        for i in range(0, WW, 34):
            far[0:1150, i:i + 30] += (4 if (i // 34) % 2 else 0)
        # tatame em perspectiva
        vy, vx = 1050, WW // 2
        for r in range(14):
            y0 = vy + (r / 14) ** 1.8 * 900; y1 = vy + ((r + 1) / 14) ** 1.8 * 900
            for c in range(-14, 14):
                f0, f1 = (y0 - vy) / 900, (y1 - vy) / 900; w = 260
                pts = np.array([[vx + c * w * f0 * 3, y0], [vx + (c + 1) * w * f0 * 3, y0], [vx + (c + 1) * w * f1 * 3, y1], [vx + c * w * f1 * 3, y1]], np.int32)
                cv2.fillConvexPoly(far, pts, (14, 12, 62) if (r + c) % 2 else (14, 13, 16))
        far[1050:] *= np.linspace(0.55, 0.9, H - 1050, dtype=np.float32)[:, None, None]
        self.far = cv2.GaussianBlur(far, (0, 0), 9)
        neon = np.zeros((H, WW, 3), np.float32)
        for x, a in [(150, 0.9), (930, 1.0), (540, 0.55)]:
            x += MARG
            cv2.rectangle(neon, (x - 9, 90), (x + 9, 910), (60 * a, 70 * a, 255 * a), -1)
        glow = cv2.GaussianBlur(neon, (0, 0), 60) * 6 + cv2.GaussianBlur(neon, (0, 0), 14) * 1.5
        self.neon = cv2.GaussianBlur(neon, (0, 0), 3) + glow
        # sacos de pancada (camada RGBA, um por saco, pivô no topo)
        self.bags = []
        for x, ph in [(300, 0.9), (790, 1.1)]:
            lay = np.zeros((760, 200, 4), np.float32)
            cv2.rectangle(lay, (96, 0), (104, 140), (20, 26, 42, 1), -1)
            for xx in range(25, 175):
                f = (xx - 25) / 150; col = np.array([12, 12, 14]) + np.array([22, 26, 40]) * max(0, 1 - abs(f - 0.3) * 2.2)
                lay[140:700, xx, :3] = np.clip(col, 5, 255); lay[140:700, xx, 3] = 1
            lay[240:262, 25:175, :3] = (20, 20, 120); lay[600:622, 25:175, :3] = (20, 20, 120)
            for yy, ry in ((140, 1), (700, -1)):
                cv2.ellipse(lay, (100, yy), (75, 18), 0, 0 if ry > 0 else 180, 180 if ry > 0 else 360, (0, 0, 0, 0), -1)
            self.bags.append((x, ph, cv2.GaussianBlur(lay, (0, 0), 4)))
        beam = np.zeros((H, W), np.float32)
        cv2.fillConvexPoly(beam, np.array([[700, 0], [880, 0], [720, 1400], [160, 1400]], np.int32), 1)
        grad = np.linspace(0.17, 0, H, dtype=np.float32)[:, None]
        self.beam = (cv2.GaussianBlur(beam, (0, 0), 45) * grad)[..., None] * np.array([160, 190, 255], np.float32)
        self.vig = vignette(); self.pt = Particulas(cor=(150, 190, 255))

    def frame(self, t):
        cx = math.sin(t * 0.35)
        img = shift(self.far, cx * 18).copy()
        fl = 0.85 + 0.15 * math.sin(t * 9) * math.sin(t * 3.1)
        img += shift(self.neon, cx * 40) * fl
        for x, ph, lay in self.bags:
            ang = math.sin(t * 1.3 + ph) * 3.0
            M = cv2.getRotationMatrix2D((100, 0), ang, 1.0)
            r = cv2.warpAffine(lay, M, (200, 760))
            x0 = int(x - 100 + cx * 55); y0 = 40
            x1, y1 = min(W, x0 + 200), y0 + 760
            sx = max(0, -x0); sub = r[:, sx:x1 - x0]; xa = max(0, x0)
            a = sub[..., 3:4]
            img[y0:y1, xa:x1] = img[y0:y1, xa:x1] * (1 - a) + sub[..., :3] * a
        img += self.beam
        img = self.pt.draw(img, t, cx * 90)
        return np.clip(img * self.vig, 0, 255)


SCENES = {"tatame": Tatame}


class Rua:
    """Rua à noite desfocada: prédios com janelas acesas, postes laranja, faróis e lanternas passando, asfalto molhado refletindo, garoa."""
    def __init__(self):
        rng = np.random.default_rng(11); WW = W + 2 * MARG
        sky = np.zeros((H, WW, 3), np.float32)
        for y in range(H):
            f = y / 1150; sky[y] = np.array([40, 18, 10]) * (1 - min(f, 1)) + np.array([60, 30, 22]) * min(f, 1)
        # prédios (longe)
        x = 0
        while x < WW:
            bw = int(rng.integers(120, 260)); top = int(rng.integers(150, 600))
            cv2.rectangle(sky, (x, top), (x + bw, 1150), (22, 14, 12), -1)
            for wy in range(top + 30, 1120, 46):
                for wx in range(x + 16, x + bw - 20, 34):
                    if rng.random() < 0.38:
                        c = (90, 190, 255) if rng.random() < 0.7 else (255, 230, 200)
                        cv2.rectangle(sky, (wx, wy), (wx + 16, wy + 22), tuple(v * rng.uniform(0.5, 1) for v in c), -1)
            x += bw + int(rng.integers(6, 30))
        # rua e calçada
        cv2.rectangle(sky, (0, 1150), (WW, H), (26, 20, 18), -1)
        refl = cv2.flip(sky[650:1150], 0) * 0.35
        sky[1150:1650] += cv2.resize(refl, (WW, 500)) * np.linspace(1, 0, 500, dtype=np.float32)[:, None, None]
        self.far = cv2.GaussianBlur(sky, (0, 0), 10)
        # postes (meio): bokeh grande laranja
        lamp = np.zeros((H, WW, 3), np.float32)
        for lx in (60, 520, 980, 1260):
            cv2.circle(lamp, (lx, 330), 34, (60, 150, 255), -1)
            cv2.line(lamp, (lx, 330), (lx, 1600), (55, 140, 240), 6)
        self.lamp = cv2.GaussianBlur(lamp, (0, 0), 18) * 1.6 + cv2.GaussianBlur(lamp, (0, 0), 70) * 4
        self.car = [(rng.uniform(0, 1), rng.uniform(0.6, 1.4), 1 if rng.random() < 0.5 else -1, rng.uniform(0, 1)) for _ in range(9)]
        self.disc = {}
        self.vig = vignette(0.7)
        self.rain = rng.random((220, 3))
        self.pt = Particulas(n=70, cor=(255, 210, 160), seed=5)

    def bokeh(self, rad):
        if rad not in self.disc:
            s = rad * 2; g = np.zeros((2 * s + 1, 2 * s + 1), np.float32); cv2.circle(g, (s, s), rad, 1.0, -1)
            self.disc[rad] = cv2.GaussianBlur(g, (0, 0), rad * 0.35)
        return self.disc[rad]

    def add_disc(self, img, x, y, rad, col, a):
        d = self.bokeh(rad); hh = d.shape[0] // 2; xi, yi = int(x), int(y)
        x0, y0, x1, y1 = max(0, xi - hh), max(0, yi - hh), min(W, xi + hh + 1), min(H, yi + hh + 1)
        if x1 <= x0 or y1 <= y0: return
        img[y0:y1, x0:x1] += d[y0 - (yi - hh):y1 - (yi - hh), x0 - (xi - hh):x1 - (xi - hh)][..., None] * np.array(col, np.float32) * a

    def frame(self, t):
        cx = math.sin(t * 0.3)
        img = shift(self.far, cx * 15).copy() + shift(self.lamp, cx * 45)
        for ph, sp, d, lane in self.car:  # faróis brancos indo, lanternas vermelhas voltando
            x = ((ph + t * 0.18 * sp * d) % 1.4 - 0.2) * W
            y = 1120 + lane * 60
            col = (230, 240, 255) if d > 0 else (40, 40, 255)
            for k in (0, 1):
                self.add_disc(img, x + k * 70, y, 26, col, 0.9)
                self.add_disc(img, x + k * 70, y + 140, 30, col, 0.25)  # reflexo no asfalto
        rr = self.rain
        for x0, y0, z in rr:  # garoa
            y = (y0 * H + t * (900 + 600 * z)) % H; x = (x0 * W + y * 0.15) % W
            cv2.line(img, (int(x), int(y)), (int(x + 6), int(y + 30 + 30 * z)), (110, 105, 100), 1)
        img = self.pt.draw(img, t, cx * 60)
        return np.clip(img * self.vig, 0, 255)


class Estudio:
    """Estúdio preto e vermelho: painéis de luz vermelha, halo atrás da cabeça, fumaça rolando, chão brilhante, varredura de luz."""
    def __init__(self):
        rng = np.random.default_rng(21); WW = W + 2 * MARG
        base = np.zeros((H, WW, 3), np.float32); base[:] = (8, 7, 9)
        pan = np.zeros((H, WW, 3), np.float32)
        for x in (70, WW - 70):
            cv2.rectangle(pan, (x - 40, 120), (x + 40, 1180), (40, 40, 255), -1)
        for x in (330, WW - 330):
            cv2.rectangle(pan, (x - 8, 200), (x + 8, 1100), (60, 60, 255), -1)
        self.pan = cv2.GaussianBlur(pan, (0, 0), 6) * 0.9 + cv2.GaussianBlur(pan, (0, 0), 80) * 1.8
        # chão brilhante com reflexo dos painéis
        floor = np.zeros((H, WW, 3), np.float32)
        floor[1180:] = (14, 12, 16)
        refl = cv2.flip(self.pan[600:1180], 0) * 0.3
        floor[1180:1760] += refl * np.linspace(1, 0, 580, dtype=np.float32)[:, None, None]
        self.base = cv2.GaussianBlur(base + floor, (0, 0), 6)
        yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
        self.halo = np.exp(-(((xx - 540) / 420) ** 2 + ((yy - 620) / 520) ** 2))[..., None] * np.array([22, 20, 130], np.float32)
        n = rng.random((H // 16, (W + 600) // 16)).astype(np.float32)
        smoke = cv2.resize(cv2.GaussianBlur(n, (0, 0), 3), (W + 600, H), interpolation=cv2.INTER_CUBIC)
        self.smoke = np.clip((smoke - 0.45) * 3, 0, 1)
        self.vig = vignette(0.8); self.pt = Particulas(n=90, cor=(110, 120, 255), seed=9)
        self.sweeps = []

    def frame(self, t):
        cx = math.sin(t * 0.32)
        img = shift(self.base, cx * 15).copy()
        img += shift(self.pan, cx * 35) * (0.9 + 0.1 * math.sin(t * 2.3))
        img += self.halo * (0.75 + 0.25 * math.sin(t * 1.6))
        off = int((t * 40) % 600)
        img += self.smoke[:, off:off + W, None] * np.array([12, 10, 45], np.float32)
        ph = (t % 4.5) / 4.5  # varredura de luz em diagonal
        x = -400 + ph * 1900
        beam = np.zeros((H, W), np.float32)
        cv2.fillConvexPoly(beam, np.array([[int(x), 0], [int(x + 160), 0], [int(x - 500), H], [int(x - 660), H]], np.int32), 1)
        img += cv2.blur(beam, (61, 61))[..., None] * np.array([40, 40, 110], np.float32) * 0.5
        img = self.pt.draw(img, t, cx * 70)
        return np.clip(img * self.vig, 0, 255)


SCENES.update({"rua": Rua, "estudio": Estudio})


class Garagem:
    """Estacionamento à noite: teto de concreto com lâmpadas tubulares em perspectiva, pilares, faixas amarelas no chão, carros parados com reflexo, luz esverdeada piscando."""
    def __init__(self):
        rng = np.random.default_rng(31); WW = W + 2 * MARG
        img = np.zeros((H, WW, 3), np.float32)
        for y in range(H):
            f = y / H; img[y] = np.array([30, 34, 30]) * (1 - f) + np.array([18, 20, 18]) * f
        vx, vy = WW // 2, 760
        # teto e chão em perspectiva (linhas de fuga)
        for k in range(-10, 11):
            cv2.line(img, (vx, vy), (vx + k * 260, 0), (40, 44, 40), 3)
            cv2.line(img, (vx, vy), (vx + k * 260, H), (34, 36, 34), 2)
        for k in (-3, 3):  # faixas amarelas
            cv2.line(img, (vx + k * 12, vy + 20), (vx + k * 330, H), (30, 190, 230), 12)
        for r in range(1, 9):  # pilares
            d = (r / 9) ** 1.6; h_ = int(40 + 900 * d); w_ = int(14 + 120 * d)
            for sgn in (-1, 1):
                x = int(vx + sgn * (90 + 640 * d)); cv2.rectangle(img, (x - w_ // 2, vy - h_ // 2), (x + w_ // 2, vy + h_ // 2 + int(200 * d)), (52, 56, 54), -1)
                cv2.rectangle(img, (x - w_ // 2, vy + int(h_ * 0.15)), (x + w_ // 2, vy + int(h_ * 0.22)), (30, 170, 220), -1)
        cars = [(-1, 0.75), (1, 0.8), (-1, 0.45), (1, 0.5)]
        for sgn, d in cars:  # carros: silhueta escura com lanterna
            cx_ = int(vx + sgn * 560 * d); cy = int(vy + 520 * d); cw = int(520 * d); ch = int(230 * d)
            cv2.rectangle(img, (cx_ - cw // 2, cy - ch // 2), (cx_ + cw // 2, cy + ch // 2), (16, 16, 18), -1)
            cv2.rectangle(img, (cx_ - cw // 2 + int(30 * d), cy - ch // 2 - int(90 * d)), (cx_ + cw // 2 - int(40 * d), cy - ch // 2), (12, 12, 14), -1)
            for k in (-1, 1): cv2.circle(img, (cx_ + k * int(cw * 0.38), cy - int(ch * 0.1)), int(16 * d) + 2, (40, 40, 230), -1)
        self.base = cv2.GaussianBlur(img, (0, 0), 7)
        tubes = np.zeros((H, WW, 3), np.float32)
        self.tpos = []
        for r in range(1, 8):
            d = (r / 8) ** 1.7; y = int(vy - 700 * d); w_ = int(30 + 330 * d)
            for sgn in (-1, 0, 1):
                x = int(vx + sgn * 520 * d); cv2.rectangle(tubes, (x - w_ // 2, y - int(3 + 8 * d)), (x + w_ // 2, y + int(3 + 8 * d)), (225, 255, 230), -1)
        self.tubes = cv2.GaussianBlur(tubes, (0, 0), 3) + cv2.GaussianBlur(tubes, (0, 0), 40) * 2.5
        refl = cv2.flip(self.tubes[0:vy], 0) * 0.25
        self.tubes[vy:vy + refl.shape[0]] += refl[:H - vy]
        self.vig = vignette(0.8); self.pt = Particulas(n=80, cor=(200, 230, 210), seed=4)

    def frame(self, t):
        cx = math.sin(t * 0.33)
        img = shift(self.base, cx * 20).copy()
        fl = 1.0 if (int(t * 7) % 23) else 0.55  # uma lâmpada falhando de vez em quando
        img += shift(self.tubes, cx * 30) * fl
        img = self.pt.draw(img, t, cx * 60)
        return np.clip(img * self.vig, 0, 255)


class Sala:
    """Sala de casa à noite: abajur com luz quente, TV com luz azul piscando, sofá, janela com a cidade desfocada, planta."""
    def __init__(self):
        rng = np.random.default_rng(41); WW = W + 2 * MARG
        img = np.zeros((H, WW, 3), np.float32)
        for y in range(H):
            f = y / H; img[y] = np.array([22, 26, 36]) * (1 - f) + np.array([14, 16, 22]) * f
        # janela com cidade
        wx0, wy0, wx1, wy1 = 640, 160, 1120, 900
        cv2.rectangle(img, (wx0, wy0), (wx1, wy1), (50, 26, 14), -1)
        for _ in range(160):
            x = int(rng.uniform(wx0, wx1)); y = int(rng.uniform(wy0 + 200, wy1))
            cv2.circle(img, (x, y), int(rng.uniform(3, 8)), tuple(float(v) for v in rng.choice([(80, 180, 255), (230, 220, 200), (60, 120, 250)])), -1)
        for x in range(wx0, wx1, 160): cv2.line(img, (x, wy0), (x, wy1), (18, 18, 22), 14)
        cv2.rectangle(img, (wx0, wy0), (wx1, wy1), (18, 18, 22), 18)
        # quadro na parede, estante
        cv2.rectangle(img, (170, 300), (470, 520), (30, 40, 60), -1); cv2.rectangle(img, (170, 300), (470, 520), (20, 22, 26), 12)
        # sofá
        cv2.rectangle(img, (-50, 980), (WW + 50, 1400), (34, 38, 52), -1); cv2.rectangle(img, (-50, 900), (WW + 50, 1020), (40, 46, 62), -1)
        cv2.rectangle(img, (0, 1400), (WW, H), (16, 20, 30), -1)
        # abajur: cúpula e pé
        cv2.fillConvexPoly(img, np.array([[230, 620], [370, 620], [400, 760], [200, 760]], np.int32), (110, 190, 245))
        cv2.line(img, (300, 760), (300, 960), (30, 40, 50), 10)
        # planta
        for k in range(14):
            a = -1.2 + k * 0.18; cv2.ellipse(img, (110, 840), (30, 150), math.degrees(a), 0, 360, (30, 70, 34), -1)
        self.base = cv2.GaussianBlur(img, (0, 0), 9)
        lamp = np.zeros((H, WW, 3), np.float32)
        cv2.ellipse(lamp, (300, 700), (90, 60), 0, 0, 360, (110, 190, 255), -1)
        self.lamp = cv2.GaussianBlur(lamp, (0, 0), 25) * 1.2 + cv2.GaussianBlur(lamp, (0, 0), 160) * 6
        tv = np.zeros((H, W, 3), np.float32); cv2.ellipse(tv, (900, 1150), (420, 700), 0, 0, 360, (255, 170, 90), -1)
        self.tv = cv2.GaussianBlur(tv, (0, 0), 120) * 0.2
        self.vig = vignette(0.75); self.pt = Particulas(n=60, cor=(150, 200, 255), seed=8)

    def frame(self, t):
        cx = math.sin(t * 0.3)
        img = shift(self.base, cx * 15).copy() + shift(self.lamp, cx * 30)
        fl = 0.6 + 0.4 * (0.5 + 0.5 * math.sin(t * 7.3) * math.sin(t * 2.9 + 1))  # TV piscando
        img += self.tv * fl
        img = self.pt.draw(img, t, cx * 40)
        return np.clip(img * self.vig, 0, 255)


class Perigo:
    """Fundo gráfico amarelo e preto: listras de perigo andando, grade em perspectiva, retícula, faixas pretas."""
    def __init__(self):
        self.yy, self.xx = np.mgrid[0:H, 0:W].astype(np.float32)
        g = np.zeros((H, W, 3), np.float32); g[:] = (20, 200, 250)  # amarelo
        hor = 980
        for k in range(-14, 15):
            cv2.line(g, (540, hor), (540 + k * 220, H), (10, 120, 170), 3)
        for r in range(1, 12):
            y = int(hor + (H - hor) * (r / 12) ** 1.8); cv2.line(g, (0, y), (W, y), (10, 120, 170), 3)
        dots = ((np.sin(self.xx * 0.35) * np.sin(self.yy * 0.35)) > 0.75).astype(np.float32)
        g -= dots[..., None] * np.array([12, 60, 70]) * (self.yy[..., None] < hor)
        self.base = cv2.GaussianBlur(g, (0, 0), 1.5)
        self.vig = vignette(0.55)

    def frame(self, t):
        img = self.base.copy()
        for y0, y1, sp in ((0, 150, 120), (1780, H, -120)):  # faixas de perigo andando
            band = ((((self.xx[y0:y1] + self.yy[y0:y1]) + t * sp) % 120) < 60)
            img[y0:y1][band] = (12, 12, 14); img[y0:y1][~band] = (20, 205, 255)
        k = 0.5 + 0.5 * math.sin(t * 1.4)  # luz que respira no centro
        img += np.exp(-(((self.xx - 540) / 500) ** 2 + ((self.yy - 700) / 600) ** 2))[..., None] * np.array([40, 60, 60], np.float32) * k
        return np.clip(img * self.vig, 0, 255)


SCENES.update({"garagem": Garagem, "sala": Sala, "perigo": Perigo})
