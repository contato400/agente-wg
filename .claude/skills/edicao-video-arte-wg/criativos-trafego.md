# Criativos de tráfego e variações · método do editor (19/11)

Treino do `editor-video-wg` com os livros da Mestres Play (07 Ruptura Viral, 09 Direção de Vídeo, 10 Máquina de Edição, 13 Publicidade em Vídeo, 08 Imagens Criativas, 11 Canal Dark) e os cursos do Corredor Polonês (tráfego e gravação) e de Tráfego Automatizado. Notas completas em `docs/livros-mestres/` e `docs/curso-*`.

## 1. Antes de editar: o briefing (livro 10)
Escreva no `variacoes.md` da pasta, antes de cortar qualquer coisa:
- Arquivos pelo nome, quem pediu (ex.: Diogo) e quem aprova (Victor).
- Público (frio, quente, alunos), mensagem única do vídeo e o próximo passo que ele pede.
- Formato e posicionamento (Reels e Stories 9:16; Feed 4:5).
- **O que preservar:** a fala do Wesley, o sentido, o preço e a condição que ele disse.
- Transcrição com tempos (faster-whisper, modelo small, `language="pt"`), conferida de ouvido nos trechos que viram legenda.

## 2. O vídeo de anúncio em cinco batidas (livro 13)
| Batida | 15 s | 30 s |
|---|---|---|
| Gancho | 0 a 3 s | 0 a 3 s |
| Desejo ou problema | junto com a virada | 3 a 8 s |
| Virada com o produto | antes dos 10 s | 8 a 15 s |
| Prova (real: nº de cursos, certificado, garantia, depoimento autorizado) | 1 cena | 15 a 23 s |
| Chamada única (o que faz e o que ganha) | fim | fim |
Corte curto é **montado à parte** com os melhores trechos, não é "os primeiros 15 s".

## 3. Gancho em três camadas (livro 07)
O assunto tem de ficar claro no primeiro quadro, **até sem som**:
1. **Texto na tela:** até 6 palavras, grande, dentro da área segura.
2. **Fala:** começa pelo assunto, até 3 s. Nunca "oi, pessoal" nem "nesse vídeo eu vou".
3. **Imagem:** o rosto do Wesley no trecho mais forte, zoom de 1,0 para 1,08 ou um movimento.
Tipos de gancho que servem ao WG (sempre com fala real dele, nunca inventada):
- **Pergunta direta ao público:** "Você saberia sair de um assalto?"
- **Chamado ao grupo:** "Não ignore, quem volta sozinha à noite"
- **Afirmação contra o senso comum** (só se ele disse)
- **Começar pelo trecho mais forte** da fala e voltar ao início depois (reordenar sem mudar o sentido)
- **Condição na cara** (preço ou parcela que ele falou, no topo)
Gancho que promete mais do que o vídeo entrega dá clique sem venda: proibido.

## 4. Variações: uma mudança por versão (livros 10 e 13)
- **v1 = base:** original limpo, legenda revisada, área segura, som normalizado, cartão final.
- Cada versão nova muda **uma** coisa e o nome do arquivo diz qual: `wg_<peça>_<formato>_vN-<variável>_AAAA-MM-DD.mp4` (nunca "final").
- Ordem de teste que mais rende com verba pequena: **gancho** (texto e primeiro trecho) > **tamanho** (curto x inteiro) > **legenda** (palavra a palavra x frase) > **formato** (9:16 x 4:5) > cartão final.
- Hipótese de cada versão escrita em uma linha, sem métrica inventada.
- **Comparação justa:** gancho vencedor só com mesma verba, público e período (quem compara é o Diogo). Com R$ 20 a R$ 50 por dia, mandar no máximo 3 a 4 versões por rodada, não 10.
- `utm_content` sugerido por versão (ex.: `presente-v2-gancho-pergunta`); a UTM vai nos parâmetros do anúncio, quem sobe é o Diogo.

