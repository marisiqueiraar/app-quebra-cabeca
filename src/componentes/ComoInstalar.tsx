interface Props {
  aoFechar: () => void
}

// Explica, em poucos passos e com letras grandes, como deixar o app como um
// ícone na tela inicial do celular. Pensado para quem vai instalar PARA a vó.
export function ComoInstalar({ aoFechar }: Props) {
  return (
    <div className="modal-ajuda" role="dialog" aria-label="Como instalar no celular">
      <div className="caixa-ajuda">
        <h2>📱 Como deixar na tela inicial</h2>

        <h3>No iPhone</h3>
        <ol>
          <li>Abra este site no <strong>Safari</strong>.</li>
          <li>
            Toque no botão de <strong>Compartilhar</strong> (o quadradinho com a
            seta para cima).
          </li>
          <li>
            Escolha <strong>“Adicionar à Tela de Início”</strong> e confirme.
          </li>
        </ol>

        <h3>No Android</h3>
        <ol>
          <li>Abra este site no <strong>Chrome</strong>.</li>
          <li>Toque no menu <strong>⋮</strong> (três pontinhos).</li>
          <li>
            Escolha <strong>“Instalar app”</strong> ou{' '}
            <strong>“Adicionar à tela inicial”</strong>.
          </li>
        </ol>

        <p className="nota-ajuda">
          Pronto! Vai aparecer um ícone 🧩 na tela, igual a qualquer aplicativo.
        </p>

        <button type="button" className="botao-acao destaque" onClick={aoFechar}>
          Entendi
        </button>
      </div>
    </div>
  )
}
