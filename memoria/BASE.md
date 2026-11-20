# BASE · memória única do projeto Agente WG (Krav Magá Caveira)

**Regra fixa do Victor (20/11, 12h53):** antes de qualquer tarefa, ler este arquivo e conferir o que já foi feito, o que está pendente e quais acessos existem. Depois de cada tarefa (e no fim do dia, sem falta), atualizar este arquivo. Nada pode se perder. Skill que cuida disso: `memoria-wg`.

Este arquivo é o índice. O detalhe fica nos arquivos citados. Sem senha, chave, telefone, e-mail ou nome completo de cliente aqui.

---

## 1. O que é o projeto
- Equipe de agentes de IA que opera o negócio digital do Mestre Wesley Gimenez (Krav Magá Caveira). Responsável: Victor. Aprova: Victor ou Wesley.
- Repositório: contato400/agente-wg (este). Cópia dos documentos no Projeto "VICTOR. A" do claude.ai (pasta `kairos/`).
- Regras de todos os agentes: `CLAUDE.md`. Mapa do repositório: `tudo.md`.
- Meta de novembro: 150 vendas orgânicas e R$ 30 mil líquidos (`memoria/estado.md`).

## 2. Linha do tempo (resumo)
| Data | Marco |
|---|---|
| até 16/11 | Black Caveira 2026 (23 treinamentos). Fechou 16/11 19h |
| 17 e 18/11 | Agente WG montado (agentes, skills, memória, ponte da planilha, tarefa agendada 7h35). Migração Netlify → Atomicat. Atendente do WhatsApp 24h (Cloudflare Worker `agente-wg`) |
| 19/11 | Número oficial de suporte passa a ser (31) 99329-4274 (YCloud). Crédito da API Anthropic acaba 15h09; plano B (Workers AI) no ar 22h05. Régua da reabertura programada no DevZapp (41 mensagens, 80 grupos). Auditoria de 67 itens travados |
| 20/11 manhã | Voz Gemini (Koda) no worker; Hotmart conectada; página do tráfego corrigida (R$ 297, prêmios da reabertura); site /inicio com voz nova e avatar no iPhone; recompra medida; textos de pesquisa e depoimento; 18 pedidos de depoimento enviados |
| 20/11 19h | Reabertura da Black até seg 23/11 19h |

Registro detalhado de cada sessão: `memoria/passagem.md`. Decisões com data: `memoria/decisoes.md`. Aprendizados: `memoria/aprendizados.md`.

## 3. Acessos e conexões (onde está, sem a chave)
| Sistema | Como o agente acessa | Observação |
|---|---|---|
| Greenn | MCP da Greenn (só leitura por regra) e segredo GREENN_TOKEN no worker | Conta do Luis corinthiano/Wesley |
| Hotmart | Segredos HOTMART_CLIENT_ID / SECRET / BASIC no worker (testados 20/11) | Painel: Chrome do Luis corinthiano |
| Academia (Cademi) | Segredo **CADEMI_KEY** no worker (acesso total, dado pelo Victor); painel no Chrome do Victor Augusto | Relatórios: Engajamento, Ranking, Alunos |
| Cloudflare | Chrome do Luis corinthiano (dash); worker `agente-wg`, KV b1c07181… | Deploy: content/v2 → PUT content |
| Gemini (voz) | Segredo GEMINI_KEY no worker; rota /voz e rotinas/voz.sh | Cota grátis ~15 a 20 falas/dia |
| WhatsApp suporte (31) 99329-4274 | Worker (YCloud) e WhatsApp Web no Chrome do Victor Augusto | Deixar a aba na frente para enviar |
| ManyChat | Chrome do Luis corinthiano; segredo MC_TOKEN no worker | Conta fb639679992741917; vira Pro em ~20 dias |
| DevZapp | Chrome do Luis corinthiano | Régua até ter 23/11; substituto: Comunidade do WhatsApp (dezembro) |
| Atomicat | MCP Atomicat | Site jHtKqTgrEV9wHFiff5Z3, domínio www.wesleygimenez.com.br |
| Metricool | MCP Metricool | blogId 8190484 |
| Planilha WG | Chrome do Luis corinthiano (o conector Google é de outra conta) e `rotinas/ponte.sh` | Aba "Reabertura" criada 20/11 |
| Higgsfield | MCP | Só para hospedar arquivo temporário |
| Chrome | Luis corinthiano (Cloudflare, Hotmart, Greenn adm, ManyChat, DevZapp, planilha) e Victor Augusto (Cademi, WhatsApp Web, ChatGPT) | Nunca digitar senha |

## 4. O que está no ar e funcionando (20/11)
- Atendente do WhatsApp (worker) com plano B, alerta de falha, monitor de queda a cada 15 min, voz Gemini, Hotmart e Academia.
- Página da Black /black-caveira-2026 (R$ 397, aluno R$ 347), página do tráfego /black-caveira-2026-oferta (R$ 297), /grupo (contador), /inicio (site), /pp-black26.
- Régua da reabertura no DevZapp; stories do dia no Metricool; aba Reabertura na planilha; `rotinas/medir-reabertura.py`.

## 5. Pendências abertas (fonte: `memoria/auditoria-travados-2026-11-19.md`, coluna de status)
- Victor: crédito da API (A1), colar o código do e-mail pós-compra no Apps Script (`rotinas/pos-compra/Code.gs`), ver contestação do chargeback na Greenn, salvar as skills corrigidas do claude.ai.
- Wesley: contato de suporte da Greenn (A4), vídeo para o clone (S5).
- Hoje 18h40/18h50: virar os funis do ManyChat (G1) e story das 19h com link.
- Agente: SA4 (respostas e autorizações; liberar o livro digital a quem mandar), O6, A6/A7/A9, V3, S1, S6 diário, O7/O8, O11 com o Victor, B56 agente CS (base desde 01/08).
- Segunda 23/11: pesquisas A8 e S4.

## 5b. Regras fixas que o Victor deu
- Toda imagem é feita pelo ChatGPT (20/11). Ver skill edicao-video-arte-wg.
- Ler esta BASE antes de qualquer tarefa e atualizar depois (20/11).
- "Bora" do Victor = aprovado (20/11).

## 6. Onde está cada coisa
- Propostas para aprovar: `aprovacao/propostas/`.
- Fichas dos agentes (o que cada um sabe fazer): `.claude/agents/`.
- Skills (como fazer cada tarefa): `.claude/skills/`. Toda skill tem descrição no padrão "Aciona quando… NÃO aciona para…".

---

## Registro diário (atualizar no fim de cada dia)
### 20/11
- Feito: A2, A3, A5 (roteiro), D2, G2, G3 (passo a passo), G4, V1, V4, O1, O2 (+ prêmios da reabertura), O3, O5, O9, F4, F6 (mensagem enviada), SA1, SA3, número novo nas páginas e na /pp-black26, régua de e-mail pós-compra (código), textos A8/SA2/SA4, SA4 enviado a 18 alunos (Agner respondeu com áudio), desenho do agente CS, fichas dos agentes atualizadas, BASE e skill de memória.
- Observado: a aba do DevZapp no Chrome do Luis corinthiano está na tela de login (a régua programada roda no servidor, mas para mexer precisa entrar de novo).
