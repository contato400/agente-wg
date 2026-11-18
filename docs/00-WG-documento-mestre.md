# WG · Documento-mestre (estado em 18/11/2026, 4h)

Ler este documento ANTES dos outros do projeto. Ele resume o estado atual; os demais são histórico.
Regras fixas da operação estão nas skills: wg-regras-operacao, wg-relatorio-vendas, wg-recuperacao-carrinho, wg-manychat-funis, wg-regua-grupos. Regras dos agentes: repositório contato400/agente-wg (CLAUDE.md).

## Novidades de 18/11 (madrugada)
- **Agente WG montado:** repositório privado contato400/agente-wg com 8 agentes (chefe, analista, social, tráfego, atendimento, ofertas, financeiro, jurídico), 17 skills, comandos e memória. Detalhes: `kairos/agente-wg-estrutura-18-nov.md` e `kairos/agente-wg-conexoes-18-nov.md`.
- **Uma tarefa agendada só:** "Agente WG - Rotina diaria completa", 7h35 seg a sáb. Debriefing + tráfego (Windsor, só leitura) + 3 pautas na fila + 1 e-mail para o Luis corinthiano. Primeira execução: 18/11 às 7h35.
- **Ponte versão 5** (18/11 3h52, mesma URL): além do que já fazia, responde aos agentes (ler/adicionar/atualizar/e-mail) e marca `enviar_acesso` em toda compra aprovada (menos e-book), no máximo 1 vez a cada 6 h por pessoa e sem repetir em renovação de assinatura da Hotmart. Abas novas: "Fila de aprovação" e "Atendimento".
- **Mensagem de acesso pós-compra NO AR (3h47):** automação "WPP - Acesso pós-compra (Greenn e Hotmart)", modelo `caveira_acesso_academia` (Utilidade, aprovado), botão "Entrar na Academia". Sai pelo "Equipe Santiago".
- **Windsor.ai** na conta do Luis corinthiano, ligado à conta de anúncios 4500 (plano grátis, 1 conta). **Canva** do Luis corinthiano conectado no Claude da empresa.
- **Decisões do Victor:** canal único com ele pelo WhatsApp pessoal (quando o atendimento estiver no ar); reembolso: agente avisa, atendimento tenta recuperar com o OK dele, quem reembolsa é o Victor; catálogo do WhatsApp não mexe; UTM por agente (utm_term=ag-<agente>); palavras CAVEIRA, MULHER, SEGURA, PROTEGER, KIDS; foco na Black até 30/11. Registro: `kairos/agente-wg-conversa-18-nov-madrugada.md`. Funis propostos: `kairos/funis-e-melhorias-18-nov.md`. Revisão geral: `kairos/revisao-17-e-18-nov.md`.
- **Decisões das 4h:** garantia de 7 dias em tudo (nunca 30); downsell da IA a R$ 147 automático fica; nada pode depender da Netlify (tirar o que resta); cópia duplicada da régua do Gui apagada.
- **Pendente amanhã:** código do Samuel (app da Meta do atendimento no número oficial), chave da API do Claude (cartão do Victor), serviço de atendimento 24h.

## Fase atual
- Black Caveira 2026 encerrou 16/11 19h. Página da Black segue aberta (R$ 397). Reabertura relâmpago sexta 20/11 19h (sem data de fechamento).
- Meta até 30/11: 150 vendas orgânicas e R$ 30 mil líquidos. Em 17/11: 115 vendas e R$ 25.361,74 (Greenn + Hotmart).
- Fila de espera: grupo novo (link devzapp). Régua do Gui: https://claude.ai/artifact/7bB5X8EHDA7ZgYqGqNe9JX (a cópia duplicada foi apagada em 18/11).

## Plataformas e IDs
- Greenn produtos: Black 1 ano 201654 (checkout payfast.greenn.com.br/201654/offer/7T52i6), Black 2 anos 202271, Black vitalício 202274, Black #TP 204640, assinaturas 205044 / 205301 / 205307, IA KMC 200398 (oferta 197: /200398/offer/FcRqQ7; oferta 147: /200398/offer/e5CpZW), DPC 2.0 31865, E-book Vida Segura 182127, Desafio 7 Movimentos 30523. Total de 74 produtos ativos na conta. Cupom BLACK10 = 10%, só Black 1 ano. Greenn tem área "Tokens e Api Key" e "MCP" (possível conector futuro).
- Hotmart: conta do Wesley ("SISTEMA CAVEIRA"). Checkout Black 1 ano: pay.hotmart.com/H108520217H (cartão 12x R$ 39,86, Pix, Parcelado Hotmart até 12x R$ 44,77 com análise de crédito, boleto).
- ManyChat: conta fb639679992741917. WhatsApp "Equipe Santiago" +55 11 93623-1351 (cada modelo de mensagem custa ~US$ 0,07; dentro de 24h é grátis). Página Facebook asset 106627445779933 conectada.
- Página de vendas: https://www.wesleygimenez.com.br/black-caveira-2026 (sempre com utm_source=vc).

## Preço da IA KMC (decisão do Victor, 17/11)
- Oferta padrão R$ 197. Downsell R$ 147 só na mão, quando a pessoa questionar o preço. O funil da Greenn oferece o downsell R$ 147 automaticamente a quem recusa a IA depois da Black: o Victor decidiu manter (18/11).

