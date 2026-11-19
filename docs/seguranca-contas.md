# Segurança das contas · checklist (18/11)

Pedido do Victor: proteger o máximo possível. Nenhum agente mexe em configuração de segurança; quem faz é o dono de cada conta. Este arquivo não guarda senha, código nem chave.

| Conta | Quem faz | Verificação em 2 etapas | Situação |
|---|---|---|---|
| Gmail do Luis corinthiano (Windsor, ponte da planilha, Chrome do trabalho) | Victor | Aplicativo autenticador + códigos de reserva | **Fazer primeiro** |
| E-mail da empresa contato@digitalwisdom.com.br (login do Metricool) | Victor | Já tem, segundo o Victor | Conferir se o Metricool também pede |
| Instagram do Wesley (1,8 mi) | Wesley | Já tem (o Wesley manda o código para cada login novo) | Ok. Melhoria opcional: app autenticador e códigos de reserva no papel |
| Facebook de quem administra a página e o Instagram | Cada administrador | Aplicativo autenticador | Pedir aos administradores |
| Metricool e Windsor | Victor | Se a ferramenta oferecer, ligar | Conferir |

Revisão a cada mês:
- Instagram > Central de Contas > Apps e sites: só Metricool, Windsor, ManyChat e o que a equipe reconhece.
- Gerenciador de Negócios da Meta: poucos administradores, todos com 2 etapas.
- Chaves da ponte: na configuração de ambiente da tarefa agendada, nunca no texto da tarefa nem no repositório.

Se algo parecer estranho (post que ninguém fez, e-mail de troca de senha): tirar o acesso do app em "Apps e sites", trocar a senha e avisar o Victor.

## Senha da ponte na tarefa agendada (conferido em 18/11 23h59)
- A rotina das 7h35 tem as chaves da ponte escritas nas instruções. Quem vê: só quem entra na conta do Claude (Digital Wisdom).
- Mudar para "Variáveis de ambiente" do ambiente de nuvem não esconde: a própria tela avisa "qualquer pessoa que use este ambiente pode ver esses valores, então não adicione segredos". Ficaria tão visível quanto está hoje, para as mesmas pessoas.
- Decisão: manter como está. A proteção de verdade é a conta do Claude com verificação em 2 etapas e não compartilhar o acesso. Se um dia a chave vazar (alguém de fora viu, print, conta compartilhada), troca-se a chave no Apps Script (Propriedades do script, quem faz é o Victor) e atualiza-se a tarefa.
