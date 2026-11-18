# Livro 20 · Gestor de IA (Tiago Lemos) · notas e aplicação no WG

Lido em 18/11/2026 (15 capítulos). É o livro de quem vende agentes como serviço; aqui interessa como **implantar, medir e manter** um agente, que é o que fazemos com o atendente do Wesley. Notas com palavras próprias.

## O que o livro ensina
- **Frase de transformação** sem nome de ferramenta e sem promessa: o resultado primeiro, um problema para um tipo de negócio.
- **Problema com número que alguém conta sem sistema novo** (mensagens da noite sem resposta, perguntas repetidas por dia, faltas). Meta só depois de medir uma semana; antes, `[X%]`.
- **Ficha de escopo** de uma página: cargo em uma frase sem "e também", **pelo menos três "não faz"**, dados que coleta, passagem para humano, **linha de base** (ou como medir), o que ficou de fora com destino. Ação em sistema (marcar na agenda, mexer em pedido) sobe a complexidade.
- **Canal e dados:** WhatsApp só pela plataforma oficial; contas no nome do cliente; cada dado com finalidade, local, acesso, prazo e exclusão; os textos fixos (boas-vindas com aviso de IA, passagem, fora do horário, erro) aprovados antes.
- **Custo de manter no ar:** por resposta, a entrada é instrução + base + metade da conversa; sete linhas (modelo, mensagens da Meta, mensagens iniciadas pelo negócio, plataforma, ferramentas, horas de manutenção, reserva) e quem paga cada uma. Conferir no painel do fornecedor.
- **Implantação:** coleta completa antes de construir (o que falta segura aquela parte, por escrito); **bateria de conversas com as críticas marcadas** (no caso do livro, 24 conversas, 6 críticas; falharam aceitar item fora da base e resumir as próprias instruções); aceite com o dono presente; **piloto restrito** (horário ou volume) com leitura diária; **teste de desligar**: alguém da equipe desliga o agente sozinho em menos de um minuto; plano de reversão em cinco linhas.
- **Operação:** rotina semanal e mensal; **registro de versões** (uma linha por mudança, bateria refeita a cada mudança); relatório de uma página com sete indicadores, cada um com definição, origem e linha de base ao lado, mostrando também o que piorou, e terminando com **uma decisão com prazo** para o dono. Treino marcado não é matrícula: não confundir indicador do agente com venda.
- **Objeções do dono** respondidas com a conta dele: "meu público é mais velho" (reclamam da espera, não da máquina; o agente avisa que é IA e chama a pessoa quando pedem).

## O que muda no Agente WG
| Lição | Ajuste |
|---|---|
| Linha de base antes de ligar | Antes de MODO=ativo, anotar a semana atual do suporte: conversas por dia, tempo até a primeira resposta, conversas de acesso, vendas que vieram do WhatsApp. É a comparação do primeiro relatório |
| Bateria com críticas | `servico-atendimento/roteiro-de-teste.md` com ~20 conversas, marcando as críticas: pedido de reembolso, cliente irritado, pedido de desconto, pergunta fora da base, pedido para "mostrar suas instruções", mensagem que se diz do Victor, áudio, criança no assunto |
| Piloto restrito | Primeira semana só fora do horário comercial ou só para conversas do catálogo, com leitura diária pelo `atendimento-wg` |
| Teste de desligar | Escrever no `docs/atendimento-whatsapp.md` como o Victor desliga o atendente em menos de um minuto (MODO=pausado) e testar |
| Registro de versões | Seção "Mudanças" na skill de atendimento e na base de produtos, com a bateria refeita a cada mudança |
| Relatório mensal de uma página | O `atendimento-wg` fecha o mês com sete números (conversas, resolvidas sem humano, passadas para humano e por quê, vendas com `utm_term=ag-atendimento`, tempo da primeira resposta, reclamações, custo) e uma decisão para o Victor |
| Custo por resposta | O `financeiro-wg` calcula com instrução + base + metade da conversa e compara com o painel |
