---
name: estrategia-instagram-wg
description: Decide o que o Wesley posta: radar de notícias e de formatos virais (Instagram e TikTok), leitura dos posts do próprio Wesley, escolha do público e entrega da manhã pronta. Não use para editar vídeo (video-serie-wg).
---

# Estratégia de Instagram do Mestre Wesley · o cérebro do agente de social

Pedido do Victor (18/11): o agente de social é **responsável** pelo Instagram do Wesley. Ele pesquisa, decide, produz e mede sozinho, e chega de manhã com tudo pronto. O Victor só aprova. Ferramentas de produção: `video-serie-wg`, `edicao-video-arte-wg`, `pauta-conteudo-wg`. Limites: `marca-limites-wg`.

## 1. Posicionamento (o filtro de tudo)
- **Quem é o Wesley para quem chega:** o Mestre que ensina gente comum a evitar o perigo, se proteger e sair viva. Não é o lutador que bate; é o guia que protege a família.
- **Para quem:** povão, muita gente acima de 40, pais e mães, mulheres que andam sozinhas, trabalhador que pega ônibus e anda a pé. Tudo autoexplicativo.
- **Quatro públicos, cada um com o seu produto e a sua palavra:**
| Público | Dor | Produto | Palavra no comentário |
|---|---|---|---|
| Família e gente mais velha | golpe, assalto em casa, celular | Protocolo Vida Segura | CAVEIRA (enquanto a reabertura estiver no ar) ou SEGURA |
| Mulher | andar sozinha, assédio, agressão | Contra Ataque Feminino | MULHER |
| Homem e trabalhador | assalto, briga, rua | DPC 2.0 | PROTEGER |
| Pais | bullying, filho seguro | Defesa Pessoal Kids (perfil Kids) | KIDS |
- **O que nunca:** explorar vítima, incentivar briga, prometer que treino resolve tudo, criança exposta.

## 2. Radar diário (todo dia, antes das 8h)
Faça as três buscas e guarde as fontes:
1. **Notícias das últimas 24 h** (WebSearch, mais de uma busca): golpes novos, assaltos, casos de rua, transporte, violência contra a mulher, bullying, acidentes com lição de prevenção. Fonte original com data absoluta. Nada de nome ou imagem de vítima.
2. **Formatos em alta** no Instagram e no TikTok: Centro Criativo do TikTok (tendências e músicas), matérias recentes sobre tendências de Reels, e os perfis de referência do nicho (segurança, defesa pessoal, polícia, golpes) pelo conector `competitors` do Metricool (veja `docs/mapa-de-fontes.md`). Anote o **formato**, não a fala: série com "parte 2", história narrada, POV, "não ignore", mito ou verdade, reação a notícia, tela dividida erro e acerto, câmera de segurança recriada, carrossel de "X sinais de...", 3D ou cinematográfico.
3. **Os posts do próprio Wesley** (seção 3).
Sem fonte, não entra. Tendência que não se aplica ao público do Wesley não entra.

## 3. Leitura dos posts do Wesley (ele posta 4 a 5 vídeos por dia)
- Fonte: **Metricool** (decisão do Victor, 18/11), `getAnalyticsDataByMetrics` na rede `instagram`, conector `reels` (views, alcance, curtidas, comentários, salvos, envios, retenção, tempo médio, taxa de pulo nos 3 s) e `evolution` (seguidores). O Windsor fica só com os anúncios; não ligue o Instagram nele. Enquanto o Metricool não tiver o Instagram conectado, diga isso em uma linha e use o que tiver.
- **Retenção e pulo nos 3 s** dizem se o gancho funcionou: pulo alto = trocar o gancho; retenção baixa no meio = cortar o meio.
- Para cada post das últimas 72 h, compare com a **mediana dos últimos 30 dias do mesmo formato**: alcance, envios por alcance, salvamentos por alcance, comentários. **Acima de 2x a mediana = vencedor**; abaixo de 0,5x = perdedor.
- Para cada vencedor, decida e diga por quê: (a) **pedir ao Wesley para regravar ou fazer a continuação** (com roteiro pronto), (b) **transformar em história narrada ou carrossel** pelo motor, (c) **turbinar** (proposta para o tráfego, só depois da Black). Vídeos que trouxeram muito seguidor no passado entram numa lista de "clássicos" para repostar ou refazer a cada 2 ou 3 meses.
- Reels de teste: o Instagram mostra os números no app; se a API não trouxer, peça ao Victor um print em 72 h e registre.

## 4. A entrega da manhã (vai dentro do debriefing e no e-mail)
"Bom dia, Victor. Nas últimas 24 h:"
1. **Placar do Instagram:** os 3 melhores e os 3 piores posts do Wesley com o número que prova, e o que fazer com cada vencedor.
2. **Radar:** 5 notícias ou casos (título, fonte, data, público, por que serve).
3. **Formato do dia:** o que está viralizando e a prova (link ou referência).
4. **A escolha:** "Escolhi X porque fala com [público] e casa com [formato]" (uma escolha só, com o motivo).
5. **Pronto para aprovar:** o conteúdo **já produzido** (MP4 com capa e legenda, ou carrossel pronto) na fila, com horário sugerido e se vai como Reels de teste.
6. **Para o Wesley gravar:** 1 a 3 roteiros curtos (gancho, fala, pedido) quando a ideia precisa dele, com o motivo (ex.: continuação de um vídeo vencedor).
7. **Oportunidade de ferramenta** (quando houver): nome, o que faz, preço conferido no site, quanto custa por vídeo, o resultado que pode trazer e o teste mínimo proposto. Nada é assinado sem o Victor.

## 5. Decidir com probabilidade, não com achismo
- Toda escolha cita pelo menos dois sinais: notícia quente, formato em alta, vencedor recente do próprio perfil, dor da voz do cliente (`memoria/voz-do-cliente.md`).
- Série: se a Parte 1 passar da mediana em 72 h, a série segue; se não, troca o gancho, não o tema.
- Uma mudança por teste; leitura com 3 h, decisão com 72 h (`pauta-conteudo-wg`).
- Registre em `memoria/aprendizados.md` o que venceu e o que perdeu, com o número.

## 6. Ferramentas e custo
- Já temos: motor de vídeo narrado, Canva, Google AI Pro do Victor (Gemini, Nano Banana, Veo, Flow), ChatGPT do Victor, DaVinci (voz ElevenLabs, créditos limitados), Metricool (sem rede conectada ainda).
- Ferramenta nova (Higgsfield, HeyGen, CapCut Pro, etc.): pesquise preço no site oficial, calcule custo por vídeo, compare com o que já temos, e proponha **um teste pequeno com teto**. Sem compra, sem cadastro com cartão: isso é do Victor.

## Limpeza de posts de campanha (feito em 18/11, repetir depois de cada campanha)
- Depois de uma campanha (Black, reabertura), listar pelo Metricool todos os posts e reels da campanha (legenda, imagem ou vídeo) com visualizações, curtidas e comentários; abrir cada um no Instagram para conferir.
- Propor apagar os que menos engajaram; manter os que viraram conteúdo bom. Mostrar a lista ao Victor e só apagar com o OK dele (não tem volta).
- Só mexer no que o Victor postou (campanha). Post do próprio Wesley não se mexe.
- No computador: post = três pontinhos > Excluir; reel = três pontinhos > Gerenciar post > Excluir (ou "Remover da grade do perfil", que não apaga).
