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

## Ferramentas (começar pelo que já temos)
O Victor tem o **Google AI Pro** assinado (até 2027). Não há conector do Gemini aqui: o Claude usa pelo Chrome do Victor (gemini.google.com e Flow), com a conta dele já logada, e baixa o resultado para editar. Gerar com IA nunca substitui o Wesley real em vídeo de venda; serve para cena de apoio, fundo, capa e ilustração.

| Precisa de | Grátis | Pago (só com OK do Victor) |
|---|---|---|
| Cortar, legendar, juntar, faixa | ffmpeg e Python nesta sessão | |
| Arte e carrossel | HTML para PNG, Canva conectado | |
| Imagem nova (foto, cena) | **Google AI Pro do Victor (já assinado):** Nano Banana no Gemini; ChatGPT grátis para imagem com texto | |
| Vídeo gerado por IA | **Google AI Pro do Victor:** Veo no Gemini e no Flow (créditos do plano) | |
| Voz e avatar | não usar: o WG vende o Wesley real | |
