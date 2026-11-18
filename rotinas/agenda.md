# Agenda dos agentes

Cada linha vira uma tarefa agendada. Liga-se aos poucos: a coluna "Fase" diz quando.

Expediente dos agentes: **8h às 18h, segunda a sábado** (domingo só o atendimento). O único que trabalha fora desse horário é o atendimento do WhatsApp, que responde todo dia, inclusive à noite.

| Horário (Brasília) | Comando | Agente | Fase | O que entrega |
|---|---|---|---|---|
| 08h00 seg a sáb | `/debrief` | chefe-wg (+ analista, financeiro) | 1 | Debriefing no seu e-mail e em `relatorios/` |
| 09h00 seg a sáb | `/pauta` | social-media-wg | 2 | 3 pautas na fila de aprovação |
| 10h00 seg a sáb | `/trafego` | trafego-wg | 3 | Análise e propostas (assistente do Diogo) |
| 11h00 seg a sáb | `/atendimento` | atendimento-wg | 1 | Revisão das conversas de ontem |
| 12h00 e 17h30 seg a sáb | `/executar-aprovados` | executor | 2 | Executa o que você aprovou |
| Segunda 08h30 | `/semana` | chefe-wg | 1 | Revisão da semana e plano |
| Todo dia, 24h | (serviço) | atendimento WhatsApp | 1 | Responde quem chama no número oficial |

## Como agendar (escolher um)
1. **Tarefas agendadas do Claude Code na nuvem** (claude.ai/code): criar uma tarefa por linha, com o comando como instrução e este projeto como repositório. Roda sem o seu computador.
2. **GitHub Actions** (grátis até certo uso): um arquivo de workflow por rotina rodando `claude -p "/debrief"` com a chave da API nos segredos do repositório.
3. **Manual:** abrir o projeto no Claude Code e digitar o comando quando quiser.

O executor sempre roda com a configuração própria:
```
claude --settings rotinas/settings-executor.json -p "/executar-aprovados"
```

## Custo
Cada rotina é uma conversa com a IA. Seis rotinas por dia somam custo diário. Para controlar:
- Fase 1 liga só `/debrief` e `/atendimento`.
- Usar `sonnet` na rotina e `opus` só no debriefing.
- Medir o custo real na primeira semana e cortar a rotina que não gera venda.
