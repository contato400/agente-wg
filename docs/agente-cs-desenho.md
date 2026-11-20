# Agente de sucesso do aluno (CS ativo) · desenho (ideia do Victor, 20/11)

Dono: `sucesso-aluno-wg`. Quem fala com o aluno: o agente do WhatsApp (worker `agente-wg`).

## O que ele faz (a cada 4 dias, de manhã)
1. **Junta os alunos** que compraram nos últimos 5 meses e daqui para frente:
   - Greenn (API, vendas pagas) e Hotmart (API, vendas aprovadas): quem comprou, o quê e quando.
   - Cademi (Relatórios: Alunos, Ranking e Produtos; ou API da Cademi se o Victor gerar o token): último acesso, % assistido, terminou ou não.
2. **Classifica cada aluno** (sem gravar nome, telefone ou e-mail em memória ou relatório):
   | Situação | Regra | Mensagem |
   |---|---|---|
   | Nunca entrou | comprou há 1 a 14 dias e 0 acesso | primeiro acesso (link da Academia) |
   | Parou | acessou, mas nada há 10+ dias e não terminou | recuperação |
   | Indo bem | acessou nos últimos 7 dias e passou de 30% | parabéns + próximo passo |
   | Terminou | 100% ou certificado | parabéns + certificado + próximo curso |
   | Comprou há 3 meses e parou | regra "Parou" com compra antiga | recuperação mais forte |
3. **Monta o painel** (aba "Alunos CS" na planilha WG, só números por situação e por produto) e um relatório curto para o Victor.
4. **Passa a lista ao agente do WhatsApp** pela porta dos agentes do worker (rota com AVISO_TOKEN). A lista vai só para o worker, que guarda no KV por 7 dias e apaga.
5. O agente do WhatsApp manda as mensagens, uma por aluno, no horário comercial, e responde quem voltar.

## Mensagens (tom do Victor, 20/11)
- **Parabéns:** "Shalom, [nome], tudo bem? Vi aqui que você é nosso aluno e tô passando para te parabenizar: seu empenho no [curso] está top! Já tem planos para quando terminar? Se quiser, te mostro o próximo passo. Tamo junto, Caveira!"
- **Recuperação:** "Shalom, [nome], tudo bem? Vi que você parou de assistir o [curso]. A sua segurança de amanhã depende de você continuar, viu? Não deixa para amanhã o que você pode fazer agora. Te mando o seu acesso aqui, caso tenha perdido: [link]. Assiste a próxima aula hoje e termina o curso. Tamo junto, Caveira!"
- **Primeiro acesso:** usar os textos do SA2.
- **Terminou:** "Parabéns, [nome]! Você terminou o [curso]. Seu certificado já está na área do aluno. O próximo passo que eu indico é o [próximo curso]: [link com UTM]. Tamo junto, Caveira!"

## Custo e limites (decidir com o Victor)
- Mensagem que nós começamos no WhatsApp oficial (API) fora da janela de 24h só sai com **modelo aprovado pela Meta**: cerca de US$ 0,07 por pessoa (marketing). Teto combinado: até US$ 15 por mês, cerca de 200 mensagens.
- Para gastar menos: priorizar "Parou" e "Terminou" (maior chance de venda e de salvar aluno); "Indo bem" só por e-mail.
- Sem crédito da Anthropic, o agente usa o plano B (Workers AI) só para responder; o disparo é por modelo fixo, sem IA.

## O que precisa para ligar
1. Token da API da Cademi (Victor gera em Configurações > Integrações) ou leitura semanal dos relatórios pela tela.
2. 3 modelos de mensagem aprovados na Meta (parabéns, recuperação, terminou).
3. Rota `/cs-lista` no worker (recebe a lista da semana) e o disparo com intervalo entre mensagens.
4. OK do Victor no custo mensal.
