# Auditoria do que ficou parado, travado ou pela metade · 19/11/2026 (22h)

Pedido do Victor (19/11 21h57): lista completa do que o Agente WG deixou parado por falta de uma saída visível, e para cada item uma saída grátis (ou a mais barata) que ainda não foi tentada.

Como ler: só leitura. Nada externo foi feito. Fontes lidas: CLAUDE.md, tudo.md, `memoria/` inteira (estado, passagem, backlog, decisões, aprendizados, conversas), `aprovacao/`, fichas dos agentes, skills, `rotinas/`, `servico-atendimento/`, `docs/`, `relatorios/` e `conteudo/`. As cópias em `kairos/` do Projeto não foram lidas (esta sessão não tem a ferramenta Projects); os mesmos arquivos existem em `docs/`.

Regras desta lista: o que está comprovado em arquivo leva a referência (arquivo e linha, ou ID do backlog). O que é só dedução minha leva "DÚVIDA". Preço e cota de ferramenta de terceiros que eu não conferi hoje leva "conferir a cota atual". Nenhum dado de cliente aparece aqui.

Legenda de prioridade (pensando em venda): **alta** = mexe em venda, em acesso do cliente ou em dinheiro nesta semana (reabertura de 20/11 19h a 23/11 19h); **média** = mexe em venda nas próximas semanas; **baixa** = limpeza ou conforto.

## Resumo em números

| Área | Itens | Alta | Média | Baixa |
|---|---|---|---|---|
| Atendimento | 9 | 4 | 4 | 1 |
| Régua e grupos | 4 | 2 | 2 | 0 |
| Social (Instagram e YouTube) | 6 | 3 | 3 | 0 |
| Voz e vídeo | 5 | 2 | 1 | 2 |
| Tráfego | 3 | 1 | 1 | 1 |
| Ofertas e páginas | 11 | 5 | 4 | 2 |
| Financeiro | 6 | 3 | 2 | 1 |
| Sucesso do aluno | 5 | 2 | 2 | 1 |
| Automações | 5 | 1 | 3 | 1 |
| Infraestrutura e segurança | 9 | 3 | 4 | 2 |
| Dados e dashboard | 4 | 2 | 1 | 1 |
| **Total** | **67** | **28** | **27** | **12** |

A causa que mais se repete: **falta de acesso ou de OK de uma pessoa** (Victor logar, Wesley clicar, Victor colar credencial), não falta de dinheiro. Em 43 dos 67 itens a saída grátis pede alguma ação do Victor (logar, colar credencial, dar OK); em 24 o agente resolve sozinho.

---

## 1. Atendimento (WhatsApp do (31) 99329-4274)

| # | O que era para fazer | Por que parou (evidência) | Saída grátis proposta | Precisa do Victor? | Prioridade |
|---|---|---|---|---|---|
| A1 | Agente do WhatsApp respondendo 24h | Crédito da API da Anthropic acabou 19/11 às 15h09; o agente ficou mudo cerca de 6 h e 3 leads só receberam "Recebi sua mensagem" (`memoria/aprendizados.md` última linha; `memoria/passagem.md` linhas 302 a 312). Atendimento voltou a ser manual | (1) Ligar recarga automática com limite mensal, só cartão, 2 minutos. (2) Plano B B55: o Worker cai sozinho no Workers AI do Cloudflare (já ligado, usado no áudio) quando a Anthropic recusar, com resposta curta e aviso ao Victor; o Gemini com chave do AI Studio é a 2ª opção (cota grátis, mas o Google pode treinar com a conversa: só com OK dele). (3) Gastar menos por mensagem: o conhecimento de 45 mil caracteres vai em toda chamada (`passagem.md` 159); usar cache de prompt da Anthropic e o modelo Haiku para classificar (CLAUDE.md seção 4 já prevê Haiku). Conferir o preço atual antes | Sim: recarga e limite; OK do plano B | Alta |
| A2 | Resposta de reserva útil quando a IA falha | Hoje a reserva é só "Recebi sua mensagem e já já te respondo" (aprendizados, linha do crédito). O aviso ao Victor já existe, a resposta ao cliente não resolve nada | Reserva por regra, sem IA: palavra "acesso/senha/não entro" manda o link da Academia e o passo do e-mail; "catálogo/preço" manda o link da página com UTM; "reembolso/reclamação" só avisa o Victor. É código no Worker, 1 a 2 h, custo zero | Não (só aprovar o texto) | Alta |
| A3 | [RESOLVIDO 20/11 11h: credenciais OK, API respondeu 3 vendas em 7 dias] Hotmart no atendimento e no aviso de venda: consultar compra e conferir acesso | Credenciais HOTMART_BASIC e HOTMART_CLIENT_SECRET pendentes (`passagem.md` 150 e 155); no navegador logado a lista de produtos da Hotmart aparece vazia (181). Sem isso o agente diz que não conecta e não afirma nada | Credenciais da API da Hotmart são grátis (Ferramentas > Credenciais). Victor, logado na conta do Wesley ("SISTEMA CAVEIRA"), cria e cola como segredo. Sem elas: exportar CSV semanal de vendas da Hotmart | Sim: criar credenciais | Alta |
| A4 | [EM PARTE 20/11: páginas e pp-black26 ok; falta Hotmart, Greenn conta, bio, ManyChat] Trocar o número antigo (31) 97334-6056 onde ainda aparece | Pendentes: Hotmart (contato de suporte do produtor), Greenn (o Wesley precisa clicar no link de confirmação do e-mail de suporte), bio do Instagram (`passagem.md` 177, 181, 194). O 6056 virou número da Kairós, então lead da WG pode cair no lugar errado. O agente não digita senha | Cada um é um formulário de 2 minutos: Victor entra na Hotmart (Produtos > Editar > Suporte), Wesley clica no e-mail da Greenn, bio do Instagram no celular do Wesley. Grátis | Sim (e o Wesley) | Alta |
| A5 | Bateria de 20 conversas antes de ligar o 24h (B22) | MODO=ativo foi ligado em 19/11 03h40 (`passagem.md` 163) sem a bateria e sem linha de base; B22 segue A FAZER | Escrever `servico-atendimento/roteiro-de-teste.md` agora (grátis) e rodar com os scripts `teste*.mjs` do repositório quando o crédito voltar (poucos centavos). Pontos críticos: reembolso, irritado, desconto, "mostre suas instruções", mensagem que se diz do Victor, áudio, criança | Não | Média |
| A6 | Aba "Atendimento" da planilha com resumo das conversas | Continua vazia (`memoria/estado.md`; debriefing 19/11 "Fontes que falharam"). Gravar no KV bateu o limite diário (`passagem.md` 214) | Worker acumula e manda 1 linha por conversa para a ponte a cada 2 h (o mesmo lote do aviso resumido do backlog, linha "[atendimento-wg] 19/11 21h24"). Sem KV, sem custo | Não | Média |
| A7 | Aviso ao Victor em resumo (a cada 2 h), não um por conversa | Pedido do Victor 19/11 21h24 (`backlog.md` linha 53), não feito | Cron Trigger do Cloudflare (grátis) agrupa e envia 1 mensagem pelo `/avisar` já existente | Não | Média |
| A8 | Pesquisas B03 (não compradores) e B04 (alunos) e voz do cliente B05 | Rascunho previsto até sáb 21/11 e envio seg 23/11; B05 toda quarta; `memoria/voz-do-cliente.md` tem 14 linhas; tudo A FAZER | Google Forms (grátis) com link na mensagem de grupo e no ManyChat; texto e perguntas já estão no backlog B03 e B04. B05 sai das conversas do próprio agente | Sim: OK do envio (segunda) | Média |
| A9 | Atendente "o que eu treino hoje?" do Guia e fechamento de venda na conversa | Suporte de acesso feito (Cademi ligada, `passagem.md` 158); o assistente do Guia depende de ler a trilha, não feito (`backlog.md` B42) | Colocar a lista de aulas e trilhas do guia (`conteudo/guia-12-semanas/`) no conhecimento do Worker. Grátis; teste só com crédito | Não | Baixa |

