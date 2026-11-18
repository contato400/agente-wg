---
name: "wg-recuperacao-carrinho"
description: "Recupera carrinho abandonado, Pix não pago e cartão recusado da Greenn do WG e dispara pelo WhatsApp do ManyChat com cupom; use quando pedirem para chamar quem não finalizou a compra."
---

# Recuperação de carrinho WG

Carregue antes a skill wg-regras-operacao.

## 1. Montar a lista (Greenn)
- Fontes do período:
  - Leads com status "Abandonado" (botão oculto "Leads" no menu Vendas → /gestao-leads; API `/api/lead-management`);
  - vendas com status `refused` (cartão recusado) e `waiting_payment` (gerou Pix e não pagou).
- Excluir quem tem QUALQUER venda paga nos últimos 30 dias (por telefone OU e-mail): isso tira quem tentou várias vezes e passou depois e quem a própria Greenn já recuperou. Excluir reembolsados.
- Agrupar por pessoa: tentativas, produto, valor, motivo, data da última tentativa.
- Segmentar:
  1. tentou a Black;
  2. outro curso;
  3. E-book/Desafio (lead do tráfego que queria entrar no grupo da Black).
- Salvar o CSV completo para o Victor e um CSV por segmento (`first_name,phone`) para importar.

## 2. Oferta
- Confirmar cupom ativo em adm.greenn.com.br/cupom (BLACK10 = 10%, só no produto Black 1 ano). Se o cupom não vale para o curso tentado, oferecer a Black, que inclui todos os cursos.
- Conferir se a página da Black está aberta e qual preço mostra.

## 3. ManyChat (WhatsApp, conta fb639679992741917)
1. Modelo de mensagem (Configurações → WhatsApp → Modelos de Mensagem): categoria Marketing, Português (BR), variável Primeiro Nome, texto perguntando por que não conseguiu finalizar, 3 botões de resposta (até 20 caracteres), ex.: "Erro no pagamento", "Fiquei com dúvida", "Quero tentar de novo". Já existe aprovado: `caveira_recuperacao_carrinho` (reutilizar).
2. Importar contatos (Contatos → Importar): o Victor marca a caixa de consentimento. Mapear first_name → Nome e phone → ID do WhatsApp. Criar uma tag por segmento (ex.: `recuperacao_carrinho_black_DDMM`).
3. Mensagem em massa → Nova Transmissão → WhatsApp → Ir para o Construtor de Fluxos → "fora da janela de 24 horas" → escolher o modelo. Ligar os 3 botões ao mesmo passo seguinte ("Selecionar Passo Existente"), com o texto da oferta + cupom + botão "Abrir Site" com UTM (`utm_medium=whatsapp-manychat&utm_campaign=recuperacao-carrinho-DDMM&utm_content=<segmento>`). Esse passo é grátis (janela de 24h).
4. Público alvo: condição Tag = tag do segmento. Conferir número de contatos e custo (~US$ 0,07 por contato). Números dos EUA não recebem.
5. Narrativa do segmento E-book: "você ia pegar o e-book pra entrar no grupo e ver a Black do Wesley; a Black tá rolando e liberei 10% nos 23 treinamentos".
6. Duplicar rascunho NÃO copia o fluxo: montar cada transmissão do zero.
7. Mostrar textos, público e custo ao Victor; só clicar em Enviar Agora → Publicar depois do "pode mandar".

## 4. Depois
- Quem responder por texto cai na caixa de entrada do número "Equipe Santiago" e é atendido na mão.
- Vendas recuperadas contam como orgânico (VC) e aparecem pela utm_campaign no relatório.