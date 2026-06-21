import { useEffect, useState } from 'react'
import './App.css'
import type { Foto } from './tipos'
import { carregarFotos } from './dados/carregarFotos'

/**
 * Tela inicial (PR 2): a "estante de fotos".
 *
 * Carrega o manifesto gerado pelo pipeline e mostra as fotos das viagens.
 * Tocar numa foto ainda não faz nada — a escolha de dificuldade e o
 * quebra-cabeça chegam nas PRs 3 e 4. Aqui o objetivo é provar que as fotos
 * adicionadas na pasta aparecem no app.
 */
function App() {
  const [fotos, setFotos] = useState<Foto[] | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    carregarFotos()
      .then(setFotos)
      .catch((e) => setErro(e.message))
  }, [])

  const base = import.meta.env.BASE_URL

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

        {!erro && fotos !== null && fotos.length > 0 && (
          <>
            <p className="boas-vindas">Escolha uma foto para montar.</p>
            <ul className="estante" aria-label="Fotos das viagens">
              {fotos.map((foto) => (
                <li key={foto.id}>
                  <button className="cartao-foto" type="button">
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
          </>
        )}
      </main>

      <footer className="rodape">
        <p>Feito com carinho. Versão de testes 0.2</p>
      </footer>
    </div>
  )
}

export default App
