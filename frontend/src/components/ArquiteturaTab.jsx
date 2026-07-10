export default function ArquiteturaTab() {
  return (
    <section role="tabpanel">
      <h1>Arquitetura do sistema</h1>
      <p className="lede">Como os conceitos da disciplina se conectam neste protótipo.</p>

      <div className="card">
        <h2>Pipeline de processamento</h2>
        <div className="pipeline">
          <div className="pnode">
            <span className="ic">🎧</span>
            <strong>Áudio da aula</strong>
            <span>Captado pelo microfone do smartphone/notebook</span>
          </div>
          <div className="parrow">→</div>
          <div className="pnode">
            <span className="ic">🔤</span>
            <strong>Speech-to-Text</strong>
            <span>Web Speech API converte fala em texto em tempo real (React)</span>
          </div>
          <div className="parrow">→</div>
          <div className="pnode">
            <span className="ic">🤖</span>
            <strong>Agente orquestrador</strong>
            <span>Decide quando resumir, perguntar ou sugerir pausa</span>
          </div>
          <div className="parrow">→</div>
          <div className="pnode">
            <span className="ic">🧩</span>
            <strong>LLM (backend Python)</strong>
            <span>FastAPI chama a API gratuita da Groq (Llama 3.3) e gera resumo, tópicos e perguntas</span>
          </div>
          <div className="parrow">→</div>
          <div className="pnode">
            <span className="ic">♿</span>
            <strong>Interface acessível</strong>
            <span>Botões grandes, alto contraste e leitura em voz alta</span>
          </div>
        </div>
        <p className="lede" style={{ fontSize: '0.85rem' }}>
          A transcrição (Speech-to-Text) e a leitura em voz alta (Text-to-Speech) rodam direto no
          navegador, dentro do React. A geração de resumo/tópicos/perguntas é feita por um
          backend em <strong>Python (FastAPI)</strong>, que guarda a chave de API em segredo e
          chama uma <strong>LLM real e gratuita</strong> (API da Groq, modelo Llama 3.3). Se o
          backend não estiver disponível, o app usa um modo simulado local, para a demonstração
          nunca travar.
        </p>
      </div>

      <div className="card">
        <h2>Onde cada conceito da disciplina entra</h2>
        <table className="concept-table">
          <thead>
            <tr>
              <th>Conceito</th>
              <th>Aplicação neste sistema</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Redes Neurais Artificiais</td>
              <td>Base dos modelos de reconhecimento de fala e da LLM (arquiteturas tipo transformer) usados por trás do Speech-to-Text e da geração de texto.</td>
            </tr>
            <tr>
              <td>Lógica Fuzzy</td>
              <td>Classificaria o "nível de compreensão" do estudante (baixo / médio / alto) a partir de sinais indiretos — quantidade de pedidos de repetição, tempo de resposta às perguntas — para ajustar o quanto o resumo é detalhado.</td>
            </tr>
            <tr>
              <td>Sistemas Neuro-Fuzzy</td>
              <td>Combinaria a rede neural (que reconhece padrões na fala/texto) com regras fuzzy (que adaptam a comunicação ao estudante), permitindo personalizar o ritmo e o nível de detalhe do conteúdo gerado.</td>
            </tr>
            <tr>
              <td>LLMs</td>
              <td>Geram o resumo, os tópicos principais e as perguntas de revisão a partir da transcrição da aula, via backend Python.</td>
            </tr>
            <tr>
              <td>Agentes Inteligentes</td>
              <td>Um agente orquestrador decide, ao longo da aula, quando resumir um trecho, quando gerar uma pergunta de checagem ou quando sugerir um intervalo.</td>
            </tr>
            <tr>
              <td>Engenharia de Software para IA</td>
              <td>Frontend em React (componentes reutilizáveis, hooks) desacoplado de um backend Python responsável só pela IA, comunicando-se por uma API REST.</td>
            </tr>
            <tr>
              <td>Interação Humano-Computador</td>
              <td>Botões grandes, navegação por toque simples, alto contraste, ajuste de fonte e comunicador rápido, pensados para uso com mobilidade reduzida.</td>
            </tr>
            <tr>
              <td>Tecnologias Assistivas</td>
              <td>O sistema inteiro: comunicação alternativa (CAA), leitura em voz alta, transcrição automática e apoio à aprendizagem.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Sobre o contexto</h2>
        <p className="lede" style={{ fontSize: '0.92rem' }}>
          Protótipo desenvolvido para apoiar um colega de turma com mobilidade reduzida, uso de
          cadeira de rodas, dificuldade de fala e de movimentação dos membros superiores, que
          utiliza o smartphone com os pés. O objetivo é reduzir a dependência de digitação e
          escrita manual durante a aula, e oferecer um canal rápido de comunicação e revisão de
          conteúdo.
        </p>
      </div>
    </section>
  );
}
