import { useEffect, useState } from 'react';
import TopBar from './components/TopBar.jsx';
import TabBar from './components/TabBar.jsx';
import GravacaoTab from './components/GravacaoTab.jsx';
import ResumoTab from './components/ResumoTab.jsx';
import PerguntasTab from './components/PerguntasTab.jsx';
import ComunicadorTab from './components/ComunicadorTab.jsx';
import HistoricoTab from './components/HistoricoTab.jsx';
import ArquiteturaTab from './components/ArquiteturaTab.jsx';
import { useSpeechRecognition } from './hooks/useSpeechRecognition.js';
import { EXEMPLO_AULA, chamarLLM, gerarConteudoLocal } from './utils.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('gravacao');

  // Acessibilidade
  const [fontStep, setFontStep] = useState(1);
  const [contrast, setContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Gravação / transcrição
  const { recording, finalText, interimText, supported, start, stop, reset, setDemoText } =
    useSpeechRecognition();
  const [micError, setMicError] = useState('');

  // Resultado gerado (resumo/tópicos/perguntas)
  const [data, setData] = useState(null);
  const [gerando, setGerando] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Histórico
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('aulas') || '[]');
    } catch {
      return [];
    }
  });

  const toggleMic = () => {
    if (!supported) {
      setMicError('Este navegador não suporta reconhecimento de fala. Use a transcrição de exemplo.');
      return;
    }
    if (!recording) {
      setMicError('');
      start();
    } else {
      stop();
    }
  };

  const handleDemo = () => {
    setDemoText(EXEMPLO_AULA);
    setMicError('');
  };

  const handleClear = () => {
    reset();
    setData(null);
    setMicError('');
  };

  const handleGerar = async () => {
    const texto = finalText.trim();
    if (texto.length < 5) return;
    setGerando(true);
    setStatusMsg('Enviando transcrição para a IA…');

    let resultado;
    try {
      resultado = await chamarLLM(texto);
      setStatusMsg('Resumo gerado por IA real! Veja as abas Resumo e Perguntas.');
    } catch (err) {
      resultado = gerarConteudoLocal(texto);
      setStatusMsg('Servidor de IA indisponível — usando modo simulado local.');
    }

    setData(resultado);

    // Ajustado para 'resultado.topicos' para bater com o formato JSON do backend em Python
    const novoItem = {
      data: new Date().toLocaleString('pt-BR'),
      topics: resultado.topicos, 
      resumo: resultado.resumo
    };
    
    const novoHistorico = [novoItem, ...history].slice(0, 10);
    setHistory(novoHistorico);
    try {
      localStorage.setItem('aulas', JSON.stringify(novoHistorico));
    } catch {
      /* ignora falha de storage */
    }

    setGerando(false);
    setActiveTab('resumo');
  };

  useEffect(() => {
    if (!recording) setStatusMsg((s) => (s.startsWith('🔴') ? '' : s));
  }, [recording]);

  return (
    <div
      className={`app ${contrast ? 'contrast' : ''}`}
      style={{ '--step': fontStep, '--motion': reduceMotion ? 0 : 1 }}
    >
      <div className="skip-link">
        <a href="#main">Pular para o conteúdo</a>
      </div>

      <TopBar
        fontStep={fontStep}
        onFontUp={() => setFontStep((s) => Math.min(1.4, +(s + 0.1).toFixed(2)))}
        onFontDown={() => setFontStep((s) => Math.max(0.85, +(s - 0.1).toFixed(2)))}
        contrast={contrast}
        onContrast={() => setContrast((c) => !c)}
        reduceMotion={reduceMotion}
        onMotion={() => setReduceMotion((m) => !m)}
      />

      <TabBar active={activeTab} onChange={setActiveTab} />

      <main id="main">
        {activeTab === 'gravacao' && (
          <GravacaoTab
            recording={recording}
            supported={supported}
            finalText={finalText}
            interimText={interimText}
            onToggleMic={toggleMic}
            onDemo={handleDemo}
            onClear={handleClear}
            onGerar={handleGerar}
            gerando={gerando}
            statusMsg={micError || (!recording ? statusMsg : '')}
          />
        )}
        {activeTab === 'resumo' && <ResumoTab data={data} />}
        {activeTab === 'perguntas' && <PerguntasTab data={data} />}
        {activeTab === 'comunicador' && <ComunicadorTab />}
        {activeTab === 'historico' && <HistoricoTab history={history} />}
        {activeTab === 'arquitetura' && <ArquiteturaTab />}
      </main>

      <footer>
        Trabalho da disciplina de Inteligência Artificial — Assistente de Aula (protótipo) ·
        React + Python · Sistemas de Informação, período noturno.
      </footer>
    </div>
  );
}