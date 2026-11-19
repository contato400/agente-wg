# Agenda dos agentes

Cada linha vira uma tarefa agendada. Liga-se aos poucos: a coluna "Fase" diz quando.

Expediente dos agentes: **8h às 18h, segunda a sábado** (domingo só o atendimento). O único que trabalha fora desse horário é o atendimento do WhatsApp, que responde todo dia, inclusive à noite.

**Desde 18/11 roda UMA tarefa agendada só** (decisão do Victor): "Agente WG - Rotina diaria completa", 7h35 de segunda a sábado, horário de Brasília. Ela faz, em ordem: debriefing (vendas, meta, fila), tráfego (Windsor, só leitura, até 2 propostas para o Diogo), 3 pautas do Instagram na fila, um e-mail único para o Luis corinthiano e commit no repositório.

Os comandos abaixo continuam existindo para rodar na mão quando precisar:

| Comando | Agente | O que entrega |
|---|---|---|
| `/debrief` | chefe-wg (+ analista, financeiro) | Debriefing |
| `/pauta` | social-media-wg | 3 pautas na fila de aprovação |
| `/trafego` | trafego-wg | Análise e propostas (assistente do Diogo) |
| `/atendimento` | atendimento-wg | Revisão das conversas de ontem (quando o atendimento 24h estiver no ar) |
| `/executar-aprovados` | executor | Executa o que foi aprovado |
| `/semana` | chefe-wg | Revisão da semana |
| (serviço, 24h) | atendimento WhatsApp | Responde no número oficial (em construção) |

## Agente do dia (a partir de 19/11)
Além do debriefing, do tráfego e da pauta, a rotina diária faz uma **rodada de iniciativa**: o agente do dia pega o primeiro item dele em `memoria/backlog.md`, faz todo o trabalho interno e põe na fila o que for externo. Um agente por dia para controlar o custo.

| Dia | Agente | Além do backlog |
|---|---|---|
| Segunda | social-media-wg | Termômetro do direct e dos comentários (B07) |
| Terça | ofertas-paginas-wg | Conversão das páginas (B11) |
| Quarta | atendimento-wg | Voz do cliente (B05) |
| Quinta | financeiro-wg | Custo global, por produto e recompra (B10) |
| Sexta | analista-wg | Balanço da semana por origem; em 20/11, medição da reabertura (B02) |
| Sábado | juridico-wg + auditor-wg | Auditoria do que está no ar (B19) e auditoria completa da operação (auditor-wg); o chefe fecha a semana e reordena o backlog |

**Todo dia:** o auditor-wg roda o checklist rápido (8 itens da ficha) antes do debriefing.

**Todo dia, logo depois do checklist:** o chefe-wg roda as conversas entre agentes (`memoria/conversas.md`): fecha os pedidos abertos chamando o agente de destino e roda as conversas fixas do dia (ex.: financeiro conta ao social quais posts venderam). Vem do CLAUDE.md e da ficha do chefe, então vale para a tarefa agendada sem mexer no texto dela.

Datas de campanha passam na frente: em dia de abertura ou reabertura, a rodada é do analista (medição) e do chefe (ajuste da régua).

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
