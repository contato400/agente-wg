# Kit de IA do grupo (5 PDFs, nov/2026) · o que serve para o WG

Lido em 18/11/2026 pelo Claude, texto completo dos 5 PDFs. Notas com palavras próprias. Os PDFs ficam com o Victor; aqui só o que importa.

## O que cada PDF traz
| PDF | Assunto | Serve para o WG? |
|---|---|---|
| 01 · Estúdio de Reels (custos e metas) | Modelo de negócio de quem vende reels feitos com IA: preço por plano, custo por vídeo (R$ 1,40 com vídeo gravado pelo cliente; R$ 2,97 com narração ElevenLabs; R$ 16,30 com avatar HeyGen), quanto cada plano do Claude aguenta (Pro ~86 vídeos/mês, Max ~433, Ultra ~1.730). Anexos: outras assinaturas, receita de carrossel, como copiar um estilo | Em parte. Mostra que editar vídeo com o Wesley gravando custa quase nada; a receita de carrossel e a de copiar estilo viraram regra na skill `edicao-video-arte-wg` |
| 02 · Qual IA usar e como pensar com IA | Token e contexto, tamanhos de modelo (Haiku, Sonnet, Opus, Fable), esforço, qual assinatura (Claude para trabalho, ChatGPT para imagem com texto, Gemini para imagem e vídeo), por que evitar "hubs" que revendem várias IAs, mentalidade de perguntar antes de desistir | Sim. Confirma a regra de custo do `CLAUDE.md` (começar pelo mais barato, subir só se a qualidade cair) |
| 03 · Editar vídeo com Claude Code e área segura | Rotina por vídeo (/clear, /compact, /rewind, /context), o que registrar na skill e o que não, como pedir gastando menos, e a **área segura 1080x1920** (conteúdo em 1080x1350 central, Y 285 a 1635, X 110 a 970) | Sim. Virou a skill `edicao-video-arte-wg` |
| 04 · IAs de imagem e vídeo e alternativas grátis | Para que serve cada IA de vídeo (Veo, Kling, Wan, Hailuo, Seedance, Runway) e de imagem (Nano Banana, GPT Image, Midjourney), o que tem de graça, e programas de código aberto que substituem assinaturas (Chatwoot no lugar do Intercom, VoiceStudio no lugar do ElevenLabs, Cap no lugar do Loom etc.). Extras: SkillSpector (verifica skill antes de instalar) e plugin do Codex | Em parte. Tabela de ferramentas grátis entrou na skill de edição |
| 05 · Segundo cérebro com Obsidian | Pasta de anotações que a IA lê ao começar e atualiza ao terminar: estrutura de pastas, nota de início, log diário (pedido, feito, decisões, pendente, verificado), mapa `tudo.md`, quando compactar, limpar ou abrir sessão nova | Sim. O WG já tinha a estrutura (memória, docs, projeto). Faltavam o mapa e o log de passagem: criados |

## O que já foi aplicado (18/11)
| Item | Onde | Para quem |
|---|---|---|
| Skill nova `edicao-video-arte-wg`: área segura, padrão do WG, rotina por vídeo, copiar estilo de referência, receita de carrossel, ferramentas grátis | `.claude/skills/edicao-video-arte-wg` | Agentes social e tráfego, e o Claude aqui no chat |
| Mapa do repositório (uma linha por arquivo) | `tudo.md` na raiz | Todos os agentes leem antes de abrir pastas (gasta menos) |
| Registro de passagem | `memoria/passagem.md` + regra no `CLAUDE.md` (seção 10) | Todo agente e toda sessão: retoma de onde parou sem reexplicar |
| Regra de higiene de sessão | `CLAUDE.md` seção 10 | Sessões longas: salvar e abrir nova depois de 2 ou 3 resumos |

## O que dá para fazer a mais (decisão do Victor)
1. **Imagem e vídeo com IA:** o Victor já tem o **Google AI Pro** (Veo, Nano Banana e Flow), pago até 2027. Não precisa assinar nada. O Claude usa pelo Chrome do Victor quando precisar de cena de apoio, fundo, capa ou ilustração; o vídeo de venda continua sendo o Wesley real.
2. **Voz clonada e avatar (ElevenLabs, HeyGen):** não recomendo para o WG. A marca é o Wesley de verdade; avatar pode parecer falso e cair em regra da Meta.
3. **Chatwoot (código aberto, no lugar de um atendimento pago):** caixa de entrada para o humano assumir conversas do WhatsApp. Só faz sentido depois que o atendente 24h estiver no ar; ele enfrenta o mesmo bloqueio de número da Meta.
4. **SkillSpector:** usar antes de instalar qualquer skill de terceiros (do grupo, de cursos).
5. **Modelo da rotina diária:** a tarefa agendada roda no modelo mais caro. Pelo Guia 02 e pelo `CLAUDE.md`, a rotina pode rodar em Sonnet e só o chefe em Fable. Trocar quando o Victor quiser economizar.

## Para o Claude aqui no chat (como eu trabalho a partir de agora)
- Um assunto por sessão; pedido específico (arquivo e trecho), corrigir por trecho.
- Ao fim de cada etapa, escrever a passagem e copiar para o projeto o que for durável.
- Esta sessão de hoje já está muito longa (vários resumos). Amanhã começar sessão nova lendo `tudo.md`, `memoria/estado.md` e `memoria/passagem.md`.
