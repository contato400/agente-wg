# Funis e melhorias · Krav Magá Caveira (18/11, madrugada)

Pedido do Victor (3h43): "Tudo que você poderia sugerir para melhorar em todo o projeto, estrutura, plataforma, funil, criação de mais funis" e "você me apresentou os 5 funis orgânicos fora os 5 funis pagos?".

**Resposta sobre os 10 funis:** procurei neste projeto, nas conversas desta sessão e nas conversas antigas. Não achei nenhuma entrega com "5 funis orgânicos + 5 funis pagos". Então eles estão aqui pela primeira vez. Se o pedido foi feito em outro lugar (ChatGPT, áudio), vale conferir se faltou algo.

Base usada: Instagram principal com 1,8 mi (3 a 5 mil seguidores novos e mais de mil comentários por dia), perfil Kids com 600 mil, YouTube com 3,31 mi, catálogo do WhatsApp com 23 cursos a R$ 197 (order bump, upsell da IA R$ 197 e downsell R$ 147), Black com 23 treinamentos, e-book Vida Segura R$ 27,90 (590 vendas de 10/07 a 01/10), Comunidade (assinatura anual), ManyChat, Greenn, Hotmart e Academia (Cademi). Números de outubro estão marcados como "a conferir".

---

## 5 funis orgânicos

| # | Funil | Caminho | Vende o quê | Status |
|---|---|---|---|---|
| O1 | **Notícia do dia com palavra-chave** | Post ou reel sobre notícia de segurança → comentário com a palavra → DM do ManyChat → 1 pergunta de diagnóstico → curso certo | MULHER → Defesa Feminina; KIDS → Defesa Pessoal Kids; PROTEGER → Defesa Pessoal Caveira; SEGURA → Vida Segura; CAVEIRA → catálogo | Palavras já existem. Falta: uma UTM por palavra (utm_content) para saber qual vende, e o agente social gerando 3 pautas por dia |
| O2 | **Story "me chama no direct"** para a base parada | Sequência de stories (gatilho, dor, enquete, pedido da palavra) → DM → botão para o WhatsApp oficial → agente fecha na conversa | Curso do catálogo | Novo. Stories são vistos por quem já segue, então reativa os 1,8 mi sem disparo pago. Liga junto com o atendimento 24h |
| O3 | **YouTube perene** | Vídeo antigo e novo → link na descrição e no comentário fixado (utm_source=vc&utm_medium=youtube) → página do curso ou WhatsApp | Curso do tema do vídeo | Novo. O YouTube é o maior ativo (3,31 mi) e hoje quase não leva para venda. Esforço: 2 h para os 20 vídeos mais vistos |
| O4 | **Ascensão do aluno** | Compra → acesso no WhatsApp (ligado hoje) → dia 3: "já entrou? qual aula você viu?" → dia 8 (passada a garantia): curso complementar com preço de aluno → dia 30: Comunidade ou Black | 2º curso, IA KMC, Black, Comunidade | Começou hoje com a mensagem de acesso. Quem já comprou é o público mais barato de vender |
| O5 | **Live com o Wesley** (1 por mês) | Aviso nos stories e nos grupos → live com CTA de comentário → ManyChat responde durante a live → oferta com prazo real de 24h | Black ou combo | Novo. Comentário em live abre conversa em massa. Precisa de oferta e prazo aprovados pelo Wesley |

## 5 funis pagos (utm_source=FB, teto de R$ 50 por dia somando tudo)

Com R$ 20 a R$ 30 por dia não dá para rodar os 5 juntos. A ordem abaixo é a ordem de teste: 7 dias cada, mantém o que vende abaixo de R$ 60 por venda (regra `trafego-wg-guardrails`).

