# 02 — Decisões

Cada decisão abaixo veio de uma conversa de brainstorm e foi escolhida pela
Mariana. Registramos a **opção escolhida**, as **alternativas** e o **porquê**.

## D1 — Plataforma: PWA (e não app nativo)

**Escolhido:** PWA (Progressive Web App) — um "site-aplicativo" instalável.

**Alternativa descartada:** app nativo na App Store / Play Store.

**Porquê:** o app precisa funcionar em iPhone **e** Android, sem depender de
ambiente local e com automação no GitHub Actions. App nativo exigiria Mac, Xcode,
conta de desenvolvedor Apple (US$ 99/ano), conta Google Play e — pior para a vó —
baixar e atualizar pela loja. O PWA roda no navegador, instala na tela inicial com
um toque, funciona offline, é grátis para hospedar e atualiza sozinho. Atende quase
todos os requisitos "de graça".

## D2 — Entrada de fotos: upload manual pelo navegador (na v1)

**Escolhido:** a Mariana arrasta as fotos para uma pasta do repositório pela página
do GitHub (dá para fazer pelo próprio celular). O GitHub Actions então processa
(redimensiona, gera miniaturas, monta a lista) e publica.

**Alternativas:** Atalho do iOS (1 toque, via API do GitHub) ou pasta na nuvem
(iCloud/Dropbox com ponte de sincronização).

**Porquê:** o upload manual é o caminho mais simples e robusto para começar, sem
configurar tokens nem serviços extras. O Atalho do iOS fica como evolução futura.

## D3 — Acessibilidade: áudio + voz da Mariana + texto curto

**Escolhido:** botões grandes, ícones, mínimo de texto **e** narração em áudio do
nome/descrição do lugar, com a opção de a Mariana **gravar a própria voz** contando
cada viagem. O texto explicativo sobre o lugar também existe, mas **sempre
acompanhado de áudio** — nunca como única forma de informação.

**Porquê:** a vó é semialfabetizada. Áudio e texto se reforçam: ela se orienta pelo
som e pela imagem; o texto serve para quem a acompanha. A voz da neta transforma o
jogo em algo afetivo.

## D4 — Privacidade do repositório: público (por simplicidade)

**Escolhido:** repositório **público**.

**Histórico:** a preferência inicial foi por repositório privado (para proteger as
fotos). Depois a Mariana optou por **deixar público** "para não ter grandes
complexidades no momento".

**Consequência conhecida e aceita:** as fotos de paisagem ficam acessíveis a quem
encontrar o repositório. Como são paisagens de viagem, o risco é baixo. Se um dia
quiser fechar, dá para migrar para privado + hospedagem com proteção.

## D5 — Hospedagem: Vercel, disparado pelo GitHub Actions

**Escolhido:** o app é hospedado no **Vercel** (conta da Mariana), e o **GitHub
Actions** é quem dispara o deploy — assim a automação continua toda no Actions
(requisito do projeto), e ganhamos um superpoder do Vercel: **cada PR recebe uma
URL de pré-visualização** para testar no celular antes de aprovar.

**Alternativa descartada:** GitHub Pages. O Pages gratuito só publica de
repositório público (ok aqui), mas não dá pré-visualização por PR de forma tão
simples. Como a Mariana ofereceu a conta do Vercel, ele venceu.

**Fluxo:** push na `main` → produção. Pull request → pré-visualização + comentário
com o link na própria PR.

## D6 — Salvamento do progresso: no próprio aparelho

**Escolhido:** o progresso do quebra-cabeça é salvo **no dispositivo** (IndexedDB/
armazenamento local do navegador). Sem servidor, sem conta.

**Porquê:** simples, funciona offline e é privado por natureza. A contrapartida é
que o progresso fica no aparelho onde ela joga — o que é exatamente o caso de uso
(o tablet/celular da vó).

## D7 — Idioma

Tudo em **português do Brasil**, incluindo nomes de variáveis voltados ao domínio
quando ajudar a leitura.
