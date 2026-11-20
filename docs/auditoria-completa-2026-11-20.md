# Auditoria completa do projeto, 20/11/2026

Pedida pelo Victor às 14h57. Só leitura: nada foi publicado, pausado, mandado ou mudado em conta nenhuma. Regra do dia: só vale o que foi visto hoje. O que não deu para ver fica como DÚVIDA.

Legenda: OK, PROBLEMA, DÚVIDA. Dono: Victor, Wesley, Diogo (tráfego), Claude (agentes, trabalho interno).

## O que mais importa agora (leia só isto se estiver sem tempo)

1. Os textos das tarefas agendadas guardam chaves da ponte e um token em texto puro. Isso é grave e ainda não foi resolvido (item I5 da lista dos 67). Os valores NÃO estão copiados aqui. Ação: girar as chaves e passar para variáveis de ambiente.
2. O Closer.AI da Greenn (robô que recupera venda) responde a clientes com informação velha da Black: "não tem boleto" (boleto foi ligado hoje), prêmios e prazos antigos e o suporte (31) 97334-6056, que agora é da Kairós. Na Contra Ataque Feminino ele "promete defender de qualquer agressor", o que fere o limite de tema do Wesley.
3. Os funis do ManyChat ainda apontam para /bf e para o grupo de espera. A virada às 18h50 ainda não aconteceu, o que é esperado, mas é o ponto que não pode falhar.
4. Na Cademi há 7 tickets abertos (o mais velho com 2 semanas) e 335 comentários esperando aprovação. Um ticket é pedido de exclusão de conta (LGPD), de 18 horas atrás.
5. Páginas: a de tráfego está em R$ 297 sem prazo, sem Hotmart e sem boleto; a orgânica está em R$ 397 com prazo 23/11 19h. É decisão do Victor de 19/11, mas há decisão contrária de 18/11 na memória. Registrar qual vale.

## Parte 1. Os 67 itens da auditoria de 19/11

Contagem feita a partir das marcações de 19 e 20/11 no arquivo `memoria/auditoria-travados-2026-11-19.md`. Eu conferi hoje só os que aparecem com prova nas partes abaixo; os demais seguem o que o arquivo diz.

| Situação | Quantidade | Itens |
|---|---|---|
| Resolvido (segundo o arquivo) | 18 | A2, A3, A5 (roteiro), D2, G2, G4, O1, O3, O5, O9, I3, I7, V1, V4, F4, F6 (proposta), SA1, SA3 |
| Parcial | 3 | A1 (plano B no ar, falta crédito Anthropic), A4 (falta Hotmart, Greenn conta, bio, ManyChat), O2 |
| Fora da lista por decisão | 1 | F3 (Comunidade Caveira, não mexer) |
| Pendente ou sem prova | 45 | todos os demais |

Observações:
- I5 (chaves expostas) e AU5 (rotina diária em Sonnet) aparecem como pendentes e eu comprovei hoje que continuam assim (partes 2 e 6).
- O4 (domínio sem www) continua pendente: `wesleygimenez.com.br` sem www não abre.
- I4 (limite de gravações do KV) continua pendente: o worker segue só em KV, sem D1.
- Dos 18 "resolvidos", só conferi hoje com prova: O1/O5 (páginas da Black no ar), A2/A3 (worker no ar) e G2/G4 (régua). Os outros ficam como "resolvido segundo o arquivo".

## Parte 2. Infraestrutura e segurança

