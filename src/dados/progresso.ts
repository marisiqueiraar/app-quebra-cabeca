// Salva o progresso do quebra-cabeça no próprio aparelho (localStorage).
// Sem servidor, sem conta — funciona offline e é privado.

export interface ProgressoSalvo {
  fotoId: string
  dificuldadeId: string
  colocadas: number[]
  bandeja: number[]
  total: number
  atualizadoEm: number
}

const PREFIXO = 'qc:progresso:'

function chave(fotoId: string, dificuldadeId: string): string {
  return `${PREFIXO}${fotoId}:${dificuldadeId}`
}

export function salvarProgresso(p: ProgressoSalvo): void {
  try {
    localStorage.setItem(chave(p.fotoId, p.dificuldadeId), JSON.stringify(p))
  } catch {
    // Sem espaço/sem permissão: ignora silenciosamente (o jogo continua).
  }
}

export function carregarProgresso(
  fotoId: string,
  dificuldadeId: string,
): ProgressoSalvo | null {
  try {
    const bruto = localStorage.getItem(chave(fotoId, dificuldadeId))
    if (!bruto) return null
    return JSON.parse(bruto) as ProgressoSalvo
  } catch {
    return null
  }
}

export function apagarProgresso(fotoId: string, dificuldadeId: string): void {
  try {
    localStorage.removeItem(chave(fotoId, dificuldadeId))
  } catch {
    /* ignora */
  }
}

// Lista todos os jogos em andamento (para a seção "Continuar montando").
export function listarProgresso(): ProgressoSalvo[] {
  const lista: ProgressoSalvo[] = []
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith(PREFIXO)) {
        const bruto = localStorage.getItem(k)
        if (bruto) lista.push(JSON.parse(bruto) as ProgressoSalvo)
      }
    }
  } catch {
    /* ignora */
  }
  // Mais recentes primeiro.
  return lista.sort((a, b) => b.atualizadoEm - a.atualizadoEm)
}
