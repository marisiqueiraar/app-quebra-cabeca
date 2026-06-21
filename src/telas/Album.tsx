import type { Foto } from '../tipos'
import { Cabecalho } from '../componentes/Cabecalho'

interface Props {
  fotos: Foto[]
  aoEscolher: (foto: Foto) => void
}

// Tela inicial: a "estante" com as fotos das viagens. Tocar numa foto leva à
// escolha de dificuldade.
export function Album({ fotos, aoEscolher }: Props) {
  const base = import.meta.env.BASE_URL

  return (
    <div className="tela">
      <Cabecalho titulo="Quebra-Cabeças da Vó Lili" />
      <main className="conteudo">
        <p className="boas-vindas">Escolha uma foto para montar.</p>
        <ul className="estante" aria-label="Fotos das viagens">
          {fotos.map((foto) => (
            <li key={foto.id}>
              <button
                className="cartao-foto"
                type="button"
                onClick={() => aoEscolher(foto)}
              >
                <img
                  src={base + foto.miniatura}
                  alt={foto.titulo}
                  width={foto.largura}
                  height={foto.altura}
                  loading="lazy"
                />
                <span className="nome-foto">{foto.titulo}</span>
              </button>
            </li>
          ))}
        </ul>
      </main>
      <footer className="rodape">
        <p>Feito com carinho. Versão de testes 0.3</p>
      </footer>
    </div>
  )
}
