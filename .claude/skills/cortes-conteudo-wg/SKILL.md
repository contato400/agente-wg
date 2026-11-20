---
name: cortes-conteudo-wg
description: Aciona quando a mídia (social-media-wg) for transformar live, aula da Academia ou vídeo antigo do Wesley (Drive ou YouTube) em cortes verticais com gancho, legenda, título e roteiro do corte, ou montar o conteúdo diário dos grupos de WhatsApp (1 por dia, tipos e horários). NÃO aciona para vídeo narrado pelo motor (video-serie-wg), para decidir tema e oferta da semana (calendario-conteudo-wg) nem para régua de campanha nos grupos (wg-regua-grupos).
---

# Cortes do Wesley e conteúdo diário dos grupos

Dono: `social-media-wg` (a mídia). Por que existe (S1, auditoria de 19/11): o Wesley quase não consegue gravar e o saldo de seguidores está negativo desde 14/11. Há horas de fala real dele no Drive (inclui a live da Black do ano passado, cerca de 2 h) e no YouTube (canal de ~3,31 mi). Decisão do Victor (19/11): usar esse material. Leia também `edicao-video-arte-wg` (área segura, padrão de produção, receitas de ffmpeg e faster-whisper em `criativos-trafego.md`), `pauta-conteudo-wg` (GPEC) e `marca-limites-wg`.

## 1. Regras que não se quebram
- **Só fala real do Wesley.** Nunca inventar fala, nunca completar frase com voz clonada ou IA, nunca juntar dois trechos de forma que ele pareça dizer algo que não disse.
- **Sem tirar do contexto.** Ouça 60 s antes e 60 s depois do trecho. Se o sentido depende do que veio antes (uma pergunta, uma condição, "nesse caso"), ou o corte leva esse pedaço, ou o trecho não serve.
- **Reordenar só sem mudar o sentido:** pode começar pelo trecho mais forte e voltar ao início (regra da `criativos-trafego.md`), desde que a ideia continue a mesma.
- **Nada desatualizado:** cortar ou descartar trecho com data, preço, bônus, nome de campanha antiga ou número que mudou. Preço e prazo de hoje só da `base-produtos-wg`, e nunca colocados na boca dele.
- **Técnica de defesa:** o corte mostra a técnica como ele ensinou, inteira. Nada que pareça incentivar briga ou reação a assalto armado.
- **Pessoas no vídeo:** aluno ou plateia identificável só com autorização; criança nunca (`marca-limites-wg`).
- **Honestidade de data:** se o trecho é de live ou aula antiga e o assunto depende da época, selo pequeno "Trecho de live de <mês/ano>".
- **Original nunca é alterado.** Pastas: `conteudo/cortes/<material>/originais`, `transcricao`, `cortes`, `entregas`.
- Toda imagem (capa, arte de grupo) é pedida ao ChatGPT (regra fixa de 20/11). O vídeo é o Wesley real; a legenda queimada não é imagem.

## 2. Onde achar o material
| Fonte | Como acessar | O que serve |
|---|---|---|
| Drive do Wesley | Conector Google Drive (`search_files`, `download_file_content`) se a pasta estiver compartilhada com a conta do conector; senão o Victor baixa e manda o arquivo | Live da Black do ano passado (~2 h), gravações brutas, aulas |
| YouTube do Wesley | **TranscriptAPI**: `search_channel_videos` (busca por tema no canal), `list_channel_videos` e `get_video_metadata` (visualizações, data), `get_youtube_transcript` (texto com tempos) | Achar o trecho e o minuto exato pelo texto. O arquivo do vídeo vem do Drive, do Victor ou do acesso ao canal (S2, sem acesso hoje). Não baixar vídeo de terceiros |
| Academia (Cademi) | Aula escolhida pelo Wesley ou pelo Victor | Só trecho de degustação, nunca a aula inteira de graça |
Antes de começar um material, registre em `conteudo/cortes/inventario.md`: material, fonte, duração, data da gravação, temas, status (A CORTAR, CORTADO, PUBLICADO), sem dado de aluno.

