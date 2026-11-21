# Auditoria de sábado 21/11/2026 (auditor-wg + juridico-wg, B19)

Só leitura. Nada publicado, pausado nem alterado. Sem chave da ponte: Painel, Vendas, Log, Erros, Fila e Atendimento NÃO foram lidos (itens ficam DÚVIDA). Provas de hoje: páginas abertas no Chrome com JS ligado e utm de teste (`auditoria-2111`), Greenn (ofertas e vendas, só leitura), Windsor, Metricool, lista de tarefas agendadas e arquivos do repositório.
Reabertura: fecha seg 23/11 19h. R$ 397, aluno R$ 347, garantia 7 dias.

## PROBLEMAS que afetam venda (por severidade)

| # | Achado | Prova de hoje | Dono | Próxima ação |
|---|---|---|---|---|
| 1 | **Prêmio "camisa" ainda aparece como disponível, mas os 3 primeiros já foram definidos** (CDC e Meta: escassez/promessa que já não existe). Páginas orgânica e tráfego | Orgânica: bloco "PRÊMIO · 3 PRIMEIROS Camisa Caveira" sem "encerrado" (os livros já têm "PRÊMIO ENCERRADO"). Greenn: 5 pagamentos aprovados da reabertura a partir de 19h de sexta, os 3 primeiros foram 10629159, 10629591, 10629854 | Victor aprova, ofertas-paginas-wg prepara | Proposta na fila: trocar por "Camisa Caveira: os 3 primeiros já foram definidos. Encontro ao vivo: ainda há vagas (5 de 20 preenchidas)". Checar o número de vagas antes de publicar |
| 2 | **Página do tráfego /black-caveira-2026-oferta mostra prazo vencido e prêmios expirados como abertos** | Tela renderizada: "DESDE 12/11 19H30", "R$ 297 desde 12/11 19h30"; "Os 3 primeiros ... ganham a camisa"; livros "até 23h59 de sexta, 20/11" sem "encerrado". Prazo 23/11 19h aparece só em 1 trecho. R$ 297 é decisão do Victor de 19/11 e NÃO é o problema | Victor e Diogo; Claude prepara texto | Trocar "desde 12/11 19h30" por "reabertura até segunda, 23/11, às 19h"; marcar livros e camisa como encerrados. O Diogo gasta verba nesta página: antes de segunda 19h |
| 3 | **/pp-black26 (página de tráfego do Diogo, 2ª variante) está com texto de 12/11 e mostra o total parcelado** | "R$ 397 só até 12/11, às 19h30 ... Depois desse horário, o valor passa para R$ 397" (frase sem sentido, prazo vencido); "Total parcelado estimado: R$ 489,96" (regra: nunca mostrar total parcelado); prêmios de 11/11 (50 primeiros, 1º ganha calça e spray). Vende a oferta 7T52i6 (R$ 397) | Diogo, Victor | Confirmar se algum anúncio ainda aponta para ela. Se sim, corrigir; se não, tirar do ar na limpeza das páginas (pela fila) |
| 4 | **Convite do grupo de espera (/grupo → WhatsApp) mostra texto velho e o número errado** | Prévia do convite: "A Black Caveira 2026 encerrou e foi a maior da história ... Suporte oficial: (31) 97334-6056". Esse número é da Kairós desde 19/11 e a Black está aberta | Victor ou Gui (descrição do grupo no WhatsApp/DevZapp) | Trocar a descrição: "Black reaberta até segunda 23/11 19h" e suporte (31) 99329-4274. Tudo que cai no grupo hoje vê isso |
| 5 | **Pagamento recusado em série na oferta de aluno** | Greenn 21/11 01:36 a 01:37Z: 4 clientes diferentes, cartão recusado em 12x na oferta aluno R$ 347 (um a cada ~20 s), logo depois de uma compra aprovada 12x. Padrão de teste de cartão ou de limite baixo | Victor (Greenn) | Olhar o antifraude da Greenn. Sem dado de cliente aqui |

## PROBLEMAS de operação

