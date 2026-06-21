// Lê um texto em voz alta usando a voz do próprio aparelho (Web Speech API).
// Funciona em iPhone e Android, em português, sem precisar de arquivos de áudio
// nem de internet. É a base da acessibilidade para a Vó Lili (semialfabetizada).
//
// A voz GRAVADA pela Mariana entra depois, como um "plus" — quando houver um
// arquivo de áudio para a foto, ele toca no lugar desta voz automática.

let vozPt: SpeechSynthesisVoice | null = null

function escolherVoz() {
  const sint = typeof window !== 'undefined' ? window.speechSynthesis : undefined
  if (!sint) return
  const vozes = sint.getVoices()
  vozPt =
    vozes.find((v) => v.lang?.toLowerCase().startsWith('pt-br')) ??
    vozes.find((v) => v.lang?.toLowerCase().startsWith('pt')) ??
    null
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  escolherVoz()
  // As vozes podem carregar de forma assíncrona.
  window.speechSynthesis.onvoiceschanged = escolherVoz
}

export function temVoz(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function falar(texto: string): void {
  if (!temVoz() || !texto) return
  const sint = window.speechSynthesis
  sint.cancel() // interrompe qualquer fala anterior
  const fala = new SpeechSynthesisUtterance(texto)
  fala.lang = 'pt-BR'
  if (vozPt) fala.voice = vozPt
  fala.rate = 0.95 // um pouquinho mais devagar, mais fácil de entender
  fala.pitch = 1
  sint.speak(fala)
}

export function pararFala(): void {
  if (temVoz()) window.speechSynthesis.cancel()
}
