import { useEffect, useState } from 'react'
import './App.css'
import type { Foto } from './tipos'
import type { Dificuldade } from './dificuldades'
import { carregarFotos } from './dados/carregarFotos'
import { Album } from './telas/Album'
import { EscolherDificuldade } from './telas/EscolherDificuldade'
import { Jogo } from './telas/Jogo'

type Tela = 'album' | 'dificuldade' | 'jogo'

/**
 * Roteador simples entre as três telas, sem biblioteca de rotas (mais leve e
 * previsível). O fluxo é sempre: álbum → escolher dificuldade → jogo, e dá para
 * voltar em cada passo.
 */
function App() {
  const [fotos, setFotos] = useState<Foto[] | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  const [tela, setTela] = useState<Tela>('album')
  const [foto, setFoto] = useState<Foto | null>(null)
  const [dificuldade, setDificuldade] = useState<Dificuldade | null>(null)

  useEffect(() => {
    carregarFotos()
      .then(setFotos)
      .catch((e) => setErro(e.message))
  }, [])

  // Estados de carregamento / erro / vazio (antes de ter a estante).
  if (erro || fotos === null || fotos.length === 0) {
    return (
      <div className="tela">
        <header className="cabecalho">
          <span className="emoji-titulo" role="img" aria-label="Quebra-cabeça">
            🧩
          </span>
          <h1>Quebra-Cabeças da Vó Lili</h1>
        </header>
        <main className="conteudo">
          {erro && (
            <p className="aviso" role="alert">
              Não consegui carregar as fotos agora. Tente abrir de novo.
            </p>
          )}
          {!erro && fotos === null && <p className="aviso">Carregando…</p>}
          {!erro && fotos !== null && fotos.length === 0 && (
            <section className="album-vazio" aria-label="Suas fotos">
              <div className="moldura-vazia" aria-hidden="true">
                <span className="emoji-paisagem" role="img" aria-label="Paisagem">
                  🏞️
                </span>
              </div>
              <p className="legenda-vazia">Ainda não há fotos por aqui.</p>
            </section>
          )}
        </main>
      </div>
    )
  }

  if (tela === 'dificuldade' && foto) {
    return (
      <EscolherDificuldade
        foto={foto}
        aoVoltar={() => setTela('album')}
        aoIniciar={(d) => {
          setDificuldade(d)
          setTela('jogo')
        }}
      />
    )
  }

  if (tela === 'jogo' && foto && dificuldade) {
    return <Jogo foto={foto} dificuldade={dificuldade} aoVoltar={() => setTela('dificuldade')} />
  }

  return (
    <Album
      fotos={fotos}
      aoEscolher={(f) => {
        setFoto(f)
        setTela('dificuldade')
      }}
    />
  )
}

export default App
