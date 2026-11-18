# Livro 06 · Agente de Código na Prática (Tiago Lemos) · notas e aplicação no WG

Lido em 18/11/2026 (16 capítulos: estrutura, comandos, listas de conferência e erros comuns). Notas com palavras próprias.

## O que o livro ensina
- **Quatro verbos de quem não programa:** decidir (especificação curta), pedir (um pedido completo por vez, plano antes de mudar), conferir (com os próprios olhos, no celular e no computador) e aprovar (cada comando que mexe em arquivo, servidor ou conta, depois de ler o que faz).
- **Quatro regras do começo ao fim:** senha, chave e token nunca no chat; servidor só entra por chave SSH; banco nunca aberto para a internet; segredos no `.env` do servidor, fora do Git. Modo que dispensa permissões fica desligado.
- **Chat x Code:** o chat responde, o Code entrega arquivo. Se o resultado vai ser guardado e mudado depois, é Code.
- **Plano antes de fazer** (modo Plan), todas as correções do plano numa mensagem só, depois "pode seguir". Plano com texto, número ou depoimento que você não deu: corrigir antes.
- **Projeto que se lembra:** `CLAUDE.md` curto, só regras e "Como rodar" (o que mudou fica no Git; CLAUDE.md que vira diário faz o Claude ignorar regras); versões com nome no Git para voltar só uma parte; `settings.json` negando a leitura do `.env`; pedido de retomada na sessão nova; **passagem de bastão** quando a conversa fica longa.
- **Nada inventado:** varredura "o que não veio do arquivo" até voltar vazia; colchete `[FALTA]` no lugar de dado que não existe.
- **App por especificação:** funções, regras de comportamento **com exemplo**, e uma referência conhecida. Uma regra por mensagem, com "não mude mais nada". Regra nova muda o `especificacao.md` e passa por **conferência de regressão** (tabela de tudo que já funcionava).
- **Quem testa é o Claude:** roteiro de teste aprovado antes, dados fictícios marcados TESTE (e zerados depois), lista de achados, um defeito relatado por vez com print, "me mostre a prova" num item OK, e o CLAUDE.md manda rodar o roteiro depois de cada mudança.
- **Dados:** para cada campo, "para quê?"; sem resposta, o campo sai. Ficha de dados com quem vê o quê, controlador e operador (LGPD).
- **Servidor e banco:** HTTPS com proxy reverso, só portas 22, 80 e 443; banco escuta só por dentro; isolamento provado com duas contas; cópia diária fora do servidor **com restauração testada** (cópia que nunca voltou não vale).
- **APIs no projeto:** chaves só no `.env` do servidor e `.env.example` só com os nomes; e-mail transacional de domínio verificado (SPF, DKIM, DMARC); planilha como painel do dono, o sistema nunca apaga linha; registro de cada envio com sucesso ou erro; saber trocar uma chave vazada.
- **Site de cliente:** autorização por escrito; diagnóstico só de leitura (nunca testar o formulário do cliente); no máximo seis achados, cada um com print ou medição; refazer mantendo logo, paleta e fotos (a referência muda o ritmo, não a identidade); nada de oferta que o dono não pediu; prévia com senha e fora da busca.
- **Publicar com domínio:** salvar a zona de DNS antes, plano de volta escrito, conferir que o e-mail (MX, TXT) segue chegando, redirecionar endereços antigos.
- **Entrega:** escopo técnico (incluído, não incluído, o que muda o escopo); **toda conta no nome do cliente** (domínio no CNPJ dele); senha só por gerenciador, nunca por WhatsApp; monitor que avisa quando o site cai; relatório mensal de manutenção com data marcada.

## O que muda no Agente WG
| Lição | Situação hoje | Ajuste |
|---|---|---|
| CLAUDE.md curto, histórico no Git | CLAUDE.md com 11 seções, ainda enxuto; memória separada | Manter. Nada de decisão do dia no CLAUDE.md; vai para `memoria/` |
| Segredo fora do texto | Chaves da ponte escritas no prompt da tarefa agendada | Passar para variáveis de ambiente da tarefa (o Victor cola); `.claude/settings.json` negando ler `.env` e arquivos de chave |
| Roteiro de teste e regressão | Atendente do WhatsApp tem testes em `servico-atendimento/` | Criar `servico-atendimento/roteiro-de-teste.md` com as conversas-modelo (catálogo, acesso, reembolso, preço, fora do escopo) e rodar depois de cada mudança de base, antes de MODO=ativo |
| Dados mínimos | Formulários das pesquisas vão nascer | Pesquisas sem CPF, sem endereço; só o que tem "para quê" |
| Monitor e manutenção | Ninguém avisa se a ponte, o Worker ou uma página cai | Monitor gratuito (UptimeRobot) para o Worker, a ponte e as páginas principais, alerta no e-mail do Luis corinthiano; o analista já marca "aba Vendas vazia" como alerta |
| Contas no nome do cliente | Muita coisa na conta Luis corinthiano e no Facebook do Samuel | Inventário de acessos do negócio do Wesley (domínio, Greenn, Hotmart, Meta, WhatsApp, Atomicat, ManyChat): em nome de quem está e quem tem acesso. Decisão do Victor e do Wesley |
| Varredura do que não veio do arquivo | Regra "nunca inventar" no CLAUDE.md | Toda página nova do ofertas passa pela varredura antes da fila |
