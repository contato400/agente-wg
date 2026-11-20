---
name: edicao-video-arte-wg
description: Aciona quando for editar, cortar, legendar ou montar vídeo (Reels, Stories, criativo) ou arte (carrossel, estático, story) do Wesley, ou criar variação de criativo para o tráfego. NÃO aciona para decidir o que postar (estrategia-instagram-wg) nem para série narrada (video-serie-wg).
---

# Edição de vídeo e arte WG

Fontes: kit do grupo (Guias 01, 03 e 04, nov/2026) e o padrão usado nos vídeos da Black (`kairos/black-2026-videos-editados-03-nov.md`, `kairos/criativos-trafego-04-nov.md`). Tudo vai para aprovação antes de publicar. Sem travessão nos textos. Temas dentro de `marca-limites-wg`.

**Criativo de anúncio ou variação para o tráfego:** leia também `criativos-trafego.md` (nesta pasta): briefing, cinco batidas, gancho em três camadas, uma mudança por versão, legenda de anúncio, checklist de 8 itens e receitas de ffmpeg e faster-whisper que funcionam aqui.

## Área segura (vale para todo vídeo e toda arte)
| Peça | Tamanho | Área segura |
|---|---|---|
| Reels, Stories, criativos verticais | 1080x1920 (9:16) | 1080x1350 centralizada: Y de 285 a 1635; X de 110 a 970 (860 px úteis); centro em X 540, Y 960 |
| Carrossel e post de feed | 1080x1350 (4:5) | ~110 px de margem em volta |
### Medidas oficiais do Reels (referência do Victor, 18/11 · `docs/referencias/reels-safe-zone-9x16.jpg`)
- Tamanho 1080x1920, até 3 minutos.
- **Topo:** 220 px livres (nome do perfil, áudio, botão de voltar).
- **Base:** 450 px livres (foto do perfil, nome, legenda do post, música). Nada importante abaixo de **Y 1470**.
- **Laterais:** 35 px de margem.
- **Coluna dos botões** (curtir, comentar, enviar): faixa de 100 px na direita, além da margem, da altura de Y ~1150 até a base. Nessa altura, nada importante depois de **X 945**.
- **Regra prática do WG daqui em diante (soma a nossa margem com a do Instagram):** texto, rosto, número e botão entre **Y 285 e 1470** e entre **X 110 e 945**. Pedido de ação (ex.: "Comente CAVEIRA") fica acima de Y 1400.
- As peças já prontas (Partes 1 a 5 da série) ficam como estão; a regra vale para as próximas.

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

## Padrão de produção do WG (nível mínimo de entrega, 18/11)
O Victor reprovou o primeiro teste ("simples e feio"). A régua a partir de agora é o v2 em `conteudo/teste-2026-11-18/v2/` (código reaproveitável: `reel.html` + `gerar.py`). Nada abaixo disso vai para o Victor.
- **Cena, não slide:** cada vídeo tem um objeto que conta a história (celular tocando, conversa sendo digitada, notificação chegando, carimbo, mapa, porta). Texto solto em fundo liso só como apoio.
- **Algo muda a cada 1 a 3 segundos:** palavra entrando uma a uma, digitação, virada de página, zoom lento, tremor na tensão, flash no impacto.
- **Som em cada gesto** ("o som dá o ritmo"): tecla em cada letra digitada, toque no celular, plim na notificação, sopro na troca de legenda, batida no impacto, coração na tensão, subida antes da virada, pop no botão final. Trilha de fundo feita por nós (sintetizada no `gerar.py`) ou com licença comercial; volume baixo, cai na tensão.
- **Legenda grande no alto da área segura,** 60 a 70 px, até 3 linhas, palavra-chave em vermelho ou amarelo. Letra mínima de 34 px dentro de qualquer elemento.
- **Autoexplicativo:** quem assiste sem som e sem conhecer o Wesley entende tudo. Pedido final diz o que fazer e o que ganha.
- **Narrado sempre** (pedido do Victor, 18/11): tudo que aparece escrito também é falado. **Voz padrão desde 19/11: Gemini TTS** (aistudio.google.com/generate-speech, conta Luis corinthiano, modelo Gemini Flash TTS, voz Koda; o Victor achou muito melhor que a Piper). Na rotina: `rotinas/voz.sh "frase" saida.wav Koda` (serviço /voz no Cloudflare com a chave GEMINI_KEY; testado 20/11, 24 kHz mono). Só se o voz.sh falhar a peça usa a Piper, e o relatório diz que caiu na reserva. A Piper fica só como reserva. Antes era: DaVinci (ElevenLabs V3, conta do Luis corinthiano, voz Fernando Borges em português, 25 créditos por geração) quando o Victor puder baixar o áudio; sem isso, voz Piper `pt_BR-faber-medium` local (`v2/gerar3.py`). Cada frase vira um trecho e o vídeo é recalculado pela duração da fala; fala de golpista ou de telefone com filtro de telefone; trilha e efeitos abaixo da voz.
- **Todo Reels sai com capa** 1080x1920 (gerada pelo `v2/capa.py`): selo da parte, frase de 2 a 4 palavras em letra enorme, o objeto da cena e o tema numa faixa amarela; tudo dentro do recorte do perfil (Y 240 a 1680).
- **Fecho com marca:** "MESTRE WESLEY GIMENEZ · KRAV MAGÁ CAVEIRA" discreto no fim.
- **Conferência obrigatória:** gerar 6 a 8 quadros de conferência, montar uma folha de contato, olhar e corrigir antes de renderizar o vídeo todo; conferir o volume (pico abaixo de -1 dB).

