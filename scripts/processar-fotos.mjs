// Processa as fotos das viagens.
//
// Lê tudo de  fotos/  (as imagens originais que a Mariana coloca lá) e gera em
// public/fotos/  versões otimizadas + miniaturas + um manifesto (albuns.json)
// que o app lê para montar a "estante de fotos".
//
// Rode com:  npm run fotos
//
// Detalhes importantes para fotos de celular:
//  - .rotate() respeita a orientação gravada na foto (EXIF), senão fotos em pé
//    apareceriam deitadas.
//  - os metadados (inclusive a localização GPS) são removidos ao reprocessar —
//    bom para privacidade e para o tamanho do arquivo.

import sharp from 'sharp'
import {
  readdirSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  existsSync,
  rmSync,
} from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const dirFotos = path.join(root, 'fotos')
const dirSaida = path.join(root, 'public', 'fotos')

// Tamanhos de saída
const LARGURA_GRANDE = 1600 // imagem do quebra-cabeça
const LARGURA_MINI = 600 // miniatura da estante

const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const EXTS_HEIC = new Set(['.heic', '.heif'])

// Transforma "Cataratas do Iguaçu" -> "cataratas-do-iguacu"
function paraSlug(nome) {
  return nome
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Legendas/descrições escritas à mão (fotos/legendas.json), por slug.
let legendas = {}
const arqLegendas = path.join(dirFotos, 'legendas.json')
if (existsSync(arqLegendas)) {
  try {
    legendas = JSON.parse(readFileSync(arqLegendas, 'utf8'))
  } catch (e) {
    console.warn(`⚠️  Não consegui ler fotos/legendas.json: ${e.message}`)
  }
}

// Recria a pasta de saída do zero (tudo aqui é gerado).
if (existsSync(dirSaida)) rmSync(dirSaida, { recursive: true, force: true })
mkdirSync(dirSaida, { recursive: true })

const arquivos = existsSync(dirFotos) ? readdirSync(dirFotos).sort() : []
const album = []

for (const arq of arquivos) {
  if (arq.startsWith('.')) continue
  const ext = path.extname(arq).toLowerCase()
  const base = path.basename(arq, path.extname(arq))
  if (base === 'legendas' || base === 'LEIA-ME') continue
  if (!EXTS.has(ext) && !EXTS_HEIC.has(ext)) continue

  const id = paraSlug(base)
  const entrada = path.join(dirFotos, arq)

  try {
    const grande = await sharp(entrada)
      .rotate()
      .resize({ width: LARGURA_GRANDE, height: LARGURA_GRANDE, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer({ resolveWithObject: true })
    writeFileSync(path.join(dirSaida, `${id}.jpg`), grande.data)

    const mini = await sharp(entrada)
      .rotate()
      .resize({ width: LARGURA_MINI, height: LARGURA_MINI, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toBuffer()
    writeFileSync(path.join(dirSaida, `${id}.thumb.jpg`), mini)

    album.push({
      id,
      titulo: base.replace(/^exemplo-/i, ''),
      descricao: legendas[id] ?? '',
      imagem: `fotos/${id}.jpg`,
      miniatura: `fotos/${id}.thumb.jpg`,
      largura: grande.info.width,
      altura: grande.info.height,
    })
    console.log(`✔ ${arq} → ${id} (${grande.info.width}×${grande.info.height})`)
  } catch (e) {
    if (EXTS_HEIC.has(ext)) {
      console.error(
        `✗ ${arq}: este formato (HEIC, padrão do iPhone) não pôde ser lido aqui.\n` +
          `   Dica: ao enviar, escolha "Mais Compatível" ou exporte como JPG/PNG.`,
      )
    } else {
      console.error(`✗ Falha ao processar ${arq}: ${e.message}`)
    }
  }
}

writeFileSync(path.join(dirSaida, 'albuns.json'), JSON.stringify(album, null, 2) + '\n')

// Avisa sobre fotos sem descrição (para eu lembrar de escrever a legenda).
const semLegenda = album.filter((f) => !f.descricao).map((f) => f.titulo)
if (semLegenda.length) {
  console.log(`\nℹ️  Sem descrição ainda: ${semLegenda.join(', ')}`)
}
console.log(`\n${album.length} foto(s) no álbum. Manifesto: public/fotos/albuns.json`)
