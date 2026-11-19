#!/usr/bin/env bash
# Canal dos agentes com o Victor pelo WhatsApp de suporte (serviço agente-wg na Cloudflare).
# Precisa de WG_AVISO_TOKEN (mesmo valor do segredo AVISO_TOKEN do serviço), passado na tarefa agendada, nunca no repositório.
# Uso:
#   rotinas/whatsapp.sh avisar financeiro "Texto curto para o Victor"      # mensagem de um agente (aparece como [Financeiro])
#   rotinas/whatsapp.sh avisar-arquivo chefe relatorios/2026-11-19-debrief.md  # manda um arquivo (debriefing) quebrado em partes
#   rotinas/whatsapp.sh memoria                                              # atualiza a memória que os agentes do WhatsApp enxergam
#   rotinas/whatsapp.sh recados                                              # lê (e limpa) recados e conversas feitos pelo WhatsApp
#   rotinas/whatsapp.sh peca social "Parte 3 · hoje 17h" video.mp4 capa.jpg legenda.md   # manda a peça pronta: vídeo, capa e legenda
#     (o vídeo é reduzido para caber no WhatsApp, até 16 MB; os arquivos ficam no link por 3 dias)
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
  peca)
    de="$1"; titulo="$2"; video="$3"; capa="${4:-}"; legenda="${5:-}"
    tmp=$(mktemp -d)
    ffmpeg -loglevel error -y -i "$video" -vf "scale=720:-2" -c:v libx264 -preset veryfast -crf 28 -c:a aac -b:a 96k -movflags +faststart "$tmp/v.mp4"
    sobe() { curl -sS -X POST -H "Authorization: Bearer ${WG_AVISO_TOKEN}" -H "Content-Type: $2" --data-binary @"$1" "${URL}/midia?ext=$3" | python3 -c 'import json,sys;print(json.load(sys.stdin)["url"])'; }
    uv=$(sobe "$tmp/v.mp4" video/mp4 mp4); uc=""; [ -n "$capa" ] && uc=$(sobe "$capa" image/jpeg jpg)
    corpo=$(python3 -c 'import json,sys,pathlib
de,tit,uv,uc,leg=sys.argv[1:6]
t=pathlib.Path(leg).read_text() if leg else ""
m=[{"tipo":"video","url":uv,"legenda":tit}]
if uc: m.append({"tipo":"image","url":uc,"legenda":"Capa · "+tit})
print(json.dumps({"de":de,"texto":"Peça pronta para postar: "+tit+"\n\nLegenda (copie e cole):\n\n"+t.strip(),"midia":m}))' "$de" "$titulo" "$uv" "$uc" "$legenda")
    post /avisar "$corpo"; rm -rf "$tmp" ;;
  recados) curl -sS -H "Authorization: Bearer ${WG_AVISO_TOKEN}" "${URL}/recados?limpar=1"; echo ;;
  *) echo "acao desconhecida: $acao" >&2; exit 1 ;;
esac
