# Livro 09 · Direção de Vídeo com IA (Tiago Lemos) · notas e aplicação no WG

Lido em 18/11/2026 (18 capítulos; estrutura, listas de conferência e erros comuns; os capítulos 1 a 7 com mais atenção). É o maior livro (474 páginas): direção de vídeo gerado (Veo, Flow e afins), do plano ao curta de 60 s. Notas com palavras próprias.

## O que o livro ensina
- **O tempo acrescenta movimento, ritmo e som.** "Anime esta imagem" deixa o modelo decidir câmera e corte. Antes de gerar: o que se move, quanto dura, o que se ouve.
- **Quatro papéis:** o prompt, o modelo (uma linha com data e plano B, porque muda), as referências (imagem aprovada de cada personagem, lugar e objeto) e você. O projeto mora numa pasta sua, não no histórico da ferramenta.
- **Custo antes de gerar:** ler o preço por segundo na tela, converter em reais, **planilha de tentativas** (uma linha por geração: modelo, porta, prompt, custo, defeito, decisão), **teto e regra de parada**, rascunho em resolução baixa e final só do plano aprovado, orçamento pelo custo por segundo aprovado (somando as falhas).
- **Pedido em camadas:** uma frase nova por geração, no mesmo modelo e configuração; descrever **o que a câmera vê, no afirmativo** (pedido negativo faz aparecer o que foi negado).
- **Ficha de plano:** seis eixos da imagem, quatro do tempo, elenco na ordem de envio, travas; **um movimento de câmera por plano**, com velocidade e alvo; fala com janela de começo e fim e meio segundo livre; o que cabe em cada duração.
- **Escada de controle (portas):** texto para vídeo (explorar, plano sem personagem que volta), imagem para vídeo (o texto descreve só o movimento), quadro inicial e final (transformação, loop, encadeamento sem salto), elenco de referências (personagem que volta), vídeo para vídeo, voz e diálogo. Escolher o degrau mais baixo que resolve.
- **Primeiro quadro no estado de antes da ação;** tudo o que o pedido cita precisa estar no quadro ou no elenco; o último quadro de um clipe vira o primeiro do seguinte.
- **Linguagem de cinema:** repertório de movimentos de câmera, plano, ângulo, lente, luz, cor; história curta com começo, virada e fim; roteiro, decupagem e storyboard; montagem com som e retenção.

## O que muda no Agente WG
| Lição | Ajuste |
|---|---|
| Vídeo gerado só sem pessoa | Decisão de 14/10 continua: Flow e Veo (Google AI Pro do Victor) só para b-roll e animação sem rosto (rua à noite, carro estacionado, celular na mão de costas, porta de casa) |
| Ficha de plano e custo antes | Pedido de b-roll do `social-media-wg` sai com ficha curta: o que se vê, um movimento de câmera, duração, som, e o custo estimado; o Victor gera pelo Chrome dele |
| Planilha de tentativas | Pasta do projeto com uma linha por geração; nada fica só no histórico do Flow |
| Afirmativo e uma camada por vez | Regra no `edicao-video-arte-wg` para prompts de vídeo e imagem |