## 3. Achar os trechos (do texto para o minuto)
1. **Transcrição com tempos.** YouTube: `get_youtube_transcript`. Arquivo local: faster-whisper (modelo `small`, `language="pt"`, `word_timestamps=True`; receita em `criativos-trafego.md` seção 9). Salve em `transcricao/<material>.txt` com o tempo de cada frase.
2. **Leia a transcrição inteira** e marque candidatos. Bons sinais: pergunta direta ao público ("Você sabe o que fazer se..."), regra curta ("nunca abra a porta para..."), história com começo, meio e fim, frase de alerta, resposta a uma dúvida que chega no direct, emoção (ele muda o tom).
3. **Nota de cada candidato** (0 a 2 em cada, guarde a tabela):
| Critério | 2 | 0 |
|---|---|---|
| Gancho nos 3 primeiros segundos | a 1ª frase já diz o assunto | começa com "então", "como eu disse", "oi pessoal" |
| Entende sozinho | quem nunca viu o Wesley entende | precisa do que veio antes |
| Uma ideia só | uma lição clara | mistura dois assuntos |
| Dor do público da semana | casa com o calendário | assunto fora |
| Duração | 20 a 60 s de fala útil | mais de 90 s sem corte possível |
| Dentro dos limites | nada sensível ou já revisado | toca em tema de `marca-limites-wg` sem cuidado |
Entra quem tem 9 ou mais de 12. Por material: 3 a 5 cortes.
4. **Gancho:** se a frase mais forte está no meio do trecho, ela pode abrir o corte (reordenar sem mudar o sentido). Gancho em três camadas: texto na tela de até 6 palavras, a fala dele nos 3 primeiros segundos, imagem do rosto no momento forte com zoom lento de 1,0 para 1,08.

## 4. Roteiro do corte (antes de editar)
Uma tabela por corte em `cortes/<id>/roteiro.md`, para o Victor ler sem assistir:
```
CORTE <material>-<n> · objetivo: comentário | alcance | autoridade · público: <...>
Origem: <arquivo ou id do YouTube>, de mm:ss a mm:ss (contexto conferido: 60 s antes e depois)
Título na tela (até 6 palavras): ...
| Tempo | Imagem | Texto na tela | Fala real (transcrição) |
| 0 a 3 s | rosto, zoom lento | ... | "..." |
...
Fecho: cartão "Comente <PALAVRA> que eu te mando <o que a pessoa ganha>" (palavra que existe no ManyChat)
Legenda do post: ... (sem travessão, com o pedido e o que a pessoa ganha)
utm_content: corte-<material>-<n>
Risco (marca-limites-wg): nenhum | qual
```
O fecho e o título são texto nosso; a fala do vídeo é só dele. Nada no texto da tela promete o que ele não falou.

## 5. Produzir (nesta sessão: ffmpeg e faster-whisper)
1. **Cortar** do original com recodificação (sem perder sincronia): receita "cortar trecho" da `criativos-trafego.md`.
2. **9:16 (1080x1920):** se o original é horizontal, recorte no rosto (o Wesley no centro da área segura) ou, se ele se mexe muito, vídeo inteiro em cima de fundo desfocado do próprio vídeo. Rosto e texto entre Y 285 e 1470 e X 110 e 945.
3. **Legenda** queimada (ASS) gerada da transcrição e **conferida de ouvido**: fiel à fala, 60 a 70 px, até 3 linhas, palavra-chave em vermelho ou amarelo, letra mínima de 34 px.
4. **Título** no alto da área segura nos primeiros 3 s; selo de data se a regra da seção 1 pedir.
5. **Som:** voz dele acima de tudo, `loudnorm` (pico perto de -1,5 dB); trilha só com licença comercial ou sem trilha.
6. **Fecho** com o cartão do pedido e "MESTRE WESLEY GIMENEZ · KRAV MAGÁ CAVEIRA" discreto.
7. **Capa:** escolha o quadro do rosto no momento forte e peça a capa ao ChatGPT (título de 2 a 4 palavras, faixa amarela com o tema, recorte do perfil Y 240 a 1680).
8. **Conferência obrigatória:** folha de contato (`fps=1/2,tile=6x3`), quadro do começo, meio e fim, legenda inteira dentro da área segura, português certo, duração, volume. Só depois vai para a fila.
9. Nome do arquivo: `wg_corte-<material>-<n>_9x16_v1_AAAA-MM-DD.mp4`, nunca "final".

