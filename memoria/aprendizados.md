# Aprendizados

- 2026-11-17 · Recuperação de carrinho por WhatsApp (ManyChat) enviada para 54 pessoas com cupom BLACK10. Medir vendas recuperadas na aba Vendas (utm_campaign recuperacao).
- 2026-11 · [FIXA] Copy técnica demais derruba conversão no público do Wesley. Linguagem simples e prática.
- 2026-10 · Funis longos com e-book e downsell (Kommo) venderam pouco; os bots curtos que levam ao catálogo têm melhor resultado.
- 2026-10 · A automação "SPRAY" no ManyChat tem o maior CTR (32,5%); conferir se o produto ainda existe antes de usar.
- 2026-10 · Cerca de 30% dos alunos da Academia nunca acessaram; parte por não receber o e-mail de acesso. Reenvio aumentou os acessos.
- 2026-10 · [FIXA] Bot do ManyChat "ao vivo com 0 execuções" costuma ser a permissão "Permitir acesso às mensagens" desligada no app do Instagram.
- 2026-11-18 · Tráfego: campanhas de e-book (GREENN 24) deram 40 compras por cerca de R$ 1.250, ticket perto de R$ 20. Não se pagam sem upsell.
- 2026-11-18 · Tráfego: campanha não para sozinha quando a oferta acaba. Conferir as ativas no dia seguinte ao fim de toda campanha.
- 2026-11-18 · Revisão (juridico-wg): não afirmar em absoluto o que um órgão público faz sem fonte oficial; escrever "se o assaltante estiver armado", nunca "se tiver arma".

- 2026-11-18 · Vídeo: placas sem narração foram reprovadas; história em partes, narrada, com som em cada gesto e cena com objeto (celular, porta, Pix) foi aprovada na hora ("ficou muito bom"). Motor em `conteudo/serie-golpe-central/motor/`, skill `video-serie-wg`.
- 18/11 · Planilha Google em pt_BR via API: função em inglês, separador `;`, decimal com vírgula dentro da fórmula; vírgula como separador dá #ERROR!. Ler de volta sempre.
- 18/11 · Tráfego em novembro (até 18/11): gasto Meta R$ 5.432,56 contra R$ 4.379,13 de receita atribuída por UTM (ROAS 0,81, estimativa). Conferir com o relatório do Diogo antes de concluir.
- 19/11 · Vídeo: edição pesada (Wesley real recortado, cenário novo, efeitos 3D nas palavras que ele fala) aprovada pelo Victor ("ficou brabo"). Variação que só troca faixa não parece outro vídeo.
- 19/11 · Vídeo: "2 vídeos" do Diogo eram a mesma gravação; conferir a fala dos originais antes de fazer variações.
- 19/11 · Metricool: Story agendado pode falhar no Instagram ("media cannot be found"). Conferir o status depois de cada horário e reagendar na hora.
- 19/11 · Academia: a Cademi só fica logada no Chrome do Victor Augusto; o Victor clica em Entrar. Lista da entrega da Black carrega 20 por vez (loadMore, juntar ids). `perPage` alto dá erro 500.
- 19/11 · Áudio para o Victor: sem crédito na OpenAI, o serviço manda texto curto. Voltar a ver quando houver crédito.
- 19/11 · Vídeo: A e B pesadas com a mesma fala e cenários parecidos "pareciam um vídeo só" (Victor). Refeito o B com outra ordem (gancho de condição primeiro), 15 s e cenários próprios. Regra registrada na skill de edição.
- 19/11 · Captação: o DevZapp não separa entradas por canal; os cliques por canal vêm da página contador /grupo (Atomicat). Abertura de e-mail a Cademi não mede.
- 19/11 21h · Página contador do grupo (/grupo) estava sem o script de redirecionamento: a pessoa via "carregando" e só entrava se tocasse no botão (Victor notou). Regra: toda página de redirecionamento é testada no ar até o destino final (Playwright) logo depois de publicar e de novo antes de um disparo grande.
- 19/11 · Crédito da API da Anthropic acabou às 15h09 e o agente do WhatsApp passou ~6h respondendo só "Recebi sua mensagem e já já te respondo" (3 leads, um vindo do checkout). Ninguém foi avisado. Correção no código: alerta ao Victor na 1ª falha (máx. 1 a cada 30 min). Regra: recarga automática ligada na conta da API; o auditor confere `diag:passos` (KV agente-wg) procurando "anthropic erro" todo dia.
- 2026-11-20 · social · Série narrada (Dona Maria) no Reels normal: 2.414 visualizações (0,17x a mediana), 70% de pulo; Reels de teste: 11 a 128. O que rende é o Wesley falando "Alerta de segurança" (18/11: 43.530, 3,04x, 40% de pulo) e o "Envie esse alerta para sua família" (16% de envio). Narrado só no formato de alerta, não em série, até prova em contrário.
- 2026-11-20 · analista · O Metricool entrega a hora dos reels em UTC; o relatório de 19/11 saiu com a hora errada (3 h a mais).
- 2026-11-20 · financeiro · O pixel da Meta contou como compra da GREENN-01 uma venda que veio do link orgânico do Victor (mesma página com pixel). Venda de tráfego só vale com utm_source=FB na planilha.

- 20/11 · Gemini TTS lê o "estilo" em voz alta em parte das falas; usar só o texto. Cota grátis do dia acabou em ~19 falas (429).
- 20/11 · Página de tráfego tinha scripts com data (contador, lote, 16/11) que viram "terminou" depois da data. Toda página com relógio precisa ser revisada antes de reabrir oferta.
- 20/11 · Arquivo .mp3 subido na mídia da Atomicat vira .bin sem CORS; áudio para página com analisador de voz deve subir como .mp4 (AAC), que vem com CORS.
- 20/11 · Atomicat: atomicat_update_node_fields APAGA o <script> de um nó html (fica só o comentário). Para mudar script em nó html: apagar o nó e inserir de novo com insert_nodes, e conferir o HTML publicado com grep.
- 20/11 · F4 recompra (Greenn, pagas de 01/01 a 20/11/2026): 1.618 vendas, 1.258 compradores. Só 23 compraram de novo em outro dia (receita R$ 2.572,93), e 20 desses repetiram o MESMO produto (parece parcela ou assinatura). Recompra de outro curso: 3 pessoas. Conclusão: quase ninguém volta a comprar depois do 1º dia; o dinheiro está no order bump do dia e numa régua pós-compra que não existe. Código da conta em rotinas/recompra-rota-worker.js (rodar como rota temporária no worker e apagar depois, porque fica pública).
- 20/11 · E-mail pós-compra: a Cademi só tem e-mails fixos (boas-vindas, novo acesso), sem sequência programada. O Hotmart Send está no plano Grátis com 5.915 contatos para um limite de 100 (acima do limite; automação de e-mail ali exige plano pago). Caminho grátis: Apps Script da ponte com MailApp do Gmail (cerca de 100 e-mails por dia na conta comum), lendo as vendas novas.