| # | Achado | Prova | Dono | Próxima ação |
|---|---|---|---|---|
| 6 | **Chaves da ponte e um token continuam em texto puro no texto das 2 tarefas agendadas** (Executor e Rotina diária). Repetição da auditoria de 20/11 (I5/B23): 2ª vez, vira regra | `list_triggers` de hoje mostra os prompts. Valores NÃO copiados aqui | Victor | Girar as chaves e passar para variáveis de ambiente. Proposta de regra para a skill `fila-aprovacao-wg` e a ficha do chefe-wg: "chave nunca entra no prompt da tarefa; ler de variável de ambiente" |
| 7 | **`.claude/settings.json` com nomes de ferramenta errados: o bloqueio não vale** | Deny lista `mcp__metricool__`, `mcp__windsor__`, `mcp__atomicat__`; as ferramentas reais são `mcp__Metricool_Social_Media_Management__`, `mcp__Windsor_ai__`, `mcp__Atomatic__`. 2ª vez | Claude (interno) | Corrigir os nomes (arquivo interno). Não alterei hoje por ser configuração de permissão; peço OK do Victor |
| 8 | **`memoria/estado.md` com frases vencidas** | Cabeçalho "20/11 08h"; diz "Reabertura hoje sex 20/11 19h", "PENDENTE vence 18h50", placar 120/150. Hoje é 21/11 e a reabertura já rodou (5 compras, R$ 2.894,17 bruto) | chefe-wg (a rotina de 7h35 reescreve) | Conferir se a rotina de hoje atualizou. Se não, atualizar |
| 9 | **Netlify ainda no ar e vence 25/11** | `wesleygimenez.netlify.app` responde 301 hoje. O domínio sem www não pôde ser testado deste ambiente (proxy sem rota) | Victor | Trocar o que ainda aponta para a Netlify antes de 25/11 (O4) |

## DÚVIDAS (sem prova do dia)

| # | Item | Motivo | Dono | Próxima ação |
|---|---|---|---|---|
| 10 | Ponte recebendo vendas, Erros, Fila, Painel e Painel Financeiro (checklist 1, 2, 6) | Sem chave da ponte. Substituto: Greenn mostra vendas até 21/11 01:39Z (22h39 de sexta) e nenhuma depois, 3 boletos de R$ 97 a R$ 397 em "aguardando" desde sexta | Victor | Rodar o checklist 1, 2, 6 num ambiente com as variáveis |
| 11 | Contatos do ManyChat que a ponte não acha (B33, "WhatsApp ID already exists") | B33 "EM ANDAMENTO" desde 18/11: versão 6 no ar, falta provar na venda de contato antigo. Não consigo ler Erros | Claude, com a chave | Ler Erros e execuções de "Acesso pós-compra" das 5 compras de sexta |
| 12 | Aba Atendimento vazia (A6) | Só pelo estado.md e pela passagem: "pendente: rotina para copiar resumo-hist para a aba". Não li a aba | Claude | Confirmar na leitura com a chave |
| 13 | Crédito da API Anthropic | Estado de 20/11: acabou em 19/11 15h09, plano B (Gemini, depois Workers AI) no ar. Não há prova de que o Victor recarregou | Victor | Confirmar a recarga e o limite mensal abaixo de US$ 30 |
| 14 | UTM das vendas da semana | `get_sale` da Greenn não traz UTM. Relatório de sexta diz 100% vc/whatsapp-grupo, vindo da planilha. Não reconferi | analista-wg | Conferir na aba Vendas: macro `{{` e venda orgânica caindo como FB |
| 15 | Tráfego: Windsor mostra gasto R$ 0 nas 3 campanhas em 20/11 | Dados vão só até 20/11; 18/11 R$ 556, 19/11 R$ 481,61. Pode ser pausa do Diogo na reabertura ou sincronização atrasada | Diogo | Perguntar ao Diogo se pausou. Sem mexer |
| 16 | Âncora "17 treinamentos somam R$ 2.953,30" na página orgânica | Não achei a conta na memória ou na base de produtos | Victor/Wesley | Confirmar a soma dos preços avulsos. Número sem fonte é risco de promessa |
| 17 | Planilhas, 2FA das contas, Cademi, ManyChat (palavras-chave), DevZapp, Academia | Fora do alcance desta rodada (sem navegador logado) | Victor | Fica para a próxima rodada com navegador |

## OK com prova de hoje

