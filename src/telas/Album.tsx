import { useState } from 'react'
import type { Foto } from '../tipos'
import type { Dificuldade } from '../dificuldades'
import { Cabecalho } from '../componentes/Cabecalho'
import { ComoInstalar } from '../componentes/ComoInstalar'

interface ItemAndamento {
  foto: Foto
  dificuldade: Dificuldade
  feitas: number
  total: number
}

interface Props {
  fotos: Foto[]
  emAndamento: ItemAndamento[]
  aoEscolher: (foto: Foto) => void
  aoContinuar: (foto: Foto, dificuldade: Dificuldade) => void
}

// Tela inicial: a "estante" com as fotos das viagens. No topo, quando há jogos
// não terminados, aparece "Continuar montando" para retomar de onde parou.
export function Album({ fotos, emAndamento, aoEscolher, aoContinuar }: Props) {
  const base = import.meta.env.BASE_URL
  const [mostrarAjuda, setMostrarAjuda] = useState(false)

  return (
    <div className="tela">
      <Cabecalho titulo="Quebra-Cabeças da Vó Lili" />
      <main className="conteudo">
        {emAndamento.length > 0 && (
          <section className="continuar" aria-label="Continuar montando">
            <h2 className="titulo-secao">▶️ Continuar montando</h2>
            <ul className="estante">
              {emAndamento.map((item) => (
                <li key={`${item.foto.id}:${item.dificuldade.id}`}>
                  <button
                    className="cartao-foto cartao-continuar"
                    type="button"
                    onClick={() => aoContinuar(item.foto, item.dificuldade)}
                  >
                    <img
                      src={base + item.foto.miniatura}
                      alt={item.foto.titulo}
                      loading="lazy"
                    />
                    <span className="nome-foto">{item.foto.titulo}</span>
                    <span className="progresso-foto">
                      {item.feitas} de {item.total} pedaços
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="boas-vindas">Escolha uma foto para montar.</p>
        <ul className="estante" aria-label="Fotos das viagens">
          {fotos.map((foto) => (
            <li key={foto.id}>
              <button className="cartao-foto" type="button" onClick={() => aoEscolher(foto)}>
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
        <button type="button" className="botao-acao" onClick={() => setMostrarAjuda(true)}>
          ❓ Como instalar no celular
        </button>
        <p>Feito com carinho. Versão de testes 1.0</p>
      </footer>

      {mostrarAjuda && <ComoInstalar aoFechar={() => setMostrarAjuda(false)} />}
    </div>
  )
}
