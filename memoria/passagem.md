# Registro de passagem

No fim de cada etapa relevante (ou quando o Victor disser "salva o contexto"), quem trabalhou escreve uma entrada curta aqui, no topo. No máximo 10 linhas. Sem dados de cliente, senha ou chave. Separar o que foi **pedido**, o que foi **feito** e o que é **suposição**. Entradas com mais de 30 dias são resumidas pelo chefe-wg na revisão semanal.

Modelo:
```
## AAAA-MM-DD HHh · assunto
- Pedido: ...
- Feito: ... (arquivos)
- Decisões: ...
- Pendente / próximo passo: ...
- Verificado? sim/não, como
```

## 2026-11-18 19h35 · social responsável pelo Instagram
- Pedido: o social decide sozinho (radar de notícias e de formatos virais, leitura dos 4 a 5 posts diários do Wesley, escolha do público, peça pronta, roteiro para o Wesley, proposta de ferramenta com custo) e entrega tudo na rotina da manhã.
- Feito: skill `estrategia-instagram-wg`; ficha do social reescrita; rotina das 7h35 com a "entrega da manhã" e produção pelo motor; B30 (conectar Instagram no Windsor) e B31 no backlog.
- Pendente: Victor conectar o Instagram no Windsor (sem isso, não há métrica por post).
- Verificado? sim, tarefa agendada atualizada e commit na main.

## 2026-11-18 19h20 · série "Golpe da falsa central" partes 2 a 5
- Pedido: Victor aprovou a Parte 1 (postada como Reels de teste) e pediu as partes 2 a 5 para programar (qui 7h, 12h, 18h; sex 7h) e cobrou o social por não ter feito sozinho.
- Feito: motor de Reels narrados (`conteudo/serie-golpe-central/motor/`), skill `video-serie-wg`, cobrança na ficha do social; o social produziu as partes 2 a 5 com capas, legendas e fontes (`serie.md`, `legendas.md`); revisado pelo Claude.
- Pendente: Victor programar; medir em 72 h; trocar a voz pela do DaVinci se o Victor baixar o áudio.
- Verificado? sim, folhas de conferência e capas revisadas.

## 2026-11-18 18h40 · vídeo de teste v2 e régua de qualidade do social
- Pedido: o Victor reprovou o 1º teste (simples, feio, "Comente SEGURA" sem sentido); quer vídeo dinâmico, autoexplicativo para o povão, formato história com "comente CAVEIRA para ver a parte 2", e o social media em nível profissional.
- Feito: `conteudo/teste-2026-11-18/wg_reel-golpe-central-parte1_9x16_v2_2026-11-18.mp4` (26,5 s, celular tocando, conversa digitada, SMS, tensão, suspense, som em cada gesto e trilha sintetizada) com o código em `v2/`; regra "tudo autoexplicativo" no CLAUDE.md; padrão de produção e formato história em partes na `edicao-video-arte-wg`; ficha do social com nível de entrega.
- Pendente: aprovação do estilo; Parte 2; conferir o que a palavra CAVEIRA manda no direct hoje (grupo de espera da reabertura).
- Verificado? sim, quadros conferidos e volume medido (pico -1,1 dB).

## 2026-11-18 18h20 · clone aprovado e Operação WG 2.0
- Pedido: decisões do Victor (clone liberado para Reels de teste, chaves em variáveis, contas em dezembro, testar edição) e uma nova base para toda a operação.
- Feito: decisões em `memoria/decisoes.md`; B27 e B28 atualizados e B29 (piloto do clone) no backlog; regra do clone na `edicao-video-arte-wg`; `docs/estrutura-operacao-wg-v2.md`.
- Pendente: o Victor colar as chaves nas variáveis da tarefa agendada; termo e take de treino do Wesley; escolher a ferramenta de avatar (paga, conta do Wesley).
- Verificado? sim, commitado na main.

## 2026-11-18 17h40 · livros da Mestres Play (20 e-books)
- Pedido: ler os 20 e-books da Biblioteca dos Mestres e aplicar nos agentes, automações e operação.
- Feito: texto extraído dos 20 PDFs; notas em `docs/livros-mestres/` (índice + 12 notas); aplicado em CLAUDE.md, chefe, analista, todas as fichas (seção Mudanças), pauta, edição, atendimento e settings.json; backlog B21 a B28.
- Profundidade: lidos por inteiro os trechos de método dos livros 05, 07, 18; os outros pela estrutura completa (objetivos, comandos, listas de conferência, erros comuns) e trechos-chave. Os PDFs ficam na conversa, não no repositório (licença pessoal).
- Achado: `.claude/settings.json` bloqueia ferramentas com nomes que não batem com os conectores desta conta, então a trava de publicar não está valendo (B21).
- Pendente: decisões do Victor (clone, contas no nome do Wesley, chaves fora do texto da tarefa).
- Verificado? sim, arquivos commitados na main.

