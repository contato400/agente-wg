"""Gera as configurações das 6 variações pesadas (mesma fala limpa, pacote visual diferente).
Uso: python3 -I configs.py <pasta_trabalho>   -> grava pesada/motor/cfg_<código>.json
Tempos das palavras: ../base.mp4.words.json (fala limpa de 19,9 s).
"""
import json, os, sys
M = os.path.dirname(os.path.abspath(__file__)); P = os.path.dirname(M)
WORK = sys.argv[1] if len(sys.argv) > 1 else "/tmp/wg_pesada"
KEYS = ["23", "PROGRAMAS", "TREINAMENTO", "CURSO", "URGENTE", "INSCRIÇÕES", "PIX", "PIX.", "PARCELADO", "PARCELAR", "CARTÃO", "CRÉDITO", "BOTÃO", "PAGAMENTO"]
WHIPS = [1.42, 3.81, 9.59, 18.15]
PUNCH = [[0.94, .05], [1.48, .05], [3.04, .03], [5.26, .03], [10.44, .05], [13.92, .04], [16.32, .03], [18.5, .04]]
SFX = [["pop", .62, .22], ["whoosh", 1.25, .3], ["hit", 1.5, .32], ["pop", 2.82, .2], ["whoosh", 3.64, .28], ["pop", 7.55, .2],
       ["whoosh", 9.42, .28], ["hit", 10.45, .3], ["hit", 13.9, .26], ["whoosh", 15.8, .25], ["whoosh", 17.98, .28], ["pop", 18.25, .2], ["chime", 19.9, .25]]
CLIQUE = {"layer": "fg", "type": "card", "t0": 18.2, "t1": 19.83, "y": 300, "size": 70, "cls": "solid", "rx": 90, "html": "CLIQUE NO BOTÃO ↓"}
SEMCARTAO = lambda cls="": {"layer": "fg", "type": "stamp", "t0": 13.9, "t1": 14.8, "y": 310, "size": 66, "cls": cls, "html": "NÃO TEM CARTÃO?"}
GIFT = {"layer": "bg", "type": "gift", "t0": 9.62, "t1": 12.3, "x": 130, "y": 560, "notext": True, "size": 120, "html": ""}
GIFTXT = {"layer": "fg", "type": "big", "t0": 10.3, "t1": 12.3, "y": 300, "size": 120, "html": "PIX PARCELADO"}