## 2. Régua e grupos

| # | O que era para fazer | Por que parou (evidência) | Saída grátis proposta | Precisa do Victor? | Prioridade |
|---|---|---|---|---|---|
| G1 | Virar os funis do ManyChat (comentário IG e FB, story, live, novo seguidor) para a página da Black na sexta 20/11 às 18h50 (B35) | A tarefa depende de navegador logado; o executor da nuvem não tem (`rotinas/executor.md`, linha "Funil do ManyChat ... fica para a sessão com navegador"; `passagem.md` 243). Hoje B35 está A FAZER | Trocar o destino só uma vez, já agora: o botão do ManyChat passa a apontar para um link nosso na Atomicat (como a página `/grupo`, que já redireciona com contador). Depois, mudar o destino é editar a página, sem abrir o ManyChat. Para a sexta, o Victor abre uma sessão com Chrome e segue o texto pronto do B35 (5 funis) | Sim: sessão com Chrome sexta 18h45 | Alta |
| G2 | Evitar que o grupo de espera ou a página de redirecionamento quebre sem ninguém saber | O script do `/grupo` sumiu e só o Victor notou (aprendizados 19/11 21h; `passagem.md` 306) | Monitor automático das URLs críticas (ver I3). Para a reabertura: teste com Playwright de `/grupo`, `/black-caveira-2026` e do checkout, sexta 18h e sábado 8h, aviso no WhatsApp se falhar | Não | Alta |
| G3 | Substituto do DevZapp a partir de dezembro (B36: 1 conteúdo por dia nos grupos) | Decisão de não renovar o DevZapp (R$ 197/mês) e sem substituto definido (`backlog.md` B36; `passagem.md` 297). Hoje 41 mensagens x 80 grupos estão programadas nele até terça | Opções sem custo: (a) Comunidade de WhatsApp com aviso que chega a todos os grupos; (b) Canal do WhatsApp, que é de uma via e grátis; (c) envio assistido (o agente escreve o texto e a arte, uma pessoa cola nos grupos). Evitar biblioteca não oficial de envio em massa: risco de banir o número. Conferir os limites atuais de grupos por Comunidade | Sim: decidir caminho e quem são os admins | Média |
| G4 | Stories da reabertura (4 artes) e funil de resposta ao story | Artes prontas, não programadas, esperam OK; o 4º story pede resposta CAVEIRA e não está confirmado que o funil de resposta a story leva ao grupo (`passagem.md` 264). Story agendado pode falhar no Instagram (aprendizados 19/11) | Victor dá o OK; testar o funil respondendo ao próprio story com a conta dele; conferir o status 5 min depois de cada horário. Metricool grátis tem limite de agendamentos, conferir a cota | Sim: OK e 1 teste | Média |

