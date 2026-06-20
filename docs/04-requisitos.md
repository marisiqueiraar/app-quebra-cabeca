# 04 — Requisitos

Os 8 requisitos originais da Mariana e como cada um é atendido.

| # | Requisito | Como é atendido | Onde |
|---|-----------|-----------------|------|
| 1 | App de fácil navegação, orientações claras, poucas interfaces, para uma usuária 70+ | Linguagem visual com botões enormes, ícones, alto contraste, uma ação por tela e áudio em tudo | PR 3, PR 6 |
| 2 | Disponibilizar fotos a partir de pastas do telefone (iOS) e que apareçam no app | Upload das fotos para uma pasta do repositório; GitHub Actions processa e publica | PR 2 |
| 3 | Quebra-cabeça com diferentes números de peças e complexidade, escolhidos por ela | Seleção de dificuldade por ícones (ex.: 6, 12, 24, 48… peças) | PR 4 |
| 4 | Salvar o modelo em andamento para continuar depois | Auto-save no dispositivo + tela "continuar montando" | PR 5 |
| 5 | Tudo deste chat registrado e documentado em uma pasta nova no repo | Esta pasta `docs/` | PR 1 (aqui) |
| 6 | Gatilhos da automação no GitHub Actions, sem depender de ambiente local | `ci.yml` e `deploy.yml` no GitHub Actions disparam build e deploy | PR 1 |
| 7 | Brainstorm antes de começar + quebrar em PRs aprovadas | Sessão de brainstorm feita; plano de 7 PRs em [05](05-plano-de-prs.md) | PR 1 |
| 8 | Funcionar em telefones que não sejam só iOS | PWA roda em iPhone e Android no navegador | PR 1 |

## Repositório

- **URL:** https://github.com/marisiqueiraar/app-quebra-cabeca
- **Visibilidade:** público (ver decisão [D4](02-decisoes.md))
- **Branch padrão:** `main`
