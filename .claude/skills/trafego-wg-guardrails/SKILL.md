---
name: trafego-wg-guardrails
description: Limites, métricas e método para o tráfego pago do WG (Meta Ads) com verba pequena de R$ 20 a R$ 50 por dia. Usar antes de analisar, propor ou alterar qualquer campanha do Mestre Wesley Gimenez.
---

# Tráfego pago WG · limites e método

## Limites que não se discutem
- Teto: **R$ 50 por dia somando tudo**. Padrão: R$ 20 a R$ 30 por dia.
- Campanha nova nasce **pausada**. Só liga com linha APROVADO na fila.
- Nenhum agente aumenta orçamento sozinho.
- Toda venda do tráfego chega com `utm_source=FB` e cai na página duplicada do tráfego (separada do orgânico).
- O agente é assistente do Diogo. Mudança na conta só depois do OK do Victor e do Wesley.

## Conta de quanto pode custar uma venda
Com produto de R$ 197 (líquido estimado ~R$ 186 na Greenn):
- Custo por venda **bom**: até R$ 60.
- **Aceitável** para aprender: até R$ 100.
- Acima de R$ 120 sem melhora em 3 dias: pausar.
Recalcule para cada produto (e-book R$ 27,90 só se pagar com upsell; a IA KMC e os bumps aumentam o ticket).

## Regra de pausa (verba pequena)
- Anúncio que gastou **2x o custo por venda aceitável (R$ 200) sem venda**: pausar.
- CTR abaixo de 0,8% depois de 1.000 impressões: trocar o criativo.
- Custo por clique muito acima da média da conta: revisar público.
Com R$ 30 por dia, uma decisão leva dias. Não mude tudo de uma vez: uma variável por teste.

## Veredito por anúncio (método do curso ZX LAB, adaptado em 18/11)
- **Até a Black acabar: modo só leitura.** Mostrar os números por anúncio, sem veredito de escalar ou pausar (decisão do Victor: o tráfego é do Diogo).
- Depois da Black: KPI principal é o **custo por venda**, meta **R$ 80** (produto de R$ 197).
  - **Escalar** quando o custo por venda for até 0,8x da meta (até R$ 64).
  - **Pausar** quando passar de 1,5x da meta (acima de R$ 120).
  - **Manter** entre os dois.
  - **Amostra insuficiente**: anúncio que gastou menos de 1,2x da meta (R$ 96) não recebe veredito. Esperar 24 a 72 h.
- Mudança de verba: uma por dia, no máximo +30% por vez, mínimo R$ 10 por campanha ativa, sempre dentro do teto de R$ 50. Reavaliar 24 h depois; se piorar 2 dias seguidos, voltar ao que era.
- Toda proposta mostra o número e o motivo ("custo por venda R$ 140, 75% acima da meta, gasto R$ 210").
- Janelas de leitura: 4, 7, 14 e 30 dias. Decidir pela de 7 dias.

## Atribuição (aula de tráfego da Masterclass Lançamento Pago, 18/11)
- O gerenciador e o último clique (UTM) contam vendas diferentes. Muita gente vê o anúncio e compra depois pelo link da bio ou do grupo, e a venda aparece como orgânica (vc).
- Antes de propor pausa, olhar também o **custo global**: investimento total do período dividido pelo total de vendas (orgânico + tráfego). Se as vendas totais sobem junto com o investimento, o tráfego está ajudando mesmo sem venda de último clique.
- Nunca olhar um número sem contexto (público, dias rodando, volume).

## Criativos (cursos do Leandro Ferrari, 18/11)
- Criativo **nativo** (celular, sem produção) e imagem "feia" de texto direto costumam vender mais que arte bonita. Testar os dois.
- Gravar em blocos: ganchos, meios e chamadas separados, e montar as combinações. Nomear cada anúncio com o código das partes (ex.: `G3-M1-F2`) para saber qual gancho vende.
- Teste isolado: cada criativo com pouco gasto. Se o custo por checkout já passa do custo por venda aceitável, pausar.
- Público quente primeiro (engajados 180 dias, alunos, compradores, semelhantes de compradores); frio só com os criativos que já venderam.