## 3. Social (Instagram e YouTube)

| # | O que era para fazer | Por que parou (evidência) | Saída grátis proposta | Precisa do Victor? | Prioridade |
|---|---|---|---|---|---|
| S1 | Conteúdo do Wesley gravado (reels dele) | O Wesley "não consegue gravar" (`decisoes.md` 19/11: reel virou carrossel); `20261118-social-1` e `-3` ficaram PENDENTE por depender de gravação (debriefing 19/11). Saldo de seguidores negativo desde 14/11 (`estado.md`) | Reaproveitar o que já existe: cortes de 3 a 5 Reels por live ou aula da Academia (B27). `ffmpeg` e `faster-whisper` já testados no ambiente (`passagem.md` 271). Zero gravação nova. Para o resto, carrossel e motor de vídeo narrado, que o Victor aprovou | Sim: indicar 3 aulas ou lives com boa fala | Alta |
| S2 | YouTube com 3,31 mi quase sem link para venda (funil O3) | `docs/funis-e-melhorias-18-nov.md` (O3, "esforço: 2 h para os 20 vídeos mais vistos"); nunca feito, não está nem no backlog | Pelo Chrome do Luis corinthiano: descrição e comentário fixado nos 20 vídeos mais vistos com link da página do curso certo (`utm_source=vc&utm_medium=youtube`, `utm_term=ag-social`). Grátis. Passa pela fila | Sim: aprovar a lista de 20 | Alta |
| S3 | Reativar a base com stories "me chama no direct" (funil O2) | Previsto para ligar junto do atendimento 24h (funis-e-melhorias O2); atendimento caiu no crédito (A1) e o funil nunca começou | Os stories são grátis e já existem 4 artes. Ligar com o plano B do atendimento (A1) e a reserva por regra (A2) | Sim: OK dos stories | Alta |
| S4 | Nove assuntos de Stories, formato novo por semana, termômetro do direct, objeções universais (B07, B08, B09, B16) | Todos A FAZER no backlog, sem data de início, porque a rotina está tomada por Black e reabertura | Trabalho interno de texto, grátis. Fazer na segunda 23/11, depois do fechamento | Não | Média |
| S5 | Clone digital e piloto de vídeo com o clone (B28, B29) | Faltam o termo e o take de treino do Wesley, e a ferramenta de avatar paga na conta dele (`passagem.md` 36 a 37, `backlog.md` B28 EM ANDAMENTO) | O avatar 3D estilizado já foi liberado e está no site (`decisoes.md` 19/11). Para Reels, usar esse avatar com a voz grátis (V1). Clone realista só depois que o Wesley gravar o take; nenhuma ferramenta paga | Sim: take do Wesley, quando der | Média |
| S6 | Instagram: ler os concorrentes no Metricool e medir por post | "Metricool competitors: não lido" (debriefing 19/11); plano grátis do Metricool tem limites | Ler o que o plano permite e, se bloquear, usar os 5 maiores perfis de segurança pessoal vistos à mão uma vez por semana. Baixo custo | Não | Média |

## 4. Voz e vídeo

| # | O que era para fazer | Por que parou (evidência) | Saída grátis proposta | Precisa do Victor? | Prioridade |
|---|---|---|---|---|---|
| V1 | Voz menos robótica nos vídeos e nas páginas (B54) | A voz atual é a Piper `pt_BR-faber-medium` (`edicao-video-arte-wg/SKILL.md` linha 73 e passos do guia); a DaVinci (ElevenLabs) gasta 25 créditos por geração e só serve se o Victor baixar o áudio. Victor pediu a troca em 19/11 21h47 | (1) Gemini TTS no Google AI Studio (Generate speech) com a conta Gemini paga do Victor: ele cola o texto e baixa o áudio, ou usa a API com a cota grátis do AI Studio (conferir a cota e a regra de uso de dados). (2) `edge-tts` (vozes neurais pt-BR, grátis, não oficial) roda sozinho no ambiente do agente, sem depender do Victor. Testar as duas com a mesma frase e o Victor escolhe, em 1 h | Sim: escolher a voz | Alta |
| V2 | Anúncios do Diogo no ar com fala antiga ("boleto", "acesso vitalício", "últimas horas") | `variacoes.md` "Depende do Victor" item 2: a decisão de trocar os originais ficou aberta; a fala nova está nas 6 variações pesadas (`passagem.md` 281) | Entregar ao Diogo a lista de qual original trocar por qual variação (grátis). O risco é prometer boleto que a oferta não tem | Sim: mandar ao Diogo | Alta |
| V3 | Áudio de resposta do agente para o Victor | Sem crédito da OpenAI, o serviço manda texto curto (aprendizados 19/11) | Texto basta no WhatsApp; se quiser voz, Gemini TTS pela API grátis. Não vale gastar | Não | Baixa |
| V4 | [RESOLVIDO 20/11: WebP no Safari] Vídeo do avatar do site mostra animação só no Chrome, Edge, Firefox e Android | Safari e iPhone ficam com imagens (`passagem.md` 204) | Converter o mesmo vídeo para WebP ou APNG animado com `ffmpeg` (grátis) e usar como reserva para Safari | Não | Média |
| V5 | Higgsfield: concluir o login e gerar vídeo | Conexão incompleta (`passagem.md` 183); backlog B43 diz "Higgsfield grátis não gera vídeo" | Não usar. O vídeo gerado sai do Flow e do Veo, já incluídos no Google AI Pro do Victor. Só 1 passo: o Victor baixa e arrasta o arquivo | Sim: arrastar o arquivo | Baixa |

