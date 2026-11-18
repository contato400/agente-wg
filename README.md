# Agente WG

Equipe de agentes de IA que opera o negócio digital do **Mestre Wesley Gimenez (Krav Magá Caveira)**: atendimento, conteúdo, tráfego, ofertas, números. Tudo passa pela aprovação do Victor ou do Wesley antes de ir para o mundo.

Feito para abrir no **Claude Code**.

## Quem é quem
| Agente | Função | Fase |
|---|---|---|
| `chefe-wg` (Agente WG) | Coordena a equipe e entrega o debriefing diário | 1 |
| `analista-wg` | Números: vendas, meta, Instagram, anúncios, ManyChat, atendimento | 1 |
| `atendimento-wg` | Melhora todo dia o atendimento 24h do WhatsApp | 1 |
| `financeiro-wg` | Receita, custos, comissão, projeção (só leitura) | 1 |
| `juridico-wg` | Revisa riscos antes de qualquer coisa ir para a fila | 1 |
| `social-media-wg` | Pauta diária, roteiros, legendas, palavras-chave do ManyChat | 2 |
| `ofertas-paginas-wg` | Ofertas, páginas na Atomicat, checkouts | 2 |
| `trafego-wg` | Assistente do Diogo no Meta Ads (teto R$ 50 por dia) | 3 |

O atendimento ao vivo do WhatsApp é um serviço separado: `docs/atendimento-whatsapp.md`.

## Como funciona
1. Os agentes leem dados, pesquisam e preparam propostas sozinhos.
2. Tudo que é externo (post, anúncio, página, mensagem) vai para a **fila de aprovação** (aba da planilha WG).
3. Você ou o Wesley aprovam.
4. O comando `/executar-aprovados` executa só o que foi aprovado. Os outros agentes são **bloqueados tecnicamente** de publicar (`.claude/settings.json`).
5. Toda manhã, o Agente WG manda o debriefing: como foi ontem e o que fazer hoje.

## Estrutura
```
CLAUDE.md                 regras de todos os agentes (ler primeiro)
.claude/agents/           os 8 agentes
.claude/skills/           o conhecimento (copy, oferta, vendas, produtos, suporte, marca, tráfego...)
.claude/commands/         /debrief /pauta /trafego /atendimento /executar-aprovados /semana
.claude/settings.json     bloqueia publicar/alterar para todos, menos o executor
memoria/                  estado, decisões e aprendizados compartilhados
aprovacao/                fila de aprovação e propostas
rotinas/                  agenda e configuração do executor
docs/                     conexões de cada agente e o serviço de atendimento
relatorios/               saída diária de cada agente
```

## Começar
1. Abra esta pasta no Claude Code.
2. Conecte os conectores da conta Luis corinthiano (Google, Metricool, Atomicat, Canva, Windsor). Ver `docs/conexoes.md`.
3. Rode `/debrief` uma vez manualmente e confira.
4. Agende as rotinas da Fase 1 (`rotinas/agenda.md`).
5. Quando a Fase 1 estiver confiável, ligue a Fase 2 e depois a Fase 3 (tráfego, já liberado como assistente do Diogo).

## Pendências para ficar 100%
- Ativar a API oficial do WhatsApp no número de suporte (coexistência) e subir o serviço de atendimento.
- Completar `base-produtos-wg` (itens "conferir") e as skills de suporte e catálogo com o mapa das conversas reais.
- Ligar a conta de anúncios do Wesley no Windsor.ai (leitura).
- Confirmar no ManyChat quais palavras-chave estão ao vivo (`pauta-conteudo-wg`).
