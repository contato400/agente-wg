# Livro 05 · Skills e Squads de Agentes de IA (Tiago Lemos, Mestres Play) · notas e aplicação no WG

Lido em 18/11/2026 (estrutura dos 17 capítulos, listas de conferência, erros comuns e o Apêndice A inteiro, que é o squad de referência). Notas com palavras próprias; o livro é licenciado para o Victor e não se copia.

## O que o livro ensina
1. **Quando é skill e quando é squad.** Skill: uma tarefa com uma entrega, que se repete do mesmo jeito. Squad: processo com duas ou mais competências e decisões no meio. Se os outros papéis só passam o texto adiante, era skill. Coisa que muda toda vez fica no prompt; gosto geral (tom, idioma) é instrução da pessoa, não skill.
2. **Anatomia da skill.** Cabeçalho com `name` (igual ao nome da pasta, minúsculas e hífen) e `description`; corpo com as etapas. Arquivos de apoio em `references/`, `assets/` e `scripts/`, e **cada um citado numa etapa** ("abra references/x.md e tire y"), senão o Claude ignora. Muitas skills instaladas não pesam: só o cabeçalho fica sempre carregado.
3. **A description é o gatilho.** Até 200 caracteres, começa com verbo, diz a entrada e a entrega, usa as palavras que a equipe usa, e tem "Não use para" com a tarefa vizinha. Prova: tabela de 10 frases (5 que devem acionar, 5 vizinhas que não), cada uma numa conversa nova.
4. **Criar conversando e medir.** Decidir as respostas (ficha de respostas-âncora) antes de pedir a skill; desafiar o rascunho; avaliar com 3 casos (normal, sem informação, fora do escopo) com e sem a skill. Decisão escrita: manter, ajustar um trecho ou desistir.
5. **Skill que lê dados sem estragar.** Descobre a estrutura sozinha, separa fato de inferência, responde em formato fixo, **todo número com a aba e a linha de onde veio** ("sem aba e linha, não afirme"), recusa escrita, e tem **trava técnica** (regra `deny` no `settings.json` ou ferramenta de escrita bloqueada no conector), porque regra escrita pode falhar.
6. **Skill índice** para base grande: mapa com uma linha por página, palavras ambíguas resolvidas, "Fonte:" no fim de toda resposta e data do mapa (avisa quando ficou velho).
7. **Skill de terceiros:** quarentena numa pasta de teste, auditoria no modo Plan antes de rodar, chave sempre no `.env` (nunca no chat), quatro sinais de skill maliciosa (manda dado para fora, pede chave, roda comando sem motivo, texto escondido).
8. **Plugin** junta skills, comandos e agentes numa versão única que a equipe atualiza junto (`.claude-plugin/plugin.json`, versão sobe a cada mudança).
9. **Desenho do squad:** ficha do processo (entrada, saída, etapas, competências, decisões, critério de pronto **verificável**); etapas independentes rodam em paralelo; de 2 a 4 papéis, **uma competência por papel e a linha "Não faz"** em cada vaga; modelo barato (haiku) no volume e o pesado só em quem planeja e confere.
10. **Canteiro:** `CLAUDE.md` (orquestrador), `.claude/agents/`, `.claude/skills/`, `inputs/`, `output/` e `.claude/settings.json` que libera só `output/`, bloqueia ler o `.env` e escrever em `inputs/`. Primeira execução no modo Manual.
11. **Orquestrador:** a conversa principal entende o pedido, delega cada etapa, confere o arquivo que voltou e entrega. **Nunca faz o trabalho de um agente** ("nem quando eu pedir pressa") e passa **caminhos de arquivo**, nunca resumos. O arquivo orienta; quem garante são o `settings.json` e os ganchos.
12. **Agentes do squad:** cada um com `tools` (o mínimo; sem `tools` herda tudo), `model`, `skills` e entrega em JSON com nome de campo combinado (contrato). Cada etapa grava um arquivo em `output/AAAA-MM-DD-HHMM/` e responde só com o caminho.
13. **Rodar e conferir:** acompanhar quais agentes foram chamados e em que ordem; um arquivo por etapa; abrir de verdade os links do resultado; refazer **só a etapa que falhou**.
14. **Refino:** achar o agente culpado pelo primeiro arquivo de etapa com o erro, corrigir **só as linhas da causa** (guardar `.bak`), registrar na seção **"## Mudanças"** do agente com data e motivo, rodar de novo só a etapa dele.
15. **Equipes que se revisam:** revisor que devolve com no máximo **duas voltas** e seção "Não aprovado pelo revisor"; várias versões com um **juiz** que só lê e dá nota por critério escrito; **ganchos** para o que tem de acontecer sempre (gravar `registro.log` de cada execução); **ficha de custo** por execução (uso antes e depois, rodando sozinho).
16. **Squad de referência (relatório de concorrentes):** coletor (haiku, único com acesso à web), analista de oferta (sonnet), leitor de avaliações (haiku), estrategista (sonnet), redator (sonnet), **revisor de evidências (opus)**. Toda afirmação com número de evidência [E07]; sem evidência, a frase sai. Nunca nome de pessoa nem texto copiado além de 20 palavras.

## O que muda no Agente WG
| Lição | Situação hoje | Ajuste |
|---|---|---|
| Orquestrador não executa | A rotina diária é uma conversa só que faz tudo | O `chefe-wg` delega e confere; cada agente grava o próprio arquivo em `relatorios/` e o chefe lê os arquivos, não refaz |
| Um arquivo por etapa | Só o debriefing e o tráfego gravam arquivo | Analista, financeiro e agente do dia gravam o seu arquivo antes do debriefing |
| Todo número com origem | "Separe comprovado de estimado" | Regra do analista e do financeiro: cada número cita a aba da planilha ou a plataforma; sem origem, não entra |
| `tools`, `skills` e "Não faz" na ficha | Agentes herdam todas as ferramentas | Ficha ganha "Não faz" e lista de skills no cabeçalho; ferramentas limitadas onde não quebra conector |
| Trava técnica | Regra escrita "só leitura" | `.claude/settings.json` com `deny` para editar skills e agentes na rotina, ler `.env` e mexer em `servico-atendimento/` |
| Revisor com duas voltas | Jurídico revisa sem limite | Jurídico: no máximo duas voltas; depois "Não aprovado pelo revisor" vai ao Victor |
| Description com "Não use para" | Descriptions longas, sem vizinha | Revisar as descriptions das skills do WG (até 200 caracteres, verbo, entrada e entrega, "Não use para") |
| Seção "Mudanças" | Mudanças só no git | Cada agente e skill ganha "## Mudanças" com data e motivo |
| Ficha de custo e registro | Sem medição | A rotina anota o uso no fim do debriefing; gancho de registro fica para quando rodar fora da nuvem |
