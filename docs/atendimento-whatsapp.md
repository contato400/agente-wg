# Serviço de atendimento do WhatsApp (24h)

O atendimento não roda dentro do Claude Code: é um serviço pequeno na nuvem que recebe cada mensagem do número oficial e responde em segundos. O Claude Code (agente `atendimento-wg`) revisa e melhora esse serviço todo dia.

## Arquitetura
```
Cliente no WhatsApp (31) 97334-6056
        │  (API oficial da Meta, em coexistência com o app no celular)
        ▼
Webhook do serviço (Cloudflare Worker ou similar, plano grátis)
        │
        ├─ Filtro: grupo? Kairós? humano já assumiu? → não responde
        ├─ Busca a compra pelo telefone/e-mail (ponte Greenn/Hotmart + Cademi)
        ├─ Monta o contexto: histórico da conversa + skills do atendimento
        ▼
Claude (API) → resposta
        │
        ├─ Envia pela API do WhatsApp
        ├─ Registra na aba "Atendimento" da planilha (sem dado pessoal no texto do relatório)
        └─ Se for caso de humano: marca a conversa e avisa o Victor
```

## Regras do serviço
- Só responde conversa iniciada pelo cliente (janela de 24h, sem custo de mensagem).
- Não responde em grupo.
- Se um humano respondeu pelo celular nas últimas 2h, o agente fica quieto naquela conversa.
- Palavra de controle: se o Victor mandar `#humano` na conversa, o agente para de responder ali; `#agente` devolve.
- Primeiras 2 semanas em **modo supervisionado**: o agente escreve a resposta, mas ela vai para o Victor aprovar (painel ou WhatsApp interno) antes de sair. Depois, libera por categoria (primeiro dúvida de produto e catálogo, por último acesso e pagamento).

## Skills carregadas em toda conversa
`regras-agente-atendimento-wg`, `copy-conversacional-wg`, `vendas-negociacao-wg`, `funil-catalogo-wg`, `base-produtos-wg`, `suporte-acesso-wg`.

## Modelo e custo
- Resposta: modelo intermediário (Sonnet). Classificação da mensagem: modelo barato (Haiku).
- Meta: grátis (respostas dentro de 24h). Hospedagem: plano grátis. IA: cobrança por uso; medir na primeira semana e pôr teto mensal.

## Situação encontrada (18/11)
O número já está na API oficial em coexistência: portfólio "Krav Maga Caveira - Mestre Wesley Gimenez", conta "Victor - Suporte", qualidade Alta, limite 250 clientes por dia, **ManyChat como parceiro**. O app do celular continua funcionando.

## Para ativar
1. Descobrir qual conta do ManyChat está ligada a esse número (a conta principal usa o "Equipe Santiago") e desligar qualquer automação dele ali, para não haver resposta dupla.
2. Criar o app da Meta do atendimento dentro do portfólio do Wesley, inscrever na conta do WhatsApp "Victor - Suporte" e gerar o token de sistema (feito pelo Victor, com a verificação em duas etapas do Facebook).
3. Subir o serviço com a chave da API do Claude e o token do WhatsApp (variáveis de ambiente).
4. Modo supervisionado por 2 semanas; testar primeiro com o número do Victor.
