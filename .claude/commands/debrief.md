---
description: Debriefing diário do Agente WG (vendas, meta, atendimento, Instagram, anúncios, plano de hoje)
---
Use o agente `chefe-wg` com a skill `debrief-diario-wg`.
1. Peça ao `analista-wg` os números de ontem e do mês e ao `financeiro-wg` receita, custos e projeção.
2. Leia os relatórios de ontem em `relatorios/` e a aba "Fila de aprovação".
3. Escreva `relatorios/<hoje>-debrief.md` e atualize `memoria/estado.md`.
4. Mande por e-mail: `rotinas/ponte.sh email "Agente WG · debriefing <hoje>" relatorios/<hoje>-debrief.md`.
5. Responda com o debriefing completo, curto, em português.
No fim, salve o trabalho no repositório: `git add relatorios memoria aprovacao && git commit -m "<comando> <hoje>" && git push` (a nuvem não guarda nada entre uma execução e outra).
$ARGUMENTS
