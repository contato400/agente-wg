# Livro 17 · Três Sistemas com uma IDE de IA (TRAE, Tiago Lemos) · notas e aplicação no WG

Lido em 18/11/2026 (16 capítulos). O livro usa o TRAE para construir um gerador de propostas, uma agenda e um CRM com Supabase. Para o WG valem o método e as travas, não a ferramenta.

## O que o livro ensina
- **Divisão de trabalho:** você especifica, revisa, testa e decide; o agente planeja, escreve e roda. Mudar o rumo custa menos no plano.
- **Cinco testes escritos antes** de qualquer sistema (clique, dado errado ou vazio, celular, conteúdo que tem de estar certo, o que não pode acontecer), cada um com ação e resultado esperado que outra pessoa marca sim ou não.
- **"Prévia bonita ainda não é sistema pronto":** botão sem ação, tela quebrada no celular e dado que some ao recarregar só aparecem testando.
- **Pedido estruturado em cinco blocos** num arquivo do projeto: o que é e o que fica de fora, telas, modelos com campos e variáveis (um nome só para cada variável), regras, critérios de aceite e design.
- **Agentes próprios com instrução em cinco partes**, só as ferramentas que usam e um "nunca faça"; **o agente não pode se declarar aprovado**; **revisor só com leitura** (revisor com edição muda arquivo depois da revisão); dupla Revisor e Corretor.
- **Modelos com método:** laboratório com dois modelos, cinco critérios, saldo antes e depois; modelo externo só com chave com limite de gasto.
- **Regras de parada** coladas em todo pedido grande: plano aprovado antes; uma etapa por vez, parando para dizer o que fez, arquivos mudados, como testar e o que falta; não apagar, não instalar fora do plano, não conectar integração sem pedido; "se disse que testou, mostre o resultado"; não publicar.
- **Pontos de restauração** (Git) antes de cada mudança grande e a cada tela aprovada; uma correção por vez.
- **Banco e segredos:** separar a chave que pode ir ao navegador da que nunca vai; ler o SQL com o agente antes de executar; cada usuário vê só o que é seu; aceite com duas contas.
- **Referências visuais:** uma imagem por pedido com a regra que a tela obedece; layout de terceiros só com licença conferida e com marca, textos e imagens próprios.

## O que muda no Agente WG
| Lição | Ajuste |
|---|---|
| Agente não se declara aprovado | Na ficha de cada agente: "nunca marque nada como aprovado; só Victor ou Wesley aprovam" (a fila já exige, fica explícito) |
| Revisor só lê | `juridico-wg` revisa sem editar o arquivo de quem propôs; devolve o texto sugerido |
| Regras de parada | Pedido grande do Victor numa sessão (página nova, funil, mudança no Worker): plano primeiro, etapa por etapa, prova do teste, nada publicado |
| Cinco testes antes | Página nova do ofertas nasce com os cinco testes escritos (clique no botão, celular, preço certo, link com UTM, o que não pode aparecer: total parcelado, preço errado) |
