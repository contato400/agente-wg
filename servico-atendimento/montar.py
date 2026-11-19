#!/usr/bin/env python3
"""Monta conhecimento.txt (o que o agente do WhatsApp sabe) e worker.js.
Uso: python3 servico-atendimento/montar.py   (rodar da raiz do repositório)
Ordem importa: regras e contexto primeiro, depois produtos, venda e voz."""
import json, re, pathlib
R = pathlib.Path(__file__).resolve().parent.parent
FONTES = [
    '.claude/skills/regras-agente-atendimento-wg/SKILL.md',
    'conteudo/atendimento/contexto-projeto.md',
    '.claude/skills/suporte-acesso-wg/SKILL.md',
    '.claude/skills/funil-catalogo-wg/SKILL.md',
    'conteudo/atendimento/produtos-detalhes.md',
    '.claude/skills/base-produtos-wg/SKILL.md',
    'conteudo/atendimento/black-reabertura.md',
    '.claude/skills/vendas-negociacao-wg/SKILL.md',
    '.claude/skills/conducao-conexao-wg/SKILL.md',
    '.claude/skills/copy-conversacional-wg/SKILL.md',
    '.claude/skills/voz-humana-atendimento-wg/SKILL.md',
]
partes = []
for f in FONTES:
    t = (R / f).read_text()
    t = re.sub(r'^---\n.*?\n---\n', '', t, flags=re.S).strip()
    t = t.replace('(31) 97334-6056', '(31) 99329-4274').replace('5531973346056', '553193294274')
    partes.append(t)
k = '\n\n=====\n\n'.join(partes)
(R / 'servico-atendimento/conhecimento.txt').write_text(k)
tpl = (R / 'servico-atendimento/worker.template.js').read_text()
(R / 'servico-atendimento/worker.js').write_text(tpl.replace('__CONHECIMENTO__', json.dumps(k, ensure_ascii=False)))
print('conhecimento:', len(k), 'caracteres;', len(FONTES), 'fontes')
