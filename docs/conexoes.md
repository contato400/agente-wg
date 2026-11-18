# Conexões: cada agente ligado no que precisa

Tudo roda na conta Google **Luis corinthiano**, onde estão Instagram, Facebook, Atomicat, Canva, CapCut, Gemini Pro e Flow.

Há dois jeitos de um agente usar uma ferramenta, e isso decide o que roda 24h:

| Jeito | Como funciona | Roda com o computador desligado? |
|---|---|---|
| **Conector (API ou MCP)** | O agente fala direto com a ferramenta pela internet | **Sim**, 24h |
| **Navegador** | O agente abre o Chrome "Luis corinthiano" e clica como uma pessoa (extensão Claude in Chrome) | **Não**: só com o computador ligado, o Chrome aberto e a extensão conectada |

Por isso, o que precisa ser diário e automático usa conector. O navegador fica para tarefas que você dispara quando está no computador.

## Mapa

| Ferramenta | Jeito | Agentes que usam | Para quê | Situação |
|---|---|---|---|---|
| Planilha WG (Google Sheets) | **Ponte Apps Script** (`rotinas/ponte.sh`) | todos | Ler Painel, Vendas, Log, Erros, Fila de aprovação e Atendimento; anotar propostas e atendimentos; atualizar status | **Pronto (18/11, versão 3 da ponte)**. Não usa o conector Google do Claude da empresa, que fica intocado |
| Google Drive | (a definir) | social, ofertas | Pasta de imagens, vídeos e roteiros aprovados | Pendente: os arquivos podem ir por link do Drive do Luis corinthiano na proposta |
| E-mail do debriefing | Ponte Apps Script (Gmail do Luis corinthiano) | chefe | Mandar o debriefing para luiscorinthianoportoreal@gmail.com | **Pronto** (teste enviado em 18/11) |
| Metricool | Conector | social, analista | Agendar posts **para revisão**, métricas e melhores horários do Instagram e Facebook | Pronto |
| Windsor.ai (Meta Ads) | Conector | tráfego, analista, financeiro | Ler campanhas; criar e alterar só pelo executor, com aprovação | Conta Windsor do Luis corinthiano criada em 18/11, ligada à conta de anúncios **4500 [USANDO ATUALMENTE - CURSOS]** (id 874070653089870, campanhas [DIOGO]), via Facebook do Samuel. Plano grátis: 1 conta. Conector do claude.ai trocado para esta conta em 18/11 (conferido: a conta 4500 aparece) |
| Atomicat | Conector | ofertas-páginas | Rascunho de páginas; publicar só pelo executor | Pronto |
| Canva | Conector | social, tráfego | Estáticos, carrosséis e criativos de anúncio a partir de modelos da marca | Conectado ao Canva do Luis corinthiano no Claude da empresa (18/11). Aviso no Canva: pagamento recusado (conferir se o Pro está ativo) |
| ManyChat | API (chave na planilha/Apps Script) | social, atendimento | Ler funis e tags; criar funil novo só com aprovação | Pronto (chave já existe) |
| Greenn e Hotmart | Ponte já montada (webhooks → planilha) | analista, financeiro, atendimento | Vendas, pendentes, abandonos | Pronto |
| WhatsApp oficial (31) 97334-6056 | API oficial da Meta (coexistência com o app) | serviço de atendimento | Responder 24h | **Já está na API**: no portfólio "Krav Maga Caveira - Mestre Wesley Gimenez" (id 556857634700129), conta do WhatsApp "Victor - Suporte", status Conectado, qualidade Alta, limite 250 clientes/24h, com o ManyChat como parceiro de controle total. O Facebook do Samuel tem acesso ao portfólio |
| Gemini / Flow (vídeo) | Navegador, ou API do Gemini paga à parte | social | B-roll e animações curtas, **nunca o rosto ou a voz do Wesley** | Assinatura atual só funciona pelo navegador |
| ChatGPT (imagens) | Navegador | social | Imagens estáticas (o Victor já usa assim) | Logar no Chrome Luis corinthiano |
| CapCut | Navegador | social | Edição. O agente prepara a lista de cortes e legendas; edição automática pelo navegador é frágil | Uso pontual |

## Regra de contas
Tudo da operação do Wesley fica nas contas do **Luis corinthiano** (luiscorinthianoportoreal@gmail.com) e no Facebook do Samuel. Nada nas contas da Digital Wisdom.

## Observações importantes
- **Assinatura não é API.** Gemini Pro, ChatGPT Plus, CapCut e Flow assinados dão acesso pelo site (navegador). Para um agente usar 24h sem navegador, cada um precisaria da API paga à parte. Começamos pelo navegador e só pagamos API do que provar resultado.
- **Vídeo de IA:** o Victor descartou vídeo de IA nos stories porque ficou com cara de artificial. Flow entra só para b-roll, animação de explicação e cenas sem pessoa. O Wesley continua gravando o principal.
- **Instagram e Facebook direto:** publicar pelo Metricool em modo revisão é mais seguro que o agente clicar no Instagram. Menos risco de bloqueio da conta.
- **Chaves e senhas:** nunca nos arquivos. Ficam nas configurações de cada conector ou em variáveis de ambiente.
