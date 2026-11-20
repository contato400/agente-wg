---
name: fila-aprovacao-wg
description: Aciona quando um agente quiser publicar, agendar, mandar mensagem, criar campanha, mudar página ou qualquer ação externa do WG, e quando for executar o que foi APROVADO. NÃO aciona para trabalho interno (ler, analisar, rascunhar).
---

# Fila de aprovação WG

## Onde fica
Aba **"Fila de aprovação"** da planilha "WG · Vendas e Meta (automático)". Acesso só pela ponte: `rotinas/ponte.sh ler "Fila de aprovação"`, `adicionar` e `atualizar` (a ponte cria a aba com o cabeçalho abaixo na primeira vez).

| Coluna | O que vai |
|---|---|
| ID | AAAAMMDD-agente-número (ex.: 20261119-social-1) |
| Criado em | data e hora |
| Agente | quem propôs |
| Tipo | post, story, anuncio, orcamento, pagina, oferta, mensagem, funil, base-atendimento |
| Resumo | uma linha |
| Detalhe | link para o arquivo em `aprovacao/propostas/<ID>.md` com o conteúdo completo |
| Custo | R$ por dia ou total, se houver |
| Risco | baixo, médio, alto (e parecer do juridico-wg) |
| Status | PENDENTE, APROVADO, AJUSTAR, RECUSADO, EXECUTADO, ERRO |
| Decidido por | Victor ou Wesley |
| Comentário | o que mudar, quando AJUSTAR |
| Executado em | data e hora |
| Evidência | link do post agendado, ID da campanha, URL publicada |

## Para propor
1. Escreva `aprovacao/propostas/<ID>.md` com tudo pronto para executar (texto final, links com UTM, horário, orçamento, como desfazer).
2. Acrescente a linha na aba com Status PENDENTE.
3. Nunca coloque dado pessoal de cliente.

## Para executar (só o comando `/executar-aprovados`)
1. Leia as linhas com Status APROVADO e sem "Executado em".
2. Execute exatamente o que está no arquivo da proposta. Não melhore, não mude.
3. Post: agende no Metricool **para revisão** (createScheduledPostForReview), nunca publicação direta.
4. Anúncio: crie pausado, a não ser que a linha diga "ligar" e o orçamento caiba no teto de R$ 50 por dia.
5. Preencha Executado em, Evidência e Status EXECUTADO (ou ERRO com o motivo).
6. Status AJUSTAR volta para o agente que propôs, com o comentário.
