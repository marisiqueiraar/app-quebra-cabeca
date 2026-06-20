# 06 — Registro do projeto

Linha do tempo das conversas e decisões, para cumprir o pedido de "registrar tudo
o que fizermos no chat". As datas são aproximadas ao período de cada conversa.

## Junho/2026 — Concepção e brainstorm

**A ideia.** A Mariana teve a ideia de um jogo de quebra-cabeça com fotos de
paisagens de lugares por onde já viajou, para presentear a avó (70+,
semialfabetizada). Objetivos: levar a avó para "conhecer" lugares e manter o lado
cognitivo ativo.

**Pedidos iniciais (8 requisitos).** Ver [04 — Requisitos](04-requisitos.md).

**Sessão de brainstorm.** Antes de codar, rodamos um brainstorm. Os pontos
levantados e as respostas da Mariana:

1. **Arquitetura** → escolheu **PWA** (em vez de app nativo de loja).
2. **Entrada de fotos** → escolheu **upload manual pelo navegador** na v1.
3. **Acessibilidade** → quis **áudio + a própria voz**, "mas pode ter texto também
   com explicações sobre o lugar". Combinamos: texto sempre acompanhado de áudio.
4. **Privacidade do repositório** → inicialmente preferiu **privado**; em seguida
   decidiu **deixar público** "para não ter grandes complexidades no momento".

**Hospedagem.** A Mariana ofereceu a conta dela no Vercel
(`mariana-siqueiras-projects`). Decidimos: **Vercel para hospedar + GitHub Actions
para disparar** o deploy, mantendo a automação no Actions e ganhando
pré-visualização por PR. (Link inicial fornecido foi corrigido depois para
`https://vercel.com/mariana-siqueiras-projects`.)

**Plano de execução.** Quebramos em **7 PRs** (ver [05](05-plano-de-prs.md)), com a
Mariana aprovando cada uma antes do merge.

## Contexto técnico do ambiente

- `gh` (GitHub CLI) autenticado; contas `maririsiqueira` e `marisiqueiraar` com
  escopos `repo` e `workflow`. O repositório está sob `marisiqueiraar`.
- Node 24, npm 11 na máquina de desenvolvimento.

## PR 1 — Fundação & documentação

Primeira entrega. Conteúdo:
- Scaffold do PWA (Vite + React + TypeScript) com `vite-plugin-pwa`.
- Ícone do app (fonte SVG + PNGs gerados por script).
- Esta documentação (`docs/`).
- Workflows do GitHub Actions: `ci.yml` (build) e `deploy.yml` (Vercel).
- `vercel.json` para deploy determinístico.

Resultado: um app "vazio", porém **instalável** na tela inicial e publicável.
