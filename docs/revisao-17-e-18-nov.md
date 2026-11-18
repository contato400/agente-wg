# Revisão de tudo que foi feito de 17/11 de manhã a 18/11 às 4h

Pedido do Victor (3h50): ver se erramos algo, se ficou algo sem fazer e o que pode melhorar.

## 1. O que foi feito e está certo (conferido agora)
| Item | Conferência |
|---|---|
| Ponte Greenn/Hotmart → ManyChat + planilha | Respondendo (versão 5). Recebeu 1 evento real: checkout abandonado da Black às 2h23 |
| Recuperação de carrinho automática | Ao vivo. Tem 1 pessoa esperando (a das 2h23), que recebe às 8h, dentro do horário 8h às 22h |
| Upsell da IA pós-Black | Ao vivo, modelo aprovado. 0 envios porque não houve venda da Black depois que ligou |
| Mensagem de acesso pós-compra | Ao vivo desde 3h47, modelo aprovado, gatilho ativo |
| Tarefa agendada única | Ativa, próxima rodada 18/11 às 7h35. As 2 tarefas antigas foram apagadas |
| Windsor (conta 4500) e Canva | Na conta do Luis corinthiano, como você pediu. Nada na Digital Wisdom |
| Repositório dos agentes | 7 commits, tudo enviado. Chaves fora do repositório |
| Documentos | Conversa, funis e esta revisão no projeto. Documento-mestre atualizado |
| Sem dado pessoal | Nenhum telefone, e-mail ou nome de cliente em documento, relatório ou repositório |

## 2. Erros e riscos que achei (e o que fiz)
| # | Problema | Gravidade | O que fiz |
|---|---|---|---|
| 1 | **Mensagem de acesso repetida.** Order bump, upsell e downsell chegam como vendas separadas. Quem comprasse Black + bump + IA receberia 3 ou 4 mensagens iguais. A renovação da Comunidade na Hotmart também mandaria "sua compra foi aprovada" de novo | Média | **Corrigido** (ponte versão 5, 3h52): no máximo 1 mensagem a cada 6 h por pessoa e nada em renovação de assinatura da Hotmart. Conferi que a ponte segue respondendo |
| 2 | **Nenhuma venda real passou pela ponte ainda.** A última venda da Greenn foi 17/11 às 19h41, antes de ligar. Nenhum evento da Hotmart chegou | Média | Conferido no histórico de webhooks da Hotmart: o último evento da conta é de 16/11 às 23h46, ou seja, não houve nada para mandar desde que a ponte foi cadastrada. Nada a fazer até a primeira venda. Fica como a primeira conferência de amanhã: linha na aba Vendas, tags e 1 mensagem de acesso |
| 3 | **Garantia:** a regra dos agentes diz "7 dias" para tudo. Em 31/10 a Black da Hotmart estava com **30 dias** (configurado, e a página foi corrigida para 30). A mensagem de recuperação de carrinho diz "Garantia de 7 dias" também para quem abandonou a Black da Hotmart | Média | **Não mudei.** Preciso que você confirme qual é a garantia hoje de cada Black (Greenn e Hotmart) para acertar a regra e o texto |
| 4 | **Downsell da IA a R$ 147 automático.** Você decidiu "R$ 147 só se a pessoa questionar". O funil da Greenn oferece os R$ 147 sozinho a quem recusa a IA depois da Black, e houve venda assim ontem às 19h41 | Baixa | **Não mudei** (é funil vendendo). Você decide se fica |
| 5 | **Recuperação de carrinho fala do cupom BLACK10** para todo mundo, inclusive quem abandonou na Hotmart, onde esse cupom da Greenn não funciona | Baixa | Anotado. Ajuste simples depois da reabertura |
| 6 | **Saudação da recuperação e do upsell:** começam com "Fala, [nome]! Aqui é do time do Mestre Wesley 👊" e não com "Shalom, tudo bem?". Usam o nome da pessoa, que pode vir errado do checkout | Baixa | Anotado. Os modelos já aprovados na Meta exigem reenvio para mudar |
| 7 | **Custo da rotina diária:** ela roda inteira no modelo mais caro (Opus). A regra dos agentes manda usar o mais barato na rotina | Baixa | Anotado. Se o consumo da conta da empresa pesar, troco para o Sonnet |
| 8 | **Chaves da ponte escritas na instrução da tarefa agendada.** Funciona, mas quem abre a tarefa vê | Baixa | Anotado. Trocar a chave a cada 3 meses |
| 9 | **Documentos de 17/11:** o trabalho de ontem (ponte, recuperação, upsell) ficou só no documento-mestre, sem documento datado | Baixa | Agora está no mestre atualizado e nesta revisão. Regra nova vale daqui pra frente |
| 10 | **Agenda dos agentes** ainda mostrava 6 rotinas separadas | Baixa | **Corrigido** (repositório) |