| # | Funil | Caminho | Por que | Quando |
|---|---|---|---|---|
| P1 | **Anúncio para conversa no WhatsApp** | Anúncio → conversa no número oficial → agente diagnostica e manda o link do curso | Aprovado pelo Victor hoje. A conversa que nasce do anúncio fica 72h sem custo de mensagem na Meta, e o agente responde na hora | Assim que o atendimento estiver no ar |
| P2 | **E-book que paga o anúncio** | Anúncio → e-book Vida Segura R$ 27,90 → order bump → upsell de curso ou IA → grupo e ascensão (O4) | O e-book já vendeu 590 em 3 meses. Se o bump e o upsell cobrirem o custo, o cliente entra de graça na escada | Em paralelo ao P1, se a verba permitir. Conferir antes o obrigado do e-book (estava quebrado em outubro) |
| P3 | **Remarketing de quem já engajou** | Público: quem comentou, mandou DM ou viu 50% dos reels nos últimos 30 dias → anúncio direto do curso ou da Black | É o público mais quente e mais barato. Com 1,8 mi, o público é grande mesmo com pouca verba | Semana da reabertura (20/11) |
| P4 | **Kids para pais** | Anúncio para pais com filhos em idade escolar (tema bullying, postura, confiança) → página Defesa Pessoal Kids | Dor forte e público definido. Dentro dos limites do Wesley: nunca "revidar", nunca foto de criança real | Depois do P1 e P3 |
| P5 | **Reel vencedor impulsionado** | O reel orgânico que mais gerou venda na semana vira anúncio, com a palavra-chave → ManyChat | Usa conteúdo já provado. Zero custo de criativo | Toda segunda, escolhido pelo relatório do analista |

---

## Melhorias no projeto (por impacto)

### Agora (antes da reabertura de 20/11)
1. **Netlify vence em 25/11.** Em outubro, as páginas de upsell da Black e do DPC (DW1 R$ 147) ainda estavam na Netlify. Conferir o que ainda depende dela e migrar para a Atomicat antes do dia 25, ou a oferta quebra no meio da venda. *(a conferir)*
2. **Medição de compra:** confirmar que o evento Purchase chega na Meta pelas páginas e pela Hotmart (em outubro o GTM via Stape estava com certificado errado). Sem isso, o tráfego pago otimiza no escuro. *(a conferir)*
3. **Pergunta da reabertura no atendimento** (preço, prazo, o que vem), para o agente responder igual em todo lugar.

### Próximas 2 semanas
4. **Recorrência:** a Comunidade tinha 29 assinaturas em dia e 189 em atraso em outubro. A régua de cobrança (dia 0, 3 e 7, só até 60 dias de atraso) está pronta desde outubro e nunca foi enviada. É dinheiro que já existiu.
5. **E-mail grátis:** o Hotmart Send já está incluído no plano. Dá para ter boas-vindas, "7 dias sem entrar na Academia" e recompra por e-mail, sem pagar nada. Hoje o e-mail só entrega acesso.
6. **Depoimentos reais:** um formulário curto no dia 8 ("o que mudou pra você?") com autorização de uso. Depoimento real é o que mais falta para anúncio, e nunca se inventa.
7. **Limpeza da Greenn com cuidado:** 74 produtos com preços bagunçados. Não mexer em nada que esteja em funil ou no catálogo. Só arquivar ofertas sem venda há 90 dias, com lista aprovada. Menos erro do agente e do suporte.
8. **Custo do ManyChat:** em outubro a conta passava do limite de contatos do plano. A ponte agora cria contato para cada comprador, então o número sobe. Ver o plano e o teto de gasto. *(a conferir)*

### Estrutura dos agentes
9. **Painel de venda por agente** na planilha (aba Vendas por utm_term), para o debriefing mostrar "o social gerou X, o atendimento fechou Y".
10. **Um documento mestre vivo:** o `kairos/00-WG-documento-mestre.md` é atualizado pelo chefe-wg toda semana com o que mudou. Os documentos datados continuam como histórico.
11. **Chaves:** a chave da ponte está escrita na instrução da tarefa agendada. Funciona, mas o certo é trocá-la a cada 3 meses e, quando a tarefa aceitar variável de ambiente, mover para lá.

### O que eu não faria agora
- Não abrir funil novo de produto novo antes de medir os que existem.
- Não criar mais um perfil, canal ou plataforma. O gargalo é conversão e medição, não alcance.
- Não pagar disparo em massa no ManyChat para a base toda (decisão de 17/11 continua certa).

---

## Decisões que dependem do Victor
1. Ordem dos funis pagos (P1 → P3 → P2 → P4 → P5) está boa?
2. Live mensal (O5): o Wesley topa? Qual oferta e qual prazo?
3. Liberar a régua de cobrança da Comunidade (O4 e item 4)?
4. Posso conferir a Netlify e o Purchase hoje (só leitura)?
