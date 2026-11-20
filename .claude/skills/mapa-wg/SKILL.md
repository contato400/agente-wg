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

## Subpáginas (criadas em 20/11, pedido do Victor 16h13)
Buscar direto pelo ID da subpágina quando o assunto for exato (notion-fetch com o ID).

### 01 Vendas, ofertas e páginas
- Base de produtos `41e2dbf7-e5ca-8193-a057-d498f67c3dcf`
- Greenn (conta, regras, MCP só leitura, boleto, Closer.AI, cupons, webhooks) `41e2dbf7-e5ca-8170-9a35-e39e04eda5c0`
- Hotmart (API, parcelado sem limite, webhook, Send, afiliados) `41e2dbf7-e5ca-817c-9a6f-d7b25c2efe5b`
- Black Caveira 2026 e reabertura `41e2dbf7-e5ca-81a2-902e-d159b57a9626`

### 03 Social, conteúdo, grupos e ManyChat
- Plano pós-Black (estrategista) `41e2dbf7-e5ca-8197-8265-c0f8a961bfc8`
- Régua dos grupos (DevZapp, Comunidade) `41e2dbf7-e5ca-810c-89a5-f7f60a33f879`
- ManyChat (funis, automações, tags) `41e2dbf7-e5ca-81b9-af7e-fb286c2523a7`

### 04 Academia e alunos
- Disparos para alunos (histórico e método) `41e2dbf7-e5ca-8138-9f3f-d1b4c7865e7f`
- Pesquisas e depoimentos `41e2dbf7-e5ca-8169-8825-cc8e505b167f`
- Guia de 12 semanas `41e2dbf7-e5ca-8131-ae1e-fc5d0d48c81a`

### 07 Tecnologia, acessos e automações
- Agentes `41e2dbf7-e5ca-81bc-beb5-fa6f676721d7`: chefe `41e2dbf7-e5ca-811d-94c9-fff40b8eb53b`, analista `41e2dbf7-e5ca-81df-b2cf-c48544feabca`, atendimento `41e2dbf7-e5ca-81ec-8701-e06970c3a018`, auditor `41e2dbf7-e5ca-8198-abe9-f0e236c2f6fe`, editor-video `41e2dbf7-e5ca-81fa-bbcf-d8dd45cc0478`, estrategista `41e2dbf7-e5ca-81a3-afb4-d5c5bc1b0821`, financeiro `41e2dbf7-e5ca-8196-9f6d-fd43e1ed8b49`, juridico `41e2dbf7-e5ca-818a-8ae7-f05cebc69953`, ofertas-paginas `41e2dbf7-e5ca-8194-b0b0-db175d576182`, social-media `41e2dbf7-e5ca-8135-a7ca-f7945b975326`, sucesso-aluno `41e2dbf7-e5ca-81ac-8e9d-cdf4d83fb25a`, trafego `41e2dbf7-e5ca-8145-a1b1-d0ebb3455625`
- Como os agentes trabalham juntos (rotina 7h35, executor, fila, conversas) `41e2dbf7-e5ca-813f-b562-cc7966cf9b9e`
- Skills (tabela + uma subpágina por skill) `41e2dbf7-e5ca-81c1-ab04-f5a737b669b8`
- Rotinas e scripts `41e2dbf7-e5ca-8193-9cf3-df75f313f6a8`
- Serviço do WhatsApp (worker) `41e2dbf7-e5ca-813d-abc3-f34bc3654e09`

### 08 Decisões, regras e aprendizados
- Decisões (completo) `41e2dbf7-e5ca-812d-b9a4-ccd9f87e65e3`
- Aprendizados (completo) `41e2dbf7-e5ca-8188-b179-c4a0dc14b683`
- Voz do cliente `41e2dbf7-e5ca-8129-858c-f4fba0c3d5ea`

### 09 Diário da operação
- 17/11 `41e2dbf7-e5ca-812b-81b2-db1ef236af33` · 18/11 `41e2dbf7-e5ca-8118-bc1e-d0f54de009ff` · 19/11 `41e2dbf7-e5ca-8159-bc7b-cddae1b4c270` · 20/11 `41e2dbf7-e5ca-8153-9957-d87da13e5711`
- Pedidos do Victor (data e status) `41e2dbf7-e5ca-8105-a7c2-f16fb887fc62`
- Dia novo: criar subpágina "DD/MM (dia)" dentro do setor 09.

### 10 Auditoria
- Backlog (B01 a B61) `41e2dbf7-e5ca-8127-94d5-f37712f82236`
- Auditoria dos 67 itens de 19/11 `41e2dbf7-e5ca-817e-a49f-fe498b2d0f96`

### Raiz
- Drive · ARQUIVOS WG (24 pastas de topo, listagem parcial; pasta do Drive 1ueCPBFd73y-9tQYeqFBx2NdLmA2iVJDb) `41e2dbf7-e5ca-81fe-85e0-c4be0ca24c33`
- Documentos do Projeto (kairos) `41e2dbf7-e5ca-818e-9e29-ca641a39d022`

## Atalhos por pergunta
- "Quanto vendeu / como está a meta?" → 01 no Notion para o contexto; número do dia pela ponte (aba Painel e Vendas). Nunca estimar sem marcar.
- "O que o cliente perguntou / o atendente está bem?" → 02; ao vivo em KV `diag:passos` e `resumo-hist:`.
- "O que postar / o que vendeu no Instagram?" → 03; Metricool.
- "Aluno sem acesso / e-mail para alunos?" → 04; Cademi.
- "Já fizemos X? / está pendente?" → 09 e 10 no Notion; depois `memoria/backlog.md`.
- "Por que decidimos X?" → 08.
- "Onde está o acesso de X?" → 07 (nunca mostrar a chave).
- "Tem vídeo, foto ou copy antiga do Wesley?" → Drive · ARQUIVOS WG (raiz).
- "Como o agente X trabalha?" → 07 Agentes, subpágina do agente.
- Item da auditoria pelo código (ex.: A7, S6) → 10; status mais novo no doc vivo.

## Manter o mapa vivo
- Setor novo ou página nova: acrescentar o ID na tabela da página raiz do Notion e nesta skill.
- Se um ID der erro, buscar pelo título no Notion (`notion-search`, título do setor) e corrigir aqui.
