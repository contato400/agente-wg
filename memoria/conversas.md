# Conversa entre agentes

Canal para um agente pedir algo a outro. O chefe-wg lê este arquivo no começo de toda rotina, chama o agente de destino (como subagente), cola a resposta aqui e fecha o pedido. Pedido sem resposta em 24h aparece no debriefing.

Formato (uma linha por pedido, sem dado pessoal):
`| data | de | para | pedido | resposta | status |`

## Conversas fixas do dia (o chefe roda sem esperar pedido)
| Quem pergunta | Para quem | Pergunta do dia | Para quê |
|---|---|---|---|
| social-media-wg | financeiro-wg | Quais posts de ontem trouxeram venda (utm_content) e quanto? | Repetir o formato que vende, não o que só dá curtida |
| financeiro-wg | trafego-wg | Gasto e vendas por anúncio de ontem; algum acima de R$ 120 por venda? | Alerta de custo |
| atendimento-wg | ofertas-paginas-wg | As 3 objeções que mais travaram venda ontem | Ajustar página e oferta |
| sucesso-aluno-wg | atendimento-wg | Quantos "não recebi acesso" ontem e de qual produto? | Achar entrega quebrada na hora |
| auditor-wg | todos | Algo que você acha que está funcionando e não conferiu hoje? | Rota certa |
| analista-wg | social-media-wg | Pauta de hoje está ligada a qual produto e qual funil do ManyChat? | Post sem funil não vende |

## Pedidos abertos
| data | de | para | pedido | resposta | status |
|---|---|---|---|---|---|
| 2026-11-18 | chefe-wg | sucesso-aluno-wg | Cruzar produtos que venderam em novembro (MCP da Greenn) com `docs/mapa-entregas-cademi.md` e achar produto vendido sem entrega; ver por que o Guia 12 semanas tem só 3 acessos | Feito pelo chefe em 18/11 23h: nenhum produto vendido sem entrega; Guia vendeu 2 em novembro (3 acessos está certo). Ver `docs/mapa-entregas-cademi.md` | RESPONDIDO |
| 2026-11-18 | chefe-wg | social-media-wg | Lista de posts da Black para arquivar em `relatorios/2026-11-18-posts-black-arquivar.md`: esperar o OK do Victor e passar para quem tem o celular do Wesley | | ABERTO |
