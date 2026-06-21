// Uma peça do quebra-cabeça: sua posição correta na grade (coluna e linha).
export interface Peca {
  id: number
  col: number
  linha: number
}

// Gera todas as peças de uma grade colunas × linhas.
export function gerarPecas(colunas: number, linhas: number): Peca[] {
  const pecas: Peca[] = []
  let id = 0
  for (let linha = 0; linha < linhas; linha++) {
    for (let col = 0; col < colunas; col++) {
      pecas.push({ id: id++, col, linha })
    }
  }
  return pecas
}

// Embaralha uma cópia do array (Fisher–Yates).
export function embaralhar<T>(itens: T[]): T[] {
  const copia = [...itens]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}
