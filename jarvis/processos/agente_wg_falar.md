---
nome: Agente WG: falar com um agente
quando: mandar um pedido para um agente da equipe do Wesley (chefe, social, financeiro, analista, atendimento, tráfego, páginas, jurídico, sucesso do aluno, auditor) e trazer a resposta
gatilhos: social, financeiro, analista, atendimento, tráfego, páginas, ofertas, jurídico, chefe, auditor, sucesso do aluno, pergunta pro agente, manda pro agente
agente: claude
nivel: medio
tempo_max_min: 20
parametros: agente (chefe, social, financeiro, analista, atendimento, trafego, ofertas, juridico, sucesso, auditor); pedido (o que o Victor pediu, com as palavras dele)
entregas: resposta.md
---
Trabalhe dentro da pasta do repositório da equipe: `{pasta_jarvis}\..\agente-wg` (clonado ao lado da pasta do Jarvis). Antes de tudo leia `CLAUDE.md`, `tudo.md`, `memoria\estado.md` e a última entrada de `memoria\passagem.md`. Todas as regras do CLAUDE.md valem e mandam mais que este roteiro: nada externo sem aprovação (nada é publicado, agendado, enviado, pausado ou alterado fora do repositório), sem dado pessoal de cliente, sem travessão. As chaves da ponte e do WhatsApp vêm das variáveis de ambiente do Windows (`WG_PONTE_URL`, `WG_PONTE_K`, `WG_PONTE_A`, `WG_AVISO_TOKEN`); se faltarem, diga qual falta e siga só com o que der.

Objetivo: o agente {agente} responde ao pedido de {dono}: "{pedido}".

1. Ache a ficha do agente em `.claude\agents` (chefe = chefe-wg, social = social-media-wg, ofertas ou páginas = ofertas-paginas-wg, sucesso = sucesso-aluno-wg, os outros = <nome>-wg). Leia a ficha inteira e as skills que ela manda usar.
2. Faça o trabalho como esse agente. Ação externa vira proposta na fila (skill fila-aprovacao-wg) e não é executada.
3. Se precisar de outro agente, escreva o pedido em `memoria\conversas.md` (de, para, pedido), como manda o CLAUDE.md.
4. `entregas\resposta.md`: a resposta, curta, começando por venda quando o assunto for número. No fim: o que leu, o que criou ou mudou e o que ficou em dúvida.
5. Faça commit e push do que mudou em memoria, relatorios, aprovacao e conteudo.
6. Resposta falada: 2 frases, a principal conclusão e o que depende de {dono}.
