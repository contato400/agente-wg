# Auditoria · 18/11/2026, 20h30 (1ª, feita na conversa com o Victor)

Cada item com a prova lida hoje. OK = provado hoje. PROBLEMA = afeta venda ou operação. DÚVIDA = não deu para provar.

## Vendas primeiro
- Orgânico no mês: 115 vendas, R$ 25.361,74 (77% e 85% da meta). Faltam 35 vendas, cerca de 2,7 por dia. Fonte: Painel da planilha WG.
- Tráfego: 68 vendas, R$ 4.607,31 (4 automáticas hoje, a última às 20h15). Gasto Meta no mês R$ 5.432,56 (Windsor). Retorno estimado R$ 0,81 por R$ 1 (estimativa, conferir com o Diogo).

## Tabela
| # | Item | Status | Prova | Dono | Próxima ação |
|---|---|---|---|---|---|
| 1 | Página da Black para a reabertura | **PROBLEMA** | Aberta às 20h25 com JS: o quadro de prêmios ainda mostra os da Black (camisa do 2º ao 5º, 50 no encontro, "Os 6 livros digitais: encerrado"). A reabertura promete 3 camisas, 20 no encontro e livros até 23h59 de sexta | ofertas-paginas-wg | Proposta 20261118-ofertas-2 na fila: trocar o quadro de prêmios às 19h de sexta (troca automática por horário) |
| 2 | Preço e checkout da página | OK | R$ 397 (12x R$ 40,82); botão Greenn oferta 7T52i6 e Hotmart parcelado (off 1eiqja8o) abrem; utm_source=vc chega no checkout; macros `{{` são limpas pelo script | | |
| 3 | Botão "Já sou aluno" (R$ 347) | DÚVIDA | Abre a seção #bk2aluno da própria página; não testei o checkout do aluno | ofertas-paginas-wg | Testar até quinta |
| 4 | Grupo de espera (CAVEIRA e régua) | OK | devzapp leva ao grupo "LISTA DE ESPERA Black Caveira", 270 membros | | |
| 5 | Academia (Cademi) | OK | Login abre em kravmagacaveira.cademi.com.br | | |
| 6 | Ponte Greenn/Hotmart → planilha | OK | 4 vendas pagas hoje gravadas; Hotmart também chega (boleto impresso às 09h10) | | |
| 7 | Ponte → ManyChat | **PROBLEMA** | Erros 17h12: "criar contato falhou: This WhatsApp ID already exists". O código do Apps Script não está no repositório, então não dá para ver se a mensagem pós-compra saiu mesmo assim | chefe-wg com o Victor | Trazer o código da ponte para o repositório (sem chaves) e tratar "já existe" buscando o contato |
| 8 | UTM de uma venda do tráfego | **PROBLEMA** | Venda 18h56 com `{{ad.name}}`, `{{campaign.name}}` sem substituir | Diogo (via trafego-wg) | Avisar o Diogo |
| 9 | Fila de aprovação | **PROBLEMA** | 20261118-ofertas-1 APROVADO às 08h13 e não executado (recuperação de carrinho com "Shalom" e sem cupom para Hotmart). social-1, 2 e 3 PENDENTE desde 07h50, sem decisão | executor / Victor | Executar ofertas-1; social 1 a 3 viram VENCIDO amanhã (regra nova na rotina) |
| 10 | Tarefa agendada | OK (corrigida) | Rodou 07h35 com sucesso. Apontava o Instagram para o Windsor e não tinha o passo do financeiro: corrigido às 20h21 | | Próxima: 19/11 07h35 |
| 11 | Chaves da ponte no texto da tarefa | PROBLEMA (segurança) | Estão escritas no prompt | Victor | Colar nas variáveis de ambiente; depois tirar do texto |
| 12 | Metricool (Instagram) | DÚVIDA | Conectado às 20h01; ainda importando (0 posts). Nova checagem às 21h03 | social-media-wg | |
| 13 | Windsor (Meta Ads) | OK | Gasto até hoje lido (R$ 341,51 em 18/11) | | |
| 14 | Painel Financeiro WG | OK | Sem #ERROR!; 3 vendas de hoje; a 4ª entra amanhã pela rotina | financeiro-wg | |
| 15 | Atendente 24h no WhatsApp | PROBLEMA (parado) | Número "restrito" na Meta (#3441092); chip do 97334-6056 perdido | Victor | 19/11: tentar YCloud de novo; segunda via do chip |
| 16 | Memória | PROBLEMA (corrigido) | `estado.md` dizia "aba Vendas vazia" e "Metricool sem rede": desatualizado | chefe-wg | Corrigido nesta auditoria |
| 17 | Cursos do Ferrari e livros da Mestres Play | OK | Notas em `docs/curso-*` e `docs/livros-mestres/`; regras viraram skills (lancamento-pago-wg, front-ebook-wg, copy-lancamento-wg, black-lancamento-wg) | | Cursos menores do portal: travados no login |

## O que foi feito nesta auditoria
- Tarefa agendada: Instagram pelo Metricool, passo do financeiro, propostas vencidas viram VENCIDO, itens APROVADO parados aparecem no debriefing.
- Agente novo: `auditor-wg` (checklist diário de 8 itens e auditoria completa no sábado).
- `memoria/estado.md` atualizado.

## Rodada 2 · 20h50 a 21h (ManyChat e página)
- **Página da reabertura: EXECUTADO** (20261118-ofertas-2). Bloco publicado; conferido na página no ar simulando 20/11 19h05 (prêmios da reabertura) e 21/11 00h10 (livros encerrado). Backup "Antes do quadro da reabertura" no Atomicat.
- **ManyChat, automações no ar (lista lida 20h55):**
| Automação | Execuções | Leitura |
|---|---|---|
| WPP - Acesso pos-compra (Greenn e Hotmart) | 3 | **PROBLEMA**: 4 vendas pagas desde 03h47 e só 3 envios. A que falta é a das 17h12, a mesma do erro "WhatsApp ID already exists" na ponte. Quem já é contato do ManyChat não recebe a mensagem de acesso. CTR 0% (ninguém clicou no botão da Academia ainda) |
| WPP - Upsell IA KMC pós-compra Black | 3 | Mesmo furo do item acima |
| WPP - Recuperação de carrinho automática | 6 | No ar; ajuste aprovado (ofertas-1) ainda não feito |
| FACEBOOK - Comentarios - grupo de espera - 1711 | 254 | CTR 2,4% |
| STORY - grupo VIP (/bf) - 0411 | 129 | CTR 6,7% |
| LIVE BC - grupo VIP (/bf) | 14 | |
| Diga Oi para novos seguidores | 15.719 | CTR 6,4% |
| Auto-DM de links dos comentários | 10.784 | CTR 5,8% |
- **Aviso do ManyChat:** "O plano será alterado para Pro em 22 dias, e você perderá alguns recursos". Ver com o Victor o que sai no Pro.
- **Decisão pendente:** na sexta 19h, os funis de comentário, story, live e novo seguidor continuam mandando para o grupo de espera ou viram para a página da Black (skill `wg-manychat-funis`, "viradas típicas")?
- **Navegador:** o Chrome parou de responder às capturas de tela às 20h52 (computador provavelmente em repouso). Edição de fluxo no ManyChat ficou para quando o Victor voltar.
