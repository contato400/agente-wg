---
name: mapa-wg
description: Aciona quando o Victor perguntar ou pedir qualquer coisa sobre a operação do Mestre Wesley Gimenez (Krav Magá Caveira) e for preciso achar a informação: vendas, ofertas, páginas, atendimento, social, grupos, ManyChat, Academia, alunos, tráfego, financeiro, acessos, automações, decisões, pendências, "onde está", "já fizemos?", "como está X?". NÃO aciona para projetos fora do Wesley (Kairós, Samuel, SalesMed) nem para guardar senha, chave ou dado pessoal de cliente.
---

# Mapa da operação WG (onde achar cada coisa)

Objetivo: responder rápido e certo gastando poucas leituras. Primeiro o Notion (central da operação desde 20/11), pelo ID do setor; depois o repositório; só então o sistema ao vivo.

## Regra de comportamento (Victor, 20/11)
1. **Sempre pesquisar no Notion primeiro, usando o ID do setor.** Identificar o setor pelo assunto (tabela abaixo) e chamar a busca do Notion restrita àquela página (`notion-search` com `page_url` = ID do setor e 1 a 3 palavras-chave). Se a resposta estiver ali, responder sem abrir mais nada.
2. Se precisar de detalhe, abrir a página do setor (`notion-fetch` com o ID) e só a parte que importa.
3. Não achou no Notion: ir ao arquivo do repositório indicado na coluna "Repositório" (ler só o trecho, com Grep antes de Read).
4. Número do dia, status ao vivo ou algo que muda (venda, conversa, página no ar): conferir no sistema da coluna "Ao vivo" antes de afirmar.
5. Nunca chutar. Se não achou em nenhum dos três, dizer o que procurou e onde, e perguntar.
6. Depois de responder ou fazer algo novo, gravar o fato na página do setor certo do Notion e o resumo do dia na página 09 (Diário). Sem senha, chave, telefone, e-mail ou nome completo de cliente.
7. Responder em português, curto, com a fonte (setor do Notion, arquivo ou sistema) em uma linha no fim.

## IDs do Notion (espaço "Espaço de VICTOR SOARES", conta luiscorinthiano)
- Raiz: **WG · Central da operação** `41e2dbf7-e5ca-81f0-97ec-c4d4224fcf61`

| # | Setor | ID | Assuntos | Repositório | Ao vivo |
|---|---|---|---|---|---|
| 01 | Vendas, ofertas e páginas | `41e2dbf7-e5ca-8155-b4f2-c12ddf68c3ad` | meta do mês, Black, reabertura, preço, parcela, boleto, Hotmart x Greenn, prêmios, páginas, checkout, Closer.AI, UTM, produtos | `.claude/skills/base-produtos-wg`, `memoria/estado.md`, `conteudo/AAAA-MM-DD/` | Greenn MCP (leitura), Atomicat MCP, planilha pela `rotinas/ponte.sh` |
| 02 | Atendimento WhatsApp | `41e2dbf7-e5ca-81e5-b6cd-d8caa2f4f32d` | atendente, número de suporte, plano B, IA caiu, alertas, resumo de 2 h, reembolso, reclamação | `servico-atendimento/`, `.claude/skills/regras-agente-atendimento-wg` | Cloudflare (KV `diag:passos`, `hist:`, `aberta:`, `resumo-hist:`), /saude |
| 03 | Social, conteúdo, grupos e ManyChat | `41e2dbf7-e5ca-81f7-bf72-f2f2bf0f7214` | Instagram, reels, stories, calendário, cortes, concorrentes, régua dos grupos, DevZapp, ManyChat, palavra CAVEIRA | `.claude/agents/estrategista-wg.md`, `social-media-wg.md`, skills `calendario-conteudo-wg`, `cortes-conteudo-wg`, `wg-regua-grupos`, `wg-manychat-funis` | Metricool MCP (brand 8190484), DevZapp e ManyChat no Chrome Luis corinthiano |
| 04 | Academia e alunos | `41e2dbf7-e5ca-819e-b7f8-de0a339313ee` | Cademi, acesso, e-mail para alunos, banner, tickets, LGPD, pesquisas, depoimentos, Guia 12 semanas, recompra | skills `disparo-academia-wg`, `suporte-acesso-wg`; `aprovacao/propostas/2026-11-20-textos-alunos.md` | Cademi no Chrome Victor Augusto; CADEMI_KEY no worker |
| 05 | Tráfego pago | `41e2dbf7-e5ca-8112-a5e5-c510192d7d25` | Diogo, campanhas, teto R$ 50, página do tráfego, retorno | `.claude/skills/trafego-wg-guardrails`, `relatorios/*-trafego.md` | Windsor.ai (conta 4500), vendas utm_source=FB |
| 06 | Financeiro | `41e2dbf7-e5ca-810e-a7fa-f565bb462d8a` | receita, custos, reembolso, chargeback, custo de IA, ManyChat Pro | skills `controle-financeiro-wg`, `wg-relatorio-vendas` | Painel Financeiro (Sheets), Greenn |
| 07 | Tecnologia, acessos e automações | `41e2dbf7-e5ca-81b6-a3d4-d3e3f4ffb00c` | onde está cada acesso, qual Chrome, deploy do worker, tarefas agendadas, fila de aprovação, ponte | `CLAUDE.md`, `tudo.md`, `memoria/BASE.md`, `rotinas/` | list_triggers, Cloudflare |
| 08 | Decisões, regras e aprendizados | `41e2dbf7-e5ca-814b-8ddd-fc86aeaa16f5` | "o Victor decidiu?", regras fixas, o que já falhou | `memoria/decisoes.md`, `memoria/aprendizados.md` | não tem |
| 09 | Diário da operação | `41e2dbf7-e5ca-8112-aa55-f71f3f5ea71e` | "o que foi feito dia X", linha do tempo | `memoria/passagem.md`, `memoria/BASE.md` (registro diário) | não tem |
| 10 | Auditoria completa 20/11 | `41e2dbf7-e5ca-8121-90c7-ff23e4dae624` | 67 itens (A, G, S, V, T, O, F, SA, AU, I, D), status, quem faz | `docs/auditoria-completa-2026-11-20.md`, `memoria/auditoria-travados-2026-11-19.md`, `memoria/backlog.md` | doc vivo: https://claude.ai/artifact/Pw6f311y5HSm4jwqq8gye9 |

## Atalhos por pergunta
- "Quanto vendeu / como está a meta?" → 01 no Notion para o contexto; número do dia pela ponte (aba Painel e Vendas). Nunca estimar sem marcar.
- "O que o cliente perguntou / o atendente está bem?" → 02; ao vivo em KV `diag:passos` e `resumo-hist:`.
- "O que postar / o que vendeu no Instagram?" → 03; Metricool.
- "Aluno sem acesso / e-mail para alunos?" → 04; Cademi.
- "Já fizemos X? / está pendente?" → 09 e 10 no Notion; depois `memoria/backlog.md`.
- "Por que decidimos X?" → 08.
- "Onde está o acesso de X?" → 07 (nunca mostrar a chave).
- Item da auditoria pelo código (ex.: A7, S6) → 10; status mais novo no doc vivo.

## Manter o mapa vivo
- Setor novo ou página nova: acrescentar o ID na tabela da página raiz do Notion e nesta skill.
- Se um ID der erro, buscar pelo título no Notion (`notion-search`, título do setor) e corrigir aqui.
