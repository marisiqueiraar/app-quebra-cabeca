# 05 — Plano de PRs

O trabalho foi quebrado em **7 Pull Requests** sequenciais. A Mariana revisa e
aprova cada uma antes do merge — a URL de pré-visualização do Vercel permite
testar no celular antes de aprovar.

| PR | Título | Entrega | O que dá para ver |
|----|--------|---------|-------------------|
| **1** | Fundação & documentação | Scaffold do PWA, ícone, esta `docs/`, workflows de CI e deploy | App vazio, **instalável** na tela inicial |
| **2** | Pipeline de fotos | Pasta de fotos + metadados; Action que otimiza, gera miniaturas e a lista de álbuns; guia "como adicionar foto pelo celular" | Subir uma foto e ela aparecer no app |
| **3** | Tela inicial / álbum | Grade de fotos grandes, botões enormes, ícones, áudio ao tocar, alto contraste | A "estante de viagens" navegável |
| **4** | Motor do quebra-cabeça | Escolha de dificuldade por ícones, arrastar-e-soltar por toque, encaixe, dica "ver foto inteira", detecção de conclusão | Montar um quebra-cabeça de ponta a ponta |
| **5** | Salvar e continuar | Auto-save no dispositivo + tela "continuar montando" | Parar no meio e voltar sem perder nada |
| **6** | Recompensa, voz & texto do lugar | Tela final com foto inteira, narração (voz sintetizada + gravação da Mariana), texto curto sobre o lugar, comemoração | O momento afetivo ao terminar |
| **7** | Polimento & acessibilidade final | Testes em iPhone e Android reais, offline completo, tamanhos de toque, tela "como instalar no celular dela" | App pronto para entregar |

## Status

- [x] **PR 1 — Fundação & documentação**
- [x] **PR 2 — Pipeline de fotos**
- [ ] PR 3 — Tela inicial / álbum
- [ ] PR 4 — Motor do quebra-cabeça
- [ ] PR 5 — Salvar e continuar
- [ ] PR 6 — Recompensa, voz & texto do lugar
- [ ] PR 7 — Polimento & acessibilidade final

## Observações

- **PRs 1–5** já entregam um app funcional. **PRs 6 e 7** são o que transformam de
  "joguinho" em "presente" — a voz da Mariana é a alma do projeto.
