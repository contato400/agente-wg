---
nome: Agente WG: debriefing
quando: o debriefing do dia da operação do Wesley (placar do mês, vendas de ontem, fila de aprovação e decisões do Victor)
gatilhos: debriefing, debrief, como foi ontem, placar do mês, quanto vendeu
agente: claude
nivel: medio
tempo_max_min: 20
parametros: dia = ontem (dia que o debriefing cobre)
entregas: debrief.md
---
Trabalhe dentro da pasta do repositório da equipe: `{pasta_jarvis}\..\agente-wg` (clonado ao lado da pasta do Jarvis). Antes de tudo leia `CLAUDE.md`, `tudo.md`, `memoria\estado.md` e a última entrada de `memoria\passagem.md`. Todas as regras do CLAUDE.md valem e mandam mais que este roteiro: nada externo sem aprovação (nada é publicado, agendado, enviado, pausado ou alterado fora do repositório), sem dado pessoal de cliente, sem travessão. As chaves da ponte e do WhatsApp vêm das variáveis de ambiente do Windows (`WG_PONTE_URL`, `WG_PONTE_K`, `WG_PONTE_A`, `WG_AVISO_TOKEN`); se faltarem, diga qual falta e siga só com o que der.

Objetivo: o debriefing de {dia} para {dono}, como o agente chefe-wg.

1. Siga a ficha `.claude\agents\chefe-wg.md` e a skill `debrief-diario-wg`. Se o relatório do dia já existir em `relatorios`, use ele em vez de refazer.
2. `entregas\debrief.md`: cópia do debriefing.
3. Não mande WhatsApp nem e-mail: a rotina das 7h35 já faz isso. Só se {dono} pedir.
4. Resposta falada: o placar do mês em uma frase e a decisão mais urgente dele.