## 3. O que ficou sem fazer
| Item | Por quê | Quando |
|---|---|---|
| Atendimento 24h no número oficial | Depende do código do Samuel (Facebook) e da chave da API do Claude | 18/11 |
| Conversa sua com o Agente WG pelo WhatsApp | Roda no mesmo serviço do atendimento | Junto com o atendimento |
| Saber quem é o ManyChat parceiro no número oficial | Precisa do acesso do Samuel ao portfólio | 18/11. Desligar antes de ligar o nosso, senão responde em dobro |
| Pergunta da reabertura no FAQ do atendimento | Falta o texto final da reabertura | Até 19/11 |
| Conferir Netlify (vence 25/11) e evento de compra na Meta | Aguardando seu OK (só leitura) | 18/11 |
| Apagar a cópia duplicada da régua do Gui | Aguardando seu OK | Quando quiser |
| Decisão sobre o DevZapp (teste grátis até 20/11) | Sua decisão | Até 20/11 |
| E-mail aos alunos chamando para o grupo de espera | Planejado para quinta | 19/11 |
| Virar os funis do ManyChat na reabertura | Planejado | 20/11 às 19h |

## 4. O que pode melhorar no que já foi feito
1. **Primeira venda real como teste:** depois da primeira compra, conferir as 4 coisas (planilha, tags, mensagem de acesso, upsell 3 h depois). É o que falta para dizer que a cadeia funciona de ponta a ponta.
2. **Uma linha "acesso enviado" no debriefing:** quantas mensagens de acesso saíram e quantos clicaram no botão. Mede se o problema de acesso caiu.
3. **Recuperação de carrinho no tom da marca** ("Shalom, tudo bem?"), sem nome e com o cupom certo por plataforma (precisa reenviar o modelo para a Meta).
4. **Painel:** a linha "Hotmart e ajustes manuais" pode sair, porque a Hotmart agora entra sozinha. Evita contar duas vezes.
5. **Teste da Hotmart:** ver no painel de webhooks da Hotmart se os envios para a ponte estão com status de sucesso, sem esperar uma venda.

## Decisões que dependem do Victor
1. Garantia da Black hoje: 7 ou 30 dias (Greenn e Hotmart)?
2. Downsell da IA a R$ 147 automático no funil da Greenn: fica ou sai?
3. Posso conferir Netlify e o evento de compra na Meta (só leitura)?
4. Apagar a cópia duplicada da régua do Gui?

## Adendo (18/11, 4h15): compra chegando na Meta e gasto do tráfego
Leitura do Windsor, conta 4500, de 04 a 17/11 (só leitura, valores da Meta):
- **A compra chega na Meta:** 66 compras do Pixel no período (R$ 5.403,97 em valor). A medição está funcionando.
- **Gasto alto depois da Black:** R$ 5.089,40 no período. Nos últimos 3 dias (15 a 17/11): R$ 1.473,48 para 5 compras (R$ 757,12). Só em 17/11: R$ 845,50 para 1 compra de R$ 397.
- As campanhas são do Diogo (fora do teto de R$ 50 por dia, que vale para o que os agentes propõem). Nada foi mexido. Vale o Victor e o Diogo olharem hoje se essas campanhas devem seguir rodando até a reabertura de 20/11.
