// Gera os ícones PNG do app (em public/icons) a partir de assets/icon.svg.
// Rode com:  npm run icons
//
// Os PNGs são versionados no repositório, então o build não depende deste
// script. Rode-o de novo só quando o ícone (assets/icon.svg) mudar.

import sharp from 'sharp'
import { readFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url)
const svg = readFileSync(new URL('assets/icon.svg', root))
const outDir = new URL('public/icons/', root)
mkdirSync(outDir, { recursive: true })

const out = (name) => fileURLToPath(new URL(name, outDir))
const creme = { r: 251, g: 247, b: 239, alpha: 1 }

const tarefas = [
  // Ícones padrão (transparentes onde o SVG é transparente — mas o nosso é sólido)
  { nome: 'icon-192.png', tamanho: 192 },
  { nome: 'icon-512.png', tamanho: 512 },
  // "maskable": precisa de área de segurança; nosso fundo verde já sangra até a borda
  { nome: 'icon-512-maskable.png', tamanho: 512 },
  // Apple exige PNG sem transparência (fundo achatado)
  { nome: 'apple-touch-icon.png', tamanho: 180, achatar: true },
]

for (const t of tarefas) {
  let img = sharp(svg, { density: 384 }).resize(t.tamanho, t.tamanho)
  if (t.achatar) img = img.flatten({ background: creme })
  await img.png().toFile(out(t.nome))
  console.log(`gerado: public/icons/${t.nome} (${t.tamanho}px)`)
}

console.log('Ícones gerados com sucesso.')
