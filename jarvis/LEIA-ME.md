# Jarvis + Agente WG

O Jarvis (github.com/edirsooo/jarvis) é um assistente de voz para **Windows**. Você fala "Jarvis, ..." e ele abre o Claude Code no seu computador para fazer o pedido, mostrando na tela o que está acontecendo. Aqui estão os processos que fazem ele conversar com a equipe de agentes do Wesley.

## 1. Instalar o Jarvis (no seu computador Windows)

Abra o Claude Code numa pasta onde você guarda programas (ex.: `Documentos\Programas`) e cole:

```
Instale o Jarvis deste repositório: https://github.com/edirsooo/jarvis
Clone numa pasta chamada Jarvis, leia o INSTALAR.md e siga o passo a passo de instalação. Meu nome é Victor.
```

Precisa de Python 3.10 ou mais novo (python.org, marcando "Add python.exe to PATH") e do Claude Code logado na sua conta.

## 2. Pôr a equipe do Wesley dentro do Jarvis

Na mesma pasta onde ficou a pasta `Jarvis`, cole no Claude Code:

```
Clone o repositório contato400/agente-wg numa pasta chamada agente-wg, ao lado da pasta Jarvis.
Copie os arquivos de agente-wg\jarvis\processos\ para Jarvis\modelos\meus\.
No Jarvis\config.json, acrescente em "regras_extras" as três regras do arquivo agente-wg\jarvis\regras_extras.txt.
```

Depois, cadastre no Windows as variáveis de ambiente `WG_PONTE_URL`, `WG_PONTE_K`, `WG_PONTE_A` e `WG_AVISO_TOKEN` com os mesmos valores da tarefa agendada. Sem elas, os agentes leem o repositório, mas não a planilha nem o WhatsApp.

## 3. Como falar

| Você fala | O que acontece |
|---|---|
| "Jarvis, financeiro: quanto entrou ontem?" | o agente financeiro responde (processo "falar com um agente") |
| "Jarvis, social: me dá 3 ideias de reels sobre golpe do Pix" | o social-media-wg responde e põe na fila o que for post |
| "Jarvis, como foi ontem?" | debriefing do chefe |
| "Jarvis, faz a pauta do Instagram" | pauta do dia para aprovar |
| "Jarvis, quanto falta para a meta?" | bloco Dinheiro |

## 4. Segurança (leia)

- O Jarvis roda o Claude Code **sem pedir confirmação a cada passo** (`bypassPermissions`). Ele pode criar e mudar arquivos e rodar comandos no seu computador.
- As regras do Agente WG continuam valendo: nada sai sem aprovação. Mas, no Jarvis, isso é instrução para a IA, não uma trava. Por isso as regras extras abaixo vão em toda missão.
- Cada pedido gasta a cota da sua assinatura do Claude.