## 2026-11-18 17h · agentes autônomos
- Pedido: deixar os agentes capazes de trabalhar sozinhos (medir, achar o que vende, propor estratégia), só pedindo aprovação; não pedir públicos ao Diogo.
- Feito: fichas dos 8 agentes reescritas (mede, fontes, rotina, sinal de alerta, itens do backlog); `memoria/backlog.md` (B01 a B20) e `memoria/voz-do-cliente.md`; agente do dia em `rotinas/agenda.md`; ciclo de autonomia no `chefe-wg`; CLAUDE.md, README da memória, decisões e `tudo.md`. Rotina diária ganhou a rodada do agente do dia.
- Pendente: primeira rodada amanhã 19/11 (quinta: financeiro); B02 na sexta.
- Verificado? sim, arquivos na main.

## 2026-11-18 16h · Corredor Polonês fechado; cursos menores travados no login
- Pedido: terminar o curso todo na mesma conversa.
- Feito: módulos de base (aulas 2, 9, 11 a 18, 23 a 25, 30 a 34, 58 a 63) em `docs/curso-corredor-polones-base-notas.md`. Skills ampliadas: `pauta-conteudo-wg` (conteúdo por degrau, Stories, termômetro do direct), `edicao-video-arte-wg` (roteiro, gravação, edição no celular), `trafego-wg-guardrails` (separar por origem, 70% a 80% no quente). Com isso o Corredor Polonês está inteiro, menos as aulas sem legenda (4, 21, 44, 47 a 57).
- Travado: cursos menores (Minhas lives semanais, CP IA, Pack Swipe File, ClickUp de lançamentos). O portal portal.grupoxflow.com.br abre como "Visitante" no Chrome desta sessão (Browser 1, Windows) e só mostra os banners de venda. Precisa do Victor logado no portal nesse Chrome, ou escolher o Chrome onde ele já está logado.
- Propostas para o Victor (nada executado): calendário anual de aberturas, mapa da esteira dos 23 cursos por dor, trilhas por perfil na Academia, pesquisa de alunos com perguntas de perfil, relatório de vendas por grupo, post e anúncio, nove assuntos de Stories do Wesley.
- Verificado? sim: todas as aulas com legenda lidas inteiras; commit na branch `diag-envio-whatsapp`; cópia em `kairos/`.

## 2026-11-18 16h · roteiro da reabertura com "como comprar" e merge na main
- Pedido: juntar a branch na main e pôr no roteiro um passo curto de como comprar.
- Feito: chamada final do roteiro (artifact "Roteiro Reabertura Caveira", mesmo link) e `docs/reabertura-20-nov-oferta.md` com "clica no link, cartão ou Pix, acesso chega no e-mail, dúvida chama a equipe no WhatsApp". `main` atualizada.
- Pendente: WhatsApp 24h (YCloud) em 19/11; resto do Corredor Polonês na outra conversa.
- Verificado? sim, push feito e cópia no projeto.

## 2026-11-18 15h · Corredor Polonês: copy e tráfego estudados
- Pedido: continuar o curso do Ferrari, copy e tráfego primeiro, depois o resto e os cursos menores; notas com aplicação no WG e skills.
- Feito: notas em `docs/curso-corredor-polones-copy-notas.md` (aulas 64 a 91) e `docs/curso-corredor-polones-trafego-notas.md` (104 a 118). Skill nova `copy-lancamento-wg`; skill `trafego-wg-guardrails` ampliada (fases, públicos, funil, rastreio). `tudo.md` atualizado. Cópias em `kairos/` no projeto.
- Legendas: o Chrome usado nesta sessão (Browser 1, Windows) não tinha as chaves salvas, então foram baixadas de novo e estão no localStorage de player.scaleup.com.br desse Chrome, chaves `cp_<nº>`, para as 67 aulas pendentes. Como baixar: iframe `/embed/<código>` na própria aba, 5 por vez, pegar a faixa de legenda `PORTUGUESE` ou, se não houver, `TRANSCRIPTION`, modo `hidden`, e juntar os textos. A aula 112 precisou de espera maior (9 s).
- Como ler: montar o texto em um <pre> e usar get_page_text em fatias de até 45 mil caracteres (a ferramenta corta em 50 mil).
- Pendente, nesta ordem: aulas 2, 9, 11 a 13, 14 a 18, 23 a 25, 30 a 34, 58 a 63 (cerca de 270 mil caracteres, dá duas sessões de leitura); depois os cursos menores do portal (lives semanais, CP IA, Swipe File, ClickUp).
- Suposição a confirmar com o Victor: premissa de campanha sugerida nas notas de copy e a divisão de verba do dia a dia (R$ 10 a R$ 15 em conteúdo para seguidores) são propostas, não decisões.
- Verificado? sim: todas as aulas de copy e de tráfego lidas inteiras; arquivos commitados na branch `diag-envio-whatsapp`.

