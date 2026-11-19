# Memória compartilhada dos agentes

Três arquivos, cada um com prazo de validade diferente (memória que nunca expira vira ruído):

| Arquivo | O que guarda | Validade | Quem escreve |
|---|---|---|---|
| `estado.md` | Situação atual: meta do mês, campanha aberta, ofertas ativas, o que está no ar | Reescrito todo dia pelo `chefe-wg` | chefe-wg |
| `decisoes.md` | Decisões do Victor e do Wesley (o que foi aprovado, recusado, regras novas) | 90 dias; regra permanente fica marcada [FIXA] | qualquer agente, sempre com data e quem decidiu |
| `passagem.md` | Registro curto do que cada sessão fez (pedido, feito, decisões, pendente) | 30 dias; depois resumido | quem trabalhou |
| `backlog.md` | Iniciativas com dono, prazo e status | Viva; o chefe reordena aos sábados | chefe-wg e o dono do item |
| `voz-do-cliente.md` | Frases reais de dor, desejo, objeção e motivo de compra, sem dado pessoal | 90 dias | atendimento-wg (quarta) e qualquer agente |
| `conversas.md` | Pedidos de um agente para outro e as conversas fixas do dia (o chefe distribui e cola a resposta) | Pedido fechado sai em 7 dias | qualquer agente; o chefe fecha |
| `aprendizados.md` | O que funcionou e o que não funcionou, com número | 60 dias; o que se confirmar 3 vezes vira [FIXA] | qualquer agente |

Regras:
- Uma linha por item, com data: `- 2026-11-18 · ...`.
- Nunca dado pessoal de cliente.
- Ao passar da validade, o `chefe-wg` apaga ou resume na revisão semanal.
