---
name: edicao-video-arte-wg
description: Padrão de edição de vídeo (Reels, Stories, criativos) e de arte (carrossel, estático) do Mestre Wesley Gimenez, com área segura, rotina para gastar menos e como copiar um estilo de referência. Usar ao editar, cortar, legendar ou montar qualquer vídeo ou arte do WG.
---

# Edição de vídeo e arte WG

Fontes: kit do grupo (Guias 01, 03 e 04, nov/2026) e o padrão usado nos vídeos da Black (`kairos/black-2026-videos-editados-03-nov.md`, `kairos/criativos-trafego-04-nov.md`). Tudo vai para aprovação antes de publicar. Sem travessão nos textos. Temas dentro de `marca-limites-wg`.

## Área segura (vale para todo vídeo e toda arte)
| Peça | Tamanho | Área segura |
|---|---|---|
| Reels, Stories, criativos verticais | 1080x1920 (9:16) | 1080x1350 centralizada: Y de 285 a 1635; X de 110 a 970 (860 px úteis); centro em X 540, Y 960 |
| Carrossel e post de feed | 1080x1350 (4:5) | ~110 px de margem em volta |
- Texto, números, logo, rosto, botão e legenda ficam **dentro** da área segura. Fundo e textura podem ocupar o quadro todo.
- Mesmo posicionamento em todas as cenas (nada "pula").
- Não coube? Reduz a escala ou reorganiza; nunca passa da margem.
- As guias nunca aparecem no arquivo final.

## Padrão do WG (já aprovado)
- Saída: 1080x1920, H.264, som normalizado, sem marca d'água.
- Legenda gravada fiel à fala, dentro da área segura.
- Faixa de campanha no peito ou no topo, entrando depois do gancho (~2,8 s), sem cobrir rosto.
- Nunca inventar fala nem texto que o Wesley não disse. Cortar só o que ficou desatualizado (data, nome de campanha antiga, número que mudou) e conferir na transcrição.
- Conferir quadro a quadro antes de entregar (frames do ffmpeg no começo, no meio e no fim de cada corte).
- Original nunca é alterado: sempre editar uma cópia.

## Rotina para cada vídeo (gastar menos)
1. Um vídeo por vez, com o estilo, o roteiro e a pasta dos originais já ditos.
2. Pedido específico: "na v3, de 0:42 a 0:48, troque a legenda", nunca "revise o vídeo".
3. Corrigir por trecho, não refazer tudo.
4. Aprovado? Perguntar: "isso vale para o próximo vídeo desse estilo?". Se sim, registrar **nesta skill**. Se for preferência geral do Victor, na memória. Se for só deste vídeo, não registrar.
5. Andamento de um vídeo longo fica anotado na pasta do vídeo, não na skill.

## Copiar um estilo de referência
1. Receber o vídeo de referência (só como inspiração; nunca copiar o conteúdo de alguém).
2. Extrair quadros (ffmpeg, 1 a 2 por segundo) e analisar: duração dos planos, tipo de corte, texto, cor, câmera, música.
3. Fazer um piloto de 10 a 15 s com um assunto do Wesley no mesmo ritmo, com a marca do WG.
4. Ajustar por trecho. Aprovado? Anotar as regras do estilo aqui, numa seção própria.

## Carrossel e arte
1. Tema e ideia de cada página. **Aprovar o texto antes da arte**, página por página.
2. Layout dentro do grid, com a identidade do WG (vermelho, preto e branco da Black; logo Caveira).
3. Caminho preferido: montar em HTML e exportar PNG 1080x1350 (texto sai certo) ou usar o Canva conectado (criação em massa para muitas variações). Imagem gerada só quando precisar de foto que não existe.
4. Ajustar por página. Conferir no celular.

