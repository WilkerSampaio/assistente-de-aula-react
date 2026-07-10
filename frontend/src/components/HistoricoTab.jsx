import { capitalize, falar, pararFalar } from '../utils.js';
import { useState, useEffect } from 'react';

export default function HistoricoTab({ history }) {
  const [itemFalando, setItemFalando] = useState(null); // Guarda o índice do item que está tocando

  // Garante que o áudio pare se o usuário mudar de aba
  useEffect(() => {
    return () => {
      pararFalar();
    };
  }, []);

  const handleAudioClick = (resumo, index) => {
    if (itemFalando === index) {
      pararFalar();
      setItemFalando(null);
    } else {
      setItemFalando(index);
      falar(resumo, () => setItemFalando(null));
    }
  };

  return (
    <section role="tabpanel">
      <h1>Histórico de aulas</h1>
      <p className="lede">Aulas processadas anteriormente, salvas para consulta e apoio ao estudo.</p>

      {!history || !history.length ? (
        <div className="empty-state">
          <span className="ic">🗂️</span>
          Nenhuma aula processada ainda. As aulas geradas ficam salvas aqui automaticamente.
        </div>
      ) : (
        history.map((item, i) => {
          // Proteção essencial: tenta ler '.topicos' (IA real) ou '.topics' (simulado/antigo)
          const listaTopicos = item.topicos || item.topics || [];
          const tituloExibicao = listaTopicos.slice(0, 3).map(capitalize).join(', ') || 'Aula';

          return (
            <div className="hist-item" key={i}>
              <div className="meta">
                <strong>{tituloExibicao}</strong>
                <span>{item.data}</span>
              </div>
              <button
                className={`btn ${itemFalando === i ? 'btn-danger' : 'btn-ghost'}`}
                style={{ 
                  minHeight: 40, 
                  padding: '8px 14px',
                  backgroundColor: itemFalando === i ? '#dc3545' : undefined,
                  color: itemFalando === i ? '#fff' : undefined
                }}
                onClick={() => handleAudioClick(item.resumo, i)}
              >
                {itemFalando === i ? '⏹️ Parar' : '🔊 Ouvir'}
              </button>
            </div>
          );
        })
      )}
    </section>
  );
}