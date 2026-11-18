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
