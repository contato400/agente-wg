---
name: "wg-manychat-funis"
description: "Trocar destino, texto ou UTM dos funis do ManyChat do WG (Instagram, Facebook e live com CAVEIRA/BC): grupo de espera, carrinho relâmpago, reabertura. Use quando pedirem para mexer, virar ou reverter funil do ManyChat."
---

# Funis do ManyChat WG

Carregue antes a skill wg-regras-operacao.

## Onde fica
- Conta ManyChat: fb639679992741917 (Instagram do Wesley + página do Facebook "Wesley Gimenez Krav Maga Caveira", asset 106627445779933 + WhatsApp "Equipe Santiago").
- Funis ativos que costumam mudar de destino:
  - Instagram: comentários, novo seguidor, resposta a story, live (palavras CAVEIRA e BC).
  - Facebook: "FACEBOOK - Comentarios - grupo de espera - 1711" (qualquer post, qualquer palavra; DM no Messenger + 2 respostas públicas + curtir comentário). Facebook não tem gatilho de novo seguidor nem de story.
- Mexer só no funil pedido. O resto fica como está.

## Como editar sem quebrar
1. Antes de mudar, copiar o texto atual (para poder reverter igual).
2. No construtor básico: clicar na caixa de texto, ctrl+a, Delete, digitar, clicar fora para salvar.
3. O ManyChat costuma comer o primeiro caractere digitado ("UERO", "ttps://"). Sempre conferir com zoom e corrigir com Home + o caractere que faltou.
4. Botão de link: URL com UTM que identifica a origem, ex.:
   - live: `utm_source=vc&utm_medium=instagram-live&utm_campaign=live-relampago-DDMM&utm_content=manychat-caveira`
   - comentários: `utm_medium=instagram-comentario` / `facebook-comentario`
5. Publicar e testar comentando de outra conta quando possível.

## Viradas típicas
- **Grupo de espera → página de vendas** (ex.: reabertura sexta 19h): trocar em todos os funis o texto "entra no grupo" pelo texto de carrinho aberto e o botão ENTRAR NO GRUPO pelo link da página da Black com UTM. Nunca dizer data de fechamento.
- **Carrinho relâmpago na live:** texto "Fala, caveira, tô em live... carrinho relâmpago, só enquanto durar essa live" + link direto da página com UTM da live. Depois da live, reverter para o texto anterior.
- **Página de vendas → grupo de espera** (fechamento): voltar o botão para o link do grupo (devzapp) e o texto de fila de espera.

## Permissões
- Se a resposta pública no Facebook pedir permissão: Configurações → Messenger → Atualizar Permissões (escolher "apenas atuais" em cada etapa). Precisa de perfil com admin na página.
- O link da bio do Instagram só o Victor troca pelo app.

## Fechamento
Responder em tabela curta: Funil | Antes | Depois | Testado?