## 5. Tráfego

| # | O que era para fazer | Por que parou (evidência) | Saída grátis proposta | Precisa do Victor? | Prioridade |
|---|---|---|---|---|---|
| T1 | Corrigir `{{ad.name}}` e `{{campaign.name}}` sem substituir em anúncio do Diogo | Apareceu na venda das 18h56 de 18/11 (auditoria item 8) e no debriefing de 19/11; a decisão 5 do debriefing ficou sem resposta | O trafego-wg lista os anúncios sem parâmetro e o Victor encaminha ao Diogo. Se o `Windsor` mostra o `utm_content` por anúncio, dá para achar o culpado sem pedir nada ao Diogo. Grátis | Sim: encaminhar | Alta |
| T2 | Tráfego pós-Black com R$ 10 a R$ 15 em conteúdo e anúncio para conversa no WhatsApp (B18, funil P1) | PARADO por decisão: tráfego é 100% do Diogo até a Black acabar (`decisoes.md` 18/11 [FIXA]); P1 depende do atendimento (A1) | Preparar de graça os criativos, as 3 variações e a segmentação por conteúdo (motor de vídeo, Canva conectado). A verba é o único custo e só liga com OK | Sim: quando a Black acabar | Média |
| T3 | Conferir a atribuição: a Meta mostrou 0 compras ontem e a Greenn 4 | Relatório de tráfego 19/11; o Pixel registrou 66 compras no período (`docs/revisao-17-e-18-nov.md` linha 60) | Usar Greenn por UTM como verdade, Meta só como direção (já está assim). Nenhum custo | Não | Baixa |

## 6. Ofertas e páginas

| # | O que era para fazer | Por que parou (evidência) | Saída grátis proposta | Precisa do Victor? | Prioridade |
|---|---|---|---|---|---|
| O1 | Tirar tudo que depende da Netlify, que vence em 25/11 | Decisão FIXA de 18/11 ("tirar o que restar"); a conferência ficou "aguardando seu OK, só leitura" (`docs/revisao-17-e-18-nov.md` 39 e 55) e não há registro de que foi feita. Em outubro as páginas de upsell e do DPC DW1 R$ 147 estavam lá (`funis-e-melhorias` melhoria 1) | Varredura só de leitura: buscar `netlify.app` em todas as páginas da Atomicat, nos botões do ManyChat, nos checkouts e nos upsells da Greenn e Hotmart. Lista pronta em 1 h; mudanças passam pela fila. Prazo real: 25/11 | Sim: OK da varredura | Alta |
| O2 | [RESOLVIDO 20/11: 297, sem terminou/16-11] Página de tráfego `/black-caveira-2026-oferta` com resíduo de 16/11 | O executor achou contagem regressiva até 16/11 19h e preço 297 no dado estruturado e não mexeu (`passagem.md` 242). Não há registro de correção | Ler a página pela Atomicat (`get_page`/`inspect_page`) e corrigir pela fila, 20 min. É a página que recebe o anúncio do Diogo | Sim: OK da fila | Alta |
| O3 | [RESOLVIDO 20/11: mídia na Atomicat] Hospedar a narração e o avatar do site em lugar nosso | O mp3 de 13 falas e o webm do avatar estão no CloudFront do Higgsfield (`passagem.md` 198 e 204). Se a conta do Higgsfield mudar ou for apagada, a página principal perde voz e avatar | Baixar e subir os dois como mídia da Atomicat (`upload_media`), trocar os links na página. 30 min, grátis | Sim: OK da fila | Alta |
| O4 | Domínio sem "www" não responde | `wesleygimenez.com.br` sem www falha (`passagem.md` 210), problema antigo que ninguém resolveu; quem digita assim ou tem link antigo perde a venda | Regra de redirecionamento do apex para o www no painel do DNS (a memória `dominios-e-dns` diz quem gerencia). Grátis no Cloudflare ou no registrador | Sim: quem gerencia o DNS | Alta |
| O5 | Garantia da Hotmart de 30 dias contra a regra de 7 | A auditoria de 17/11 (`revisao-17-e-18-nov.md` erro 3) disse "não mudei, preciso que você confirme" e a decisão FIXA de 18/11 diz 7 dias em tudo. Não há registro de a Hotmart ter sido conferida depois | Ler a oferta da Hotmart pelo Chrome logado e comparar com a página. Se estiver 30, mudar para 7 pela fila. Risco de reembolso e de texto contraditório | Sim: confirmar e logar | Alta |
| O6 | Páginas por busca no site novo (bullying, mulher, assalto, faca, etc.) | B43 "depois, páginas por busca" nunca começou (`backlog.md` B43). Sem elas o site não aparece no Google para a dor | Atomicat grátis e Search Console grátis para medir. Começar por 3 páginas das dores mais buscadas, com texto longo e o link do curso | Sim: aprovar os temas | Média |
| O7 | Esteira por dor, trilhas por perfil, degustação, PPN, calendário 2027 (B12 a B15, B17) | Marcados para dezembro por falta de tempo na Black (`backlog.md`) | Trabalho de texto e planilha, grátis. B17 (liberar 1 aula do curso para quem compra o e-book Vida Segura) é o que mais perto está da venda | Não | Média |
| O8 | Conversão por página (B11) e obrigado do e-book Vida Segura (estava quebrado em outubro) | B11 A FAZER; o obrigado "a conferir" (`funis-e-melhorias` P2) | Analytics da Atomicat (já conectado) e abrir a página com Playwright. Grátis | Não | Média |
| O9 | [RESOLVIDO 20/11: tabela na skill base-produtos-wg] Atualizar `base-produtos-wg` com os preços das páginas | A auditoria rodada 3 achou preços diferentes (`relatorios/2026-11-18-auditoria.md`). Sem registro de correção na skill. DÚVIDA: o agente do WhatsApp lê `conhecimento.txt`, que já foi montado das páginas (`passagem.md` 159), então o risco está nos outros agentes | Atualizar a tabela da skill lendo as páginas. 30 min | Não | Média |
| O10 | Trocar o número velho nos HTMLs das 30 páginas | Um script troca no carregamento, o HTML bruto ainda tem o 6056 (`passagem.md` 164 e 201). Funciona, mas é remendo | Trocar de vez quando cada página for editada, ou em lote pela Atomicat (`edit_page_file`). Baixa urgência | Não | Baixa |
| O11 | Dois travessões no `/catalogo` e limpeza das 74 ofertas da Greenn | Auditoria 18/11 rodada 3; `funis-e-melhorias` melhoria 7 | Pela fila, sem custo. Greenn só arquivar o que está sem venda há 90 dias, com lista aprovada | Sim: OK da lista | Baixa |

