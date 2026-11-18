#!/usr/bin/env bash
# Fala com a ponte do Apps Script (planilha WG, conta Luis corinthiano).
# Precisa das variáveis WG_PONTE_URL, WG_PONTE_K e WG_PONTE_A (passadas na tarefa agendada, nunca no repositório).
# Uso:
#   rotinas/ponte.sh ler Painel
#   rotinas/ponte.sh ler Vendas 100
#   rotinas/ponte.sh adicionar "Fila de aprovação" '["20261119-social-1","2026-11-19 09:10","social-media-wg","post","Resumo","aprovacao/propostas/20261119-social-1.md","","baixo","PENDENTE","","","",""]'
#   rotinas/ponte.sh atualizar 20261119-social-1 '{"Status":"EXECUTADO","Executado em":"2026-11-19 12:01","Evidência":"link"}'
#   rotinas/ponte.sh email "Debriefing 19/11" relatorios/2026-11-19-debrief.md
set -euo pipefail
: "${WG_PONTE_URL:?falta WG_PONTE_URL}" "${WG_PONTE_K:?falta WG_PONTE_K}" "${WG_PONTE_A:?falta WG_PONTE_A}"
acao="${1:?acao}"; shift
case "$acao" in
  ler)       corpo=$(python3 -c 'import json,sys;print(json.dumps({"acao":"ler","aba":sys.argv[1],"ultimas":int(sys.argv[2]) if len(sys.argv)>2 else 50}))' "$@") ;;
  adicionar) corpo=$(python3 -c 'import json,sys;print(json.dumps({"acao":"adicionar","aba":sys.argv[1],"linha":json.loads(sys.argv[2])}))' "$@") ;;
  atualizar) corpo=$(python3 -c 'import json,sys;print(json.dumps({"acao":"atualizar","aba":"Fila de aprovação","id":sys.argv[1],"campos":json.loads(sys.argv[2])}))' "$@") ;;
  email)     corpo=$(python3 -c 'import json,sys;print(json.dumps({"acao":"email","assunto":sys.argv[1],"texto":open(sys.argv[2]).read()}))' "$@") ;;
  *) echo "acao desconhecida: $acao" >&2; exit 1 ;;
esac
curl -sSL -H 'Content-Type: application/json' --data "$corpo" "${WG_PONTE_URL}?k=${WG_PONTE_K}&a=${WG_PONTE_A}"
echo
