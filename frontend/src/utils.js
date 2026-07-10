export function falar(texto, onEnd) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel(); // Cancela falas anteriores para evitar sobreposição
  
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = 'pt-BR';
  u.rate = 0.98;
  
  // Executa os callbacks de encerramento para atualizar o estado do botão
  if (onEnd) {
    u.onend = onEnd;
    u.onerror = onEnd;
  }
  
  window.speechSynthesis.speak(u);
}

export function pararFalar() {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
}

export const EXEMPLO_AULA =
  'Hoje vamos falar sobre redes neurais artificiais e sua relação com aprendizado de ' +
  'máquina. Uma rede neural é composta por camadas de neurônios artificiais que recebem ' +
  'entradas, aplicam pesos e uma função de ativação. O treinamento acontece por meio do ' +
  'algoritmo de backpropagation, que ajusta os pesos para reduzir o erro entre a saída ' +
  'prevista e a saída esperada. Além das redes neurais, existe a lógica fuzzy, que ' +
  'permite representar incertezas e graus de pertencência, diferente da lógica booleana ' +
  'tradicional. Quando combinamos redes neurais com lógica fuzzy, chamamos de sistema ' +
  'neuro-fuzzy, que aprende com dados e ao mesmo tempo usa regras interpretáveis. ' +
  'Também vimos que os modelos de linguagem, as LLMs, são treinados com grandes ' +
  'quantidades de texto e conseguem gerar resumos, responder perguntas e manter ' +
  'conversas. Por fim, discutimos agentes inteligentes, que percebem o ambiente, tomam ' +
  'decisões e agem de forma autônoma para atingir um objetivo, e como a engenharia de ' +
  'software se aplica na construção de sistemas de inteligência artificial confiáveis.';

const STOP = new Set(
  ('de a o que e do da em um uma os as para com não uma por mais as dos como mas ao ele ' +
    'das seu sua ou quando muito nos já eu também só pelo pela até isso ela entre depois ' +
    'sem mesmo aos seus quem nas me esse eles você essa num nem suas meu às minha têm ' +
    'numa pelos elas qual será nós tinha foi está isto aquele são nossa também é vamos ' +
    'foram vai são fazer sobre esta este estas esses'
  ).split(' ')
);

function extractTopics(text, n) {
  const words = text
    .toLowerCase()
    .replace(/[.,;:!?()"“”]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOP.has(w));
  const freq = {};
  words.forEach((w) => {
    freq[w] = (freq[w] || 0) + 1;
  });
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map((e) => e[0]);
}

function splitSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);
}

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Fallback local: usado quando o backend Python não está disponível.
export function gerarConteudoLocal(texto) {
  const sentences = splitSentences(texto);
  const topics = extractTopics(texto, 5);

  let resumoFrases = [];
  if (sentences.length <= 3) {
    resumoFrases = sentences;
  } else {
    resumoFrases = [sentences[0], sentences[Math.floor(sentences.length / 2)], sentences[sentences.length - 1]];
  }
  const resumo = resumoFrases.join(' ');

  const qas = topics.slice(0, 4).map((t) => {
    const contexto = sentences.find((s) => s.toLowerCase().includes(t)) || sentences[0] || '';
    return {
      pergunta: `O que a aula explicou sobre "${t}"?`,
      opcoes: [contexto.length > 130 ? contexto.slice(0, 130) + '…' : contexto, 'Não foi mencionado na aula.'],
      certa: 0
    };
  });

  return { resumo, topicos: topics, perguntas: qas, fonte: 'local' };
}

// Chama o backend Python (FastAPI), apontando explicitamente para o localhost:8000
export async function chamarLLM(texto) {
  const resp = await fetch('http://127.0.0.1:8000/api/gerar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto })
  });
  
  if (!resp.ok) throw new Error('backend indisponível');
  
  const json = await resp.json();
  
  return {
    resumo: json.resumo,
    topicos: json.topicos || [],
    perguntas: json.perguntas || [],
    fonte: 'ia'
  };
}