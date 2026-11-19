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
    'conteudo/atendimento/links-checkout.md',
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

# Equipe de agentes (19/11): fichas de cada agente + regras gerais + memória da operação, para o Victor falar com cada um pelo #nome.
def limpo(t): return re.sub(r'^---\n.*?\n---\n', '', t, flags=re.S).strip()
# Resumo de uma linha por agente (a ficha completa chega pela rotina diária: rotinas/whatsapp.sh memoria -> POST /equipe)
ch = (R / '.claude/agents/chefe-wg.md').read_text()
fichas = {}
for m in re.finditer(r'^\| `([a-z-]+-wg)` \| (.+?) \|$', ch, re.M): fichas[m.group(1)] = 'Responde por: ' + m.group(2).replace(' | ', '. Mede: ', 1).replace(' | ', '. Pode sozinho: ', 1)
fichas['chefe-wg'] = 'Coordenador da equipe (Agente WG): debriefing diário, decide qual agente faz o quê, consolida propostas na fila de aprovação e responde ao Victor.'
regras = 'Nada externo sem aprovação do Victor ou do Wesley (publicar, gastar, mandar mensagem a cliente, mexer em página, oferta, campanha). Reembolso e pagamento nunca por agente. Só o negócio do Wesley. Suporte oficial (31) 99329-4274. Sem travessão. Sucesso é venda, não atividade; separar comprovado de estimado. Sem dado pessoal de cliente em memória ou relatório. Expediente dos agentes 8h às 18h (o atendimento do WhatsApp responde 24 h).'
def ultimas_passagens(n=1):
    t = (R / 'memoria/passagem.md').read_text()
    blocos = re.split(r'(?m)^(?=## )', t)
    return '\n'.join(blocos[-n:]).strip()
mem = []
for nome in ['estado.md']:   # o resto chega pela rotina diária (POST /equipe)
    f = R / 'memoria' / nome
    if f.exists(): mem.append(f'### memoria/{nome}\n' + f.read_text().strip())
mem.append('### memoria/passagem.md (últimas entradas)\n' + ultimas_passagens())
equipe = {'regras': regras, 'fichas': fichas, 'memoria': '\n\n'.join(mem)}
out = tpl.replace('__CONHECIMENTO__', json.dumps(k, ensure_ascii=False)).replace('__EQUIPE__', json.dumps(equipe, ensure_ascii=False))
(R / 'servico-atendimento/worker.js').write_text(out)
(R / 'servico-atendimento/equipe-memoria.txt').write_text(equipe['memoria'])
print('equipe:', len(fichas), 'fichas; memoria', len(equipe['memoria']), 'caracteres; regras', len(regras))
print('conhecimento:', len(k), 'caracteres;', len(FONTES), 'fontes')
