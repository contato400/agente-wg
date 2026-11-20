#!/usr/bin/env bash
# Narração com a voz Gemini (padrão desde 19/11, decisão do Victor). Uso: rotinas/voz.sh "texto" saida.wav [voz] [estilo]
# Usa o serviço do Cloudflare (/voz), que guarda a chave do Gemini (GEMINI_KEY). Se falhar, a peça cai na Piper e o relatório avisa.
set -euo pipefail
TXT="$1"; OUT="$2"; VOZ="${3:-Koda}"; EST="${4:-}"
URL="${WG_SERVICO_URL:-https://agente-wg.luiscorinthianoportoreal.workers.dev}"
BODY=$(python3 -c 'import json,sys;print(json.dumps({"texto":sys.argv[1],"voz":sys.argv[2],"estilo":sys.argv[3]}))' "$TXT" "$VOZ" "$EST")
code=$(curl -s -m 120 -o "$OUT" -w '%{http_code}' -X POST "$URL/voz" -H "Authorization: Bearer ${WG_AVISO_TOKEN}" -H 'content-type: application/json' --data "$BODY")
if [ "$code" != "200" ]; then echo "voz gemini falhou ($code): $(head -c 300 "$OUT")" >&2; rm -f "$OUT"; exit 1; fi
echo "ok $OUT"
