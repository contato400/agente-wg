# Atendente WhatsApp 24h · onde parou (18/11, 12h40)

## Resumo
O agente está pronto, no ar e testado no Cloudflare. O que falta é o "cano" de envio da resposta no número (31) 97334-6056.

## Causa raiz do bloqueio (comprovada)
- O número está em coexistência (app do celular + API). A Meta só deixa **enviar** pelo app do parceiro que registrou o número.
- Ele foi registrado pelo ManyChat. Depois o Gui trocou o WhatsApp da conta ManyChat "Krav Maga Caveira" para o número da Equipe Santiago, (11) 93623-1351, e o registro do 97334-6056 ficou preso no ManyChat.
- Erro da Meta ao enviar pelo nosso app: código 10, subcódigo 2593181.
- A API do ManyChat não acha contato de WhatsApp pelo número, e a conta com a chave usa outro número. Por isso o envio via ManyChat também não serve.

## Decisão
- Sem mensalidade: conectar o número na **YCloud** (parceira oficial da Meta). O plano grátis tem API, webhooks e coexistência.
- O agente continua lendo pelo webhook da Meta e envia pela API da YCloud. O código está pronto (segredo YC_KEY, variável YC_FROM).
- Em paralelo: pedir para virar provedor de tecnologia da Meta, para independência total.

## Feito hoje
| Item | Status |
|---|---|
| Token novo do usuário do sistema (Nunca expira, 2 permissões) | feito |
| Diagnóstico /diag no agente (sem expor token) | feito |
| Envio via ManyChat (MC_TOKEN) e trava "só WG" (nao_responder para Kairós etc.) | no ar, sem uso |
| Envio via YCloud (YC_KEY) | no ar, aguardando chave |
| Conta YCloud grátis (e-mail Luis corinthiano) | criada |
| ManyChat desconectado do número (pelo app do celular) | feito, 0 parceiros na conta Victor - Suporte |
| Victor admin do portfólio do Wesley com o próprio Facebook | feito |
| Victor com acesso total à conta de WhatsApp Victor - Suporte | feito |

## Onde travou
- Na conexão de coexistência da YCloud, a Meta responde: "número não pode ser usado porque a conta à qual ele pertence está restrita" (#3441092). O número aparece como "Não qualificado".
- Situação do número na Meta: DISCONNECTED, ON_PREMISE, ainda dentro da conta "Victor - Suporte". Nenhum problema listado na Central de Suporte da Meta.
- Mais provável: a Meta ainda está processando a saída do parceiro anterior (até 24 h).
- **Risco extra:** o Victor perdeu o chip do 97334-6056. O WhatsApp continua funcionando no celular, mas qualquer nova verificação por SMS travaria. **Ação:** segunda via do chip (linha no CPF do Victor). Não desinstalar o WhatsApp nem trocar de aparelho até lá.

## Amanhã (19/11)
1. Tentar de novo: YCloud → Coexistência → Começar, com o Facebook do Victor e o portfólio Krav Maga.
2. Se continuar travado: abrir chamado no suporte da YCloud com o código #3441092 e o ID da sessão (com OK do Victor).
3. Conectado: gerar a chave da API na YCloud, colocar YC_KEY e YC_FROM=+5531973346056 no Cloudflare, testar com "oi" do Victor.
4. Depois do teste: conferir que o agente não responde conversas de outros projetos e então MODO=ativo.

## Segurança pendente
- Anular o token antigo do WhatsApp, que ficou exposto.
- Trocar o app secret e a chave da Anthropic.
- O Samuel deve trocar a senha do Facebook dele.
- Remover o acesso do Facebook do Samuel quando não for mais necessário.
