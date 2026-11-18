# tudo.md · mapa do repositório Agente WG

Leia este arquivo antes de abrir pastas inteiras. Uma linha por item. Atualizado em 18/11/2026. Quando o Victor disser "atualiza o mapa", refazer este arquivo.

## Raiz
- `CLAUDE.md`: regras de todos os agentes (aprovação, marca, dinheiro, privacidade). Ler sempre.
- `README.md`: o que é o projeto e como rodar.
- `tudo.md`: este mapa.

## .claude/agents (8 agentes)
chefe-wg (coordena, debriefing, biblioteca de método), analista-wg, atendimento-wg, social-media-wg, trafego-wg, ofertas-paginas-wg, financeiro-wg, juridico-wg.

## .claude/commands
/debrief, /pauta, /trafego, /atendimento, /semana, /executar-aprovados.

## .claude/skills (por assunto)
- Regras e marca: `wg-regras-operacao`, `marca-limites-wg`, `fila-aprovacao-wg`.
- Produtos e vendas: `base-produtos-wg`, `oferta-irresistivel`, `copy-conversacional-wg`, `vendas-negociacao-wg`, `funil-catalogo-wg`.
- Atendimento: `regras-agente-atendimento-wg`, `suporte-acesso-wg`.
- Campanhas: `black-lancamento-wg`, `lancamento-pago-wg`, `front-ebook-wg`, `wg-regua-grupos`, `wg-manychat-funis`, `wg-recuperacao-carrinho`.
- Conteúdo e edição: `pauta-conteudo-wg`, `edicao-video-arte-wg`.
- Tráfego e números: `trafego-wg-guardrails`, `wg-relatorio-vendas`, `debrief-diario-wg`.

## memoria/
- `estado.md` (situação atual, reescrito todo dia), `decisoes.md` (decisões com data), `aprendizados.md` (o que funcionou), `passagem.md` (registro curto do que foi feito em cada sessão), `README.md` (regras).

## docs/
- Estado e operação: `00-WG-documento-mestre.md`, `revisao-17-e-18-nov.md`, `funis-e-melhorias-18-nov.md`, `conexoes.md`, `mapa-whatsapp.md`.
- Atendimento 24h: `atendimento-whatsapp.md`, `atendente-whatsapp-status-18-nov.md` (bloqueio da Meta, passos de 19/11).
- Reabertura de 20/11: `reabertura-20-nov-oferta.md` (oferta, ajustes na régua do Gui, roteiro do vídeo, e-mail, stories, arrastão).
- Cursos estudados (notas próprias): `curso-black-debriefing-3-4mi-notas.md`, `curso-lancamento-pago-750k-notas.md`, `curso-lancamento-pago-ia-420k-notas.md`, `curso-masterclass-lancamento-pago-notas.md`, `curso-front-9-90-ecossistema-notas.md`, `curso-low-ticket-ia-notas.md`, `curso-corredor-polones-notas.md`, `curso-corredor-polones-vendas-notas.md`, `curso-trafego-pago-automatizado-18-nov.md`, `kit-ia-grupo-notas.md`.
- `cursos/corredor-polones-aulas.md`: lista das 118 aulas com códigos de vídeo.

## Outras pastas
- `aprovacao/`: fila de aprovação (como funciona).
- `relatorios/`: relatórios diários dos agentes (AAAA-MM-DD-nome.md).
- `rotinas/`: agenda, ponte com a planilha (`ponte.sh`), configuração do executor.
- `servico-atendimento/`: código do atendente de WhatsApp (Cloudflare Worker) e testes.

## Fora do repositório
- Projeto "VICTOR. A" no claude.ai: cópias dos docs em `kairos/`.
- Régua do Gui: artifact "Régua Fila de Espera Caveira". Roteiro do vídeo: artifact "Roteiro Reabertura Caveira".