V = {
 "A1": dict(scene="tatame", band="A", rim=[255, 45, 35], nome="wg_presenteA_9x16_pesada1-tatame_2026-11-19", fx=[
   {"layer": "fg", "type": "card", "t0": .62, "t1": 1.42, "y": 300, "size": 78, "rx": 90, "html": "RECADO URGENTE"},
   {"layer": "bg", "type": "split", "t0": 1.42, "t1": 3.78, "chars": ["2", "3"], "x": [70, 770], "y": 470, "size": 400},
   {"layer": "fg", "type": "card", "t0": 2.82, "t1": 3.78, "y": 300, "size": 62, "spin": 360, "cls": "y", "html": "PELO PREÇO DE UM CURSO"},
   {"layer": "bg", "type": "marquee", "t0": 3.81, "t1": 7.5, "y": 340, "size": 300, "speed": 620, "text": "INSCRIÇÕES"},
   {"layer": "fg", "type": "card", "t0": 7.55, "t1": 9.55, "y": 300, "size": 60, "rx": 90, "html": "RECEBER O PAGAMENTO"},
   {"layer": "fg", "type": "big", "t0": 10.35, "t1": 12.3, "y": 300, "size": 120, "html": "PIX PARCELADO"},
   SEMCARTAO(),
   {"layer": "bg", "type": "marquee", "t0": 15.9, "t1": 18.15, "y": 360, "size": 260, "speed": 700, "dir": -1, "cls": "r", "text": "PIX PARCELADO"},
   CLIQUE]),
 "B1": dict(scene="tatame", band="B", rim=[255, 45, 35], nome="wg_presenteB_9x16_pesada1-tatame_2026-11-19", fx=[
   {"layer": "fg", "type": "stamp", "t0": .62, "t1": 1.42, "y": 300, "size": 74, "html": "RECADO URGENTE"},
   {"layer": "fg", "type": "big", "t0": 1.45, "t1": 2.8, "y": 300, "size": 110, "cls": "extw", "html": "23 TREINAMENTOS"},
   {"layer": "fg", "type": "card", "t0": 2.82, "t1": 3.78, "y": 300, "size": 62, "spin": 360, "cls": "y", "html": "PELO PREÇO DE UM CURSO"},
   {"layer": "fg", "type": "card", "t0": 3.85, "t1": 5.4, "y": 300, "size": 60, "rx": 90, "html": "INSCRIÇÕES ESTENDIDAS"},
   {"layer": "bg", "type": "marquee", "t0": 5.4, "t1": 9.5, "y": 340, "size": 300, "speed": 600, "text": "PAGAMENTO"},
   GIFT, GIFTXT, SEMCARTAO("y"),
   {"layer": "bg", "type": "marquee", "t0": 14.84, "t1": 16.2, "y": 360, "size": 260, "speed": 800, "dir": -1, "cls": "r", "text": "PARCELADO"},
   {"layer": "fg", "type": "coin", "t0": 16.2, "t1": 18.12, "x": 735, "y": 600, "size": 80, "html": "PIX"},
   CLIQUE]),
 "A2": dict(scene="rua", band="A", rim=[110, 170, 255], nome="wg_presenteA_9x16_pesada2-rua-noite_2026-11-19", fx=[
   {"layer": "bg", "type": "tilt", "t0": .62, "t1": 1.42, "x": 540, "y": 300, "size": 250, "cls": "extr", "html": "URGENTE"},
   {"layer": "bg", "type": "split", "t0": 1.42, "t1": 3.78, "chars": ["2", "3"], "x": [70, 770], "y": 470, "size": 400, "cls": "extw"},
   {"layer": "fg", "type": "card", "t0": 2.82, "t1": 3.78, "y": 300, "size": 62, "spin": 360, "cls": "b", "html": "PELO PREÇO DE UM CURSO"},
   {"layer": "bg", "type": "marquee", "t0": 3.81, "t1": 7.5, "y": 340, "size": 300, "speed": 620, "dir": -1, "text": "INSCRIÇÕES"},
   {"layer": "fg", "type": "stamp", "t0": 7.6, "t1": 9.5, "y": 310, "size": 60, "cls": "b", "html": "RECEBER O PAGAMENTO"},
   {"layer": "fg", "type": "coin", "t0": 10.35, "t1": 12.3, "x": 735, "y": 600, "size": 80, "html": "PIX"},
   {"layer": "bg", "type": "tilt", "t0": 10.6, "t1": 12.3, "x": 540, "y": 300, "size": 200, "cls": "extw", "html": "PARCELADO"},
   SEMCARTAO("b"),
   {"layer": "fg", "type": "big", "t0": 16.2, "t1": 18.15, "y": 300, "size": 120, "cls": "extw", "html": "PIX PARCELADO"},
   CLIQUE]),
 "B2": dict(scene="rua", band="B", rim=[110, 170, 255], nome="wg_presenteB_9x16_pesada2-rua-noite_2026-11-19", fx=[
   {"layer": "fg", "type": "card", "t0": .62, "t1": 1.42, "y": 300, "size": 78, "rx": 90, "cls": "b", "html": "RECADO URGENTE"},
   {"layer": "fg", "type": "big", "t0": 1.45, "t1": 2.8, "y": 300, "size": 110, "cls": "extw", "html": "23 TREINAMENTOS"},
   {"layer": "fg", "type": "card", "t0": 2.82, "t1": 3.78, "y": 300, "size": 62, "spin": 360, "cls": "b", "html": "PELO PREÇO DE UM CURSO"},
   {"layer": "bg", "type": "marquee", "t0": 3.81, "t1": 7.5, "y": 340, "size": 300, "speed": 620, "text": "INSCRIÇÕES"},
   {"layer": "fg", "type": "card", "t0": 7.55, "t1": 9.55, "y": 300, "size": 60, "rx": 90, "cls": "b", "html": "RECEBER O PAGAMENTO"},
   GIFT, GIFTXT, SEMCARTAO("b"),
   {"layer": "bg", "type": "marquee", "t0": 15.9, "t1": 18.15, "y": 360, "size": 260, "speed": 700, "text": "PIX PARCELADO"},
   CLIQUE]),
 "A3": dict(scene="estudio", band="A", rim=[255, 60, 50], nome="wg_presenteA_9x16_pesada3-estudio_2026-11-19", fx=[
   {"layer": "fg", "type": "stamp", "t0": .62, "t1": 1.42, "y": 300, "size": 74, "html": "RECADO URGENTE"},
   {"layer": "bg", "type": "split", "t0": 1.42, "t1": 3.78, "chars": ["2", "3"], "x": [60, 790], "y": 450, "size": 380, "cls": "extr"},
   {"layer": "fg", "type": "card", "t0": 2.82, "t1": 3.78, "y": 300, "size": 62, "spin": 360, "cls": "y", "html": "PELO PREÇO DE UM CURSO"},
   {"layer": "bg", "type": "marquee", "t0": 3.81, "t1": 7.5, "y": 340, "size": 300, "speed": 620, "cls": "r", "text": "INSCRIÇÕES"},
   {"layer": "fg", "type": "card", "t0": 7.55, "t1": 9.55, "y": 300, "size": 60, "rx": 90, "html": "RECEBER O PAGAMENTO"},
   {"layer": "fg", "type": "big", "t0": 10.35, "t1": 12.3, "y": 300, "size": 120, "cls": "extr", "html": "PIX PARCELADO"},
   SEMCARTAO(),
   {"layer": "bg", "type": "marquee", "t0": 15.9, "t1": 18.15, "y": 360, "size": 260, "speed": 700, "dir": -1, "cls": "r", "text": "PIX PARCELADO"},
   CLIQUE]),
 "B3": dict(scene="estudio", band="B", rim=[255, 60, 50], nome="wg_presenteB_9x16_pesada3-estudio_2026-11-19", fx=[
   {"layer": "fg", "type": "card", "t0": .62, "t1": 1.42, "y": 300, "size": 78, "rx": 90, "html": "RECADO URGENTE"},
   {"layer": "bg", "type": "split", "t0": 1.42, "t1": 3.78, "chars": ["2", "3"], "x": [70, 770], "y": 470, "size": 400, "cls": "extr"},
   {"layer": "fg", "type": "card", "t0": 2.82, "t1": 3.78, "y": 300, "size": 62, "spin": 360, "cls": "y", "html": "PELO PREÇO DE UM CURSO"},
   {"layer": "fg", "type": "stamp", "t0": 3.85, "t1": 5.4, "y": 310, "size": 60, "html": "INSCRIÇÕES ESTENDIDAS"},
   {"layer": "bg", "type": "marquee", "t0": 5.4, "t1": 9.5, "y": 340, "size": 300, "speed": 600, "dir": -1, "cls": "r", "text": "PAGAMENTO"},
   GIFT, GIFTXT, SEMCARTAO("y"),
   {"layer": "fg", "type": "coin", "t0": 16.2, "t1": 18.12, "x": 735, "y": 600, "size": 80, "html": "PIX"},
   {"layer": "bg", "type": "tilt", "t0": 16.2, "t1": 18.12, "x": 540, "y": 300, "size": 200, "cls": "extr", "html": "PARCELADO"},
   CLIQUE]),
}
for k, v in V.items():
    c = {"video": os.path.join(P, "base.mp4"), "words": os.path.join(P, "base.mp4.words.json"),
         "masks_raw": os.path.join(WORK, "masks"), "prep": os.path.join(WORK, "prep"), "trabalho": os.path.join(WORK, k),
         "saida": os.path.join(P, v["nome"] + ".mp4"), "scene": v["scene"], "rim": v["rim"], "fx": v["fx"],
         "band": {"kind": v["band"], "y0": 1255, "y1": 1595, "pad": 110}, "capY": 1240, "keywords": KEYS,
         "punches": PUNCH, "whips": WHIPS, "sfx": SFX, "card": 2.5, "capa_t": 1.8, "folha_passo": 2}
    json.dump(c, open(os.path.join(M, f"cfg_{k}.json"), "w"), ensure_ascii=False, indent=1)
print("ok", list(V))
