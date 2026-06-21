import type { Foto } from '../tipos'
import { totalDePecas, type Dificuldade } from '../dificuldades'
import { Cabecalho } from '../componentes/Cabecalho'

interface Props {
  foto: Foto
  dificuldade: Dificuldade
  aoVoltar: () => void
}

// Placeholder do jogo (PR 3). O quebra-cabeça de verdade — arrastar e encaixar
// as peças — chega na PR 4. Aqui já mostramos a foto e o nível escolhido para
// validar o fluxo de navegação.
export function Jogo({ foto, dificuldade, aoVoltar }: Props) {
  const base = import.meta.env.BASE_URL

  return (
    <div className="tela">
      <Cabecalho titulo={foto.titulo} aoVoltar={aoVoltar} />
      <main className="conteudo">
        <img className="foto-escolhida" src={base + foto.imagem} alt={foto.titulo} />
        <p className="boas-vindas">
          {dificuldade.emoji} {dificuldade.nome} — {totalDePecas(dificuldade)} pedaços
        </p>
        <p className="aviso">
          🚧 Em breve: arrastar os pedaços para montar a figura.
        </p>
      </main>
    </div>
  )
}
