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
