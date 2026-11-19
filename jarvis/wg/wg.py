"""Ponte do Jarvis com a equipe de agentes do Mestre Wesley (Agente WG).

Uso: python wg.py <agente> "<pergunta>"
Agentes: chefe, financeiro, analista, social, atendimento, trafego, ofertas (ou paginas), juridico, sucesso, auditor.
Fala com os mesmos agentes do WhatsApp (#nome), com a mesma memória e a mesma conversa.
A senha fica na variável de ambiente WG_AVISO_TOKEN do Windows (nunca neste arquivo).
"""
import json, os, sys, urllib.request, urllib.error

URL = os.environ.get("WG_SERVICO_URL", "https://agente-wg.luiscorinthianoportoreal.workers.dev") + "/perguntar"


def main():
    if len(sys.argv) < 3:
        print(__doc__); return 2
    token = os.environ.get("WG_AVISO_TOKEN", "")
    if not token:
        print("Falta a senha da equipe (variável WG_AVISO_TOKEN). Rode de novo o INSTALAR-VICTOR.bat."); return 1
    agente, pergunta = sys.argv[1], " ".join(sys.argv[2:])
    req = urllib.request.Request(URL, data=json.dumps({"agente": agente, "pergunta": pergunta}).encode("utf-8"),
                                 headers={"Authorization": "Bearer " + token, "Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            d = json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        print("A equipe recusou o pedido (%s). Se for 403, a senha está errada." % e.code); return 1
    except Exception as e:
        print("Não consegui falar com a equipe agora: %s" % e); return 1
    sys.stdout.reconfigure(encoding="utf-8")
    print("[%s]\n%s" % (d.get("agente", agente), d.get("resposta", "")))
    return 0


if __name__ == "__main__":
    sys.exit(main())
