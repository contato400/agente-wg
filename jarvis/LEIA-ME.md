# Jarvis + Agente WG

O Jarvis (github.com/edirsooo/jarvis) é um assistente de voz para **Windows**. No computador do Victor ele é a ponta: o Victor fala "Jarvis, como está o financeiro?" e o Jarvis pergunta à equipe de agentes, que roda na nuvem (os mesmos agentes do WhatsApp com #nome, com a mesma memória e a mesma conversa), e responde em voz alta.

## Como funciona

- `wg/wg.py`: manda a pergunta para a porta `/perguntar` do serviço `agente-wg` na Cloudflare e imprime a resposta. A senha é a mesma do segredo `AVISO_TOKEN` e fica na variável `WG_AVISO_TOKEN` do Windows.
- `processos/agente_wg.md`: o processo "Equipe do Wesley" que o cérebro do Jarvis usa quando o assunto é a operação. Vai para `Jarvis\modelos\meus\`.
- `sobre_mim.md`: quem é o Victor e como usar a equipe. Vai para `Jarvis\memoria\`.
- `INSTALAR-VICTOR.bat`: confere Python e Claude Code, instala o Jarvis com o nome Victor, grava as regras da operação em `regras_extras`, guarda a senha e testa a conversa com o chefe.
- `regras_extras.txt`: as mesmas regras, para quem preferir colar na mão.

## Instalar

1. Baixar o `Jarvis-Victor.zip` (Jarvis já com tudo isso dentro) e extrair em `Documentos`.
2. Dar dois cliques em `INSTALAR-VICTOR.bat` e seguir o que ele pedir (Python e Claude Code, se faltarem; depois a senha).
3. Abrir o Jarvis pelo atalho da área de trabalho e dizer "Jarvis, como está o financeiro?".

## Segurança

- O Jarvis roda o Claude Code sem pedir confirmação a cada passo. Aqui ele só pergunta à equipe; quem age é a equipe na nuvem, com a regra de aprovação de sempre.
- Cada pergunta gasta a cota da assinatura do Claude no computador (cérebro do Jarvis) e a chave da API da equipe na nuvem.