| Item | Status | Prova de hoje | Dono | Próxima ação |
|---|---|---|---|---|
| Tarefa "Executor" | OK com ressalva | Última execução 17:35Z SUCCEEDED, cron `30 * * * *` | Claude | Roda 24 h por dia, mas o expediente é 8h às 18h. Limitar o horário. |
| Tarefa "Rotina diária completa" | PROBLEMA | Última execução 10:35Z SUCCEEDED, mas usa modelo Opus | Victor | A decisão de 19/11 é Sonnet. Trocar o modelo. |
| Tarefa "Reabertura 19h" | OK | Única, marcada para 21:55Z (18h55) | Claude | Nenhuma. |
| Chaves no texto das tarefas | PROBLEMA GRAVE | Visto no texto das tarefas (valores não copiados) | Victor | Girar chaves, mover para variáveis de ambiente (I5/B23). |
| Worker `agente-wg` | OK | `/saude` responde "ok"; `/` responde "Agente WG no ar. Modo: ativo" | Claude | Nenhuma. |
| Rotas públicas `/hotmart-teste` e `/voz-teste` | PROBLEMA | Lidas no código: GET sem senha. A primeira apaga o token Hotmart em cache a cada chamada, a segunda gasta cota do Gemini | Claude (código) e Victor (deploy) | Fechar com chave ou remover. Vai pela fila. |
| Código no ar x repositório | PROBLEMA | `/voz-site` responde (400) no ar e não existe no repositório. `worker.js` não foi remontado após o deploy das 14h22 | Claude | Trazer o código real para o repositório. |
| Gravações em KV | DÚVIDA | 34 chamadas `put` no código, sem D1 | Claude | Medir uso no painel da Cloudflare e planejar D1 (I4). |
| `.claude/settings.json` | PROBLEMA | Ainda com nomes de ferramenta errados (`mcp__metricool__`, `mcp__windsor__`, `mcp__atomicat__`) | Claude | Corrigir nomes. |
| Ponte da planilha | DÚVIDA | As variáveis da ponte não existem no ambiente desta auditoria, então não consegui ler Painel, Vendas, Log, Erros nem a Fila | Victor | Rodar o checklist 1, 2 e 6 num ambiente com as variáveis. |
| Segurança de contas | DÚVIDA | Cademi oferece verificação em 2 fatores no perfil, não vi se está ativa. Não entrei em configuração de segurança, por regra | Victor | Ativar 2FA nas contas principais. |
| Jarvis (PC do Victor) | DÚVIDA | Código lido; falta reiniciar o PC e abrir o Jarvis pela primeira vez. Ele roda o Claude Code sem pedir confirmação | Victor | Primeiro uso acompanhado. |

## Parte 3. Vendas, ofertas e checkouts

| Item | Status | Prova de hoje | Dono | Próxima ação |
|---|---|---|---|---|
| Vendas rolando | OK | Painel Greenn: hoje R$ 303, 30 dias R$ 15.229,13, total R$ 942.471,36. Vendas de 35 minutos atrás (Black vitalício, 1 ano e Guia) | , | , |
| Black 1 ano na Greenn | OK | 4 ofertas aprovadas (297, 347, 247, 397), boleto ligado, garantia 7 dias | , | , |
| Pix automático da oferta | DÚVIDA | `automatic_pix_enabled=false` na Black 1 ano | Victor | Confirmar se é intencional. |
| `sales_page` do produto Black | PROBLEMA | Aponta para `/bf`, página antiga da Black de 11/11 (2,5 MB, ainda no ar) | Victor | Apontar para a página nova. |
| Cupons | DÚVIDA | CAVEIRA50 e CAVEIRA30 com 0 usos, BLACK10 com 10 usos, CAVEIRA99 (50%, ilimitado) ainda listado | Victor | Confirmar se CAVEIRA99 está desligado. |
| Kit DPC | PROBLEMA | Decisão de 20/11: não é mais vendido. Na Greenn continua ativo com 51 ofertas | Victor | Desativar via fila. |
| Catálogo Greenn | DÚVIDA | 74 produtos ativos | Victor | Revisar o que não vende mais. |
| Pedido de reembolso | PROBLEMA | 1 pedido aberto, VIP Presencial R$ 2.997, "Aguardando" desde 18/11. É separado do chargeback de R$ 3.697,64 | Victor | Responder dentro da garantia. Agente nunca faz reembolso. |
| Hotmart, ferramentas de recuperação | DÚVIDA | Catálogo visto (Recuperador automático de vendas, Agente de vendas IA, Recuperador de assinaturas, Parcelado Hotmart etc.). Não consegui ver o estado ligado ou desligado por produto | Victor | Conferir por produto e ligar o Recuperador automático (Hotmart diz que quem usa recupera 23% a mais). |
| Hotmart, produtos "precisam de ajustes" | DÚVIDA | Aviso para APH Primeiros Socorros e Kit Defesa Pessoal Caveira | Victor | Ver se interessa corrigir ou arquivar. |
| Hotmart Send | PROBLEMA (já registrado) | Plano Grátis, 5.915 contatos para limite de 100 | Victor | Decidir plano. |

### Closer.AI da Greenn

