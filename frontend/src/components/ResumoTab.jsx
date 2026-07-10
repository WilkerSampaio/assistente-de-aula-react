import { useState, useEffect } from 'react';
import { capitalize, falar, pararFalar } from '../utils.js';

export default function ResumoTab({ data }) {
  const [falando, setFalando] = useState(false);

  // Cancela o áudio caso o usuário mude de aba no meio da reprodução
  useEffect(() => {
    return () => {
      pararFalar();
    };
  }, []);

  if (!data) {
    return (
      <section role="tabpanel">
        <h1>Resumo da aula</h1>
        <p className="lede">
          Gerado automaticamente a partir da transcrição, para revisar o conteúdo sem depender
          de anotações manuscritas.
        </p>
        <div className="empty-state">
          <span className="ic">📝</span>
          Grave ou carregue uma aula de exemplo, depois toque em “Gerar resumo” na aba Gravação.
        </div>
      </section>
    );
  }

  const badge =
    data.fonte === 'ia' ? (
      <span className="pill">🤖 Gerado por IA real (Groq · Llama 3.3, grátis)</span>
    ) : (
      <span className="pill">⚙️ Modo simulado (sem servidor de IA)</span>
    );

  const listaDeTopicos = data.topicos || data.topics || [];

  const handleAudioClick = () => {
    if (falando) {
      pararFalar();
      setFalando(false);
    } else {
      setFalando(true);
      falar(data.resumo, () => setFalando(false));
    }
  };

  return (
    <section role="tabpanel">
      <h1>Resumo da aula</h1>
      <p className="lede">
        Gerado automaticamente a partir da transcrição, para revisar o conteúdo sem depender de
        anotações manuscritas.
      </p>

      <div className="card">
        <h2>📝 Resumo</h2>
        {badge}
        <p className="summary-text" style={{ marginTop: 12 }}>
          {data.resumo}
        </p>
        <div className="row" style={{ justifyContent: 'flex-start', marginTop: 16 }}>
          <button 
            className={`btn ${falando ? 'btn-danger' : 'btn-primary'}`} 
            onClick={handleAudioClick}
            style={{ backgroundColor: falando ? '#dc3545' : undefined }}
          >
            {falando ? '⏹️ Parar áudio' : '🔊 Ouvir resumo'}
          </button>
        </div>
      </div>

      <div className="card">
        <h2>📌 Tópicos principais</h2>
        <ul className="topics-list">
          {listaDeTopicos.map((t, i) => (
            <li key={t + i}>
              <span className="n">{i + 1}</span>
              {capitalize(t)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}