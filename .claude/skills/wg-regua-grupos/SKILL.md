---
name: "wg-regua-grupos"
description: "Montar a régua de mensagens dos grupos de WhatsApp do WG para o Gui programar (grupo novo de espera x grupos antigos), com imagens e links com UTM. Use quando pedirem régua, disparo nos grupos ou mensagens para o Gui."
---

# Régua dos grupos WG (para o Gui)

Carregue antes a skill wg-regras-operacao.

## Formato de entrega
- Uma página (Artifact HTML) que o Gui abre no celular, compartilhada por link ("qualquer pessoa com o link").
- Mensagens em ordem cronológica por dia e horário, cada uma com:
  - etiqueta de público: "Todos os grupos", "Só grupo de espera (novo)" ou "Só grupos antigos";
  - texto pronto com botão Copiar;
  - imagem quadrada 1080x1080 (quando houver) publicada junto como arquivo do artifact;
  - link com UTM: `utm_source=vc&utm_medium=whatsapp-grupo&utm_campaign=<campanha>&utm_content=<horário>`.
- Filtros no topo para o Gui ver só um público.
- Sem seções de Instagram ou "fora dos grupos" (o Victor tirou).
- Também mandar um .zip com as imagens numeradas na ordem da régua.

## Regras de narrativa
- Mesmo tom do e-mail aos alunos da Academia: indireto, informal, linguagem do Wesley.
- Grupos antigos: o link sai primeiro no grupo oficial de espera; nos antigos, chamar para entrar no grupo novo (link devzapp).
- Reabertura: prazo só o decidido pelo Victor (20/11: vai até segunda 23/11 às 19h). Mostrar a parcela como valor principal, nunca o total parcelado, nunca boleto.
- Garantia 7 dias; suporte (31) 99329-4274.

## Imagens
- Quem gera as imagens é o ChatGPT (conta TATIANA ABREU, conversa "Victor. A"). Mandar lá o pedido numerado (PEDIDO 1, 2...) com o texto da peça, sem dado pessoal de aluno.
- O Victor coloca as imagens numa pasta do Drive; baixar, renomear na ordem, converter para JPG 1080x1080 (grupos) ou 1080x1350 (carrossel).

## Atualizar
- Para revisar, republicar o MESMO artifact (mesma URL), nunca criar outro.
- Ao terminar, mandar o link para o Victor repassar ao Gui.

## Link do grupo de espera (desde 19/11)
Todo link para o grupo passa pelo contador: `https://www.wesleygimenez.com.br/grupo?utm_source=vc&utm_medium=<canal>&utm_campaign=<campanha>&utm_content=<peca>&utm_term=ag-<agente>`. A página conta o clique pelo canal (Atomicat) e manda para o DevZapp (s9mRreup). Canais: email-academia, instagram-comentario, instagram-novo-seguidor, instagram-story, instagram-live, facebook-comentario, grupos-regua, whatsapp-atendimento. Nunca mandar o link do DevZapp direto: sem o contador o clique não aparece no dashboard Captação Caveira.

## Programar a régua direto no DevZapp (desde 19/11, sem passar pelo Gui)
Quem programa: `ofertas-paginas-wg` (dono da régua), com os textos aprovados pelo Victor. Chrome Luis corinthiano, app.devzapp.com.br, campanha "Gestão" (6ae3ead39dd1220001430082).
1. Texto aprovado na régua (artifact). Todo link da Black com `utm_source=vc&utm_medium=whatsapp-grupo&utm_campaign=<campanha>&utm_term=ag-ofertas&utm_content=<dia+hora>`; link de grupo pelo contador.
2. Abrir `/v3/dev-grupos/new-message/<campanha>`, título `<dia> <hora> vN`, colar o texto e marcar **Mencionar todos os usuários do grupo** (é o 4º checkbox da tela; clicar no input, não no label).
3. Salvar → no cartão que abre, escolher **Agendar envio** (não "Enviar agora") → data e hora (input nativo date/time, valor `AAAA-MM-DD` e `HH:MM`) → Continuar → **Selecionar todos os grupos** (80) → Continuar → conferir "Total de grupos" e "Data e hora" → Criar agendamento.
4. Automação pronta: `devzapp-criar-agendar.js` (lê a lista `localStorage.__jobs` com title, date, time, text; troque IDX). Rodar uma mensagem por carregamento da página (o app recarrega ao criar o agendamento), com 4 s de espera entre uma e outra.
5. Conferir no fim em Agendamentos: total "Programado" e a lista de títulos e horários. API de leitura das mensagens: `GET devzapp.com.br/api-mensagem/mensagem/listbycampanha/<campanha>` com `Authorization: Bearer localStorage.access_token` (campo `mensionarGrupo`).
- Editar uma mensagem já agendada muda o agendamento dela (não precisa reagendar). Abrir a edição pelo botão da linha dentro do app, não pela URL direta (carrega formulário velho).
- Mensagem nova não substitui agendamento antigo: antes de criar, listar os "Programado" para não duplicar.
- Imagem: anexar na mesma tela (input de arquivo) antes de salvar; se a imagem chegar depois, editar a mensagem e anexar.
- **Página contador (/grupo, Atomicat WoX65DbV5lhDM2oJgcty):** em 19/11 21h o redirecionamento automático tinha sumido (a página só mostrava o botão e ficava "carregando"). Corrigido com `<script id="ir">` que leva para o DevZapp 0,4 s depois do load (máx. 1,5 s), repassando a query. Conferir sempre com Playwright depois de publicar: tem de terminar em chat.whatsapp.com. Atenção: o editor da Atomicat já estragou `content=` das metas uma vez; ler o arquivo depois de editar.
- **Imagem na mensagem do DevZapp (19/11):** abrir a edição pelo botão da linha (a lista é rolagem virtual: rolar até achar o título), mandar o arquivo no input de arquivo (só aceita 1 anexo; para trocar, clicar na lixeira do anexo antigo), ligar **Anexo com legenda** (1º checkbox) para a imagem sair junto com o texto e o @todos, Salvar. Editar não mexe no agendamento (conferir o total "Programado" no fim). Conferir pela API: campo `files` da mensagem.
- **Imagens do ChatGPT:** ele gera 3 a 5 por resposta se pedir ("próxima: 11 a 15"). O ChatGPT bloqueia mandar a imagem para fora da página; o caminho que funciona é o Victor baixar e arrastar as artes para a conversa, e daí subir no DevZapp.