| Item | Prova |
|---|---|
| Tarefa Executor | Última execução 10:34Z SUCCEEDED, próxima 11:34Z |
| Rotina diária | Modelo agora sonnet (era Opus em 20/11, corrigido); disparou 10:35Z, próxima seg 23/11 10:35Z |
| Orgânica /black-caveira-2026 | Renderizada: R$ 397 e 12x R$ 40,82 (só parcela e à vista, sem total), aluno por e-mail, prazo "23/11, às 19h", garantia 7 dias, suporte 99329-4274, sem travessão, sem `{{`, sem número velho, sem Netlify, relatos com aviso "resultado depende de estudo e prática" |
| UTM nos links de compra | Com `?utm_source=vc&...&utm_term=ag-auditor` nos 2 checkouts da orgânica (Greenn e Hotmart); com `utm_source=FB` nas páginas de tráfego. Medium, campaign, content e term seguem |
| Checkouts | Greenn 7T52i6: aprovada, ativa, R$ 397, boleto/Pix/cartão 12x, alterada 20/11 17:21Z. VsjMOW: aprovada, R$ 297 (decisão de 19/11). Páginas de pagamento Greenn e Hotmart respondem 200 |
| Garantia e reembolso | 7 dias em todas as páginas; texto "peça pelo WhatsApp dentro do prazo" não dificulta o direito de arrependimento |
| Suporte | 99329-4274 em orgânica e tráfego (tráfego tem o número velho no HTML bruto, um script troca; na tela só aparece o novo) |
| Metricool | Responde; 1 post agendado: carrossel 21/11 12h (golpe da central falsa, "Black Friday é dia 27", sem prometer resultado) |
| Windsor | Conta 874070653089870 (4500) responde, dados até 20/11 |
| Fila (só repositório) | Executor das últimas horas: sem APROVADO; PENDENTE 20261119-sucesso-1 e 20261120-social-1 vencidas |

## Revisão jurídica (B19, olhar do juridico-wg; não sou advogado)

| Peça | Veredito | Motivo e texto sugerido |
|---|---|---|
| Orgânica /black-caveira-2026 | AJUSTAR | Camisa como disponível (achado 1). Conferir a âncora R$ 2.953,30 (achado 16). Resto OK: preço, garantia, prazo, sem total parcelado |
| Tráfego /black-caveira-2026-oferta | AJUSTAR | Achado 2. Texto sugerido: "Reabertura até segunda, 23/11, às 19h (Brasília). R$ 297, com 1 ano de acesso". Prêmios: "Camisa: encerrado. Livros: encerrado. Encontro ao vivo: para os 20 primeiros" |
| /pp-black26 | AJUSTAR (ou tirar do ar) | Achado 3 |
| Convite do grupo | AJUSTAR | Achado 4 |
| Carrossel de 21/11 12h | OK com ressalva | Conteúdo de prevenção, sem imagem de vítima. "Comente CAVEIRA que eu te chamo no direct" não diz o que a pessoa ganha (regra "tudo autoexplicativo"). Sugestão: "Comente CAVEIRA e eu te mando a oferta da Black no direct". Criador do post é a conta da Digital Wisdom (já apontado em 20/11) |
| LGPD | OK | Campo de e-mail para preço de aluno diz a finalidade ("só para conferir se você já é aluno, não aparece na página") |
| Meta (anúncios) | Não revisado | Sem acesso ao texto dos anúncios; o Diogo é o dono |

Motivo mais frequente: texto de data/prêmio que envelhece sozinho (3 de 4 ajustes). Já está em `memoria/aprendizados.md` (20/11, "página com relógio precisa ser revisada"). Repetiu hoje: proposta de regra para a skill `copy-lancamento-wg` e a ficha do ofertas-paginas-wg: "toda página com prêmio por ordem ou prazo ganha uma revisão no dia em que o prêmio acaba (camisa: sexta 20/11; livros: 23h59 de sexta)".

## Decisões que dependem do Victor
1. Aprovar na fila o ajuste de texto das páginas (camisa e livros encerrados, tirar "desde 12/11") antes de segunda 19h.
2. Pedir ao Diogo: /pp-black26 está em uso? Gasto de R$ 0 em 20/11 foi pausa?
3. Trocar a descrição e o número de suporte do grupo de espera (WhatsApp).
4. Girar as chaves das tarefas agendadas.
5. OK para corrigir os nomes no `.claude/settings.json`; confirmar a recarga da API; conferir antifraude da Greenn.