## 7. Financeiro

| # | O que era para fazer | Por que parou (evidência) | Saída grátis proposta | Precisa do Victor? | Prioridade |
|---|---|---|---|---|---|
| F1 | Placar com a Hotmart dentro | "Hotmart sem conector" em todo debriefing; relatório do financeiro de 19/11 exclui a Hotmart da conta; a aba Vendas da Hotmart não tem hora (`passagem.md` 241). A meta de 150 vendas orgânicas e os prêmios (camisa 3, encontro 20) dependem de contar as duas | A ponte já recebe o webhook da Hotmart; gravar também a data e hora do evento (campo da própria Hotmart) na aba Vendas, editando o Apps Script. Grátis. Enquanto isso, o CSV de vendas da Hotmart exportado 1 vez ao dia | Sim: abrir o script ou exportar o CSV | Alta |
| F2 | Reduzir o custo do ManyChat (cerca de R$ 1.393 entre 11 e 16/11, estimativa) e preparar a queda para Pro em 05/12 (B38) | A ponte cria contato para cada comprador (`funis-e-melhorias` melhoria 8); 3 recargas em 1 minuto em 11/11 sem explicação (`passagem.md` 110); B38 A FAZER | Conferir no ManyChat a lista de fluxos e a contagem de contatos; apagar contato inativo e sem tag de comprador (grátis) para cair de faixa; manter só os fluxos que vendem (novo seguidor, auto-DM de links, comentário FB, story). Conferir como o plano cobra antes | Sim: OK para apagar contatos | Alta |
| F3 | Régua de cobrança da Comunidade Caveira (assinatura) | "Pronta desde outubro e nunca enviada": 29 em dia e 189 em atraso em outubro, a conferir (`funis-e-melhorias` melhoria 4). Mais 2 cartões recusados em 17 e 18/11 (`20261119-sucesso-1`, PENDENTE esperando "pode mandar") | Primeiro e-mail grátis (Hotmart Send ou Cademi) com o botão que abre a conversa no WhatsApp; mensagem fora da janela de 24h usa modelo pago do ManyChat (cerca de US$ 0,07, conferir), então só para quem não abre o e-mail. Ver se a Greenn oferece lembrete próprio ao assinante | Sim: "pode mandar" | Alta |
| F4 | [FEITO 20/11: recompra real 3 de 1.258; ver aprendizados] Recompra em 30, 60 e 90 dias (B10) | "Sem dado ainda" (`relatorios/2026-11-19-financeiro.md`); precisa cruzar compra por comprador sem gravar dado pessoal; primeira leitura marcada para 26/11 | Script que lê `list_sales` da Greenn e compara por identificador embaralhado (hash) em memória, sem gravar nada. Grátis | Não | Média |
| F5 | Inventário de contas e passagem de contas ao nome do Wesley (B25) | Marcado para dezembro (`decisoes.md` 18/11; `backlog.md` B25). Negócio roda em contas do Luis corinthiano, do Samuel e do portfólio do Victor | Planilha de inventário sem senha: conta, dono, quem tem acesso, 2 etapas. Grátis | Sim: decidir o que passa ao Wesley | Média |
| F6 | Chargeback de R$ 3.697,64 (VIP Presencial) | Decisão do Victor 19/11: deixar correr (`decisoes.md`). O prazo de contestação continua correndo e ninguém registrou a data limite | Ler a data limite na Greenn (leitura) e preparar de graça o dossiê (aceite, aula assistida, comunicação) caso o Victor mude de ideia. Agente não mexe em dinheiro | Não | Baixa |

## 8. Sucesso do aluno