## ManyChat: o que existe (18/11)
- Tags: Compradores Black 2026 (80), comprador_greenn (148, recebe também compradores da Hotmart), comprou_ia_kmc (5), recuperacao_carrinho_black_1711 (38), recuperacao_carrinho_ebook_1711 (17), carrinho_pendente, nova_compra_black, enviar_acesso (18/11).
- Campos: ultimo_produto, link_checkout, motivo_carrinho, eh_black.
- Modelos aprovados: caveira_recuperacao_carrinho, caveira_upsell_ia_kmc, caveira_acesso_academia (18/11).
- Automações LIVE:
  - "WPP - Acesso pós-compra (Greenn e Hotmart)": tag enviar_acesso → modelo caveira_acesso_academia na hora (18/11).
  - "WPP - Recuperação de carrinho automática (Greenn)": tag carrinho_pendente → espera 2h (8h–22h) → se ainda tem a tag → modelo de recuperação → botões levam ao link_checkout (com UTM recuperacao-auto) + cupom BLACK10. Vale para Greenn e Hotmart.
  - "WPP - Upsell IA KMC pós-compra Black (Greenn)": tag nova_compra_black → espera 3h → se não tem comprou_ia_kmc → modelo upsell → "Quero conhecer" leva à oferta IA R$ 197 (UTM upsell-ia-auto).
- Disparos 17/11 20h18: recuperação de carrinho (Black/outros 37, e-book 17).

## Ponte Greenn/Hotmart → ManyChat (Apps Script) · NO AR desde 17/11 22h50
- Projeto "Ponte Greenn ManyChat WG" ligado à planilha "WG · Vendas e Meta (automático)" (https://docs.google.com/spreadsheets/d/1L4uCjZvntW7Lj-bMHx8MK61pNK78ML14oFbbmadhKWg), conta Google do Chrome Luis corinthiano.
- Publicado como App da Web (**versão 5**, mesma URL). URL termina em ?k=wgcaveira-7f3k9q2m (chave que o script confere).
- Greenn: webhook em TODOS os 74 produtos (17/11) com 4 eventos: Venda paga, Venda recusada, Venda aguardando pagamento, Checkout abandonado. Produto novo criado na Greenn NÃO entra sozinho: adicionar o webhook nele (Entrega e integrações → Adicionar entrega → Webhook, mesma URL, os 4 eventos). Observação: 140616 (Combo Família Segura) ficou com os 4 eventos em dobro e 59654 (Defesa Pessoal Kids) com o webhook dividido em 2 linhas (1 + 3); não atrapalha (venda repetida não é anotada 2x e a recuperação tem trava de 3 dias).
- Hotmart (desde 17/11 23h): webhook "WG - Ponte ManyChat (todos os produtos)" em Ferramentas → Webhook, versão 2.0.0, eventos Compra aprovada, Compra cancelada, Aguardando pagamento e Abandono de carrinho, mesma URL. Ao criar produto novo na Hotmart, conferir se ele aparece marcado nesse webhook.
- Faz: venda paga/aprovada → tags comprador_greenn / Compradores Black 2026 / nova_compra_black / comprou_ia_kmc / enviar_acesso + anota na aba Vendas (Greenn: orgânico x tráfego pela UTM; Hotmart: sempre Orgânico (VC), taxa estimada 8,99% + R$ 1); Pix/boleto gerado, cartão recusado ou checkout abandonado → tag carrinho_pendente (1x a cada 3 dias) + campos.
- Contatos do WhatsApp no ManyChat não são achados por telefone na API: o script busca pelo primeiro nome e confere o whatsapp_phone; guarda o id achado nas Propriedades (wa_<telefone>). Se não acha, cria o contato.
- Chave da API do ManyChat: colada pelo Victor em Propriedades do script (MANYCHAT_TOKEN). Nunca abrir.
- Painel: aba "Painel" com fórmulas em português (CONT.SE, SOMASE, ;). NÃO rodar montarPainel de novo (ele recria com fórmulas em inglês, que dão erro nessa planilha). Vendas da Hotmart agora entram sozinhas; a linha 7 (manual) fica só para ajustes.
- Abas Log e Erros mostram tudo o que chegou da Greenn e da Hotmart (a aba Erros só nasce no primeiro erro).
- Conferido em 18/11 4h: 1 evento real recebido (checkout abandonado da Black, 2h23), nenhuma venda desde que a ponte ligou (última venda Greenn 17/11 19h41). Venda real ainda não passou pela ponte; nenhum evento da Hotmart ainda.
- Se mudar o código: Implantar → Gerenciar implantações → editar a versão existente → Nova versão (mantém a mesma URL).

## Pendências da semana
- Quinta 19/11: e-mail aos alunos da Academia chamando para o grupo de espera.
- Sexta 20/11 19h: virar funis do ManyChat para a página de vendas (skill wg-manychat-funis).
- Link da bio do Instagram (Victor, pelo app).
- DevZapp (DevDisparador) em teste grátis até 20/11: possível disparo gratuito do grupo de espera (risco de bloqueio do número; usar número secundário). Aguardando decisão do Victor.
- Conferir na primeira venda real: linha na aba Vendas, tags no ManyChat, mensagem de acesso enviada (uma vez só).
- Atendimento 24h no número oficial: amanhã com o código do Samuel e a chave da API.