## Roteiro, gravação e edição no celular (módulo de gravação do Corredor Polonês, 18/11)
Detalhes em `docs/curso-corredor-polones-base-notas.md`.
- **Roteiro:** um vídeo, uma mensagem. Início com a promessa dita com todas as letras (desejo, identificação ou quebra de objeção), meio em três blocos curtos (contexto, o como, conclusão), fim com um pedido só.
- **Pedido para o Wesley antes de gravar:** olhar na lente, variar o tom, pausa antes da frase importante, mãos apoiando a fala. Se travar, segurar um objeto (luva, aparador).
- **Enquadramento:** fechado no rosto para a frase de impacto; detalhe na mão ou na pegada; médio até o joelho para mostrar a técnica; de baixo para dar força. Trocar de ângulo no mesmo lugar em vez de trocar de cenário.
- **Luz:** principal de lado a 45 graus (janela serve), uma fraca do outro lado, uma por trás para soltar do fundo.
- **Edição:** trechos na ordem, cortar só o que usa, zoom lento em cena de câmera parada, áudio da próxima cena entrando um instante antes da imagem, música bem baixa (2 a 5 de 100 no CapCut) e efeito sonoro perto de 10, só no momento forte. A voz do Wesley sempre acima de tudo.

## Regras dos livros da Mestres Play (18/11)
Notas: `docs/livros-mestres/` (10 Máquina de Edição, 13 Publicidade em Vídeo, 09 Direção de Vídeo, 08 Imagens Criativas).
- **Original nunca é alterado.** Pastas: originais, assets, projeto, entregas.
- **Amostra de 8 s aprovada pelo Victor** antes de editar o vídeo inteiro. V01 simples: vertical, rosto na área segura, sem erros nem pausas longas, legenda revisada; nada cortado que mude o sentido.
- **Motion e arte não acrescentam promessa:** nenhum número, prazo ou resultado que o Wesley não falou.
- **Texto nunca gerado dentro da imagem pela IA;** entra no editor, na área segura.
- **Cara de IA:** trocar "bonito, profissional, cinematográfico" por decisões que se veem (luz, lente, cor, lugar); revisar a arte procurando pele de plástico, mãos e textos estranhos, simetria perfeita demais.
- **Prompt de imagem ou vídeo afirmativo,** uma camada nova por geração, um movimento de câmera por plano; custo lido antes de gerar; uma linha por tentativa na planilha da pasta do projeto.
- **Pessoa:** nunca Wesley, aluno ou "cliente" gerados por IA (decisão de 14/10). IA só para b-roll e animação sem rosto.
- **Anúncio curto em cinco batidas** (gancho, problema ou desejo, virada com o produto, prova, chamada única) e roteiro em colunas: tempo, imagem, texto na tela, som.
- **Variações:** base aprovada + uma mudança por versão. Nome: `wg_peça_formato_vN-variavel_AAAA-MM-DD`, nunca "final".
- **Trilha só com licença comercial** (biblioteca do CapCut para uso comercial ou da Meta) ou sem trilha.

## Ferramentas (começar pelo que já temos)
O Victor tem o **Google AI Pro** assinado (até 2027). Não há conector do Gemini aqui: o Claude usa pelo Chrome do Victor (gemini.google.com e Flow), com a conta dele já logada, e baixa o resultado para editar. Gerar com IA nunca substitui o Wesley real em vídeo de venda; serve para cena de apoio, fundo, capa e ilustração.

| Precisa de | Grátis | Pago (só com OK do Victor) |
|---|---|---|
| Cortar, legendar, juntar, faixa | ffmpeg e Python nesta sessão | |
| Arte e carrossel | HTML para PNG, Canva conectado | |
| Imagem nova (foto, cena) | **Google AI Pro do Victor (já assinado):** Nano Banana no Gemini; ChatGPT grátis para imagem com texto | |
| Vídeo gerado por IA | **Google AI Pro do Victor:** Veo no Gemini e no Flow (créditos do plano) | |
| Voz e avatar | não usar: o WG vende o Wesley real | |