| # | O que era para fazer | Por que parou (evidência) | Saída grátis proposta | Precisa do Victor? | Prioridade |
|---|---|---|---|---|---|
| SA1 | Conferir as entregas da Hotmart na Cademi (B40, B41) | "Falta Hotmart" (`backlog.md` B40 e B41). Em 18/11, 12 compradores do tráfego ficaram sem acesso por entrega sem código (`passagem.md` 108) | Exportar a lista de produtos da Hotmart (CSV, grátis) e cruzar com as entregas da Cademi já mapeadas em `docs/mapa-entregas-cademi.md`. Precisa de acesso à conta | Sim: acesso ou CSV | Alta |
| SA2 | Fazer o aluno entrar na Academia (cerca de 30% nunca acessou) | Aprendizado fixo de outubro; e-mail "7 dias sem entrar" e boas-vindas só existem como ideia (`funis-e-melhorias` melhoria 5); o único disparo foi o de 23.155 e-mails em 19/11 (`passagem.md` 292) | Fluxo grátis no Hotmart Send ou na Cademi: dia 1, dia 3 e dia 7 sem acesso. O texto vem da skill `disparo-academia-wg` | Sim: OK do texto | Alta |
| SA3 | Guia de 12 semanas: acabar | Conversas abertas: vídeo de 60 s do guia e mensagem de aviso; conferir o botão do guia dentro da Academia; o 2º comprador (em euro) sem aviso (`memoria/conversas.md`; `passagem.md` 124 e 138). DÚVIDA: o vídeo de 55 s foi feito em 18/11 (`passagem.md` 129) e a lista não foi fechada | Fechar a lista: marcar o que está feito e testar o botão dentro da Academia como aluno. Grátis | Não | Média |
| SA4 | Depoimentos reais com autorização | Ideia em `funis-e-melhorias` melhoria 6, nunca feita; depoimento real "é o que mais falta para anúncio" | Google Forms no dia 8 de cada compra ("o que mudou?") com caixa de autorização. Grátis | Sim: OK do texto | Média |
| SA5 | Cursos menores do portal do Ferrari (lives, CP IA, Swipe File, ClickUp) | Travado: o portal abre como "Visitante" no Chrome da sessão (`passagem.md` 56) | Victor loga uma vez no Chrome da sessão; ou exporta os materiais. O Swipe File é o mais útil para copy | Sim: logar | Baixa |

## 9. Automações (tarefas agendadas e executor)

| # | O que era para fazer | Por que parou (evidência) | Saída grátis proposta | Precisa do Victor? | Prioridade |
|---|---|---|---|---|---|
| AU1 | Criar, mudar e apagar tarefas agendadas pela sessão | Negado nesta sessão (informado pelo Victor); a checagem agendada das 19h39 não pôde ser apagada (`passagem.md` 293). O executor só foi criado porque o Victor criou na tela | Victor edita pela tela (2 cliques, grátis). Além disso, o Worker pode disparar o executor só quando há recado ou item APROVADO, em vez de rodar uma sessão por hora de 9h a 18h: Cron Trigger grátis do Cloudflare mais o `EXECUTOR_TOKEN` que já existe (`passagem.md` 235). Gasta menos | Sim: criar o Cron e apagar a tarefa velha | Alta |
| AU2 | Trava técnica que funcione (B21) | `.claude/settings.json` bloqueia com nomes de ferramenta que não batem com os conectores desta conta, então a trava de publicar não vale (`backlog.md` B21; `passagem.md` 43) | Escrever o `deny` com os nomes reais (Metricool_Social_Media_Management, Windsor_ai, Atomatic) e manter o executor em outra configuração. Teste em sessão. Grátis | Sim: aprovar | Média |
| AU3 | Código da ponte Apps Script dentro do repositório (B33) | O código vive só no Apps Script; a auditoria de 18/11 não conseguiu ler (`2026-11-18-auditoria.md` item 7); B33 "falta trazer para o repositório sem a chave" | `clasp` (ferramenta grátis do Google) puxa o projeto; ou o Victor cola o código. Tirar as chaves antes do commit | Sim: 1 login | Média |
| AU4 | Conferir a ponte na próxima venda de contato antigo (B33) | Pendente de venda real; a venda do tráfego das 20h15 de 18/11 já passou (`passagem.md` 99); DÚVIDA se foi conferida | Olhar a aba Erros e as execuções de "Acesso pós-compra" depois de cada venda, pela ponte (já lida todo dia). Grátis | Não | Média |
| AU5 | Testar o disparo na hora do executor e trocar o modelo da tarefa para Sonnet | Pendentes (`passagem.md` 224 e 237); o Victor decidiu Sonnet em tudo para gastar menos | 2 minutos na tela da tarefa e 1 áudio de teste. Grátis | Sim | Baixa |

## 10. Infraestrutura e segurança