## Formato "história em partes" (o que está viralizando, pedido do Victor em 18/11)
- **Parte 1:** história curta de um caso comum (golpe, assalto, briga, acidente) com personagem e situação que o público reconhece, montada em tensão crescente e **cortada no pior momento**. Fecho: "FIM DA PARTE 1 · O que ela fez em seguida... · Comente CAVEIRA para ver a PARTE 2".
- **Parte 2:** postada 24 a 48 h depois, abre com "PARTE 2" e um resumo de 2 s, mostra o que a pessoa fez e **a lição do Mestre** (prevenção, sair, pedir ajuda), e termina chamando para seguir ou para o curso da dor.
- **Honestidade:** personagem inventado leva sempre o selo "HISTÓRIA BASEADA EM GOLPES REAIS" (ou "SITUAÇÃO ILUSTRATIVA"); nunca apresentar como caso verdadeiro, nunca nome ou imagem de vítima real, nunca resultado inventado ("salvou R$ 8 mil").
- **Temas por dor** (um por produto): golpe e Pix (Vida Segura), assalto na rua ou no carro (Vida Segura, DPC), mulher sozinha à noite (Contra Ataque Feminino), filho e bullying (Kids, dentro dos limites), briga no trânsito (Prevenção de Confrontos).

## Regras dos livros da Mestres Play (18/11)
Notas: `docs/livros-mestres/` (10 Máquina de Edição, 13 Publicidade em Vídeo, 09 Direção de Vídeo, 08 Imagens Criativas).
- **Original nunca é alterado.** Pastas: originais, assets, projeto, entregas.
- **Amostra de 8 s aprovada pelo Victor** antes de editar o vídeo inteiro. V01 simples: vertical, rosto na área segura, sem erros nem pausas longas, legenda revisada; nada cortado que mude o sentido.
- **Motion e arte não acrescentam promessa:** nenhum número, prazo ou resultado que o Wesley não falou.
- **Texto nunca gerado dentro da imagem pela IA;** entra no editor, na área segura.
- **Cara de IA:** trocar "bonito, profissional, cinematográfico" por decisões que se veem (luz, lente, cor, lugar); revisar a arte procurando pele de plástico, mãos e textos estranhos, simetria perfeita demais.
- **Prompt de imagem ou vídeo afirmativo,** uma camada nova por geração, um movimento de câmera por plano; custo lido antes de gerar; uma linha por tentativa na planilha da pasta do projeto.
- **Pessoa:** aluno, "cliente" ou depoimento nunca gerados por IA. **Clone do Wesley** (aprovado em 18/11 por ele e pelo Victor) só com o avatar e a voz oficiais da conta dele, em conteúdo de engajamento e Reels de teste, sempre com rótulo de IA, no jeito dele de falar (nada destoante), **nunca em demonstração de técnica** (técnica é gravação real). Fora isso, IA só para b-roll e animação sem rosto.
- **Anúncio curto em cinco batidas** (gancho, problema ou desejo, virada com o produto, prova, chamada única) e roteiro em colunas: tempo, imagem, texto na tela, som.
- **Variações:** base aprovada + uma mudança por versão. Nome: `wg_peça_formato_vN-variavel_AAAA-MM-DD`, nunca "final".
- **Trilha só com licença comercial** (biblioteca do CapCut para uso comercial ou da Meta) ou sem trilha.

