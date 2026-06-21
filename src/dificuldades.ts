// Níveis de dificuldade = quantas peças o quebra-cabeça tem.
// Quanto mais colunas × linhas, mais peças e mais difícil.

export interface Dificuldade {
  id: string
  nome: string
  colunas: number
  linhas: number
  emoji: string
}

export const DIFICULDADES: Dificuldade[] = [
  { id: 'facil', nome: 'Fácil', colunas: 3, linhas: 2, emoji: '🙂' },
  { id: 'medio', nome: 'Médio', colunas: 4, linhas: 3, emoji: '😀' },
  { id: 'dificil', nome: 'Difícil', colunas: 6, linhas: 4, emoji: '🤓' },
  { id: 'expert', nome: 'Bem difícil', colunas: 8, linhas: 6, emoji: '🧠' },
]

export function totalDePecas(d: Dificuldade): number {
  return d.colunas * d.linhas
}
