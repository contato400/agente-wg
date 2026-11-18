---
name: controle-financeiro-wg
description: Mantém o Painel Financeiro WG (planilha do agente financeiro) em dia: vendas do dia, gasto da Meta, custos, produtos, reembolsos, meta e ROAS, e entrega o bloco "Dinheiro" pronto. Usar no passo do financeiro da rotina diária e quando pedirem quanto entrou, quanto gastou ou quanto falta.
---

# Controle financeiro WG · o painel do agente financeiro

Pedido do Victor (18/11): o financeiro no mesmo nível do social. Ele mantém a planilha sozinho, mede tudo e chega de manhã com o número e a consequência. Só lê e calcula; dinheiro nunca é movido por agente.

Mapa completo de fontes: `docs/mapa-de-fontes.md`.

## 1. A planilha
- **Painel Financeiro WG (agente financeiro)** · id `1U9r-qlRlk7Ge1ZhZv131WWLWlfIk-K8r6za8i3K5Z1k` (drive compartilhado Digital Wisdom). Acesso pelo conector Google Sheets da rotina.
- Abas:
| Aba | O que tem | Quem escreve |
|---|---|---|
| Resumo do mês | Meta, orgânico, tráfego, ROAS, custo por venda, custos | fórmulas (não sobrescrever a coluna B) |
| Diário | Um dia por linha: gasto Meta (coluna B, valor) e vendas por origem (fórmulas) | agente: só a coluna B e linhas novas |
| Vendas | Uma venda por linha, 14 colunas iguais à aba Vendas da planilha WG | agente: acrescenta as linhas novas |
| Produtos | QUERY automática por produto e origem | fórmula |
| Custos | Meta (fórmula), taxas (fórmula), ManyChat, Atomicat, Canva, IA | agente: só valores fixos confirmados pelo Victor |
| Reembolsos | Data, primeiro nome, produto, plataforma, valor, dentro dos 7 dias, motivo, situação | agente |

- **Planilha em pt_BR:** fórmula com função em inglês, separador `;` e decimal com vírgula dentro da fórmula (`=3377,09+...`). Valor numérico enviado como número (297.5) entra certo. Depois de escrever, leia de volta e procure `#ERROR!`.

## 2. Rotina diária (passo do financeiro, antes do debriefing)
1. Ler a aba Vendas da planilha WG pela ponte (`rotinas/ponte.sh ler Vendas 200`). Acrescentar no Painel só as vendas que ainda não estão lá (chave: data e hora + produto + valor). Nada de nome, e-mail ou telefone.
2. Gasto da Meta: Windsor `get_data`, conector `facebook`, campos `date` e `spend`, `date_preset` `last_3dT`. Gravar na coluna B do Diário (corrige os 3 últimos dias, porque a Meta ajusta o gasto).
3. Mês novo: criar as linhas do mês no Diário e ajustar a base do Resumo (B8, B9, B21, B22 guardam o que veio antes da planilha automática).
4. Ler o Log e o Atendimento atrás de reembolso, chargeback ou reclamação. Achou: linha em Reembolsos e alerta na hora ao Victor (ficha do financeiro).
5. Conferir o Resumo: soma de Vendas bate com a planilha WG? Diferença vira Pendência.

## 3. Bloco "Dinheiro" (vai no debriefing)
Começa por venda orgânica e meta, nesta ordem:
1. Orgânico no mês: vendas e receita, % da meta, quanto falta e o ritmo por dia até 30/11.
2. Ontem: vendas e receita por origem, com o líquido.
3. Tráfego: gasto do mês, receita atribuída, retorno por R$ 1 (ROAS) e custo por venda, marcados como estimativa.
4. Custos do mês e o que está pendente.
5. Alertas (tabela da ficha) e uma frase dizendo qual agente age.
Comprovado e estimado sempre separados. Sem fonte, o número fica em branco em Pendências.

## 4. Sinais que fazem agir
- ROAS do tráfego abaixo de 1 por 3 dias: avisar o trafego-wg para levar ao Diogo, com o número (o agente só propõe).
- UTM com macro não substituída (`{{ad.name}}`, `{{campaign.name}}`): a venda conta como tráfego pelo `utm_source=FB`, mas o anúncio fica sem nome. Avisar o trafego-wg.
- Ritmo necessário acima do dobro da média dos últimos 7 dias: avisar o chefe (a meta corre risco).
- Reembolsos acima de 5% das vendas da semana.

## 5. Fontes que ainda faltam (pedir uma vez, registrar em `memoria/estado.md`)
- ManyChat: custo do mês (o Victor vai passar).
- API da Hotmart e da Cademi: o Victor gera a credencial e cola na variável de ambiente da tarefa agendada. O agente nunca digita nem grava a chave.
