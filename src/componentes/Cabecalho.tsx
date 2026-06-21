interface Props {
  titulo: string
  aoVoltar?: () => void
}

// Cabeçalho com título e, quando faz sentido, um botão grande de "Voltar".
// Sempre dá para voltar — princípio de "nunca deixar a vó presa numa tela".
export function Cabecalho({ titulo, aoVoltar }: Props) {
  return (
    <header className="cabecalho">
      {aoVoltar && (
        <button className="botao-voltar" type="button" onClick={aoVoltar}>
          <span aria-hidden="true">←</span> Voltar
        </button>
      )}
      <h1>{titulo}</h1>
    </header>
  )
}
