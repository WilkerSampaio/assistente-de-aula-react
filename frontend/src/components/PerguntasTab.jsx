import { useState } from 'react';
import { falar } from '../utils.js';

function QaCard({ qa, index }) {
  const [answered, setAnswered] = useState(null); // index escolhido

  // Mapeia de forma segura se a propriedade correta chama 'correta' ou 'certa'
  const indiceCorreto = qa.correta !== undefined ? qa.correta : qa.certa;

  const handleClick = (i) => {
    setAnswered(i);
    const correct = i === indiceCorreto;
    falar(correct ? 'Correto.' : 'Não foi essa. Revise o resumo.');
  };

  return (
    <div className="card qa-card">
      <div className="qa-q">
        {index + 1}. {qa.pergunta}
      </div>
      <div className="qa-answers">
        {(qa.opcoes || []).map((o, i) => {
          let cls = '';
          if (answered !== null) {
            if (i === answered) cls = i === indiceCorreto ? 'correct' : 'wrong';
          }
          return (
            <button key={i} className={cls} onClick={() => handleClick(i)}>
              {o || '—'}
            </button>
          );
        })}
      </div>
      <div className="qa-fb">
        {answered !== null && (answered === indiceCorreto ? '✅ Correto!' : '❌ Revise o resumo da aula.')}
      </div>
    </div>
  );
}

export default function PerguntasTab({ data }) {
  // Garante compatibilidade buscando por .perguntas (IA real) ou .qas (antigo/simulado)
  const listaPerguntas = data?.perguntas || data?.qas || [];

  return (
    <section role="tabpanel">
      <h1>Perguntas &amp; respostas</h1>
      <p className="lede">
        Perguntas de múltipla escolha geradas a partir da aula — respondidas com um toque, sem
        exigir fala ou escrita.
      </p>
      {listaPerguntas.length === 0 ? (
        <div className="empty-state">
          <span className="ic">❓</span>
          As perguntas de revisão aparecem aqui depois que o resumo é gerado.
        </div>
      ) : (
        listaPerguntas.map((qa, i) => <QaCard key={i} qa={qa} index={i} />)
      )}
    </section>
  );
}