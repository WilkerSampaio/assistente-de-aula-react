export default function GravacaoTab({
  recording,
  supported,
  finalText,
  interimText,
  onToggleMic,
  onDemo,
  onClear,
  onGerar,
  gerando,
  statusMsg
}) {
  const hasText = finalText.trim().length >= 5;

  return (
    <section role="tabpanel">
      <h1>Gravar aula</h1>
      <p className="lede">
        Toque no microfone para começar. A transcrição aparece em tempo real, então você pode
        acompanhar mesmo sem conseguir falar ou digitar. Ative pelo toque — funciona com o dedo,
        a mão ou o pé.
      </p>

      <div className="card">
        <div className={`hero ${recording ? 'recording' : ''}`}>
          <div className="mic-wrap">
            <div className="mic-ring"></div>
            <div className="mic-ring r2"></div>
            <button id="btnMic" aria-pressed={recording} onClick={onToggleMic}>
              <span aria-hidden="true">🎤</span>
              <span className="lbl">{recording ? 'Parar' : 'Gravar'}</span>
            </button>
          </div>
          <div className="waveform" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i}></span>
            ))}
          </div>
          <p className={`status-line ${recording ? 'on' : ''}`}>
            {statusMsg ||
              (recording
                ? '🔴 Gravando e transcrevendo a aula…'
                : !supported
                ? 'Este navegador não suporta reconhecimento de fala. Use a transcrição de exemplo.'
                : 'Pronto para começar a aula.')}
          </p>
        </div>

        <div className="transcript-box">
          {finalText || interimText ? (
            <>
              <span>{finalText}</span>
              <span className="interim">{interimText}</span>
            </>
          ) : (
            <span className="placeholder">
              A transcrição da fala do professor(a) vai aparecer aqui, palavra por palavra…
            </span>
          )}
        </div>

        <div className="row">
          <button className="btn btn-ghost" onClick={onDemo}>▶ Usar transcrição de exemplo</button>
          <button className="btn btn-ghost" onClick={onClear}>🗑 Limpar</button>
          <button className="btn btn-accent" disabled={!hasText || gerando} onClick={onGerar}>
            {gerando ? '⏳ Gerando…' : '✨ Gerar resumo, tópicos e perguntas'}
          </button>
        </div>
        <p className="lede" style={{ marginTop: 14, fontSize: '0.82rem' }}>
          <span className="pill">🔊 Speech-to-Text</span> a transcrição usa a Web Speech API do
          navegador, em português (pt-BR), sem precisar digitar.
        </p>
      </div>
    </section>
  );
}
