# Fila de aprovação

Toda ação externa (post, anúncio, orçamento, página, oferta, mensagem em massa, funil, mudança na base do atendimento) passa por aqui.

- A fila fica na aba **"Fila de aprovação"** da planilha "WG · Vendas e Meta (automático)".
- O conteúdo completo de cada proposta fica em `aprovacao/propostas/<ID>.md`.
- Quem aprova: **Victor ou Wesley**. Mude o Status para APROVADO, AJUSTAR (com comentário) ou RECUSADO.
- Só o comando `/executar-aprovados`, rodando com `rotinas/settings-executor.json`, consegue publicar ou alterar algo. Os outros agentes são bloqueados pelo `.claude/settings.json`.
- Reembolso, pagamento e cobrança nunca são executados por agente.

Formato completo das colunas: skill `fila-aprovacao-wg`.
