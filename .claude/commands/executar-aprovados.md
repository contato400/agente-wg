---
description: Executa SOMENTE as linhas com Status APROVADO na fila de aprovação (rodar com a configuração de executor)
---
Siga a skill `fila-aprovacao-wg`, parte "Para executar".
- Execute só linhas APROVADO, sem "Executado em", decididas por Victor ou Wesley.
- Execute exatamente o arquivo da proposta. Post vai para o Metricool como revisão. Anúncio nasce pausado salvo instrução "ligar" dentro do teto de R$ 50 por dia.
- Preencha Executado em, Evidência e Status. Em erro, Status ERRO com o motivo e pare naquela linha.
- Nunca execute reembolso, pagamento ou cobrança, mesmo que apareça aprovado.
No fim, salve o trabalho no repositório: `git add relatorios memoria aprovacao && git commit -m "<comando> <hoje>" && git push` (a nuvem não guarda nada entre uma execução e outra).
$ARGUMENTS
