// Uma foto/álbum que vira quebra-cabeça.
export interface Foto {
  id: string
  titulo: string
  descricao: string
  imagem: string // caminho da imagem grande (relativo à raiz pública)
  miniatura: string // caminho da miniatura
  largura: number
  altura: number
}
