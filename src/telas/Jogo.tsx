import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import type { Foto } from '../tipos'
import { totalDePecas, type Dificuldade } from '../dificuldades'
import { Cabecalho } from '../componentes/Cabecalho'
import { gerarPecas, embaralhar } from '../quebra-cabeca/pecas'
import { carregarProgresso, salvarProgresso, apagarProgresso } from '../dados/progresso'

interface Props {
  foto: Foto
  dificuldade: Dificuldade
  aoVoltar: () => void
  aoConcluir?: () => void
}

/**
 * Motor do quebra-cabeça (PR 4).
 *
 * A imagem é cortada numa grade. As peças ficam embaralhadas numa bandeja
 * embaixo; a vó arrasta cada uma com o dedo até o lugar na figura. A peça só
 * "trava" quando vai para o lugar certo — se errar, ela volta. Isso é
 * encorajador e evita frustração.
 */
export function Jogo({ foto, dificuldade, aoVoltar, aoConcluir }: Props) {
  const base = import.meta.env.BASE_URL
  const { colunas, linhas } = dificuldade
  const total = totalDePecas(dificuldade)
  const imagemUrl = `${base}${foto.imagem}`

  const todasPecas = useMemo(() => gerarPecas(colunas, linhas), [colunas, linhas])

  // Retoma um jogo salvo neste aparelho, se houver e for válido.
  const salvo = useMemo(() => {
    const s = carregarProgresso(foto.id, dificuldade.id)
    if (s && s.total === total && s.colocadas.length + s.bandeja.length === total) {
      return s
    }
    return null
  }, [foto.id, dificuldade.id, total])

  const [bandeja, setBandeja] = useState<number[]>(() =>
    salvo ? salvo.bandeja : embaralhar(todasPecas.map((p) => p.id)),
  )
  const [colocadas, setColocadas] = useState<number[]>(() =>
    salvo ? salvo.colocadas : [],
  )
  const [arrastando, setArrastando] = useState<{ id: number; x: number; y: number } | null>(null)
  const [tamCelula, setTamCelula] = useState({ w: 0, h: 0 })
  const [celulaAlvo, setCelulaAlvo] = useState<{ col: number; linha: number } | null>(null)
  const [mostrarGuia, setMostrarGuia] = useState(true)
  const [espiando, setEspiando] = useState(false)

  const tabuleiroRef = useRef<HTMLDivElement>(null)
  const concluido = colocadas.length === total

  useEffect(() => {
    if (concluido) aoConcluir?.()
  }, [concluido, aoConcluir])

  // Salva o progresso a cada peça encaixada; apaga ao concluir.
  useEffect(() => {
    if (concluido) {
      apagarProgresso(foto.id, dificuldade.id)
      return
    }
    if (colocadas.length > 0) {
      salvarProgresso({
        fotoId: foto.id,
        dificuldadeId: dificuldade.id,
        colocadas,
        bandeja,
        total,
        atualizadoEm: Date.now(),
      })
    }
  }, [colocadas, bandeja, concluido, foto.id, dificuldade.id, total])

  // Posição do fundo (recorte) para a peça na coluna/linha indicada.
  function estiloRecorte(col: number, linha: number): CSSProperties {
    const px = colunas > 1 ? (col * 100) / (colunas - 1) : 0
    const py = linhas > 1 ? (linha * 100) / (linhas - 1) : 0
    return {
      backgroundImage: `url("${imagemUrl}")`,
      backgroundSize: `${colunas * 100}% ${linhas * 100}%`,
      backgroundPosition: `${px}% ${py}%`,
    }
  }

  function celulaDoPonto(x: number, y: number) {
    const rect = tabuleiroRef.current?.getBoundingClientRect()
    if (!rect) return null
    const col = Math.floor((x - rect.left) / (rect.width / colunas))
    const linha = Math.floor((y - rect.top) / (rect.height / linhas))
    if (col < 0 || col >= colunas || linha < 0 || linha >= linhas) return null
    return { col, linha }
  }

  function aoPegar(e: React.PointerEvent, id: number) {
    const rect = tabuleiroRef.current?.getBoundingClientRect()
    if (rect) setTamCelula({ w: rect.width / colunas, h: rect.height / linhas })
    e.currentTarget.setPointerCapture(e.pointerId)
    setArrastando({ id, x: e.clientX, y: e.clientY })
  }

  function aoMover(e: React.PointerEvent) {
    if (!arrastando) return
    setArrastando({ ...arrastando, x: e.clientX, y: e.clientY })
    setCelulaAlvo(celulaDoPonto(e.clientX, e.clientY))
  }

  function aoSoltar(e: React.PointerEvent, id: number) {
    const alvo = celulaDoPonto(e.clientX, e.clientY)
    const peca = todasPecas[id]
    if (alvo && alvo.col === peca.col && alvo.linha === peca.linha) {
      setColocadas((c) => [...c, id])
      setBandeja((b) => b.filter((x) => x !== id))
    }
    setArrastando(null)
    setCelulaAlvo(null)
  }

  function recomecar() {
    apagarProgresso(foto.id, dificuldade.id)
    setColocadas([])
    setBandeja(embaralhar(todasPecas.map((p) => p.id)))
  }

  const pecaArrastada = arrastando ? todasPecas[arrastando.id] : null

  return (
    <div className="tela tela-jogo">
      <Cabecalho titulo={foto.titulo} aoVoltar={aoVoltar} />

      <div className="acoes-jogo">
        <button type="button" className="botao-acao" onClick={() => setEspiando(true)}>
          🔍 Ver foto
        </button>
        <button type="button" className="botao-acao" onClick={() => setMostrarGuia((v) => !v)}>
          {mostrarGuia ? '🙈 Esconder dica' : '👀 Mostrar dica'}
        </button>
        <button type="button" className="botao-acao" onClick={recomecar}>
          🔄 Recomeçar
        </button>
      </div>

      {/* Tabuleiro: onde a figura é montada */}
      <div
        className="tabuleiro"
        ref={tabuleiroRef}
        style={{ aspectRatio: `${foto.largura} / ${foto.altura}` }}
      >
        {mostrarGuia && (
          <img className="guia" src={imagemUrl} alt="" aria-hidden="true" />
        )}

        {/* Grade de células (mostra os lugares) */}
        <div
          className="grade"
          style={{
            gridTemplateColumns: `repeat(${colunas}, 1fr)`,
            gridTemplateRows: `repeat(${linhas}, 1fr)`,
          }}
        >
          {todasPecas.map((p) => {
            const ehAlvo = celulaAlvo?.col === p.col && celulaAlvo?.linha === p.linha
            const ehCerta = ehAlvo && pecaArrastada?.id === p.id
            return (
              <div
                key={p.id}
                className={`celula ${ehAlvo ? (ehCerta ? 'celula-certa' : 'celula-alvo') : ''}`}
              />
            )
          })}
        </div>

        {/* Peças já encaixadas */}
        {colocadas.map((id) => {
          const p = todasPecas[id]
          return (
            <div
              key={id}
              className="peca-fixa"
              style={{
                left: `${(p.col * 100) / colunas}%`,
                top: `${(p.linha * 100) / linhas}%`,
                width: `${100 / colunas}%`,
                height: `${100 / linhas}%`,
                ...estiloRecorte(p.col, p.linha),
              }}
            />
          )
        })}
      </div>

      {concluido ? (
        <div className="parabens" role="alert">
          <p className="parabens-texto">🎉 Você conseguiu!</p>
          <div className="acoes-jogo">
            <button type="button" className="botao-acao destaque" onClick={recomecar}>
              Jogar de novo
            </button>
            <button type="button" className="botao-acao" onClick={aoVoltar}>
              Voltar
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="dica-bandeja">Arraste os pedaços para a figura</p>
          <div className="bandeja" aria-label="Peças para montar">
            {bandeja.map((id) => {
              const p = todasPecas[id]
              const aspecto = (foto.largura / colunas) / (foto.altura / linhas)
              return (
                <button
                  key={id}
                  type="button"
                  className={`peca-bandeja ${arrastando?.id === id ? 'arrastando' : ''}`}
                  style={{ height: 76, width: 76 * aspecto, ...estiloRecorte(p.col, p.linha) }}
                  onPointerDown={(e) => aoPegar(e, id)}
                  onPointerMove={aoMover}
                  onPointerUp={(e) => aoSoltar(e, id)}
                  aria-label={`Peça ${id + 1}`}
                />
              )
            })}
          </div>
        </>
      )}

      {/* Peça flutuante seguindo o dedo */}
      {arrastando && pecaArrastada && tamCelula.w > 0 && (
        <div
          className="peca-flutuante"
          style={{
            width: tamCelula.w,
            height: tamCelula.h,
            left: arrastando.x - tamCelula.w / 2,
            top: arrastando.y - tamCelula.h / 2,
            ...estiloRecorte(pecaArrastada.col, pecaArrastada.linha),
          }}
        />
      )}

      {/* Espiar a foto inteira */}
      {espiando && (
        <div className="modal-foto" onClick={() => setEspiando(false)}>
          <img src={imagemUrl} alt={foto.titulo} />
          <button type="button" className="botao-acao destaque">
            Fechar
          </button>
        </div>
      )}
    </div>
  )
}
