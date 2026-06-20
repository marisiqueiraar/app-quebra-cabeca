# 03 — Arquitetura

## Visão geral

```
   iPhone da Mariana                GitHub                          Vercel
   ┌──────────────┐         ┌──────────────────────┐         ┌──────────────┐
   │ Fotos das    │  upload │ Repositório público   │ deploy  │ App publicado │
   │ viagens      ├────────►│  - fotos/ (originais) ├────────►│ (URL fixa +   │
   │              │ (web)   │  - código do app PWA  │ (Actions│  preview/PR)  │
   └──────────────┘         │  - GitHub Actions     │  →CLI)  └──────┬───────┘
                            └──────────────────────┘                 │
                                      ▲                               │ abre no
                                      │ processa fotos                ▼ navegador
                                      │ (resize, miniaturas,    ┌──────────────┐
                                      │  lista de álbuns, áudio)│  Vó joga 🧩   │
                                      └─────────────────────────┤ (tela inicial)│
                                                                └──────────────┘
```

## Camadas

### 1. App (PWA)
- **Stack:** Vite + React + TypeScript.
- **PWA:** `vite-plugin-pwa` gera o `manifest` e o service worker (funciona
  offline depois da primeira abertura).
- **Onde mora:** pasta `src/` (código) e `public/` (estáticos, ícones).
- **Por que essa stack:** leve, padrão de mercado, build rápido, fácil de manter.

### 2. Pipeline de fotos (chega na PR 2)
- A Mariana sobe fotos para uma pasta no repositório.
- Um workflow do GitHub Actions:
  1. redimensiona e otimiza as imagens (biblioteca `sharp`);
  2. gera miniaturas;
  3. monta um arquivo de manifesto (lista de álbuns/fotos + metadados);
  4. (opcional) gera áudio do nome do lugar.
- O app lê esse manifesto para montar a "estante de fotos".

### 3. Automação e deploy
- **GitHub Actions** é o cérebro (requisito do projeto).
  - `ci.yml`: builda o app em toda PR/push (checagem que não precisa de segredos).
  - `deploy.yml`: builda e publica no Vercel.
    - push na `main` → **produção**;
    - pull request → **pré-visualização** + comentário com o link na PR.
- **Vercel** é só o lugar onde o app fica de pé. Configurado por 3 segredos no
  GitHub: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

### 4. Dados no dispositivo
- Progresso dos quebra-cabeças salvo localmente (IndexedDB/armazenamento do
  navegador). Sem backend, sem contas.

## Estrutura de pastas (atual e planejada)

```
app-quebra-cabeca/
├── assets/icon.svg              # fonte do ícone do app
├── public/icons/                # ícones PNG gerados (versionados)
├── scripts/generate-icons.mjs   # gera os PNGs a partir do SVG
├── src/                         # código do app (React)
├── docs/                        # esta documentação
├── fotos/                       # (PR 2) fotos originais das viagens
├── .github/workflows/           # automação (CI + deploy)
├── vite.config.ts               # configuração do build + PWA
└── vercel.json                  # framework/saída para o Vercel
```