## Uma campanha para cada degrau (módulo de tráfego do Corredor Polonês, 18/11)
Detalhes em `docs/curso-corredor-polones-trafego-notas.md`. Com teto de R$ 50 por dia não cabem todas as fases juntas. Escolha pelo momento:
- **Dia a dia:** R$ 10 a R$ 15 em conteúdo do Wesley para seguidores e envolvimento de 90 dias (engajamento, sem botão, só feed e Reels, expansão automática desligada). Um conjunto por vídeo, excluindo de cada conjunto quem já viu 25% daquele vídeo, para a pessoa receber o próximo. O resto em uma campanha de venda.
- **Semana de abertura (Black, reabertura):** só público quente. Antes: lembrete para a lista (campanha de cliques, um conjunto por dia com orçamento total e hora de fim). Carrinho aberto: campanha de vendas com três conjuntos: lista (grupos, formulários), envolvimento de 30 dias e superengajados (interagiu em cada um dos últimos 4 dias: filtros de 4, 3, 2 e 1 dia somados).
- **Atração paga** (turbinar post para ganhar seguidor) só para produto com público diferente do perfil (Kids, Feminino). Turbinar pelo computador ou Android, "até eu pausar", e medir custo por seguidor por post.
- **Público frio** só com criativo que já vendeu no quente.

## Públicos e exclusões
- Manter criados: envolvimento com o Instagram de 3, 7, 14, 30, 60, 90, 180 e 365 dias, seguidores, superengajados 4-3-2-1, lista de alunos, compradores, lista de grupos e formulários. Nome com janela e data de criação.
- Excluir sempre quem já fez a ação, por mais de um caminho (evento, página de obrigado e lista). Aluno fora da venda do curso que já tem.
- Em campanha com orçamento na campanha, os conjuntos precisam ter públicos de tamanho parecido, senão a verba vai toda para o maior. Teste de público ou de criativo: orçamento por conjunto.

## Leitura em funil e onde mexer
Antes de propor, olhar na ordem: custo por mil, taxa de clique, taxa de carregamento (visitas à página divididas por cliques), conversão da página, custo por resultado.
| Número ruim | Onde está o problema |
|---|---|
| Custo por mil alto | Público pequeno demais ou texto que a Meta encarece |
| Taxa de clique abaixo de 1% | O anúncio |
| Carregamento abaixo de 70% | Página pesada ou hospedagem |
| Conversão da página baixa | Anúncio promete uma coisa e a página fala outra |
| Vídeo: menos de 40% param nos 3 segundos | O começo do vídeo |
| Vídeo: menos de 30% vão de 25% a 75% | O meio do vídeo |
São referências de fora. Registrar os números do WG por 30 dias e passar a usar os nossos.

## Separar para decidir (módulo de dados do Corredor Polonês, 18/11)
- Custo baixo por clique, seguidor ou cadastro não decide nada. Decide a **venda por origem**.
- Abrir o resultado sempre em quatro cortes: plataforma, público (quente ou frio e qual conjunto), anúncio e formato (Stories, feed, Reels). A média esconde o conjunto bom e o ruim.
- Ponto de partida: 70% a 80% da verba em quem já segue ou já comprou; no máximo 10% a 20% em frio, e só para aprender. Quando um conjunto sozinho rende muito mais que os outros, concentrar nele na rodada seguinte.

## Rastreio
- Conferir pixel e evento de compra em cada página e checkout (Greenn e Hotmart têm campo próprio) e o domínio na lista de permissão do pixel. Sem compra rastreada, campanha de vendas otimiza no escuro.
- UTM nos parâmetros do anúncio, não coladas no link. `utm_source=FB` sempre; `utm_medium` = nome do público; `utm_campaign` = sigla da campanha; `utm_content` = nome do anúncio com o posicionamento; `utm_term=ag-trafego` quando o agente criou. Nome trocado depois de publicar não muda a UTM: duplicar.
- Padrão de nome de campanha: sigla, fase, objetivo, quente ou frio, posicionamento, tipo de conteúdo.

## Estrutura recomendada para começar
1. Uma campanha de vendas, 1 conjunto aberto (Brasil, 25 a 55 anos), 2 a 3 anúncios.
2. Anúncios com vídeos do Wesley que já performaram no orgânico (o `analista-wg` aponta quais).
3. Oferta de entrada: o curso que mais vende no orgânico.
4. Depois de 7 dias: manter o melhor anúncio, testar 1 ângulo novo.

## Política da Meta (risco de reprovação)
Evitar: imagem de arma, sangue, briga explícita; frases que apontam característica pessoal ("você que foi assaltado"); promessa de resultado garantido. Passar no `juridico-wg`.

## Entrega
Tabela Campanha | Gasto | Vendas | Custo por venda | Decisão proposta | Motivo, e as variações novas prontas (copy, pedido de criativo, link com UTM).
