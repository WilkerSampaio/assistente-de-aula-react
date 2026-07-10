# Assistente de Aula — React + Python (100% gratuito)

Versão do protótipo em **React** (frontend) com um backend em **Python
(FastAPI)**, que chama uma LLM real e **gratuita** — a API da
[Groq](https://console.groq.com), rodando o modelo aberto Llama 3.3 — para
gerar resumo, tópicos e perguntas. Não precisa de cartão de crédito nem
gastar nada.

Transcrição de fala (Speech-to-Text) e leitura em voz alta (Text-to-Speech)
funcionam direto no navegador (Web Speech API), sem precisar do backend. Só a
geração de resumo/tópicos/perguntas com IA real precisa do backend rodando —
sem ele, o app cai sozinho no modo simulado local, para nunca travar uma
apresentação.

## Estrutura
```
assistente-de-aula-react/
├── backend/              → Python (FastAPI)
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
└── frontend/             → React (Vite)
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── styles.css
    │   ├── utils.js
    │   ├── hooks/useSpeechRecognition.js
    │   └── components/*.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 1. Crie sua chave gratuita da Groq

1. Acesse https://console.groq.com e crie uma conta (dá pra usar o login do
   Google, sem cartão de crédito).
2. Vá em **API Keys** → **Create API Key**.
3. Copie a chave gerada (começa com `gsk_...`).

O plano gratuito da Groq tem um limite generoso de requisições por dia —
mais do que suficiente para desenvolver e apresentar o trabalho.

## 2. Backend (Python)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```
Abra `.env` e cole sua chave:
```
GROQ_API_KEY=gsk_...sua_chave_aqui...
```
Rode o servidor:
```bash
uvicorn main:app --reload --port 8000
```
Deixe rodando em `http://localhost:8000`.

## 3. Frontend (React)

Em outro terminal:
```bash
cd frontend
npm install
npm run dev
```
Abra `http://localhost:5173`. O Vite já está configurado (`vite.config.js`)
para encaminhar chamadas `/api/...` para o backend em `localhost:8000`, então
não precisa mexer em CORS para desenvolver localmente.

## 4. Testar

1. Na aba **Gravação**, toque em "Usar transcrição de exemplo" (ou grave sua
   própria fala, no Chrome).
2. Toque em "Gerar resumo, tópicos e perguntas".
3. Se o backend estiver rodando com a chave configurada, vai aparecer o selo
   **"🤖 Gerado por IA real (Groq · Llama 3.3, grátis)"** na aba Resumo.

## Precisa de internet na apresentação

Diferente de rodar uma IA localmente, essa abordagem depende de internet no
dia da apresentação (o backend chama a API da Groq pela rede). Se o Wi-Fi da
sala falhar, o app continua funcionando normalmente, só que no modo simulado
local — não trava a demonstração, só perde o selo de "IA real".

## Publicar para apresentar por um link (opcional)

- **Backend**: hospede gratuitamente em Render ou Fly.io (planos free).
  Configure a variável de ambiente `GROQ_API_KEY` no painel do serviço
  (nunca no código).
- **Frontend**: `npm run build` gera a pasta `dist/`, que pode ser hospedada
  de graça em Vercel, Netlify ou GitHub Pages. Depois de publicado, troque a
  chamada `fetch('/api/gerar')` em `src/utils.js` pela URL pública do
  backend.

## Importante
- Nunca coloque a `GROQ_API_KEY` no código do frontend — ela ficaria visível
  para qualquer pessoa que abrir o site. Por isso ela mora só no backend
  Python.
- Speech-to-Text (Web Speech API) funciona bem no Chrome; é limitado ou
  ausente no Firefox e no Safari. Apresente pelo Chrome.
- Quer trocar o provedor no futuro (ex.: Google Gemini, que também tem plano
  gratuito)? Só é preciso mexer no `backend/main.py` — a URL da API, o nome
  do modelo e o formato da resposta mudam um pouco entre provedores, mas a
  ideia (mandar a transcrição, pedir JSON de volta) continua a mesma.
