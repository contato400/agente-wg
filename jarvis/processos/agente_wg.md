---
nome: Equipe do Wesley
quando: qualquer pergunta ou pedido sobre a operação do Mestre Wesley Gimenez (Krav Magá Caveira): como está o financeiro, as vendas, a meta, o atendimento, o Instagram, o tráfego, as páginas, a fila de aprovação, o projeto, a estrutura. Também quando o Victor chama um agente pelo nome ("financeiro, ...", "social, ...").
gatilhos: wesley, caveira, krav maga, operação, equipe, agentes, financeiro, vendas, meta, faturamento, atendimento, whatsapp, instagram, social, tráfego, anúncios, páginas, ofertas, jurídico, chefe, analista, auditor, sucesso do aluno, debriefing, fila de aprovação, como está o projeto
agente: claude
nivel: leve
tempo_max_min: 6
parametros: agente = chefe (chefe, financeiro, analista, social, atendimento, trafego, ofertas, juridico, sucesso ou auditor; na dúvida, chefe); pergunta (o pedido do Victor, com as palavras dele)
entregas: resposta.md
---
Objetivo: levar o pedido de {dono} para o agente {agente} da equipe do Mestre Wesley e trazer a resposta.

A equipe roda na nuvem (os mesmos agentes que respondem no WhatsApp pelo #nome). Você não faz o trabalho dela: só pergunta e repassa.

1. Rode: `python "{pasta_jarvis}\wg\wg.py" {agente} "{pergunta}"` (pode levar até 2 minutos).
2. Copie a resposta inteira para `entregas\resposta.md`.
3. Se a resposta pedir aprovação, deixe claro qual item e que {dono} aprova pelo WhatsApp ou dizendo "aprova".
4. Resposta falada: no máximo 3 frases, com o número principal quando houver. Sem travessão.

Nunca publique, mande mensagem, mexa em campanha, página, oferta ou dinheiro: isso é só da equipe, e sempre com aprovação.