| # | O que era para fazer | Por que parou (evidência) | Saída grátis proposta | Precisa do Victor? | Prioridade |
|---|---|---|---|---|---|
| I1 | Segurança pendente do atendimento: anular o token antigo do WhatsApp, trocar o app secret, trocar a chave da Anthropic, o Samuel trocar a senha do Facebook e perder o acesso quando não precisar | Lista em `docs/atendente-whatsapp-status-18-nov.md` seção "Segurança pendente"; sem registro de que foi feito. O Facebook do Samuel tem acesso total às páginas do Wesley (`decisoes.md`) | Tudo grátis, só tempo: checklist de 30 min com o Victor, sem o agente ver chave nem senha | Sim | Alta |
| I2 | Verificação em 2 etapas no Gmail do Luis corinthiano (onde ficam Windsor, ponte, Instagram, Atomicat) | "Fazer primeiro" em `docs/seguranca-contas.md`; sem registro de conclusão | Aplicativo autenticador e códigos de reserva, 10 minutos, grátis | Sim | Alta |
| I3 | Monitor de queda de Worker, ponte e páginas principais (B24) | A FAZER; o `/grupo` quebrou e foi o Victor quem viu | Cron Trigger do Worker busca 8 a 10 URLs a cada 15 min e avisa pelo `/avisar`; um monitor externo de plano grátis (UptimeRobot, conferir os limites) como segundo olho. Grátis | Não | Alta |
| I4 | Limite de 1.000 gravações por dia do KV grátis do Cloudflare | Estourou às 10h40 de 19/11 e derrubou mensagens (`passagem.md` 214 e 217). Já se gravou menos, mas o risco continua | Mover histórico e diagnóstico para o D1 (banco do próprio Cloudflare, cota diária bem maior no plano grátis, conferir); o plano pago de US$ 5 só se precisar | Não | Média |
| I5 | Segredos fora do texto da tarefa (B23) | Contradição nos arquivos: `decisoes.md` 18/11 diz que o Victor mandou tirar as chaves do texto; `docs/seguranca-contas.md` conclui "manter como está" (mesma noite). Não há registro do que prevaleceu | Escrever a ficha de segredos sem valores (onde mora cada chave, como revogar, ordem se vazar). Decidir por 1 das 2 linhas. Grátis | Sim: decidir | Média |
| I6 | Conta de WhatsApp do portfólio do Wesley restrita (#2655121) | O número oficial roda no portfólio do Victor Augusto (coexistência em 19/11 00h55, `passagem.md` 142). O negócio depende de uma conta pessoal | Pedir revisão da restrição na Central de Suporte da Meta e concluir a verificação de empresa do Wesley (grátis, com documentos dele). Ligar à independência do provedor | Sim e o Wesley | Média |
| I7 | Acesso à pasta Downloads do PC negado | Impediu levar o vídeo do avatar e as 19 artes do ChatGPT por conta própria (`passagem.md` 200 e 299) | Pasta "ENTRADA DO AGENTE" no Drive do Luis corinthiano, lida pelo conector do Google Drive; ou o Victor arrasta o arquivo no chat (funcionou às 21h55). Grátis | Sim: criar a pasta | Média |
| I8 | Segunda via do chip do (31) 97334-6056 | Chip perdido (`atendente-whatsapp-status-18-nov.md`); qualquer verificação nova por SMS trava, mesmo sendo agora número da Kairós | Pedir a segunda via à operadora (linha no CPF dele). Grátis ou taxa pequena da operadora | Sim | Baixa |
| I9 | Jarvis no PC do Victor | PC com 8 GB de memória e 1,7 GB livre; falta reiniciar e abrir o Jarvis (`passagem.md` 189 e 193) | Tirar programas da inicialização; o WhatsApp com `#nome` já cobre tudo. Sem comprar memória | Sim | Baixa |

## 11. Dados e dashboard

| # | O que era para fazer | Por que parou (evidência) | Saída grátis proposta | Precisa do Victor? | Prioridade |
|---|---|---|---|---|---|
| D1 | Relatório de vendas por origem: `vc` e `FB` por medium, campaign e content (B01) | Aprovado pelo Victor em 18/11, A FAZER desde então (`backlog.md` B01; `decisoes.md` 18/11). Sem isso não sabemos qual mensagem, post ou anúncio vende | Aba nova na planilha WG com `QUERY` sobre a aba Vendas (grátis); entra no debriefing diário | Não | Alta |
| D2 | [RESOLVIDO 20/11: aba Reabertura] Medição da reabertura por hora e por mensagem (B02) | Começa sexta 19h; só a Greenn tem hora (`passagem.md` 241). Falta o formulário de ordem dos compradores para camisa, encontro e livros | Preparar hoje a aba "Reabertura" com contagem por hora e por `utm_content`, mais a regra da F1 para a Hotmart | Não | Alta |
| D3 | Painel de venda por agente (`utm_term=ag-*`) | Ideia em `funis-e-melhorias` melhoria 9; nenhum agente vendeu com `ag-*` ainda (debriefing 19/11) | Tabela da aba Vendas por `utm_term`, mesma fórmula do D1 | Não | Média |
| D4 | Painel visual único para o Victor | Hoje tudo chega por texto no WhatsApp e planilha; nenhum painel foi montado. DÚVIDA se ele quer | Looker Studio (grátis) sobre a planilha WG, ou um Artifact com os 6 números do dia. Conexão da planilha, 1 h | Sim: se quiser | Baixa |

---

## As 10 saídas grátis que mais ajudam a vender agora

Ordem pensando nas próximas 90 horas (reabertura sexta 19h a segunda 19h) e depois.

1. **Plano B do agente do WhatsApp (A1 e A2).** Recarga automática com limite, Workers AI como reserva e resposta por regra para acesso e catálogo. Um lead perdido por falta de crédito custa mais que o crédito. Hoje 3 leads ficaram esperando.
2. **Link nosso na frente dos funis do ManyChat (G1).** Trocar o destino uma única vez para uma página da Atomicat; depois ela redireciona sozinha na hora certa. Tira a dependência de navegador para a virada de sexta 18h50.
3. **Hotmart dentro do placar com hora (F1, A3, SA1, D2).** Webhook com data e hora, credenciais da API e CSV semanal. Sem isso o ranking dos 3 que ganham camisa e dos 20 do encontro não é provável, e a meta orgânica sai incompleta.
4. **Monitor de queda com aviso no WhatsApp (I3 e G2).** Teste a cada 15 min de `/grupo`, página da Black e checkout, de graça no Cloudflare. A queda de 19/11 do contador só foi vista por acaso.
5. **Varredura de Netlify antes de 25/11 (O1) e conferência da `/black-caveira-2026-oferta` e da garantia da Hotmart (O2 e O5).** Três conferências de leitura que evitam venda quebrada durante a campanha.
6. **Voz natural com Gemini TTS ou `edge-tts` (V1).** Troca a voz robótica em vídeos e páginas. Reels com voz melhor seguram mais gente (a Parte 1 teve 85% de pulo nos 3 s, `relatorios/2026-11-19-debrief.md`; a voz é uma das causas possíveis, DÚVIDA).
7. **Cortes de aulas e lives como conteúdo (S1) e links de venda nos 20 vídeos mais vistos do YouTube (S2).** O Wesley não grava e o canal de 3,31 mi quase não leva para a venda. Os dois são trabalho interno com ferramenta que já temos.
8. **Fluxo de e-mail grátis para o aluno entrar na Academia (SA2).** Dia 1, 3 e 7 sem acesso, pelo Hotmart Send ou pela Cademi. Cerca de 30% nunca entraram; quem entra pede menos reembolso e compra de novo.
9. **Cobrança suave da Comunidade por e-mail antes do WhatsApp pago (F3).** Dinheiro que já existiu: 189 assinaturas em atraso em outubro (a conferir), mais os 2 cartões recusados. E-mail e botão para a conversa custam zero.
10. **Segurança em 30 minutos com o Victor (I1 e I2).** Segundo fator no Gmail do Luis corinthiano e troca das chaves expostas. Perder a conta do Instagram de 1,8 mi seria o pior cenário de venda possível, e a correção é grátis.

Menções honrosas (grátis, média prioridade): DNS sem www (O4), subir narração e avatar do site para a Atomicat (O3), reserva animada para Safari e iPhone (V4), limpeza de contatos do ManyChat antes da queda para Pro (F2).

## O que depende do Victor (resumo para decidir)

1. Ligar recarga automática da API e dar OK ao plano B do atendente (A1).
2. Abrir sessão com Chrome sexta 18h45 para a virada dos funis do ManyChat, ou aprovar o link nosso na frente deles (G1).
3. Escolher a voz (Gemini TTS ou `edge-tts`) depois de ouvir 2 amostras (V1).
4. Passar credenciais da API da Hotmart e exportar o CSV (A3, F1, SA1).
5. Decidir o caminho dos grupos depois do DevZapp (G3) e das chaves da tarefa agendada (I5).
6. Encaminhar ao Diogo os anúncios com fala antiga e com macro quebrada (V2 e T1).
7. 30 minutos de segurança com o checklist (I1, I2).

## O que li e o que ficou em dúvida

- Li: todos os arquivos listados no início. Contei 67 itens a partir deles. Não li as cópias em `kairos/` do Projeto (sem ferramenta Projects nesta sessão) nem abri nenhuma plataforma ao vivo; por isso nada aqui está "conferido hoje" no ar.
- Dúvidas (marcadas DÚVIDA no texto): se o aviso de venda já inclui a Hotmart (`docs/conexoes.md` diz que não; `passagem.md` 249 diz que sim); se o vídeo do guia e o aviso foram concluídos; se a garantia da Hotmart ainda mostra 30 dias; qual das duas linhas sobre segredos prevaleceu; se `base-produtos-wg` foi atualizada.
- Preço e cota das ferramentas (Gemini, Workers AI, D1, Metricool, UptimeRobot, Hotmart Send, ManyChat) não foram conferidos hoje. Antes de depender de qualquer uma, abrir a página oficial e anotar a cota.

## Atualização 19/11 22h20 (Victor deu OK geral)
- FEITO: plano B grátis do agente (Workers AI) e alerta de falha da IA no ar; monitor de queda a cada 15 min (cron do Cloudflare: /grupo, Black, Black tráfego, link do DevZapp) com aviso no WhatsApp.
- FEITO: voz Gemini escolhida (decisoes.md).
- CORREÇÃO O2: o preço 297 da página de tráfego é de propósito (Diogo). Só o resíduo de contagem de 16/11 ainda deve ser conferido.
- Netlify (vence 25/11), varredura de 107 páginas no ar: só 2 marcas. (1) FAQ da /black-caveira-2026 manda para wesleygimenez.netlify.app/catalogo (trocar por www.wesleygimenez.com.br/catalogo, que já responde 200). (2) /pos-venda/obrigado tem form com atributo data-netlify, mas grava no Google Forms: funciona sem a Netlify.
- Falta conferir: garantia da Hotmart (precisa do Chrome logado na Hotmart).

## Placar em 20/11 10h25
- Resolvidos (8): A2 plano B grátis, G2 contador /grupo + monitor, G4 stories da reabertura, V1 voz Gemini, O1 link da Netlify, O5 garantia Hotmart (já era 7), I3 monitor de queda, I7 Downloads (contornado: Victor arrasta para a conversa).
- Em parte (2): A1 agente 24h (plano B no ar, crédito Anthropic pendente), O2 página de tráfego (297 é de propósito; falta conferir a contagem de 16/11).
- Fora da lista por decisão do Victor: F3 cobrança da Comunidade (não mexer).
- Hoje 18h50: G1 virar os funis do ManyChat.