## 2026-11-18 14h10 · continuar o curso do Ferrari em sessão nova
- Pedido: terminar o Corredor Polonês e os cursos menores numa conversa nova do projeto VICTOR. A.
- Onde estão as legendas: no Chrome do Victor, aba player.scaleup.com.br, localStorage. Chaves `cp_<nº da aula>` (texto já sem repetição) e `cp_list` (lista nº|código|título). Códigos e títulos também em `docs/cursos/corredor-polones-aulas.md`.
- Como ler: abrir player.scaleup.com.br/embed/<qualquer código>, rodar JS que junta `localStorage.getItem('cp_'+n)` das aulas do módulo, trocar o documento por um <pre> com o texto e ler com get_page_text em blocos de ~45 mil caracteres. Nunca ecoar URLs com parâmetros.
- Falta resumir: 11 a 13 (estrutura de lançamento, perpétuo, eventos), 14 a 18 (produtos e preço), 23 a 25 (dados, posicionamento, temperatura), 30 a 34 (atração), 58 a 63 (gravação), 64 a 91 (copy), 104 a 118 (tráfego), 2 e 9 (panorama, gatilhos). Sem legenda: 4, 21, 44 e 47 a 57.
- Depois: cursos em portal.grupoxflow.com.br/m/courses?tenant=contedoscomplementares (Minhas lives semanais, CP IA, Pack Swipe File, ClickUp de lançamentos). Lista de aulas: clicar nos botões dos módulos e pegar os links `classId`; código do vídeo pelo iframe `/embed/`. Legendas: iframes do player abertos na própria aba do player, 5 por vez (ver como foi feito em `docs/curso-low-ticket-ia-notas.md`).
- Entregar: notas em `docs/curso-corredor-polones-<modulo>-notas.md` (palavras próprias, com aplicação no WG), skills novas ou atualizadas (copy e tráfego primeiro), cópia em `kairos/` no projeto e passagem no fim.
- Verificado? sim, legendas conferidas (todas as aulas com legenda têm texto salvo).

## 2026-11-18 14h · cursos, reabertura e kit do grupo
- Pedido: estudar os cursos do Leandro Ferrari e o kit de PDFs do grupo; montar a reabertura de 20/11 sem refazer a régua.
- Feito: notas dos cursos em `docs/curso-*`; skills novas `lancamento-pago-wg`, `front-ebook-wg`, `edicao-video-arte-wg`; reabertura em `docs/reabertura-20-nov-oferta.md` e régua do Gui atualizada; `tudo.md` criado.
- Decisões: reabertura a R$ 397 (aluno R$ 347); prêmios 3 camisas, 20 no encontro, livros até 23h59; vídeo gravado no lugar da live; DPC 2.0 depois para quem não comprou.
- Pendente: resumir os módulos restantes do Corredor Polonês (legendas no navegador do Victor); WhatsApp 24h (YCloud) em 19/11.
- Verificado? sim, arquivos commitados e copiados para o projeto.

## 18/11 19h55 · Financeiro no nível do social + área segura do Reels
- Pedido: financeiro com skill, planilha e teste; medidas do Reels para o social (sem mexer no que está pronto).
- Feito: planilha "Painel Financeiro WG (agente financeiro)" com 6 abas e fórmulas (Resumo, Diário, Vendas, Produtos, Custos, Reembolsos); skill `controle-financeiro-wg`; ficha do financeiro aponta para ela; área segura do Reels em `edicao-video-arte-wg` (Y 285 a 1470, X 110 a 945) e imagem em `docs/referencias/`.
- Teste: 3 vendas de 18/11 entraram; Resumo leu orgânico 115 / R$ 25.361,74 (77% e 85% da meta), faltam 35 vendas, ritmo 2,7 por dia; tráfego 67 vendas, R$ 4.379,13, gasto Meta R$ 5.432,56 (Windsor), ROAS 0,81, custo por venda R$ 81,08 (estimativa).
- Decisões: planilha pt_BR usa `;` e vírgula decimal dentro da fórmula.
- Pendente: custo do ManyChat; credenciais Hotmart e Cademi (Victor cola na variável de ambiente); passo diário do financeiro na tarefa agendada (prompt não foi alterado hoje); macro `{{ad.name}}` num anúncio do Diogo.
- Verificado: valores lidos de volta da planilha, sem #ERROR!.

