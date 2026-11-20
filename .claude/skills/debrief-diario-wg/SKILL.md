---
name: debrief-diario-wg
description: Aciona quando for montar o debriefing da manhã ou responder "como foi ontem" e "o que fazemos hoje" na operação WG. NÃO aciona para relatório semanal (/semana) nem para relatório de comissão.
---

# Debriefing diário · Agente WG

Lido pelo Victor no celular, de manhã. Precisa caber em 2 minutos de leitura.

## Ordem fixa
1. **Placar** (uma linha): "Mês: 118/150 vendas, R$ 25.900/30.000. Faltam 32 vendas em 12 dias = 2,7 por dia."
2. **Ontem em números** (tabela curta):
   | Frente | Resultado | vs. anteontem |
   |---|---|---|
   | Vendas orgânicas | | |
   | Vendas tráfego | | |
   | Recuperação de carrinho | | |
   | Upsell IA | | |
   | Atendimento (conversas / vendas / para humano) | | |
   | Instagram (posts / comentários com palavra-chave) | | |
   | Anúncios (gasto / vendas / custo por venda) | | |
3. **O que funcionou** (até 3, com número).
4. **O que não funcionou** (até 3, com número e o que fazer).
5. **Plano de hoje** (até 5 ações, cada uma com o agente e o motivo comercial).
6. **Fila de aprovação:** quantos itens esperam você, os mais urgentes primeiro, com o link da aba.
7. **Decisões suas**, numeradas.

## Regras
- Começa por venda, sempre. Atividade sem venda vai para o fim.
- Comprovado x estimado sempre separado.
- Se um dado não veio, diga "sem dado de X" em vez de omitir.
- Nada de dado pessoal de cliente.
- Onde entregar: arquivo `relatorios/AAAA-MM-DD-debrief.md` e no **WhatsApp do Victor** (decisão de 19/11: com o atendimento 24 h no ar, o canal é o WhatsApp, não o e-mail): `rotinas/whatsapp.sh avisar-arquivo chefe relatorios/AAAA-MM-DD-debrief.md`. Versão para WhatsApp: curta, sem tabela (lista simples), até ~3.500 caracteres por parte. Só use `rotinas/ponte.sh email` se o envio pelo WhatsApp falhar (ex.: Victor sem falar com o número há mais de 24 h).
- Depois do debriefing: `rotinas/whatsapp.sh recados` (traz recados e conversas que o Victor fez com os agentes pelo #nome; registrar em `memoria/conversas.md`) e `rotinas/whatsapp.sh memoria` (atualiza o que os agentes do WhatsApp enxergam).

## Formato decidido pelo Victor (20/11 18h29) · vale acima de qualquer modelo anterior
- Objetivo e sucinto, sem textão. Mas DETALHADO POR AGENTE.
- (a) Placar em 3 linhas: mês, ontem por produto e por origem.
- (b) Uma seção curta por agente (analista, financeiro, tráfego, social, atendimento, sucesso do aluno, ofertas, estrategista, auditor, jurídico, editor de vídeo): o que fez ontem, o número que mostra se funcionou, o que faz hoje. 2 a 4 frases cada.
- (c) Peça do dia do social. (d) Fila, inclusive APROVADO não executado. (e) Decisões do Victor numeradas.

## Consciência dos agentes (o chefe é o cérebro)
Depois do debriefing, para cada agente, acrescentar na ficha `.claude/agents/<nome>.md`, seção "Diário e aprendizados" (criar se não existir), uma entrada de até 4 linhas com a data: o que fez, o que deu certo ou errado (com número), a ideia ou ajuste para amanhã. Aprendizado que vale sempre vai para a skill do assunto. Nunca apagar entradas; condensar as de mais de 14 dias num parágrafo "Resumo". Cada agente lê essa seção antes de começar o dia. Incluir `.claude/agents` no commit da rotina.
