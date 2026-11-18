---
name: "wg-relatorio-vendas"
description: "Relatório de vendas WG da Greenn e Hotmart com taxas, UTMs e divisão Orgânico (Victor/VC) x Tráfego (Diogo); use quando pedirem relatório de vendas, comissão, quanto vendeu ou de onde veio a venda."
---

# Relatório de vendas WG (Greenn + Hotmart)

Carregue antes a skill wg-regras-operacao.

## 1. Coletar (Chrome Luis corinthiano)
**Greenn (adm.greenn.com.br/vendas):** filtrar período e status pago. Os dados vêm de `apiadm.greenn.com.br`:
- Lista: `/api/v2/sale` (cliente, status, valor, produto, oferta, currency_id 1=BRL 2=USD 3=EUR). `balance` é a parte do Wesley (50%, coprodução Holding Revayah Wisdom).
- Detalhe: `/api/sale/{id}` traz `metas` (utm_*) e `distribuition`. Abrir o detalhe clicando no olho da linha (`.Table-body-action`) em loop.
- Captura: interceptar XHR/fetch na página guardando só o corpo da resposta em `window.__cap`. Nunca ler token, header ou cookie. Nunca imprimir query string.
- Saída grande: trocar o body por `<main><pre>` e ler com get_page_text (javascript_tool corta em ~1000 caracteres).
- Horário da API é UTC: converter para Brasília (−3h).

**Hotmart:** conta do Wesley. Dados de `api-report.hotmart.com/rest/v2/sales/history`, mesma técnica.

## 2. Regras de cálculo
- Greenn: taxa 4,99% + R$ 1 por venda. Conferência: 297 → taxa 15,82; (297 − 15,82)/2 = 140,59 de balance.
- Venda em US$: converter para R$ pelo fechamento do dia (buscar a cotação), depois aplicar 4,99% + R$ 1. Somar ao orgânico quando for orgânica.
- Hotmart: taxa 8,99% + R$ 1. Toda venda Hotmart conta como VC.
- Pix parcelado / Parcelado Hotmart: conta só a 1ª parcela paga. Parcela N>1 de venda antiga fica fora das vendas novas do mês.
- Recuperação de venda (Parcelamento Inteligente) conta pelo valor da venda.

## 3. Atribuição Orgânico (Victor/VC) x Tráfego (Diogo)
Tráfego:
- `utm_source=FB`;
- source vc mas campanha contém `[DIOGO]`;
- produto com `#TP`;
- E-book Vida Segura e seus bumps (Desafio etc.) sem UTM.

Orgânico (é a base da comissão do Victor): todo o resto, incluindo UTM vc, links da Academia/Cademí, toda venda Hotmart e venda sem UTM de produtos soltos (Black, DPC 2.0, IA KMC, upsell/downsell, Kids), recuperação manual e suporte.

## 4. Entregar
- Um .xlsx só (openpyxl), sem dado pessoal de comprador:
  - Resumo Geral (Greenn + Hotmart, Orgânico x Tráfego, total líquido);
  - Greenn · Vendas (data Brasília, produto, oferta, valor, taxa, líquido, parte do Wesley, utm_source/medium/campaign/content, criativo Meta, classificação e motivo);
  - Greenn · USD;
  - Hotmart · Vendas.
- Fórmulas de soma no Excel, valores em R$. Explicar nas observações cada exceção (parcela, recuperação, internacional).
- Na resposta: só os totais principais (vendas, vendido, líquido, orgânico x tráfego) e o arquivo.