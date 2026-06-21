// Gera 3 fotos de EXEMPLO (paisagens estilizadas) na pasta fotos/, só para
// testar o pipeline e o app enquanto as fotos reais não chegam.
//
// Rode com:  npm run fotos:exemplo
//
// Pode apagar essas fotos quando colocar as de verdade — elas têm o prefixo
// "exemplo-" no nome do arquivo para ficarem fáceis de achar.

import sharp from 'sharp'
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const dirFotos = fileURLToPath(new URL('../fotos/', import.meta.url))
mkdirSync(dirFotos, { recursive: true })

const L = 1600
const A = 1067

const cenas = [
  {
    nome: 'exemplo-Cataratas do Iguaçu',
    ceu1: '#bfe3ff',
    ceu2: '#7fc1f0',
    montanha: '#2e7d32',
    morro: '#1f5d24',
    agua: '#9fd8e8',
  },
  {
    nome: 'exemplo-Praia de Copacabana',
    ceu1: '#ffe3b0',
    ceu2: '#ff9e7d',
    montanha: '#c98a5e',
    morro: '#8a5a3c',
    agua: '#2a9db5',
  },
  {
    nome: 'exemplo-Campos do Jordão',
    ceu1: '#d9ecff',
    ceu2: '#a9d0a0',
    montanha: '#3a7d44',
    morro: '#235a2c',
    agua: '#86c98f',
  },
]

function svgCena(c) {
  return `<svg width="${L}" height="${A}" viewBox="0 0 ${L} ${A}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c.ceu1}"/>
      <stop offset="1" stop-color="${c.ceu2}"/>
    </linearGradient>
  </defs>
  <rect width="${L}" height="${A}" fill="url(#ceu)"/>
  <circle cx="320" cy="260" r="120" fill="#fff3c4" opacity="0.9"/>
  <path d="M0 ${A * 0.62} L420 ${A * 0.34} L760 ${A * 0.58} L1040 ${A * 0.30} L${L} ${A * 0.60} L${L} ${A} L0 ${A} Z" fill="${c.montanha}"/>
  <path d="M0 ${A * 0.74} L360 ${A * 0.5} L720 ${A * 0.74} L1120 ${A * 0.52} L${L} ${A * 0.72} L${L} ${A} L0 ${A} Z" fill="${c.morro}"/>
  <rect x="0" y="${A * 0.82}" width="${L}" height="${A * 0.18}" fill="${c.agua}"/>
  <text x="${L / 2}" y="${A - 70}" font-family="Arial, sans-serif" font-size="64" font-weight="bold"
        fill="#ffffff" text-anchor="middle" stroke="#00000055" stroke-width="2"
        paint-order="stroke">${c.nome.replace('exemplo-', '')}</text>
</svg>`
}

for (const c of cenas) {
  const svg = Buffer.from(svgCena(c))
  const destino = path.join(dirFotos, `${c.nome}.jpg`)
  await sharp(svg).jpeg({ quality: 88 }).toFile(destino)
  console.log(`gerada foto de exemplo: fotos/${c.nome}.jpg`)
}

console.log('\nFotos de exemplo prontas. Rode "npm run fotos" para processá-las.')
