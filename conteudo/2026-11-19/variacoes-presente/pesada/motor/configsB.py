"""Configurações das 3 pesadas do vídeo B (refeitas 19/11 18h22): começa pela condição, depois Pix parcelado, depois 23 treinamentos.
Fonte: ../condB.mp4 (cortes S5x,S4a,S4b,S6,S2a,S2b,S7 do _projeto/cut.py), palavras em ../condB.mp4.words.json.
Uso: python3 -I configsB.py <pasta_trabalho>
"""
import json, os, sys
M = os.path.dirname(os.path.abspath(__file__)); P = os.path.dirname(M)
WORK = sys.argv[1]
KEYS = ["23", "PROGRAMAS", "TREINAMENTO", "CURSO", "PIX", "PIX,", "PARCELADO", "PARCELAR", "CARTÃO", "CRÉDITO", "BOTÃO", "DINHEIRO", "COMPRAR"]
WHIPS = [3.38, 8.44, 10.78]
PUNCH = [[0.7, .04], [2.68, .05], [4.28, .05], [6.64, .04], [8.52, .05], [11.14, .04]]
SFX = [["pop", .05, .2], ["hit", 2.7, .28], ["whoosh", 3.25, .28], ["chime", 4.3, .22], ["pop", 6.64, .2], ["whoosh", 8.3, .28], ["hit", 8.55, .3], ["pop", 10.88, .2], ["chime", 12.55, .25]]
CC = {"layer": "fg", "type": "ccard", "t0": 1.5, "t1": 3.38, "y": 270, "tx": 2.68, "sc": 0.85}
PRECO = lambda cls="y": {"layer": "fg", "type": "card", "t0": 9.8, "t1": 10.78, "y": 300, "size": 62, "spin": 360, "cls": cls, "html": "PELO PREÇO DE UM CURSO"}
CLIQUE = {"layer": "fg", "type": "card", "t0": 10.85, "t1": 12.5, "y": 300, "size": 70, "cls": "solid", "rx": 90, "html": "CLIQUE NO BOTÃO ↓"}
V = {
 "B1": dict(scene="garagem", rim=[190, 255, 220], nome="wg_presenteB_9x16_pesada1-garagem_2026-11-19", fx=[
   {"layer": "fg", "type": "stamp", "t0": 0, "t1": 1.5, "y": 300, "size": 80, "cls": "y", "html": "QUER COMPRAR?"},
   CC,
   {"layer": "fg", "type": "big", "t0": 3.45, "t1": 5.1, "y": 300, "size": 120, "html": "PIX PARCELADO"},
   {"layer": "fg", "type": "coin", "t0": 3.6, "t1": 5.1, "x": 735, "y": 600, "size": 80, "html": "PIX"},
   {"layer": "bg", "type": "marquee", "t0": 5.16, "t1": 8.4, "y": 360, "size": 260, "speed": 650, "text": "PARCELE NO PIX"},
   {"layer": "fg", "type": "stamp", "t0": 6.5, "t1": 8.4, "y": 310, "size": 70, "cls": "y", "html": "PARCELE NO PIX"},
   {"layer": "bg", "type": "split", "t0": 8.44, "t1": 10.78, "chars": ["2", "3"], "x": [70, 770], "y": 470, "size": 400, "cls": "extw"},
   PRECO(), CLIQUE]),
 "B2": dict(scene="sala", rim=[255, 170, 90], nome="wg_presenteB_9x16_pesada2-sala-noite_2026-11-19", fx=[
   {"layer": "fg", "type": "card", "t0": 0, "t1": 1.5, "y": 300, "size": 80, "rx": 90, "cls": "y", "html": "QUER COMPRAR?"},
   CC,
   {"layer": "bg", "type": "gift", "t0": 3.4, "t1": 5.1, "x": 130, "y": 560, "notext": True, "size": 120, "html": ""},
   {"layer": "fg", "type": "big", "t0": 4.2, "t1": 5.1, "y": 300, "size": 120, "html": "PIX PARCELADO"},
   {"layer": "fg", "type": "coin", "t0": 6.5, "t1": 8.4, "x": 735, "y": 600, "size": 80, "html": "PIX"},
   {"layer": "bg", "type": "tilt", "t0": 6.6, "t1": 8.4, "x": 540, "y": 300, "size": 200, "cls": "extw", "html": "PARCELADO"},
   {"layer": "fg", "type": "big", "t0": 8.44, "t1": 9.8, "y": 300, "size": 110, "cls": "extw", "html": "23 TREINAMENTOS"},
   PRECO(), CLIQUE]),
 "B3": dict(scene="perigo", rim=[255, 220, 60], nome="wg_presenteB_9x16_pesada3-perigo-amarelo_2026-11-19", fx=[
   {"layer": "fg", "type": "stamp", "t0": 0, "t1": 1.5, "y": 300, "size": 80, "html": "QUER COMPRAR?"},
   CC,
   {"layer": "fg", "type": "stamp", "t0": 3.45, "t1": 5.1, "y": 300, "size": 90, "html": "PIX PARCELADO"},
   {"layer": "bg", "type": "marquee", "t0": 5.16, "t1": 8.4, "y": 360, "size": 260, "speed": 650, "dir": -1, "cls": "k", "text": "PIX PARCELADO"},
   {"layer": "fg", "type": "coin", "t0": 6.5, "t1": 8.4, "x": 735, "y": 600, "size": 80, "html": "PIX"},
   {"layer": "bg", "type": "split", "t0": 8.44, "t1": 10.78, "chars": ["2", "3"], "x": [70, 770], "y": 470, "size": 400, "cls": "extk"},
   PRECO(""), CLIQUE]),
}
for k, v in V.items():
    c = {"video": os.path.join(P, "condB.mp4"), "words": os.path.join(P, "condB.mp4.words.json"),
         "masks_raw": os.path.join(WORK, "masks"), "prep": os.path.join(WORK, "prep"), "trabalho": os.path.join(WORK, k),
         "saida": os.path.join(P, v["nome"] + ".mp4"), "scene": v["scene"], "rim": v["rim"], "rim_k": 0.7, "fx": v["fx"],
         "band": {"kind": "B", "y0": 1255, "y1": 1595, "pad": 110}, "capY": 1240, "keywords": KEYS,
         "punches": PUNCH, "whips": WHIPS, "sfx": SFX, "card": 2.5, "capa_t": 0.8, "folha_passo": 1.5}
    json.dump(c, open(os.path.join(M, f"cfgB_{k}.json"), "w"), ensure_ascii=False, indent=1)
print("ok")
