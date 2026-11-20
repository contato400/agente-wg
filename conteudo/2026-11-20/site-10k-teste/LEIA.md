# Teste: página da Black no formato "site de 10k" (20/11, pedido do Victor)
- Skills usadas: site-de-10k (hero de scrub, faixas de legenda, portão do hero estático, momento interativo, checklist), ui-ux-pro-max (padrão Hero + prova + CTA), oferta-irresistivel (itens com valor real, bônus, garantia, para quem é e não é, CTA único).
- Filmagem: trecho real de 14 s do Protocolo MCD (Drive ARQUIVOS WG, "02 AULA SOCOS FRONTAIS", 492 s), marca d'água cortada, sem gerar nada no Higgsfield. Fotos da pasta FOTOS WG.
- Publicado só como artifact privado: https://claude.ai/artifact/VGb2BqYGobCxWfURTkZmBB. O vídeo hero-scrub.mp4 (4,8 MB) não vai para o git.
- Soma de valor: 17 dos 23 treinamentos com preço avulso da Greenn (skill base-produtos-wg) = R$ 2.953,30.
- Autoteste: sem erro no console, sem rolagem lateral, teste de flick 120 e 360 px com as 4 faixas visíveis, celular sem baixar vídeo.

## v2 (20/11 17h40) publicada na Atomicat
- Endereço: https://www.wesleygimenez.com.br/black-caveira-2026-nova (página HTML gQAyC1U1qPlHC3U78mNU, site jHtKqTgrEV9wHFiff5Z3, noindex).
- Pedido do Victor às 17h09: base na página ativa, menos ponto final, autoexplicativa para público mais velho, fluxo aluno x não aluno, prêmios com foto, botões verdes pulsando e barra flutuante. Liberou publicar às 17h12 para mandar ao gestor.
- `pagina-nova-atomicat.html` é o arquivo publicado (imagens e vídeo no CDN da Atomicat, pasta mcp/B5Cp). `index.html` é a versão com assets locais.
- Botão "Já sou aluno" leva para a conferência de e-mail da página ativa (#bk2aluno); a nova não tem a conferência própria.
- Conferido no ar: vídeo carrega e avança com a rolagem, 43 imagens sem quebra, sem rolagem lateral (1440 e iPhone), links Greenn 7T52i6, Hotmart H108520217H, aluno e WhatsApp com UTM utm_content=pagina-nova&utm_term=ag-ofertas.

## v3 (20/11 18h) virou a página oficial /black-caveira-2026
- Pedido do Victor às 17h36: página mais curta, foco 100% em conversão (oferta irresistível), roda das trilhas igual à antiga, botão Hotmart "sem travar o limite" com valor (6x R$ 78,19; aluno 6x R$ 68,34, conferido no checkout da Hotmart pelo Chrome do Victor), conferência do aluno dentro da página, mesmos checkouts e scripts da página antiga.
- Estrategista cortou: "E se acontecer com você" (virou 1 linha), 3 passos (foi para a escolha de condição), comunidade + bio + depoimentos juntos (5 depoimentos), FAQ de 11 para 6.
- Checkout Greenn: oferta 7T52i6 + ch_id 145095 + 3 order bumps (202271/8DFikc, 202274/7huZXa, 201669/FytpCL); aluno xv5IgL + ch_id 145096. Ponte do aluno igual à antiga. Pixel 4783151578430964 + GA G-XKTNRP8TCK + repasse de UTM.
- Troca de endereço: a página antiga (builder zjl1fP3547URqxzmawHQ) foi para /black-caveira-2026-antiga; a nova (HTML gQAyC1U1qPlHC3U78mNU) está em /black-caveira-2026. Assim nenhum link de ManyChat, grupo, e-mail ou atendimento precisou mudar. Para voltar: publicar a antiga em /black-caveira-2026 de novo.
- Cuidado na Atomicat: write_page_file apaga trechos "on<letras>=" (textContent=, onclick=, onload=, content= de meta). O app.js evita esses padrões; o index foi corrigido com edit_page_file.
