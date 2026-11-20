#!/usr/bin/env python3
"""Medição da reabertura (B02, analista-wg). Só leitura.
Uso: bash rotinas/ponte.sh ler Vendas 300 > /tmp/v.json && python3 rotinas/medir-reabertura.py /tmp/v.json
Lê a aba Vendas (14 colunas) e mostra, de sex 20/11 19h até seg 23/11 19h:
vendas por hora, por origem (vc x FB), por utm_content, aluno x não aluno (preço 347 x 397)
e a ordem dos compradores para os prêmios pelo ID da venda (sem nome; o Victor confere o nome na Greenn).
"""
import json, sys
from collections import Counter, defaultdict
from datetime import datetime
INI, FIM = datetime(2026, 11, 20, 19, 0), datetime(2026, 11, 23, 19, 0)
LIVROS = datetime(2026, 11, 20, 23, 59, 59)
num = lambda s: float(str(s).replace('.', '').replace(',', '.')) if s not in ('', None) else 0.0
d = json.load(open(sys.argv[1])); linhas = d.get('linhas', d)
black = []
for l in linhas:
    try: t = datetime.strptime(l[0], '%d/%m/%Y %H:%M:%S')
    except Exception: continue
    if not (INI <= t <= FIM): continue
    if 'BLACK CAVEIRA' not in l[3].upper(): continue
    black.append(dict(t=t, id=l[1], plat=l[2], prod=l[3], valor=num(l[6]), liq=num(l[8]), src=l[9] or '(sem)', med=l[10] or '(sem)', camp=l[11] or '(sem)', cont=l[12] or '(sem)', cls=l[13]))
black.sort(key=lambda x: x['t'])
print(f"Vendas da Black na reabertura: {len(black)} · bruto R$ {sum(x['valor'] for x in black):.2f} · líquido R$ {sum(x['liq'] for x in black):.2f}")
print('\nPor hora:'); h = Counter(x['t'].strftime('%d/%m %Hh') for x in black)
for k in sorted(h, key=lambda s: datetime.strptime('2026/' + s, '%Y/%d/%m %Hh')): print(f'  {k}: {h[k]}')
print('\nPor origem (utm_source / utm_medium):')
for k, v in Counter((x['src'], x['med']) for x in black).most_common(): print(f'  {k[0]} / {k[1]}: {v}')
print('\nPor mensagem (utm_content):')
for k, v in Counter(x['cont'] for x in black).most_common(): print(f'  {k}: {v}')
alu = [x for x in black if 330 <= x['valor'] <= 349]
print(f"\nAluno (preço 347, sem juros): {len(alu)} · não aluno ou parcelado: {len(black) - len(alu)} (parcelado com juros muda o valor: conferir a oferta na Greenn)")
print('\nOrdem para os prêmios (ID da venda Greenn, hora):')
for i, x in enumerate(black, 1):
    tags = []
    if i <= 3: tags.append('camisa')
    if i <= 20: tags.append('encontro')
    if x['t'] <= LIVROS: tags.append('livros')
    print(f"  {i:>2}. {x['id']} {x['t'].strftime('%d/%m %H:%M:%S')} {x['plat']} {x['src']} [{', '.join(tags)}]")