## Vídeo "como usar" com a tela real (aprovado pelo Victor em 18/11: "ficou brabo demais")
Para explicar uma página, um guia ou um passo a passo da Academia, mostre a tela de verdade num celular, com narração e legenda grande. Modelo pronto: `conteudo/guia-12-semanas/video/` (`captura.js` tira as telas, `roteiro.json` tem as falas e legendas, `montar.py` narra, monta e exporta).
1. **Telas reais:** Playwright no celular (390x620, dpr 2). Em cada passo, role até o elemento, tire a tela e guarde onde o dedo toca (centro do botão). Espere o aviso verde sumir antes da próxima tela.
2. **Roteiro:** uma cena por passo, fala curta que diz o que fazer e o que a pessoa ganha; legenda com `*vermelho*`, `^amarelo` e `+verde` (só no fim da frase).
3. **Montagem:** fundo escuro do WG, selo "GUIA DE TREINO CAVEIRA" em Y 300, legenda em Y 370, celular de 580x922 em X 250 e Y 560 (dentro da área segura), círculo amarelo de toque na segunda metade da cena, zoom lento, cartão final com o pedido de ação.
4. **Voz:** piper `pt_BR-faber-medium` (`--length-scale 0.95`); áudio com loudnorm (pico perto de -1,5 dB).
5. **Conferir:** folha de quadros a cada 5 s (`ffmpeg -vf fps=1/5,tile=6x2`) antes de mandar; procurar asterisco sobrando, aviso fora de hora e texto fora da área segura.
6. **Entregar:** MP4 de 45 a 60 s e capa (título de 2 a 3 palavras enormes + faixa amarela).

## Ferramentas (começar pelo que já temos)
O Victor tem o **Google AI Pro** assinado (até 2027). Não há conector do Gemini aqui: o Claude usa pelo Chrome do Victor (gemini.google.com e Flow), com a conta dele já logada, e baixa o resultado para editar. Gerar com IA nunca substitui o Wesley real em vídeo de venda; serve para cena de apoio, fundo, capa e ilustração.

| Precisa de | Grátis | Pago (só com OK do Victor) |
|---|---|---|
| Cortar, legendar, juntar, faixa | ffmpeg e Python nesta sessão | |
| Arte e carrossel | HTML para PNG, Canva conectado | |
| Imagem nova (foto, cena) | **Google AI Pro do Victor (já assinado):** Nano Banana no Gemini; ChatGPT grátis para imagem com texto | |
| Vídeo gerado por IA | **Google AI Pro do Victor:** Veo no Gemini e no Flow (créditos do plano) | |
| Voz e avatar | não usar: o WG vende o Wesley real | |


## Voz Gemini: cuidados (20/11)
- Não mandar "estilo" no pedido de voz: o Gemini às vezes lê a instrução em voz alta no começo do áudio. Mandar só o texto.
- A cota grátis acaba depois de 10 a 15 falas no dia (erro 429). Gerar só o que vai ser usado e guardar os arquivos.
- Conferir cada áudio com faster-whisper antes de publicar (procurar frase que não é do roteiro no começo).


## Imagens: sempre pelo ChatGPT (regra fixa do Victor, 20/11)
- Toda imagem (banner, story, arte, capa, criativo) é pedida ao ChatGPT na conversa 'Victor. A' (Chrome do Victor Augusto). O pedido leva: tamanho exato em px de onde vai ser usada (ex.: Academia 1920x1080 desktop e 600x1050 celular, JPG até 800 KB; story 1080x1920), textos exatos entre aspas, margem de segurança e o estilo das artes da campanha.
- Antes de pedir, conferir o tamanho certo no lugar onde a imagem vai (abrir a tela da plataforma).
- O ChatGPT não deixa o arquivo sair direto: o Victor arrasta para o chat; daí o agente sobe na plataforma.
- Conferir o texto da arte (preço, datas, condições) contra a página antes de usar.
