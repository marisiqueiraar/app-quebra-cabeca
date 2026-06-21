import type { Foto } from '../tipos'
import { DIFICULDADES, totalDePecas, type Dificuldade } from '../dificuldades'
import { Cabecalho } from '../componentes/Cabecalho'
import { falar, temVoz } from '../audio/falar'

interface Props {
  foto: Foto
  aoVoltar: () => void
  aoIniciar: (dificuldade: Dificuldade) => void
}

// Tela de escolher quantas peças. Mostra a foto escolhida e botões grandes,
// cada um com uma prévia visual de quantas peças e o número escrito.
export function EscolherDificuldade({ foto, aoVoltar, aoIniciar }: Props) {
  const base = import.meta.env.BASE_URL

  return (
    <div className="tela">
      <Cabecalho titulo={foto.titulo} aoVoltar={aoVoltar} />
      <main className="conteudo">
        <img className="foto-escolhida" src={base + foto.miniatura} alt={foto.titulo} />
        {foto.descricao && <p className="premio-descricao">{foto.descricao}</p>}
        {temVoz() && (
          <button
            type="button"
            className="botao-acao destaque"
            onClick={() => falar(`${foto.titulo}. ${foto.descricao ?? ''}`.trim())}
          >
            🔊 Ouvir sobre o lugar
          </button>
        )}
        <p className="boas-vindas">Quantos pedaços você quer?</p>

        <ul className="lista-dificuldades" aria-label="Níveis de dificuldade">
          {DIFICULDADES.map((d) => (
            <li key={d.id}>
              <button
                className="cartao-dificuldade"
                type="button"
                onClick={() => aoIniciar(d)}
              >
                <span
                  className="previa-grade"
                  style={{
                    gridTemplateColumns: `repeat(${d.colunas}, 1fr)`,
                    gridTemplateRows: `repeat(${d.linhas}, 1fr)`,
                  }}
                  aria-hidden="true"
                >
                  {Array.from({ length: totalDePecas(d) }).map((_, i) => (
                    <span key={i} className="celula-grade" />
                  ))}
                </span>
                <span className="info-dificuldade">
                  <span className="nome-dificuldade">
                    {d.emoji} {d.nome}
                  </span>
                  <span className="qtd-pecas">{totalDePecas(d)} pedaços</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
