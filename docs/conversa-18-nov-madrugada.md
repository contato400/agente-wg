# Agente WG · conversa com o Victor, 18/11 de madrugada (2h às 3h30)

Registro completo para não depender da memória do Claude. Regra nova do Victor: **tudo que for conversado vai para um documento do projeto** (pasta kairos/).

## 1. Uma tarefa agendada só
- Pedido: "Ao invés de ser 3, não dá pra ser só um completo com tudo?"
- Feito: ficou só a tarefa **"Agente WG - Rotina diaria completa"**, às 7h35 de segunda a sábado (horário de Brasília).
- Ordem dela: lê vendas, meta e fila pela ponte; analisa o tráfego da conta 4500 pelo Windsor (só leitura, no máximo 2 propostas para o Diogo); monta 3 pautas do Instagram; põe tudo na fila como PENDENTE; manda **um e-mail só** ("Agente WG · rotina do dia DD/MM") para o Luis corinthiano; commit e push no repositório.
- Apagadas as duas tarefas separadas (Pauta do Instagram e Análise do tráfego).

## 2. O que o Victor aprovou da revisão estratégica
| Ponto | Decisão do Victor |
|---|---|
| Atendimento do WhatsApp é a prioridade | Concorda. Amanhã, com o código do Samuel, resolve a API |
| Atacar o problema de acesso na raiz (cerca de 1/4 das conversas do suporte é gente que não entra) | "Fantástico." Ligar hoje: mensagem no WhatsApp logo depois da compra com o link da Academia, "entre com o e-mail da compra" e "olhe no spam". Respondeu **"LIGA!"** às 3h22 |
| Juntar agentes com tráfego: anúncio que leva direto para conversa no WhatsApp | Aprovado. Com o atendimento no ar, R$ 20 a R$ 30 por dia direto para conversa com o agente |
| Arrumar o catálogo | **Não mexer.** O catálogo do WhatsApp está certo: 23 cursos, sem e-book, R$ 197 com order bump, upsell da IA e downsell. A bagunça de preços é só dentro da Greenn (74 produtos). Está vendendo, mantém |
| Medir o que cada agente vende (UTM por agente) | Aprovado. Regra: `utm_term=ag-<agente>`, mantendo `utm_source=vc` (orgânico) ou `FB` (tráfego) |
| Funis de palavra-chave no Instagram | Manter CAVEIRA, MULHER, SEGURA, PROTEGER e KIDS |
| Receita que se repete, acompanhamento e ascensão do aluno | Aprovado como direção |
| O que tirar ou simplificar; riscos a vigiar | Concorda |
| Plano dos próximos 7 dias | Aprovado. **Foco até o fim do mês é a Black** (reabertura 20/11 às 19h; as vendas se arrastam depois) |

## 3. Ideias novas do Victor
1. **Social media de notícia:** notícia das últimas 24h (crime, caso com criança etc.) vira carrossel, estático ou vídeo puxando para o curso certo. Exemplo: caso com criança puxa para Defesa Pessoal Kids com a palavra KIDS (funil já ativo no ManyChat). Sempre dentro dos limites do Wesley: nunca explorar vítima, nunca imagem de vítima ou de criança.
2. **Fluxo do post:** o agente manda as 3 pautas, o Victor aprova, o agente cria a arte (Canva, ChatGPT ou Flow) e posta no Instagram. Tudo depende da aprovação dele.
   - Proposta do Claude, registrada no agente: em tema sensível (crime, criança, mulher, violência), a arte pronta passa por um segundo "posta" do Victor. Nos outros temas, aprovar a pauta já basta.
3. **Todos os agentes falam com o Victor no WhatsApp pessoal dele** (o número fica só na variável `WG_ADMIN_FONE`). Tráfego, social media, financeiro, todos. Até o serviço estar no ar, o canal é o e-mail.
4. **Reembolso e reclamação:** o financeiro avisa o Victor no WhatsApp ("fulano está pedindo reembolso"). O Victor manda o agente do WhatsApp tentar recuperar a venda com boa copy. Se não der, o Victor mesmo faz o reembolso.
   - Limite legal registrado: o agente nunca nega, atrasa ou dificulta reembolso pedido dentro da garantia de 7 dias e nunca faz o reembolso.
5. O Victor é o único ponto de aprovação da operação. Ele sabe do risco e prefere assim, com tudo chegando no WhatsApp para não virar gargalo.

## 4. Mensagem de acesso pós-compra (NO AR desde 18/11 às 3h47)
- Meta aprovou o modelo como Utilidade; automação publicada (AO VIVO, gatilho ativo), conferida na lista de automações.
- **Caminho:** compra aprovada na Greenn (qualquer produto) ou na Hotmart (só o evento "Compra aprovada") → a ponte (Apps Script, versão 4, 18/11 3h24, mesma URL) tira e põe a tag `enviar_acesso` no contato do ManyChat (cria o contato pelo telefone do checkout se não existir) → automação **"WPP - Acesso pos-compra (Greenn e Hotmart)"** manda o modelo `caveira_acesso_academia`.
- Compra de e-book fica fora (não entra pela Academia).
- Sai pelo WhatsApp do ManyChat ("Equipe Santiago"), igual ao upsell da IA e à recuperação de carrinho. O texto manda chamar o suporte oficial (31) 97334-6056. Quando o atendimento do número oficial estiver no ar, a mensagem passa para ele.
- Modelo (Utilidade, Português BR), enviado para a Meta às 3h23:

> Shalom, tudo bem? Sua compra foi aprovada e o seu acesso à Academia Krav Magá Caveira já está liberado.
>
> Para entrar, use o mesmo e-mail que você colocou na compra. O login e a senha também foram enviados para esse e-mail. Se não encontrar, olhe na caixa de spam e na de promoções.
>
> Qualquer dificuldade, chame o suporte no WhatsApp (31) 97334-6056.
>
> Tamo junto, Caveira!

- Botão: **Entrar na Academia** (https://kravmagacaveira.cademi.com.br/). O ManyChat só aceita um botão de link por modelo, por isso o suporte ficou no texto.
- Ordem com o que já existe: acesso na hora; upsell da IA 3 horas depois (só Black, só para quem não tem a IA).
- **Como desligar:** pausar a automação no ManyChat. A tag continua sendo aplicada sem efeito.
- Medir: envios e cliques da automação; queda das conversas "não consigo entrar" no suporte.

## 5. Mudanças no repositório (contato400/agente-wg)
- `CLAUDE.md`: UTM por agente (`utm_term=ag-<agente>`); seção 9 "Canal com o Victor (WhatsApp)" com a regra do reembolso.
- `memoria/decisoes.md`: 11 decisões de 18/11.
- `memoria/estado.md`: foco na Black até 30/11, catálogo intocado, prioridades.
- Agente `social-media-wg`: fluxo depois da aprovação (arte, conferência, post) e palavras-chave ativas.
- Agente `financeiro-wg`: alerta de reembolso na hora.

## 6. Pendências
1. Amanhã: código do Samuel para criar o app da Meta do atendimento no portfólio do Wesley.
2. Amanhã: chave da API do Claude no cartão do Victor.
3. Construir o serviço de atendimento 24h com o modo "conversa do Victor" (aprovações e alertas pelo WhatsApp).
4. Descobrir de quem é o ManyChat que aparece como parceiro no número oficial.
5. Anúncio direto para o WhatsApp (R$ 20 a R$ 30 por dia), depois do atendimento no ar, com aprovação.
6. Pergunta da reabertura no FAQ do atendimento antes de 20/11.
