export default function TopBar({ fontStep, onFontUp, onFontDown, contrast, onContrast, reduceMotion, onMotion }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-icon" aria-hidden="true">🎓</div>
        <div>
          <strong>Assistente de Aula</strong>
          <span>Sistemas de Informação · Período Noturno · Trabalho de IA</span>
        </div>
      </div>
      <div className="a11y-controls" role="toolbar" aria-label="Controles de acessibilidade">
        <button onClick={onFontDown} aria-label="Diminuir tamanho da fonte">A−</button>
        <button onClick={onFontUp} aria-label="Aumentar tamanho da fonte">A+</button>
        <button aria-pressed={contrast} onClick={onContrast}>◐ Alto contraste</button>
        <button aria-pressed={reduceMotion} onClick={onMotion}>✋ Reduzir animações</button>
      </div>
    </header>
  );
}
