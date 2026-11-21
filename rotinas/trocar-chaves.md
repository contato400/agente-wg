# Trocar as chaves que aparecem em texto puro nos prompts das tarefas agendadas

Pedido do Victor (21/11, áudio). Quem faz: o Victor, logado. Os valores nunca entram neste arquivo.

## O que está exposto
Os prompts das duas tarefas agendadas (Executor e Rotina diária) trazem em texto as variáveis `WG_PONTE_URL`, `WG_PONTE_K`, `WG_PONTE_A` e `WG_AVISO_TOKEN`.

## Passo a passo
1. **Girar a chave da ponte** (Apps Script da planilha WG, conta Luis corinthiano): no código do script, trocar os valores de `K` e `A` por dois novos (texto longo e aleatório) e salvar. Reimplantar como nova versão. A URL só muda se criar uma nova implantação.
2. **Girar o token do aviso** (serviço agente-wg na Cloudflare): Workers > agente-wg > Settings > Variables, trocar o segredo `AVISO_TOKEN` por um novo e salvar.
3. **Guardar nos ambientes das tarefas**: em cada tarefa agendada (Executor e Rotina diária), abrir Configurações do ambiente e cadastrar `WG_PONTE_URL`, `WG_PONTE_K`, `WG_PONTE_A` e `WG_AVISO_TOKEN` como variáveis de ambiente.
4. **Limpar o prompt**: apagar a linha "CHAVES: export ..." e a instrução 2 que manda exportar no comando. Os scripts `rotinas/ponte.sh` e `rotinas/whatsapp.sh` já leem as variáveis do ambiente.
5. **Testar**: rodar `rotinas/ponte.sh ler Painel 1` e `rotinas/whatsapp.sh recados` numa tarefa de teste. As chaves antigas devem parar de funcionar.
6. Avisar o agente para registrar a troca em `memoria/passagem.md` (sem os valores).

Regra para a skill fila-aprovacao-wg: chave nunca entra no prompt da tarefa; ler de variável de ambiente.
