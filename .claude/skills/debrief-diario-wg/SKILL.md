---
name: debrief-diario-wg
description: Formato e regras do debriefing diário do Agente WG para o Victor (vendas, meta, atendimento, Instagram, anúncios e plano do dia). Usar ao montar o relatório da manhã da operação do Mestre Wesley Gimenez.
---

# Debriefing diário · Agente WG

Lido pelo Victor no celular, de manhã. Precisa caber em 2 minutos de leitura.

## Ordem fixa
1. **Placar** (uma linha): "Mês: 118/150 vendas, R$ 25.900/30.000. Faltam 32 vendas em 12 dias = 2,7 por dia."
2. **Ontem em números** (tabela curta):
   | Frente | Resultado | vs. anteontem |
   |---|---|---|
   | Vendas orgânicas | | |
   | Vendas tráfego | | |
   | Recuperação de carrinho | | |
   | Upsell IA | | |
   | Atendimento (conversas / vendas / para humano) | | |
   | Instagram (posts / comentários com palavra-chave) | | |
   | Anúncios (gasto / vendas / custo por venda) | | |
3. **O que funcionou** (até 3, com número).
4. **O que não funcionou** (até 3, com número e o que fazer).
5. **Plano de hoje** (até 5 ações, cada uma com o agente e o motivo comercial).
6. **Fila de aprovação:** quantos itens esperam você, os mais urgentes primeiro, com o link da aba.
7. **Decisões suas**, numeradas.

## Regras
- Começa por venda, sempre. Atividade sem venda vai para o fim.
- Comprovado x estimado sempre separado.
- Se um dado não veio, diga "sem dado de X" em vez de omitir.
- Nada de dado pessoal de cliente.
- Onde entregar: arquivo `relatorios/AAAA-MM-DD-debrief.md` e no **WhatsApp do Victor** (decisão de 19/11: com o atendimento 24 h no ar, o canal é o WhatsApp, não o e-mail): `rotinas/whatsapp.sh avisar-arquivo chefe relatorios/AAAA-MM-DD-debrief.md`. Versão para WhatsApp: curta, sem tabela (lista simples), até ~3.500 caracteres por parte. Só use `rotinas/ponte.sh email` se o envio pelo WhatsApp falhar (ex.: Victor sem falar com o número há mais de 24 h).
- Depois do debriefing: `rotinas/whatsapp.sh recados` (traz recados e conversas que o Victor fez com os agentes pelo #nome; registrar em `memoria/conversas.md`) e `rotinas/whatsapp.sh memoria` (atualiza o que os agentes do WhatsApp enxergam).
