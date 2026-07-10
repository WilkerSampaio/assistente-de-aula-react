const TABS = [
  { id: 'gravacao', ic: '🎙️', label: 'Gravação' },
  { id: 'resumo', ic: '📝', label: 'Resumo' },
  { id: 'perguntas', ic: '❓', label: 'Perguntas' },
  { id: 'comunicador', ic: '💬', label: 'Comunicador' },
  { id: 'historico', ic: '🗂️', label: 'Histórico' },
  { id: 'arquitetura', ic: '🧠', label: 'Arquitetura' }
];

export default function TabBar({ active, onChange }) {
  return (
    <nav className="tabbar" aria-label="Navegação principal" role="tablist">
      {TABS.map((t) => (
        <button
          key={t.id}
          className="tabbtn"
          role="tab"
          aria-selected={active === t.id}
          onClick={() => onChange(t.id)}
        >
          <span className="ic">{t.ic}</span>
          {t.label}
        </button>
      ))}
    </nav>
  );
}