## 5. Legenda de anúncio
- Queimada no vídeo (muita gente vê sem som), 2 a 4 palavras por vez, palavra-chave em amarelo, contorno preto grosso, centro em Y 1150 a 1300 no 9:16 (acima dos botões, abaixo do rosto).
- Fiel à fala: corrigir só erro de transcrição. Nome de produto e número conferidos na `base-produtos-wg`.
- Fonte: Inter Display Black/ExtraBold (instalada). Mínimo 60 px no 9:16.

## 6. Cartão final e pedido
- 2 a 3 s, fundo da marca, o que fazer e o que ganha ("Toque em Saiba mais e garanta os 23 treinamentos"), com o mesmo preço e prazo que o Wesley falou. Logo e "MESTRE WESLEY GIMENEZ · KRAV MAGÁ CAVEIRA".
- Em anúncio, o botão da Meta já existe: o cartão reforça, não inventa outro caminho.

## 7. O que nunca entra
- Promessa, número, prazo, prêmio ou forma de pagamento que o Wesley não disse ou que mudou (conferir na `base-produtos-wg` e na memória). Se o original fala algo errado (ex.: "boleto" quando o checkout não tem), **cortar o trecho ou avisar**, nunca mascarar com legenda diferente da fala.
- Rosto ou voz do Wesley gerados por IA em anúncio; depoimento falso; trilha sem licença comercial.
- Texto gerado dentro da imagem pela IA.
- Efeito sem função (teste "e se tirar?"): o tempo vai para outro gancho.

## 8. Conferência antes de entregar (checklist de 8 itens, livro 07)
1. Gancho claro no 1º quadro, sem som. 2. Promessa cumprida no vídeo. 3. Entrega cedo. 4. Algo muda a cada 1 a 3 s. 5. Entende-se sem som. 6. Um pedido só. 7. Plataforma: vertical, texto longe dos botões (Y 285 a 1470, X 110 a 945). 8. Verdade: nada inventado.
Mais: folha de contato (quadros a cada 2 s) olhada por você; pico de áudio abaixo de -1 dB (loudnorm I=-14 LUFS para anúncio); duração e formato conferidos com ffprobe; sincronia de legenda conferida em 3 pontos.

## 9. Receitas que funcionam neste ambiente
```bash
# transcrição com tempos por palavra
python3 -c "from faster_whisper import WhisperModel as W; m=W('small',compute_type='int8'); s,_=m.transcribe('in.mp4',language='pt',word_timestamps=True); [print(f'{w.start:.2f} {w.end:.2f} {w.word}') for x in s for w in x.words]"
# cortar trecho sem perder sincronia (recodifica)
ffmpeg -ss 12.4 -to 27.9 -i in.mp4 -c:v libx264 -preset veryfast -crf 20 -c:a aac -b:a 160k trecho.mp4
# 9:16 para 4:5 (1080x1350) com fundo desfocado
ffmpeg -i in.mp4 -filter_complex "[0:v]scale=1080:1350:force_original_aspect_ratio=increase,crop=1080:1350,boxblur=20[bg];[0:v]scale=1080:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2" -c:a copy out_4x5.mp4
# zoom lento no gancho (3 s)
ffmpeg -i in.mp4 -vf "zoompan=z='min(1+0.0009*on,1.08)':d=1:s=1080x1920:fps=30" -t 3 gancho.mp4
# legenda ASS queimada
ffmpeg -i in.mp4 -vf "ass=legenda.ass" -c:a copy out.mp4
# som de anúncio
ffmpeg -i in.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:v copy out.mp4
# folha de contato
ffmpeg -i out.mp4 -vf "fps=1/2,scale=270:-1,tile=6x3" -frames:v 1 folha.jpg
```
Para motion mais elaborado (moldura, cartões, palavra passando atrás do rosto), o motor HTML do WG (`conteudo/teste-2026-11-18/v2/`) ou Remotion, sempre com teste de 5 s antes.

## 10. Depois que a Meta rodar
- O Diogo informa retenção de 3 s, CTR e custo por compra por `utm_content`. O editor anota em `memoria/aprendizados.md`: qual gancho ganhou, com que verba e período.
- Gancho que ganhou vira base da próxima rodada; gancho que perdeu não volta.