## 18/11 21h40 · Auditoria e correções (página, recuperação, ponte)
- Pedido: auditoria completa; executar o que o Victor aprovou (prêmios da reabertura na página, recuperação de carrinho, conserto da mensagem de acesso); agente auditor; anotar tudo.
- Feito: agente `auditor-wg`; `relatorios/2026-11-18-auditoria.md`; tarefa agendada com Metricool e passo do financeiro; página /black-caveira-2026 com troca automática dos prêmios sex 19h (testada); recuperação de carrinho sem cupom para todos + "Tamo junto" (publicada) e modelo com "Shalom" em análise na Meta; ponte versão 6 procurando contato existente por telefone, e-mail e nome.
- Decisões: sex 19h os funis do ManyChat viram para a página (B35); ManyChat vai para o Pro; DevZap sai em dezembro (B36).
- Pendente: aprovação do modelo na Meta (19/11); conferir a ponte na próxima venda; Metricool ainda sem posts (checagem 19/11 9h15); comprador das 17h12 não recebeu a mensagem de acesso (decidir se manda à mão).
- Verificado: página no ar simulando 20/11 19h05 e 21/11 00h10; automação publicada ("versão publicada foi atualizada"); ponte respondendo depois do deploy.

## 18/11 23h · Acesso dos compradores do tráfego + custos
- Pedido: os 12 compradores da Black do tráfego estavam sem acesso; passar ManyChat e DevZap para o financeiro.
- Feito: entrega #276456 da Cademi ganhou o código 204640; 10 compradores receberam a entrega na mão, 2 já tinham acesso. Custos no Painel Financeiro (ManyChat ~R$ 1.393,42 estimado, DevZap R$ 197; total R$ 7.075,98) e Resumo lendo o total certo.
- Decisões: alunos criados na Cademi com "Criar e enviar boas vindas" (Victor: "tem que ligar lá").
- Pendente: próxima venda do tráfego entra sozinha? (conferir); B41 mapa de entregas; recargas duplicadas do ManyChat em 11/11; perguntas do Victor sobre suporte de acesso no WhatsApp, MCP da Greenn, "2,2,2" na Greenn e agentes individuais.
- Verificado: cada um dos 10 alunos mostra "BLACK CAVEIRA 2026 - 1 ANO (Cópia)" em Compras; Custos!B9 = 7075,98.

## 18/11 23h40 · Fechamento de tudo antes da próxima ideia do Victor
- Pedido: deixar tudo pronto e funcionando (auditoria, agentes, Metricool, MCP da Greenn, agentes conversando entre si); atendente do WhatsApp fica responsável também pelo suporte de acesso (com as 2 consultas novas).
- Feito: Metricool com dados; lista dos posts da Black para arquivar; conector Greenn adicionado e autorizado pelo Victor no Chrome do Luis corinthiano; vendas de novembro cruzadas com as 114 entregas da Cademi (nenhum furo além do 204640 já corrigido); diagnóstico e plano do Guia 12 semanas; canal `memoria/conversas.md` e regra no CLAUDE.md, ficha do chefe e agenda; modelo da recuperação aprovado.
- Decisões: atendente do WhatsApp faz o suporte de acesso (Victor); agentes conversam pelo chefe; MCP da Greenn só leitura, mudança pela fila.
- Pendente: OK do Victor na lista de posts; construir o Guia novo (sucesso-aluno 19/11); passo do modelo na automação de recuperação; Hotmart; atendente 24h; chaves da tarefa agendada.
- Verificado: Metricool e Greenn responderam com dados; página do guia testada clicando; modelo "Aprovado" na tela do ManyChat.

## 18/11 23h55 · Guia de 12 semanas novo no ar
- Pedido: criar o guia novo e trocar (OK do Victor: "Tem o meu ok").
- Feito: li as aulas reais na Cademi (Modo Caveira 175622, Protocolo Vida Segura 480036, Desafio 30 Dias 246346; link do aluno `/area/conteudo/aula/<id>`). Guia com 3 perguntas (objetivo, dias por semana, sozinho ou com alguém), "treino de hoje" com botão da aula, 3 trilhas (rua, família, físico) x 2, 3 ou 5 dias, ganho de cada mês, regras de segurança. Publicado na mesma URL /guia/trilha-12-semanas; script antigo do rodapé trocado; descrição da página atualizada; backup do antigo na Atomicat.
- Decisões: posts para apagar só os da Black (Victor), depois; Hotmart sem conector (seguimos pelo navegador).
- Pendente: vídeo de 60 s (social), mensagem para quem tem o guia (fila), conferir o botão do guia dentro da Academia (Chrome desconectou), lista de posts só com os da Black.
- Verificado: teste em celular simulado (3 trilhas e ritmos, sem erro, sem link vazio); página no ar renderizada pela Atomicat com plano família 2 dias.

