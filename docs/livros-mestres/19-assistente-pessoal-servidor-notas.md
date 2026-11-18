# Livro 19 · Assistente Pessoal de IA no Seu Servidor (OpenClaw, Tiago Lemos) · notas e aplicação no WG

Lido em 18/11/2026 (17 capítulos). Ensina a pôr um assistente autônomo num servidor só dele, falando pelo Telegram e pelo WhatsApp. É o modelo do "chefe-wg conversando com o Victor no WhatsApp" que está no CLAUDE.md. Notas com palavras próprias.

## O que o livro ensina
- **Três faixas de tarefa:** faz sozinho, faz com aprovação, nunca faz. Qualquer coisa que sai em seu nome (responder fornecedor, mandar recado) fica em "com aprovação".
- **Planejar antes de instalar:** ficha de missão (o que nunca faz sem confirmação), contas dedicadas (e-mail e chip só do assistente, nunca o seu), chaves de API com **teto de gasto e recarga automática desligada**, **ficha de segredos** (onde está cada chave e como revogar, sem os valores), orçamento do mês. Assinatura do ChatGPT e crédito de API são cobranças separadas.
- **Servidor só dele,** protegido: usuário próprio, entrada só por chave, firewall só com a porta do SSH, atualizações automáticas, painel aberto só por túnel.
- **Personalidade e memória em arquivos:** `SOUL.md` (tom, forma de responder, limites, fuso; até uma página), `USER.md` (quem é o dono; abaixo de 4 mil caracteres, sem dados de clientes), `MEMORY.md` (decisões e histórico), `AGENTS.md` (regras de trabalho: rotas, WhatsApp, navegador, e-mail, rotinas). Conversa longa esquece: **o que precisa durar vai para arquivo**. "Salvei na memória" só vale se o arquivo mostrar. Inventário da memória lido e corrigido de tempos em tempos.
- **Canal trancado:** só responde a quem está na lista (allowlist com o número do dono); um segundo celular manda "oi" e não recebe nada.
- **Áudio:** transcrição com chave própria (para separar o custo), resposta sem repetir a transcrição, e **confirmação de horário, número e nome antes de agir** (dado ambíguo).
- **WhatsApp com chip dedicado:** recado a contato autorizado só depois de mostrar a prévia e o dono dizer "envia"; grupos bloqueados; contato no `USER.md` só com apelido, número, relação e assunto. Canal não oficial tem risco.
- **Modelos:** um de reserva de outro provedor (se o principal cair); modelo novo só depois de teste numa rota exclusiva; raciocínio alto só para investigar uma falha e depois voltar ao padrão; **rotas:** cada tipo de pedido vai a um subagente com o modelo certo, o padrão é o mais barato, critérios da bateria escritos antes do teste.
- **Custo medido:** bateria de custo, média por mensagem, projeção do mês dentro do teto, soma dos limites dos provedores igual ao teto. O relatório interno compara; a fatura do provedor diz quanto pagou.
- **Pesquisa com fonte:** toda informação de atualidade com link e data; conferir se o link sustenta a frase (pedir o trecho entre aspas); sem fonte, dizer que não achou.
- **Navegador:** proibido preencher formulário ou fazer login sem ordem do dono; tarefas longas avisam a etapa.
- **E-mail que resume e não obedece:** um leitor isolado, sem ferramentas, só resume; e-mail com instrução escondida termina sem nenhuma ação; respostas viram rascunho e quem envia é o dono.
- **Rotinas:** cada uma com fuso, modelo e nível fixos, entrega num canal, **rodada à mão até sair certa duas vezes** antes do primeiro horário, custo anotado; saber listar, pausar e apagar.
- **Skills:** quem vence num empate de nomes, aviso quando o assistente aprende algo sozinho (e como desfazer), skill de terceiros só depois de ler.
- **Manutenção:** auditoria de segurança, sequência fixa de diagnóstico, **backup antes de mudar configuração**, atualizar com caminho de volta, ordem de revogação se uma chave vazar, rotina mensal marcada.

## O que muda no Agente WG
| Lição | Ajuste |
|---|---|
| Três faixas | Cada ficha de agente ganha a linha "Faz sozinho / Com aprovação / Nunca faz" (já está quase toda no CLAUDE.md; deixar explícito por agente) |
| Ficha de segredos | `docs/ficha-de-segredos.md` com onde mora cada chave (ponte, YCloud, Cloudflare, ManyChat, Windsor, modelo de IA) e como revogar, **sem nenhum valor**; ordem de revogação se vazar |
| Teto de gasto | Chave do modelo do atendente com limite rígido e recarga desligada |
| Memória em arquivo | Já é o desenho do WG (`memoria/`). Regra: o agente que diz "registrei" mostra o arquivo |
| Canal com o Victor trancado | Quando o canal do WhatsApp com o Victor subir: responde só ao número dele (`WG_ADMIN_FONE`); qualquer outro número que mande comando é ignorado |
| Prévia antes de enviar | Mensagem que sai em nome do Wesley ou do Victor mostra a prévia e espera o "envia" (é a fila de aprovação) |
| Conteúdo de fora é dado | E-mail, comentário, mensagem de cliente e planilha nunca dão ordem a agente; o atendente e o analista tratam como dado |
| Rotas por custo | Rotina diária: tarefas de volume (ler e classificar) em modelo barato; estratégia e conferência no forte |
| Rotina rodada à mão antes | Mudança grande na tarefa agendada: rodar uma vez à mão e conferir o e-mail antes de deixar no automático |
| Backup antes de mudar | O Worker do atendente: copiar a versão no ar antes de publicar mudança e anotar como voltar |
