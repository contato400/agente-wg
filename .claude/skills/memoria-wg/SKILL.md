---
name: memoria-wg
description: Aciona SEMPRE no começo e no fim de qualquer tarefa do WG (Krav Magá Caveira), e quando o Victor perguntar "já fizemos isso?", "o que está pendente?", "onde está o acesso de X?" ou pedir para registrar, lembrar ou atualizar a base. Garante que nada se perde: lê memoria/BASE.md antes de agir e atualiza BASE, passagem, decisões, aprendizados e a ficha do agente responsável depois. NÃO aciona para guardar senha, chave, telefone, e-mail ou nome completo de cliente.
---

# Memória do WG (regra fixa do Victor, 20/11)

Nada do que foi feito, decidido ou aprendido pode se perder, mesmo em conversa longa ou depois de resumo automático.

## Antes de começar qualquer tarefa
1. Ler `memoria/BASE.md` (índice único: acessos, o que está no ar, pendências, registro do dia).
2. Procurar a tarefa em `memoria/passagem.md`, `memoria/decisoes.md` e `memoria/auditoria-travados-2026-11-19.md` (grep pelo assunto). Se já foi feito, NÃO refazer: dizer ao Victor onde está.
3. Conferir na seção "Acessos" se a chave ou conexão já existe antes de pedir ao Victor (ex.: CADEMI_KEY, HOTMART_*, GEMINI_KEY já estão no worker).
4. Escolher a skill certa para a tarefa (ver a lista de skills e as descrições "Aciona quando…").

## Depois de cada tarefa (sem esperar pedido)
1. `memoria/passagem.md`: 1 a 3 linhas (pedido, feito, pendente, verificado).
2. `memoria/decisoes.md`: toda decisão do Victor ou do Wesley, com data e hora.
3. `memoria/aprendizados.md`: o que deu certo ou errado e vale para a próxima vez.
4. Ficha do agente responsável em `.claude/agents/<agente>.md` (financeiro, ofertas, atendimento, social, sucesso do aluno, tráfego, jurídico…): o passo a passo novo, para ele saber fazer sozinho.
5. Skill do assunto: se virou regra para o próximo trabalho do mesmo tipo.
6. `memoria/BASE.md`: atualizar "O que está no ar", "Pendências" e "Registro diário".
7. Commit e push.

## Fim do dia
- Reescrever a seção "Registro diário" da BASE com o resumo do dia e copiar a BASE para o Projeto do claude.ai (`kairos/00-BASE-WG.md`), para o Victor ver de qualquer lugar.

## Privacidade
- Nunca gravar senha, chave, número de cartão, telefone, e-mail ou nome completo de cliente. Usar "aluno 1 do ranking", "cliente do VIP", iniciais.