| Item | Status | Prova | Próxima ação |
|---|---|---|---|
| Está ligado | OK | Ativo em 10 dos 72 produtos (4 Black, assinatura 1 ano, Guia, IA KMC, Contra Ataque Feminino) | , |
| Quanto já recuperou | DÚVIDA | O painel ainda mostra o cartão "Ative o Closer.AI". Não vi o valor recuperado | Victor confere |
| Cupom de recuperação | DÚVIDA | Campo mostra "Todos os cupons" (texto de exemplo), parece sem cupom definido | Victor |
| Respostas às perguntas da Black 1 ano (17) | PROBLEMA ALTO | Dizem "não tem boleto", 1º lote até 12/11, prêmios e prazos antigos, suporte (31) 97334-6056 nas respostas 8, 16 e 17 | Reescrever pela fila (Greenn é externo) |
| IA KMC | PROBLEMA | Resposta diz "acesso liberado pelo suporte via WhatsApp" | Corrigir para o fluxo real |
| Contra Ataque Feminino | PROBLEMA | Resposta "promete defender de qualquer agressor", contra o limite de violência doméstica | Reescrever (prevenção, Ligue 180 e 190) |

## Parte 4. Páginas, links e funis

| Item | Status | Prova de hoje | Dono | Próxima ação |
|---|---|---|---|---|
| Páginas respondem | OK | 200 em /bf, /black-caveira-2026, /black-caveira-2026-oferta, /grupo, /inicio, /catalogo, /pp-black26, /guia/trilha-12-semanas e / | , | , |
| Página orgânica (/black-caveira-2026) | OK | Aberta com JS ligado: 13 links de compra com `utm_source=vc` e `utm_term=ag-auditor`; Greenn 7T52i6 (R$ 397); Hotmart H108520217H; prazo "23/11, 19h"; texto de boleto e Pix correto; suporte 99329-4274; zero travessão | , | , |
| Resíduo na orgânica | PROBLEMA pequeno | Aparece "OFERTA DA REABERTURA DESDE 12/11 19H30" | Claude propõe, fila | Trocar o texto. |
| Página de tráfego (/black-caveira-2026-oferta) | PROBLEMA | 8 links `utm_source=FB`, Greenn VsjMOW, R$ 297, sem prazo 23/11, sem Hotmart, texto "Pix ou cartão em até 12x" (sem boleto), mesmo resíduo "desde 12/11" | Victor e Diogo | R$ 297 foi decisão de 19/11, mas a de 18/11 diz "nunca voltar para 297". Registrar qual vale e alinhar prazo e boleto. |
| Macro `{{adset.name}}` | OK | Está no HTML bruto, mas some quando a página renderiza (sem `{{` na tela) | , | , |
| Número velho 97334-6056 | OK com ressalva | No HTML bruto; um script troca por 99329-4274 e na tela só aparece o novo | Claude | Limpar o HTML de vez. |
| Link da Netlify | PROBLEMA | Ainda no HTML das páginas black-caveira-2026, black-caveira-2026-oferta e pp-black26 (um script reescreve). `wesleygimenez.netlify.app/` ainda responde 200 e a Netlify vence em 25/11 | Victor e Claude | Trocar o link na origem antes de 25/11. |
| Domínio sem www | PROBLEMA | `wesleygimenez.com.br` sem www não abre (O4) | Victor | Ajustar no DNS. |
| Atomicat, páginas | DÚVIDA | 123 páginas na conta, 116 publicadas e 7 rascunho. Muita página de DPC antiga (dezenas de variações) e 3 sites (wesleygimenez, defesafemininacaveira, digitalwisdom) | Victor | Limpar o que não é mais usado, com cuidado, só pela fila. |
| Atomicat, estatística | DÚVIDA | 18/11 teve 45.009 visualizações com 1.012 visitantes (provável robô ou loop). `checkout_clicks` quase sempre 0, então o rastreio de clique não é confiável. Meus testes aparecem com utm "auditoria", "aud2011", "pw", "ag-auditor" (poluição mínima) | Claude | Medir venda por UTM da Greenn, não por clique da página. |
| Catálogo | OK com ressalva | Abre; tem 2 travessões | Claude | Corrigir texto. |

### ManyChat (logado)

