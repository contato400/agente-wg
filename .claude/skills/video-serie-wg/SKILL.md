---
name: video-serie-wg
description: Cria Reels narrados em série (história em partes com suspense) para o Mestre Wesley, do roteiro ao MP4 com capa, pelo motor do WG. Não use para post estático ou carrossel.
---

# Série de Reels narrados · motor do WG

Padrão aprovado pelo Victor em 18/11 ("ficou muito bom"): Parte 1 do golpe da falsa central. Tudo o que você entrega tem de estar nesse nível ou acima. Leia antes: `edicao-video-arte-wg` (padrão de produção e história em partes), `pauta-conteudo-wg` (GPEC) e `marca-limites-wg`.

## 1. Pense a série antes de gravar uma parte
- Escreva o **arco inteiro** (todas as partes) num `serie.md`: o que acontece em cada uma, o gancho que fecha cada parte e a lição do Mestre que ela ensina.
- Cada parte: 25 a 40 s, **uma** virada, termina no pior momento. A última parte resolve, junta as regras e chama para a oferta do momento (sem preço, sem prazo inventado).
- Personagem fictício e comum (Dona Maria, Seu João) com selo "HISTÓRIA BASEADA EM GOLPES REAIS". O golpe e as regras têm de ser verdadeiros (Febraban, polícia, bancos): confira numa fonte antes de escrever.
- Defesa pessoal do jeito do Wesley: evitar, não abrir, distância, voz firme, chamar ajuda, 190. Nunca enfrentar.
- Teste da avó em cada frase: quem não entende de internet entende sozinho?

## 2. Monte o JSON da parte
Motor: `conteudo/serie-golpe-central/motor/` (`serie.html` desenha, `gerar_serie.py` narra, sincroniza, mixa e renderiza). Exemplo com todos os campos: `motor/exemplo.json`.
Cada trecho tem `fala` (o que o narrador diz) e o que acontece na tela quando ele começa:
| Campo | Efeito |
|---|---|
| `legenda` | Texto grande no alto. `*palavra` vermelho, `^palavra` amarelo, `+palavra` verde. Deve repetir a fala (tudo escrito é falado) |
| `voz` | `narrador` (padrão), `tel` (voz de telefone) ou `porta` (abafada, do lado de fora) |
| `telefone` | `on` / `off` |
| `chamada` | `{"nome": "...", "icone": "bank" ou "police"}` celular tocando; atende quando a fala termina |
| `bolha` | Fala digitada na tela da ligação (use com `voz: tel`) |
| `encerrar` | Mostra "Chamada encerrada" |
| `pix` | `on`, `cancelar` (carimbo CANCELADO), `off` |
| `dedo` | Dedo pairando sobre a tela (tensão de quase confirmar) |
| `porta`, `batida`, `voz_porta` | Porta, toc-toc com tremor, fala do lado de fora digitada |
| `regra`, `regra_titulo` | Cartão amarelo "REGRA DO MESTRE" |
| `tensao` | Tremor, flash vermelho, coração, trilha cai |
| `escurecer` | Escurece o celular para o momento da lembrança |
| `lista` + `item` | Lista de regras com check, um item por trecho |
| `final` + `mostrar_chamada` | Cartão final: selo, pergunta e botão "Comente CAVEIRA para ver a parte X" |
| `antes`, `pausa`, `ritmo` | Ajuste fino de tempo (segundos) e velocidade da fala |
Mais `capa: {selo, titulo, faixa, quadro}` para a capa. Desde 20/11: `pix_tela: {para, valor}` no topo do JSON troca o texto da tela do Pix (antes era fixo "CONTA SEGURA da polícia"); `icone: "user"` na chamada mostra uma pessoa (número desconhecido). Peça avulsa no formato "alerta" usa `selo: "ALERTA"` e o mesmo motor (exemplo: `conteudo/2026-11-20/alerta-falso-sequestro.json`). O render inteiro leva mais de 2 min: rode em segundo plano. Sem chave da API do Gemini a rotina narra com a Piper; avise o Victor. Limites atuais: um `voz_porta` por vídeo (o último vence); até 3 bolhas por ligação; conferir tempos específicos com `--quadros --em=t1,t2`.

## 3. Produza e confira (nada vai ao Victor sem isso)
1. `python3 gerar_serie.py parte.json --quadros` e **olhe a folha de conferência** (Read): legenda inteira, nada fora da área segura (Y 285 a 1470, X 110 a 945, medidas do Reels em `edicao-video-arte-wg`), nada sobreposto, português certo. Corrija o JSON e repita.
2. `python3 gerar_serie.py parte.json --capa` e olhe a capa (título de 2 a 4 palavras enormes, faixa amarela com o tema).
3. `python3 gerar_serie.py parte.json` para o MP4. Confira duração (25 a 40 s) e volume (`ffmpeg -af volumedetect`, pico perto de -1 dB).
4. Entregue: MP4, capa, legenda pronta (sem travessão, com "Comente CAVEIRA para ver a parte X"), horário sugerido.

## 4. Nível 2: imagens de cena (ideia do Victor, 18/11)
Para deixar o vídeo mais rico, o fundo de cada cena pode ser uma imagem gerada no Gemini (Nano Banana), no ChatGPT ou no Flow, pela conta do Victor no Chrome dele, ou montada no Canva. Exemplos: mãos de uma senhora segurando o celular na cozinha, porta de apartamento vista de dentro à noite, moto parada na calçada. Regras: nenhum rosto reconhecível nem pessoa real, nada de texto dentro da imagem (o texto entra no motor), 1080x1920, tom escuro igual ao do motor, uma camada de pedido por vez. A imagem entra atrás do celular ou da porta, com zoom lento.

## 5. Erros que o Victor já cobrou
- Vídeo só com placas e sem narração ("simples e feio", "pai").
- Pedido sem sentido para quem assiste ("Comente SEGURA").
- Esperar o Victor pensar: você pesquisa, decide o formato, faz, confere e entrega pronto.