## 6. Conteúdo diário dos grupos de WhatsApp (1 por dia)
Público: grupo de espera (~13 mil em 91 grupos) e grupos antigos. Até dezembro sai pelo DevZapp (quem programa: `ofertas-paginas-wg`, como na `wg-regua-grupos`); depois, Comunidade do WhatsApp (o Victor ou o Gui postam, porque a Comunidade não agenda). A mídia entrega o texto, o pedido de imagem ao ChatGPT e o link; tudo pela fila.

**Tipos por dia da semana** (padrão; o calendário do estrategista pode trocar):
| Dia | Tipo | Hora | Exemplo de abertura |
|---|---|---|---|
| Segunda | Alerta de segurança da semana (golpe ou caso com fonte e data) | 12h | "Shalom, Caveira! Alerta para mostrar para a sua família: ..." |
| Terça | Dica prática em vídeo (corte de 20 a 60 s) | 12h | "O Mestre Wesley mostra em 40 segundos o que fazer se..." |
| Quarta | Enquete (2 a 3 opções) sobre o tema da semana | 19h | "Responde aqui na enquete: você abriria o portão?" |
| Quinta | Pergunta respondida (dúvida real do direct ou da caixa) | 12h | "Uma pergunta que chegou essa semana: ..." |
| Sexta | Prova social real e autorizada ou a Academia por dentro | 12h | "Olha o que um aluno contou essa semana..." |
| Sábado | Bastidor, família ou história do Wesley (corte) | 10h | "Bastidor do treino de hoje..." |
| Domingo | Sem mensagem (expediente) | | |
**Dia de oferta** (no máximo 1 a cada 10 dias fora de campanha, decidido no calendário): troca o tipo do dia pela oferta às 19h, com produto e preço da base, garantia de 7 dias e prazo só se for real.

**Regras do texto do grupo:**
- Abre com "Shalom, Caveira!" e fecha com "Tamo junto, Caveira!". Linguagem do Wesley, simples, para gente mais velha.
- Curto, sem cair no "ler mais" (mandar para si antes para testar). Uma ideia, um pedido só, que diz o que a pessoa faz e o que ganha.
- Imagem 1080x1080 pedida ao ChatGPT quando o tipo pedir (alerta, enquete com arte). Vídeo de corte vai como vídeo, não como link.
- Link sempre com `utm_source=vc&utm_medium=whatsapp-grupo&utm_campaign=<semana-ddmm>&utm_content=<dia-tipo>&utm_term=ag-social`; link de entrar no grupo sempre pelo contador /grupo.
- Notícia: fonte original, data absoluta, sem nome ou imagem de vítima, ângulo "o que você aprende para se proteger".
- Se a saída do grupo passar de 1% na semana, avisar o estrategista (menos oferta, mais conteúdo).

**Entrega do dia** em `conteudo/<data>/grupo.md`:
```
GRUPO · <dia dd/mm> · tipo: <...> · hora: <hh:mm> · público: todos | só espera | só antigos
Texto: ...
Imagem: PEDIDO ao ChatGPT "<texto exato>" 1080x1080 | vídeo: <arquivo do corte> | nenhuma
Link: ...
Fonte (se notícia): <link, data>
Risco (marca-limites-wg): nenhum | qual
```

## 7. Medir
- Corte: visualizações, envios e pulo nos 3 s contra a mediana de 30 dias (Metricool); conversas na palavra; venda com `utm_content=corte-...`. Corte acima de 2x: tirar mais cortes do mesmo material. Pulo alto: trocar o gancho na próxima versão (uma mudança por versão).
- Grupo: cliques por `utm_content`, respostas à enquete, saída da semana.
- Registrar em `memoria/aprendizados.md` o que venceu e o que perdeu, com o número, e atualizar o inventário.

## 8. Erros que não podem voltar
- Corte que começa com "então" ou "como eu falei" (sem gancho).
- Trecho que só faz sentido com o que veio antes.
- Preço, bônus ou data antiga dentro do corte.
- Legenda diferente da fala.
- Arte de grupo feita fora do ChatGPT.
- Travessão em qualquer texto.