| Fluxo | Status | Prova |
|---|---|---|
| Acesso pós-compra Greenn e Hotmart (7 execuções), Upsell IA KMC (5), Recuperação de carrinho (10), Auto-DM de comentários (11.050, CTR 5,8%), LIVE BC grupo VIP /bf (14), FACEBOOK Comentários grupo de espera 1711 (476), STORY grupo VIP /bf (131), "Diga Oi" (16.018) | OK, ao vivo | Lista de automações |
| Virada para a reabertura às 18h50 | PENDENTE (esperado) | Os funis ainda apontam para /bf e grupo de espera às 15h. G1 precisa ser feito na hora (skill `wg-manychat-funis`) |
| Responda às observações via DM (palavra SPRAY, 2.078 execuções, CTR 32,6%) | PROBLEMA | Parado há 3 semanas e é o melhor CTR. Candidato a reativar |
| Captação do e-book Vida Segura (3.081) | DÚVIDA | Parado há 4 meses |
| Aviso de plano | DÚVIDA | "Seu plano será alterado para Pro em 20 dias" | Victor decide |

## Parte 5. Academia (Cademi), alunos e atendimento

Só leitura, aba fechada.

| Item | Status | Prova |
|---|---|---|
| Base | OK | 23.231 alunos, 492 ativos nos últimos 7 dias, 59 acessos hoje, 98 ontem, 2.307 em 30 dias, 901 certificados, 64 novos no mês, 137 matrículas por venda em novembro |
| Tickets | PROBLEMA | 7 abertos, o mais velho com 2 semanas. Iniciais: B.A., M.M., R.C., G.N., L.M., G.S., E.F. Temas: pedido de exclusão de conta (18 horas atrás, risco LGPD), "perdi benefícios do Black vitalício" (1 semana), "não tenho mais acesso" (6 dias), dúvida do PDF de treino, troca de e-mail |
| Comentários | PROBLEMA | 335 esperando aprovação (os mais novos de ontem) |
| FAQ | PROBLEMA | Vazio (só um rascunho "Nova pergunta?"). Nenhum departamento cadastrado |
| Banners | PROBLEMA | 24 no total, só "BLACK CAVEIRA 2026" publicado. Os 22 de produto (vitrine de recompra) e "Black Reabriu 20/11" (85172) estão em rascunho. O 85172 é para publicar às 19h |
| Produtos "Não listado" | DÚVIDA | Guia de Treino Caveira, SOS Caveira e Sobrevivência a Ataques entre eles. Pode ser intencional |
| Funil Diamante #43 | DÚVIDA | 0 leads e R$ 0 |
| Área do aluno (capas do Guia e da IA KMC) | DÚVIDA | Não consegui ver, é o pedido do Victor sobre a imagem faltante |
| Greenn Club | OK | Só 1 projeto (Negócio Faixa Preta). O Caveira usa a Cademi |

## Parte 6. Agentes, memória e fila

| Item | Status | Prova | Dono | Próxima ação |
|---|---|---|---|---|
| Fila de aprovação, ponte, planilha | DÚVIDA | Sem as variáveis, não consegui ler | Victor | Ver nota na parte 2 |
| Planilhas (Painel WG, Painel Financeiro) | DÚVIDA | A aba da planilha existe no navegador do Luis, mas não foi lida | Victor | Conferir `#ERROR!` e diferença entre as duas |
| Windsor (Meta Ads) | OK parcial | Conector facebook responde, conta 4500 conectada. Dado de ontem não lido (tráfego é do Diogo, só observar) | Diogo | , |
| Metricool | OK com risco | Pendentes: stories 20/11 às 18:00, 18:50, 19:00 e 21:30; carrossel 21/11 às 12:00. O criador dos posts é uma conta da Digital Wisdom, o que contraria a regra de contas | Victor | Conferir a conta usada |
| Fichas e skills | PROBLEMA pequeno | Quatro regras que se contradizem: 297 x 397 na página de tráfego; expediente 8h às 18h x executor 24 h; rotina diária em Opus x regra Sonnet; Kit DPC ainda no catálogo x decisão de sair | Claude | Atualizar fichas depois da decisão do Victor |
| Memória | OK | `memoria/estado.md`, `decisoes.md`, `passagem.md` com entradas de 19 e 20/11 | , | , |
| Agente atendente (WhatsApp) | OK parcial | Worker no ar, plano B no ar. Falta crédito Anthropic (A1) | Victor | Colocar crédito |
| DevZapp (régua de 41 mensagens) | DÚVIDA | A aba existe, não conferi mensagem por mensagem | Gui e Claude | Conferir antes de 19h |

## Parte 7. Top 15 por impacto em venda

Ordem: o que muda venda hoje primeiro.

