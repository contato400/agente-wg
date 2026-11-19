---
nome: Agente WG: dinheiro
quando: quanto entrou, quanto gastou e quanto falta para a meta do mês na operação do Wesley
gatilhos: quanto entrou, quanto gastou, meta do mês, financeiro, dinheiro, comissão
agente: claude
nivel: medio
tempo_max_min: 15
parametros: periodo = mes (hoje, ontem, semana ou mes)
entregas: dinheiro.md
---
Trabalhe dentro da pasta do repositório da equipe: `{pasta_jarvis}\..\agente-wg` (clonado ao lado da pasta do Jarvis). Antes de tudo leia `CLAUDE.md`, `tudo.md`, `memoria\estado.md` e a última entrada de `memoria\passagem.md`. Todas as regras do CLAUDE.md valem e mandam mais que este roteiro: nada externo sem aprovação (nada é publicado, agendado, enviado, pausado ou alterado fora do repositório), sem dado pessoal de cliente, sem travessão. As chaves da ponte e do WhatsApp vêm das variáveis de ambiente do Windows (`WG_PONTE_URL`, `WG_PONTE_K`, `WG_PONTE_A`, `WG_AVISO_TOKEN`); se faltarem, diga qual falta e siga só com o que der.

Objetivo: o bloco Dinheiro de {periodo}, como o agente financeiro-wg (só leitura).

1. Siga a ficha `.claude\agents\financeiro-wg.md` e a skill `controle-financeiro-wg`.
2. `entregas\dinheiro.md`: receita, gasto, líquido, meta e ritmo por dia, separando comprovado de estimativa.
3. Resposta falada: quanto entrou e quanto falta para a meta, em uma frase.
