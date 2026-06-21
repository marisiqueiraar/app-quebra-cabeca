import type { Foto } from '../tipos'

// Carrega o manifesto gerado pelo pipeline (public/fotos/albuns.json).
export async function carregarFotos(): Promise<Foto[]> {
  const url = `${import.meta.env.BASE_URL}fotos/albuns.json`
  const resposta = await fetch(url, { cache: 'no-cache' })
  if (!resposta.ok) {
    throw new Error(`Não foi possível carregar as fotos (${resposta.status}).`)
  }
  const dados = (await resposta.json()) as Foto[]
  return Array.isArray(dados) ? dados : []
}