| # | O quê | Por quê | Dono | Quando |
|---|---|---|---|---|
| 1 | Corrigir respostas do Closer.AI da Black (boleto, prêmios, prazo, suporte) | Cliente recebe informação errada e pode desistir | Victor, via fila | Antes de 19h |
| 2 | Virar os funis do ManyChat às 18h50 | Quem comentar CAVEIRA precisa cair na oferta, não no grupo de espera | Victor ou Claude com aprovação | 18h50 |
| 3 | Publicar o banner 85172 na Cademi às 19h | Quem entra na Academia vê a oferta | Victor | 19h |
| 4 | Responder os 7 tickets, começando pela exclusão de conta | Risco de LGPD e aluno sem acesso | Victor e suporte | Hoje |
| 5 | Decidir 297 x 397 e prazo e boleto da página de tráfego | Texto e preço diferentes entre a orgânica e a paga | Victor e Diogo | Antes de 19h |
| 6 | Publicar banners de produto da Cademi (vitrine de recompra) | Recompra de 23 mil alunos | Victor | Esta semana |
| 7 | Girar as chaves e tirar do texto das tarefas | Segurança | Victor | Hoje |
| 8 | Fechar `/hotmart-teste` e `/voz-teste` | Qualquer um derruba o token e gasta cota | Claude e Victor | Hoje |
| 9 | Corrigir a Contra Ataque Feminino no Closer.AI | Promessa de proteção contra agressor fere limite | Victor | Hoje |
| 10 | Reativar o fluxo SPRAY | Melhor CTR (32,6%), parado | Victor | Após a Black |
| 11 | Ligar Recuperador automático e Agente de vendas da Hotmart | Hotmart informa +23% de recuperação | Victor | Após a Black |
| 12 | Responder o pedido de reembolso do VIP (Greenn, "Aguardando" desde 18/11) | Direito do consumidor dentro de 7 dias, e reembolso nunca é feito por agente | Victor | Hoje |
| 13 | Netlify (vence 25/11) e DNS sem www | Link morrer no meio da campanha | Victor e Claude | Antes de 25/11 |
| 14 | Trazer o código do worker para o repositório e remontar `worker.js` | Hoje o que está no ar não está guardado | Claude | Esta semana |
| 15 | Trocar a rotina diária para Sonnet, limitar o executor ao expediente e desativar o Kit DPC na Greenn | Custo e coerência com as decisões | Victor | Esta semana |

## Listas finais

### O que o Claude faz sozinho (interno)
- Corrigir `.claude/settings.json` e atualizar fichas e skills com as decisões de 19 e 20/11.
- Trazer o código do worker (`/voz-site` etc.) para o repositório e remontar `worker.js`.
- Preparar o texto novo das respostas do Closer.AI e do resíduo "desde 12/11" (proposta na fila, sem publicar).
- Reescrever o texto do catálogo sem travessão.
- Registrar este relatório na `passagem.md`.

### O que depende do Victor
- Girar as chaves, trocar o modelo da rotina e limitar o horário do executor.
- Aprovar na fila o texto do Closer.AI, os funis da virada, o banner 85172 e os de produto.
- Decidir 297 x 397 na página de tráfego e boleto e prazo ali.
- Responder os 7 tickets e o pedido de reembolso do VIP.
- Desativar o Kit DPC na Greenn, confirmar CAVEIRA99 e Pix automático, e apontar a `sales_page` da Black para a página nova.
- Ligar os recuperadores da Hotmart, decidir plano da Hotmart Send e do ManyChat, ativar 2FA.
- Rodar a ponte num ambiente com variáveis para fechar os itens 1, 2 e 6 do checklist.

### O que depende do Wesley
- Validar a resposta do Closer.AI da Contra Ataque Feminino (limite de violência doméstica).
- Confirmar prêmios e prazos da reabertura que serão citados nas respostas automáticas.

## O que não consegui provar hoje

- Ponte, Painel, Vendas, Log, Erros e Fila (faltam variáveis no ambiente).
- Valor recuperado pelo Closer.AI e cupom de recuperação.
- Estado dos recuperadores por produto na Hotmart.
- Régua do DevZapp mensagem por mensagem.
- Dados de ontem do Windsor e do Metricool (só vi agenda e conexão).
- Área do aluno na Cademi e imagens do Guia e da IA KMC.

## Higiene desta auditoria

- Nenhuma mensagem enviada, nenhuma página ou conta alterada, nenhuma chave copiada.
- Pedidos de teste de página usaram utm "auditoria", "aud2011", "pw" e "ag-auditor".
- Abas abertas por mim no navegador foram fechadas. Ficaram só as abas do Luis e do Victor que já existiam.
