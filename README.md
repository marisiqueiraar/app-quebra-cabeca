# 🧩 Quebra-Cabeças da Vó

Um aplicativo de quebra-cabeças feito com fotos das nossas viagens — um presente
para a vó (70+, semialfabetizada) "conhecer" lugares e exercitar a mente.

É um **PWA**: um app que funciona no navegador, instala na tela inicial do celular
(iPhone **e** Android) com um toque, e funciona offline.

> 📖 A história completa, as decisões e o plano estão em **[`docs/`](docs/README.md)**.

## Como rodar localmente

Precisa de [Node.js](https://nodejs.org) 20+.

```bash
npm install        # instala as dependências
npm run dev        # abre o app em modo desenvolvimento
npm run build      # gera a versão de produção (pasta dist/)
npm run preview    # pré-visualiza o build de produção
npm run icons      # regenera os ícones PNG a partir de assets/icon.svg
```

## Como é publicado

O **GitHub Actions** é o cérebro da automação:

- **`ci.yml`** — builda o app em toda PR e push (checagem, sem segredos).
- **`deploy.yml`** — builda e publica no **Vercel**:
  - push na `main` → **produção**;
  - pull request → **pré-visualização** com link comentado na PR.

### Configurar o deploy (uma vez)

No GitHub, em **Settings → Secrets and variables → Actions**, crie 3 segredos:

| Segredo | Onde achar no Vercel |
|---------|----------------------|
| `VERCEL_TOKEN` | Account Settings → Tokens → Create |
| `VERCEL_ORG_ID` | Projeto → Settings → General (ou `.vercel/project.json` após `vercel link`) |
| `VERCEL_PROJECT_ID` | Projeto → Settings → General |

Enquanto os segredos não existirem, o deploy é pulado automaticamente e o `ci.yml`
continua verde.

## Estrutura

```
src/                  código do app (React + TypeScript)
public/icons/         ícones do app
assets/icon.svg       fonte do ícone
scripts/              utilitários (geração de ícones)
docs/                 documentação do projeto
.github/workflows/    automação (CI + deploy)
```

## Roadmap

Sete entregas (PRs). Ver **[plano de PRs](docs/05-plano-de-prs.md)**. Estamos na
PR 1 (fundação).