## 18/11 23h45 · Guia (vídeo, aula, aviso) + limpeza da Black no Instagram + uma tarefa agendada só
- Pedido: vídeo do guia, aviso a quem tem o guia, apagar os posts da Black que menos engajaram, deixar só uma tarefa agendada, ensinar os agentes.
- Feito: vídeo de 55 s com telas reais (conteudo/guia-12-semanas/video/); texto da aula 9840709 na Academia trocado; modelo caveira_guia_novo enviado para a Meta (para os 2 compradores do guia); 12 posts/reels da Black apagados com OK do Victor (conferido 12/12, e os que ficam 12/12); lembrete do guia apagado e o do Metricool desligado (não deixou apagar); skills edicao-video-arte-wg, estrategia-instagram-wg, suporte-acesso-wg e ficha do sucesso-aluno-wg atualizadas.
- Decisões: só uma tarefa agendada (a das 7h35); apagar em vez de arquivar os posts da Black.
- Pendente: quando o modelo caveira_guia_novo for aprovado, mandar para os 2 compradores (precisa do Chrome; pedir na conversa); PDFs antigos na aula do guia (tirar com OK).
- Verificado: fetch de cada post depois de apagar; vídeo conferido em folha de quadros e volume.

## 18/11 23h55 · PDFs antigos fora + aviso do guia enviado
- Pedido: tirar os PDFs antigos da aula do guia; mandar o aviso do guia se o modelo estiver aprovado.
- Feito: 9 PDFs tirados da aula 9840709 (Cademi), dica reescrita, conferido como aluno (0 PDFs). Modelo caveira_guia_novo aprovado pela Meta como Marketing; transmissão enviada para 1 comprador (contato achado pelo telefone, etiqueta aviso_guia_novo_1811, público conferido = 1, ~US$ 0,07).
- Pendente: o 2º comprador (pagou em euro) não está no ManyChat e a Greenn não mostrou o telefone dele; fica sem aviso (ele vê o guia novo na Academia).
- Aprendizado: no ManyChat, a caixa de entrada não manda sem licença; para mandar a 1 pessoa fora da janela, etiqueta só nela + Mensagem em massa com o modelo, conferindo que o público é 1 antes de enviar.

