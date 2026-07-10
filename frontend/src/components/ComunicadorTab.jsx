import { useState } from 'react';
import { falar } from '../utils.js';

const FRASES = [
  { ic: '✋', t: 'Não entendi' },
  { ic: '🔁', t: 'Pode repetir?' },
  { ic: '⏸️', t: 'Preciso de um intervalo' },
  { ic: '✅', t: 'Sim' },
  { ic: '❌', t: 'Não' },
  { ic: '🐢', t: 'Pode falar mais devagar?' },
  { ic: '🙋', t: 'Tenho uma dúvida' },
  { ic: '👍', t: 'Entendi, obrigado(a)' }
];

export default function ComunicadorTab() {
  const [log, setLog] = useState([]);
  const [spokenIdx, setSpokenIdx] = useState(null);

  const handleClick = (frase, idx) => {
    falar(frase.t);
    setSpokenIdx(idx);
    setTimeout(() => setSpokenIdx(null), 600);
    const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setLog((prev) => [`${hora} — “${frase.t}”`, ...prev].slice(0, 5));
  };

  return (
    <section role="tabpanel">
      <h1>Comunicador rápido</h1>
      <p className="lede">
        Frases prontas para interagir com o(a) professor(a) e colegas durante a aula, faladas em
        voz alta com um único toque — apoio de Comunicação Alternativa e Ampliada (CAA).
      </p>
      <div className="card">
        <div className="comm-grid">
          {FRASES.map((f, i) => (
            <button
              key={f.t}
              className={`comm-btn ${spokenIdx === i ? 'spoken' : ''}`}
              onClick={() => handleClick(f, i)}
            >
              <span className="ic" aria-hidden="true">{f.ic}</span>
              <span>{f.t}</span>
            </button>
          ))}
        </div>
        <div className="comm-log">
          {log.length ? `Últimas mensagens: ${log.join(' · ')}` : 'Nenhuma mensagem enviada ainda.'}
        </div>
      </div>
    </section>
  );
}
