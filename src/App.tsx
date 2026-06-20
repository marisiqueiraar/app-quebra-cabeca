import './App.css'

/**
 * Tela inicial provisória (PR 1).
 *
 * Ainda não há fotos nem quebra-cabeças — isso chega nas próximas PRs.
 * O objetivo aqui é deixar o app instalável e já estabelecer a "linguagem
 * visual" pensada para a vó: textos grandes, alto contraste, botões enormes
 * e pouquíssimo texto. Tudo que for informação importante virá sempre
 * acompanhado de áudio nas próximas entregas.
 */
function App() {
  return (
    <div className="tela">
      <header className="cabecalho">
        <span className="emoji-titulo" role="img" aria-label="Quebra-cabeça">
          🧩
        </span>
        <h1>Quebra-Cabeças da Vó</h1>
      </header>

      <main className="conteudo">
        <p className="boas-vindas">
          Em breve as fotos das nossas viagens vão aparecer aqui para você montar.
        </p>

        <section className="album-vazio" aria-label="Suas fotos">
          <div className="moldura-vazia" aria-hidden="true">
            <span className="emoji-paisagem" role="img" aria-label="Paisagem">
              🏞️
            </span>
          </div>
          <p className="legenda-vazia">Ainda não há fotos por aqui.</p>
        </section>
      </main>

      <footer className="rodape">
        <p>Feito com carinho. Versão de testes 0.1</p>
      </footer>
    </div>
  )
}

export default App
