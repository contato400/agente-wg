#!/usr/bin/env bash
# Canal dos agentes com o Victor pelo WhatsApp de suporte (serviço agente-wg na Cloudflare).
# Precisa de WG_AVISO_TOKEN (mesmo valor do segredo AVISO_TOKEN do serviço), passado na tarefa agendada, nunca no repositório.
# Uso:
#   rotinas/whatsapp.sh avisar financeiro "Texto curto para o Victor"      # mensagem de um agente (aparece como [Financeiro])
#   rotinas/whatsapp.sh avisar-arquivo chefe relatorios/2026-11-19-debrief.md  # manda um arquivo (debriefing) quebrado em partes
#   rotinas/whatsapp.sh memoria                                              # atualiza a memória que os agentes do WhatsApp enxergam
#   rotinas/whatsapp.sh recados                                              # lê (e limpa) recados e conversas feitos pelo WhatsApp
# Observação: o WhatsApp só deixa mensagem livre até 24 h depois da última mensagem do Victor para o número de suporte.
set -euo pipefail
: "${WG_AVISO_TOKEN:?falta WG_AVISO_TOKEN}"
URL="${WG_SERVICO_URL:-https://agente-wg.luiscorinthianoportoreal.workers.dev}"
cd "$(dirname "$0")/.."
acao="${1:?acao}"; shift || true
post() { curl -sS -X POST -H "Authorization: Bearer ${WG_AVISO_TOKEN}" -H 'Content-Type: application/json' --data "$2" "${URL}$1"; echo; }
case "$acao" in
  avisar)         post /avisar "$(python3 -c 'import json,sys;print(json.dumps({"de":sys.argv[1],"texto":sys.argv[2]}))' "$1" "$2")" ;;
  avisar-arquivo) post /avisar "$(python3 -c 'import json,sys;print(json.dumps({"de":sys.argv[1],"texto":open(sys.argv[2]).read()}))' "$1" "$2")" ;;
  memoria)
    corpo=$(python3 - <<'PY'
import json, pathlib, re
R = pathlib.Path('.')
partes = []
for n in ['estado.md', 'decisoes.md', 'backlog.md', 'conversas.md', 'aprendizados.md', 'voz-do-cliente.md']:
    f = R / 'memoria' / n
    if f.exists(): partes.append(f'### memoria/{n}\n' + f.read_text().strip())
p = (R / 'memoria/passagem.md').read_text()
blocos = re.split(r'(?m)^(?=## )', p)
partes.append('### memoria/passagem.md (últimas entradas)\n' + '\n'.join(blocos[-3:]).strip())
rel = sorted((R / 'relatorios').glob('*debrief*.md'))
if rel: partes.append(f'### último debriefing ({rel[-1].name})\n' + rel[-1].read_text()[:15000])
def limpo(t): return re.sub(r'^---\n.*?\n---\n', '', t, flags=re.S).strip()
fichas = {f.stem: limpo(f.read_text())[:12000] for f in sorted((R / '.claude/agents').glob('*.md'))}
print(json.dumps({'memoria': '\n\n'.join(partes)[:115000], 'regras': limpo((R / 'CLAUDE.md').read_text())[:20000], 'fichas': fichas}))
PY
)
    post /equipe "$corpo" ;;
  recados) curl -sS -H "Authorization: Bearer ${WG_AVISO_TOKEN}" "${URL}/recados?limpar=1"; echo ;;
  *) echo "acao desconhecida: $acao" >&2; exit 1 ;;
esac
