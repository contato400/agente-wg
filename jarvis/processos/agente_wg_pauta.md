---
nome: Agente WG: pauta do Instagram
quando: as pautas do dia do Instagram do Wesley (radar de notícias, formato em alta e a peça pronta para aprovação)
gatilhos: pauta, post do dia, o que o Wesley posta hoje, reels do dia
agente: claude
nivel: pesado
tempo_max_min: 30
parametros: quantas = 3 (quantas pautas)
entregas: pauta.md
---
Trabalhe dentro da pasta do repositório da equipe: `{pasta_jarvis}\..\agente-wg` (clonado ao lado da pasta do Jarvis). Antes de tudo leia `CLAUDE.md`, `tudo.md`, `memoria\estado.md` e a última entrada de `memoria\passagem.md`. Todas as regras do CLAUDE.md valem e mandam mais que este roteiro: nada externo sem aprovação (nada é publicado, agendado, enviado, pausado ou alterado fora do repositório), sem dado pessoal de cliente, sem travessão. As chaves da ponte e do WhatsApp vêm das variáveis de ambiente do Windows (`WG_PONTE_URL`, `WG_PONTE_K`, `WG_PONTE_A`, `WG_AVISO_TOKEN`); se faltarem, diga qual falta e siga só com o que der.

Objetivo: {quantas} pautas do Instagram do Wesley, como o agente social-media-wg.

1. Siga a ficha `.claude\agents\social-media-wg.md` e as skills `estrategia-instagram-wg`, `pauta-conteudo-wg` e `marca-limites-wg`.
2. Cada peça vai para `aprovacao\propostas` e para a fila com Status PENDENTE. Nunca publique nem agende.
3. `entregas\pauta.md`: as pautas com roteiro, legenda e palavra-chave.
4. Resposta falada: a pauta escolhida em uma frase e o ID da fila para aprovar.
