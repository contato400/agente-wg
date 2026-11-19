---
name: disparo-academia-wg
description: Disparo de e-mail para toda a base de alunos da Academia Caveira (Cademi) usando o modelo "Boas-vindas de compra" e o reenvio de acesso em 3 guias. Usar quando pedirem e-mail para os alunos, disparo na Academia ou recado para a base.
---

# Disparo de e-mail para a base da Academia (Cademi)

Método usado em 12/11, 14/11, 16/11 e 19/11 (reabertura, 23.155 alunos). Carregue antes `wg-regras-operacao` e, para o texto, `copy-conversacional-wg` e `oferta-irresistivel`.

## Antes
1. Copy aprovada pelo Victor (texto final, link com UTM `utm_source=vc&utm_medium=email-academia`, número de suporte (31) 99329-4274). Disparo em massa só com o "pode mandar" ou o "bora" dele no chat.
2. **Navegador certo:** Chrome do perfil **Victor Augusto** (computador DESKTOP-457USIT), onde estão as listas `kmc_*` no localStorage. No Chrome do Luis corinthiano a Academia não fica logada. Se aparecerem vários Chromes conectados, usar `switch_browser` e o Victor clica em Conectar no certo.
3. **Login:** quem clica em "Entrar" é o Victor (o navegador preenche, o agente nunca faz login).

## Montar o e-mail
- Configurações → Personalização → **E-mails** (`/dashboard/settings/emails`).
- **Boas-vindas de compra → Personalizar:** antes de mudar, salvar o texto atual em `localStorage.kmc_bk_tpl_<data>`. O campo aceita HTML (quadro de destaque com div estilizada, botão com `<a>` estilizado). Imagem só com link público; sem link, faz o destaque em HTML. Salvar e conferir o aviso "Atualizado".
- A Cademi acrescenta sozinha "Olá, nome", usuário, senha nova e botão de entrar. Por isso o fim do texto avisa: "Abaixo estão os seus dados de acesso".
- **Aparência dos e-mails → Nome do remetente:** "Mestre Wesley" (padrão é "Wesley Gimenez"). Salvar.
- **Atenção:** o modelo é global. Quem comprar durante o disparo recebe esse texto. Voltar ao padrão logo no fim.

## Lista
- Base: `kmc_d16_all` (ou a lista mais recente) + alunos novos (página 1 de `/dashboard/students`, ordenação "latest", ids que não estão na lista).
- Tirar quem já comprou a campanha: `/dashboard/students?delivery=275158` (entrega da Black). A lista carrega 20 por vez: chamar `$wire.call('loadMore')` e **juntar os ids a cada carga** (o DOM troca as linhas). Conferir o total contra o número da tela ("76 de 23.229").
- Tirar a conta de teste do Victor (id 27919841), que já recebeu o teste.
- Salvar em `kmc_<dNN>_all`, `kmc_<dNN>_black`, `kmc_<dNN>_new`.
- **Não usar `$wire.set('perPage', 200)`:** dá erro 500 e quebra o componente (recarregar a página).

## Teste
- Buscar `victoralgusto895` na lista de alunos, pegar o id em `wire:key="aluno-<id>"` e chamar `reenviarAcessoAluno(id)`. A senha dessa conta muda.

## Enviar (3 guias)
- Runner: `kmc_d16_runner` com as chaves trocadas para a data (`localStorage.kmc_dNN_runner = kmc_d16_runner.split('kmc_d16_').join('kmc_dNN_')`).
- Abrir 3 guias em `/dashboard/students` e em cada uma: `eval(localStorage.kmc_dNN_runner); window.__kmcRun(<0|1|2>, 3)`. Lotes de 8 em paralelo, cerca de 6 por segundo por guia; 23 mil em cerca de 25 a 30 minutos.
- Andamento: `window.__st` em cada guia; enviados em `kmc_dNN_sent_<parte>`, erros em `kmc_dNN_err_<parte>`. Para pausar: `window.__stop = true`. Para retomar: rodar de novo (pula quem já foi).
- O Chrome precisa ficar aberto, na frente e sem a tela apagar. Escondido, o envio trava.

## Depois
1. Voltar o modelo ao texto de `kmc_bk_tpl_<data>` e o remetente a "Wesley Gimenez". Conferir.
2. Registrar no projeto (`kairos/disparo-academia-<assunto>-<data>.md`): enviados, erros, excluídos, conteúdo, horários.
3. Medir as vendas pelo `utm_medium=email-academia` e a `utm_campaign` do disparo.

## Link do grupo de espera (desde 19/11)
Todo link para o grupo passa pelo contador: `https://www.wesleygimenez.com.br/grupo?utm_source=vc&utm_medium=<canal>&utm_campaign=<campanha>&utm_content=<peca>&utm_term=ag-<agente>`. A página conta o clique pelo canal (Atomicat) e manda para o DevZapp (s9mRreup). Canais: email-academia, instagram-comentario, instagram-novo-seguidor, instagram-story, instagram-live, facebook-comentario, grupos-regua, whatsapp-atendimento. Nunca mandar o link do DevZapp direto: sem o contador o clique não aparece no dashboard Captação Caveira.