## 19/11 00h55 · Número de suporte 4274 na YCloud
- Pedido: ligar o agente do WhatsApp no (31) 99329-4274 (antigo suporte) via YCloud; 6056 fica só para a Kairós.
- Feito: coexistência concluída no portfólio Victor Augusto (o WABA do portfólio do Wesley está restrito, erro #2655121). Conta "Victor Augusto - WG", WABA 1114391257639372, status Conectado, limite 250 clientes/dia.
- Código: worker lê pela YCloud (POST /yc, assinatura YC_WEBHOOK_SECRET), ignora eventos da Meta de outro número, eco do celular pausa o agente. Publicado no Cloudflare com OK do Victor (conteúdo conferido igual ao repositório).
- Pendente: Victor cola YC_KEY e YC_WEBHOOK_SECRET (formulário já preenchido com YC_FROM=+553193294274); passar ADMIN_FONE para Segredo; teste "oi"; MODO=ativo; migrar o número de suporte (Academia, Greenn, Hotmart, páginas, grupos, conhecimento.txt, CLAUDE.md).

## 19/11 01h40 · Agente do 4274 respondendo, voz humana e consulta de compra
- Feito: webhook YCloud estava Inativo (ligado). A YCloud manda cada mensagem 2x (inbound_message.received e inbox.message.created): o agente usa só inbox.message.created. Teste do Victor às 01:16: uma resposta, sem erro. Rastro de cada passo em KV diag:passos.
- Voz humana no prompt + skill voz-humana-atendimento-wg. Modo #cliente/#chefe para o Victor testar como cliente.
- Ferramenta consultar_compra (Greenn API pública v1, GET /sales?filter[client_email]; Hotmart sales/history). Sem segredo ela avisa que a plataforma não está conectada e não afirma que a compra não existe.
- Pendente (Victor): criar token na Greenn (Configurações > Integrações e Tokens > Criar token, só escopo "Consultar vendas") e colar como segredo GREENN_TOKEN; Hotmart: credenciais (HOTMART_CLIENT_ID, HOTMART_CLIENT_SECRET, HOTMART_BASIC); Cademi: ver a API no admin (perfil Victor Augusto). Depois: skills de venda/copy no conhecimento, 10 conversas simuladas, MODO=ativo, migração do número.

## 19/11 01h55 · Consulta de compra funcionando (Greenn e Hotmart) e negociação autônoma
- Teste do Victor (#cliente): achou a Black paga e mandou para a Academia. Greenn e Hotmart responderam sem erro (Hotmart com período de 1 ano).
- Escada de negociação 197/167/147 com cupons CAVEIRA30/CAVEIRA50 (decisoes.md).
- Pendente: Victor passar HOTMART_BASIC e HOTMART_CLIENT_SECRET para Segredo; decidir sobre o cupom antigo CAVEIRA99 (50%); Cademi (conferir acesso e link de login); skills de venda/copy no conhecimento; 10 conversas simuladas; MODO=ativo; migração do número de suporte.

## 19/11 02h40 · Agente do WhatsApp contextualizado (skills e produtos)
- Academia ligada (CADEMI_KEY, ferramentas conferir_academia e enviar_link_senha): teste do Victor achou a Black liberada e mandou o link de senha.
- Conhecimento novo (45 mil caracteres, 11 fontes, montar.py): contexto do projeto, produtos por dentro (lidos nas páginas e na Greenn), Black e reabertura, skill nova conducao-conexao-wg (NEPQ, Voss, objeções reais), regras de desconto alinhadas à escada. Publicado e conferido.
- Pendente: Victor testar com #cliente (catálogo, Black, objeções); depois MODO=ativo e trocar o número de suporte em todos os lugares (Academia, Greenn, Hotmart, páginas, catálogo, grupos, skills).

## 19/11 03h40 · Agente ativo para todos, número novo nas páginas, agentes no WhatsApp
- MODO=ativo conferido. Número de suporte (31) 99329-4274 em CLAUDE.md, skills e guia (commit e8ed331).
- Atomicat: 30 páginas publicadas tinham o 97334-6056 (catálogo 31 links, Black e Black oferta, 20 páginas de venda, 5 obrigado, guia, privacidade, pp-black26). Em todas entrou o script `kmc-suporte-4274` (cópia em conteudo/atendimento/patch-numero-suporte-paginas.html) no topHead/topBody ou no index.html, que troca número e links wa.me ao carregar. Conferido no ar: 30 de 30; catálogo com 31 links novos e 0 antigos. O HTML de origem ainda tem o número velho (trocar de vez quando cada página for reeditada).
- Serviço do WhatsApp (worker): data e hora de Brasília em toda resposta + reabertura automática (antes/depois de sexta 20/11 19h); resposta do chefe cortava em 1.200 tokens, agora 4.000 e quebra em partes; #chefe/#financeiro/#social/#trafego/#juridico/#ofertas/#auditor/#analista/#sucesso/#atendimento/#cliente/#equipe; ferramentas perguntar_agente e registrar_recado; portas /avisar, /equipe e /recados com o segredo AVISO_TOKEN. Implantado e conferido (código implantado = gerado).
- Rotina: rotinas/whatsapp.sh (avisar, avisar-arquivo, memoria, recados); debriefing passa a ir pelo WhatsApp (skill debrief-diario-wg).
- Pendente: Victor criar o segredo AVISO_TOKEN no Cloudflare e WG_AVISO_TOKEN na tarefa agendada (mesmo valor); trocar número na Academia (Cademi), Greenn, Hotmart e Instagram; decidir CAVEIRA99.

## 19/11 08h · Rotina diária completa (tarefa agendada)
- Pedido: debriefing, tráfego (só leitura), entrega da manhã do social, agente do dia (quinta: financeiro), WhatsApp, commit.
- Feito: ponte lida (Painel, Vendas 4, Log, Erros 1 antigo, Atendimento vazio, Fila); MCP da Greenn (vendas 17 e 18/11, reembolsos de novembro: achou chargeback de R$ 3.697,64 do VIP); Windsor 7 dias por campanha; Metricool reels 30 dias e evolution; radar com datas conferidas; Parte 1 nova da Dona Maria renderizada (conteudo/2026-11-19/); juridico-wg revisou; 3 propostas na fila; Painel Financeiro WG (+1 venda, gasto 16 a 18/11, chargeback); relatórios trafego, social, financeiro e debrief; debriefing enviado no WhatsApp (3 partes); recados vazios.
- Decisões: nenhuma nova do Victor. Nada externo executado.
- Pendente: decisões 1 a 6 do debriefing; linha do Diário de 19/11 no Painel Financeiro (criar amanhã com as fórmulas); conector competitors do Metricool; Hotmart.
- Verificado: Resumo e Diário do Painel sem #ERROR!; MP4 30,5 s, pico -1 dB, folha de conferência e capa olhadas.
## 19/11 04h10 · troca do número (Academia fechada)
- Feito: varredura das 321 páginas da Academia (cursos e aulas) com sessão de aluno: 0 ocorrências do número antigo. Menu "Fale com o suporte", assinatura dos e-mails e bloco "MEUS TREINAMENTOS NO TOPO" já trocados.
- Pendente: Greenn (Configurações > Suporte pede e-mail de suporte; aguardando o Victor), Hotmart (contato de suporte do produtor) e bio do Instagram: o navegador não está logado no Instagram nem na Hotmart e agente não digita senha. Victor faz ou loga e avisa.
- Verificado: 30/30 páginas do site com o número novo; worker com hash 7248c71b...

## 19/11 04h · site cinematográfico, Greenn, rotina
- Feito: rotina agendada conferida e correta (chaves do passo 2 e WhatsApp no passo 8). Greenn > Configurações > Suporte salvo com o e-mail que já aparece no checkout + WhatsApp 31 99329-4274 (aguarda o Wesley clicar no link de confirmação). Instagram: bio e links sem número. Hotmart: lista de produtos aparece vazia na conta logada, contato de suporte não alcançado.
- Site (B43): debate com ofertas-paginas-wg; conceito escolhido = foto real em loop sutil (lanterna descartada: escondia conteúdo no celular e exigiria agressor feito por IA). Rascunho publicado como página privada para o Victor ver. Fotos do ensaio em Drive ARQUIVOS WG/FOTOS WG (76 fotos).
- Pendente: Victor terminar o login do Higgsfield (conector adicionado, conexão incompleta); Hotmart por outro caminho.

## 19/11 05h · Jarvis no computador do Victor
- Feito: worker ganhou a porta POST /perguntar (Bearer AVISO_TOKEN; mesmo histórico do #nome). Jarvis instalado em C:\Users\Victor Augusto\Jarvis (Python 3.12 por winget, Claude Code CLI logado), com wg\wg.py, processo "Equipe do Wesley" em modelos\meus e memoria\sobre_mim.md. WG_AVISO_TOKEN gravado nas variáveis do Windows.
- Verificado: `python wg\wg.py chefe ...` respondeu "[Chefe] OK. Quinta-feira, 19 de novembro de 2026."
- Aprendizado: a Cloudflare devolve 403 (erro 1010) para o User-Agent padrão do Python; todo cliente Python do worker precisa de User-Agent próprio.
- Pendente: Victor reiniciar e abrir o Jarvis pela primeira vez (baixa o modelo de voz).

## 19/11 05h50 · voz e áudio
- Feito: /perguntar em modo rápido (Sonnet, 900 tokens); áudio no WhatsApp agora vira texto (Workers AI whisper-large-v3-turbo, associação AI). Testes 21/21. No ar conferido.
- Computador do Victor: Asus X515JF, i5-1035G1, 8 GB (1,7 GB livres), SSD 238 GB. Gargalo é memória; sugerido pente de 16 GB e tirar programas da inicialização.
- Pendente troca de número: textos da régua dos grupos (Gui) e fluxos do ManyChat ainda não revisados; Hotmart (lista de produtos vazia na conta logada); Greenn aguarda o Wesley confirmar o e-mail.

## 2026-11-19 06h55 · Site v4 publicado (/inicio)
- Pedido: Victor pediu a minha melhor versão do site (crítica + melhorias), capas dos treinamentos flutuando como na Black, vídeo do avatar no Flow/Gemini.
- Feito: site v4 em `conteudo/site-cinematografico/v4/` (index.html local, index.pub.html publicado). No ar em https://www.wesleygimenez.com.br/inicio (Atomicat, página html wgs2F03vzPFIPaY4oRGf). Sem porta de entrada (conteúdo aparece na hora), avatar 3D com boca sincronizada, capas voando no hero, anel 3D com as 22 capas, grade com filtros (página de venda com UTM ou WhatsApp quando não tem página), como funciona com print da Academia, Mestre, depoimentos reais, garantia, FAQ, barra fixa no celular, narração em 13 falas num só mp3 (CloudFront Higgsfield, CORS liberado).
- Decisões: raiz "/" continua a página antiga até o Victor mandar trocar. Código Caveira avulso fora (lista "não oferecer"). Sem preço no site.
- Vídeo do avatar acenando: gerado no Gemini (10 s, 720x1280), mas não deu para tirar do navegador (CSP bloqueia, acesso à pasta Downloads negado). Falta o Victor anexar o arquivo ou liberar a pasta.
- Verificado: Playwright no ar, celular 390 e desktop 1440 sem rolagem lateral, boca abre com o áudio, sem erro no console. Número antigo: 30 páginas da Atomicat ainda têm 97334-6056 no HTML bruto, mas todas têm o script que troca para 99329-4274 ao carregar.

## 2026-11-19 07h10 · Avatar animado no site
- Feito: vídeo do Gemini (Victor anexou) recortado quadro a quadro (rembg isnet), alinhado às imagens do avatar e salvo em webm com fundo transparente (666 KB, CloudFront Higgsfield). No ar em /inicio: o boneco acena e aponta ao abrir (Chrome, Edge, Firefox, Android); quando fala, troca para as imagens com boca sincronizada; repete a animação a cada 16 s. Safari e iPhone ficam com as imagens.
- Verificado: Playwright no ar, vídeo toca com transparência, classe "falando" entra durante a narração.

## 2026-11-19 07h20 · Site v4 virou a página principal
- Victor aprovou ("Sim"). Backup da antiga raiz ([DPC] [FRONT] [ORG-DOMÍNIO], Jwn8mcsMcXmAzQX5WPBI) feito na Atomicat; ela foi republicada em /defesa-pessoal-caveira. Site v4 publicado na raiz www.wesleygimenez.com.br (o /inicio continua funcionando).
- Verificado: / , /inicio, /defesa-pessoal-caveira e /dpc respondem 200; vídeo do avatar toca na raiz.
- Atenção: wesleygimenez.com.br sem "www" não responde (problema de DNS que já existia, não mexi). Links antigos que apontavam para a raiz agora caem no site novo, que leva ao DPC.

## 2026-11-19 10h50 · Aprovações do Victor executadas e canal do WhatsApp consertado
- Pedido: os áudios de aprovação das 10h07 não viraram nada; Victor quer comandar os agentes pelo WhatsApp e ver executado.
- Diagnóstico: (1) o serviço cortava em 30 s e o chefe não terminava de pensar depois do áudio; (2) o Whisper pegava só ~30 s e embolava; (3) aprovação só era lida na rotina do dia seguinte; (4) às 10h40 o KV grátis bateu o limite de 1.000 gravações/dia (os avisos de status do envio de mídia gravavam a cada evento) e as mensagens passaram a falhar.
- Feito: fila Cloudflare "agente-wg-mensagens" (produtor e consumidor agente-wg, lote 1, sem espera); áudio em pedaços de 25 s (testado com 1min45, saiu inteiro); /midia e envio de vídeo/imagem ao Victor (rotinas/whatsapp.sh peca); avisos de status não gravam mais; KV que falha não derruba o atendimento; prompt do chefe registra cada aprovação e responde na hora.
- Executado: ManyChat (boas-vindas do comentário), Parte 3 refeita, 10 reels programados no Metricool (normal e teste), 2 carrosséis (sexta e sábado 12h), 5 peças e 2 carrosséis enviados no WhatsApp do Victor, rascunho da Comunidade (20261119-sucesso-1).
- Pendente: (a) o Victor criar a tarefa agendada do executor (a criação foi negada para mim; texto pronto em rotinas/executor.md); (b) KV grátis: 1.000 gravações/dia volta às 21h; plano pago da Cloudflare Workers (US$ 5/mês) tira o limite; (c) mandar a mensagem da Comunidade depois do "pode mandar"; (d) atualizar status na aba Fila de aprovação (ponte) com APROVADO/EXECUTADO.

## 2026-11-19 11h15 · Executor criado e acionado na hora
- O Victor criou a tarefa agendada "Agente WG - Executor" (roda de hora em hora no minuto 7, 9h às 18h, segunda a sábado). Ela existe e está ativa.
- Teste real 11h02: áudio transcrito inteiro, chefe pensou 43 s, respondeu e registrou o recado. Funciona.
- Novo: quando o chefe registra uma aprovação, o serviço aciona o executor na hora (acionador de API da tarefa), se o segredo EXECUTOR_TOKEN estiver no Cloudflare. Sem o segredo, vale o horário.
- Decisão do Victor: todos os agentes em Sonnet, inclusive o chefe no WhatsApp (antes era Fable).
- Pendente: o Victor gerar o token da API na tarefa do executor e colar como segredo EXECUTOR_TOKEN no worker agente-wg; trocar o modelo da tarefa do executor para Sonnet na tela da tarefa.

## 2026-11-19 11h45 · Executor: conferência do Metricool
- Pedido: Victor (11h02) pediu leitura da agenda do Metricool, sem corrigir.
- Feito: 11 itens lidos (P1 a P5 em reel e teste, 2 carrosséis). Sem duplicado, sem item antigo, ordem e CTA corretos. Avisado no WhatsApp.
- Pendente: Victor decide se move P3 (17h) e P4 normal (21h) por causa do post dele às 19h (2h de intervalo, regra é 2h30); ouvir a Parte 3 para conferir a frase nova.
- Verificado: legendas e horários pelo Metricool. Não verificado: conteúdo falado dos vídeos.
- Fila: nenhuma linha APROVADO pendente; 20261119-sucesso-1 segue PENDENTE.

## 2026-11-19 11h45 · Executor na hora
- Pedido: Victor quer o agente executando na hora do áudio e só 2 tarefas agendadas.
- Feito: tarefa nova "Agente WG - Executor" (Code, Sonnet, repo agente-wg, a cada hora + acionador API). Antiga (tipo Chat) apagada. Cloudflare: segredo EXECUTOR_TOKEN (colado pelo Victor) e variável EXECUTOR_URL. Rede do ambiente Default liberada pelo Victor para script.google.com, script.googleusercontent.com e o worker.
- Verificado: execução de teste 11h41 leu recados e fila, conferiu Metricool, mandou WhatsApp e fez commit.
- Pendente: testar o disparo na hora com um áudio real do Victor.
