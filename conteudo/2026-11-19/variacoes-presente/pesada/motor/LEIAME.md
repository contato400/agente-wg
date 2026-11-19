# Motor de edição pesada WG (troca de cenário + efeitos 3D na fala)

## v2 (19/11, 6 variações completas) · ~2,5 a 3 min por vídeo de 22 s em 2 núcleos
```bash
cd conteudo/2026-11-19/variacoes-presente/pesada/motor
python3 -I configs.py <pasta_de_trabalho>          # gera cfg_A1..cfg_B3.json
nohup python3 -I motor.py cfg_A1.json > log.txt 2>&1 < /dev/null &
```
- Máscara bruta uma vez por vídeo (`masks_raw`) e preparo uma vez (`prep`: fechamento, erosão, desfoque, escala 86% e borda de luz em meia resolução, ampliados na composição). As 6 variações usam o mesmo preparo.
- Cenários `tatame`, `rua`, `estudio` em `cenarios.py` (camadas prontas + parallax, ~0,05 s por quadro).
- Efeitos em `cena.html`: `split`, `marquee`, `tilt` (atrás); `card`, `big`, `stamp`, `coin`, `gift` (frente ou atrás, campo `layer`). Cartão final entra sozinho depois da fala (`card: 2.5`).
- Aprendido: palavra gigante atrás da cabeça (`tilt` grande) some atrás do rosto, use `split` nas laterais; caixa de presente vai atrás dele (`layer: bg`) para não cobrir o rosto; moeda tem de assentar de frente (girando sem parar, o texto aparece espelhado); PNG opaco (cartão final) vem sem canal alfa.
- Limite conhecido: mão em movimento rápido perto da borda do quadro mostra um pedaço do fundo antigo por 2 a 3 quadros (borrão da mão no original).


Testado no piloto `../piloto_A1.mp4` (19/11). Sem Higgsfield nem IA generativa: rosto e voz do Wesley são os reais.

## Arquivos
- `mascara.py`: recorta o Wesley quadro a quadro (MediaPipe Tasks, modelo `modelos/selfie_multiclass_256x256.tflite`; `mp.solutions` não existe na versão 0.10.32 instalada). Suaviza no tempo para não tremer. 7,4 s levam ~36 s.
- `cenarios.py`: cenários em Python/OpenCV (camadas desenhadas uma vez + parallax, neon piscando, sacos balançando, feixe de luz, poeira com profundidade, vinheta). ~0,05 s por quadro. Hoje: `tatame`. Novos cenários entram como classe no dicionário `SCENES`.
- `cena.html`: elementos 3D em CSS (perspective) desenhados no Playwright: `split` (número grande ladeando a cabeça, atrás do Wesley), `marquee` (palavra vazada passando atrás dele), `card` (cartão 3D que gira/aproxima, na frente), legenda fiel e a faixa que cobre a faixa antiga. Camada `bg` = atrás da pessoa; `fg` = na frente. Quadro igual ao anterior não é fotografado de novo.
- `motor.py config.json`: junta tudo. Wesley a 86% preso na base (abre espaço em cima para os elementos), borda com fechamento + erosão 5 px + desfoque 2,2 (sem halo), luz de recorte vermelha, câmera com push lento + punch-in nos picos (limitado a 1,08 em volta de Y 1430 para a faixa antiga nunca escapar da faixa nova), whip com desfoque de movimento nos cortes, efeitos sonoros sintetizados (whoosh, hit, pop; sem licença de terceiros), loudnorm I=-14, folha de quadros.
- `piloto_A1.json`: exemplo de configuração (tempos tirados de `../base.mp4.words.json`).

## Como rodar
```bash
cd conteudo/2026-11-19/variacoes-presente/pesada/motor
python3 -I motor.py piloto_A1.json   # ~15 min para 7 s neste servidor (2 núcleos); rodar em segundo plano
```
Tempo vem quase todo da composição em 1080x1920 (fechamento morfológico e desfoques). Para vídeo de 22 s, contar ~45 min por variação.

## Regras aprendidas no piloto
- Desenhar o cenário no canvas do navegador com `filter: blur` leva ~11 s por quadro: inviável. Cenário vai em Python; navegador só para texto e 3D em CSS.
- Todo `ffmpeg` chamado de script em segundo plano leva `-nostdin` (sem isso ele trava esperando o teclado).
- A faixa antiga fica queimada no peito: a faixa nova cobre Y 1255 a 1595; com Wesley a 86% o texto da faixa fica entre Y ~1290 e 1465 (área segura).
- Rampa de 40 px na borda do quadro original reduzido, senão aparece a quina do ombro cortado.

## Vídeo B refeito (19/11 18h22)
- Corte próprio `../condB.mp4` (`_projeto/cut.py` com S5x,S4a,S4b,S6,S2a,S2b,S7): condição, Pix parcelado, 23 treinamentos, 12,5 s de fala + 2,5 s de cartão.
- `configsB.py` gera `cfgB_B1..B3.json`. Cenários novos `garagem`, `sala`, `perigo`; efeito novo `ccard` (cartão de crédito 3D que leva um X no tempo `tx`).
- Moeda agora entra girando só até 80 graus (não mostra o verso espelhado); texto `big` sai sem zoom grande (não corta no topo).
