### 🎓 Assistente de Aula Inteligente

Um protótipo de assistente educacional de alta acessibilidade desenvolvido como trabalho prático para a disciplina de **Inteligência Artificial** do curso de **Sistemas de Informação (Período Noturno)**.

O objetivo principal do projeto é transcrever áudios de aulas em tempo real e, utilizando **Modelos de Linguagem de Grande Escala (LLMs)**, gerar automaticamente resumos estruturados, tópicos principais e questionários de revisão (Q&A) para otimizar os estudos dos alunos de forma inclusiva.

---

# 🚀 Funcionalidades

- **🎙️ Transcrição em Tempo Real**  
  Captura e exibe a fala do professor utilizando a *Web Speech API* nativa do navegador, com suporte otimizado para Português-Brasil (PT-BR).

- **🤖 Resumos Automatizados por IA**  
  Integração com a API da **Groq**, utilizando o modelo de linguagem `llama-3.3-70b-versatile` para análise e processamento inteligente dos textos.

- **📝 Edição Flexível da Transcrição**  
  Permite utilizar textos de demonstração ou editar livremente o conteúdo capturado antes de realizar a análise pela inteligência artificial.

- **❓ Gerador Dinâmico de Simulados**  
  Criação automática de perguntas de múltipla escolha com sistema interativo de feedback visual para respostas corretas e incorretas.

- **♿ Acessibilidade Universal Integrada**  
  Recursos de acessibilidade como:
  - Ajuste progressivo do tamanho da fonte (A- / A+)
  - Modo de alto contraste para usuários com baixa visão
  - Redução de animações da interface

- **💾 Histórico Local Resiliente**  
  Armazenamento automático dos últimos resumos gerados utilizando *LocalStorage* do navegador.

---

# 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando uma arquitetura **full-stack desacoplada**, dividida em dois ecossistemas integrados.

## Frontend

- **React.js** (com Vite)
- **CSS3** com variáveis nativas para gerenciamento de temas e contraste
- **Web Speech API** para reconhecimento de voz em tempo real

## Backend (API)

- **Python 3.11**
- **FastAPI** para criação das rotas da API
- **Uvicorn** como servidor ASGI
- **HTTPX** para comunicação assíncrona com serviços externos
- **Pydantic** para validação de dados e schemas

---

# 📦 Como Executar o Projeto Localmente

## Pré-requisitos

Antes de iniciar, certifique-se de possuir:

- Node.js instalado (versão 18 ou superior)
- Python instalado (versão 3.10 ou 3.11)
- Uma chave de API ativa da [Groq Cloud](https://console.groq.com/)

---

# ⚙️ Configuração do Backend

### 1. Acesse a pasta do backend

```bash
cd backend
````

### 2. Instale as dependências Python

```bash
pip install -r requirements.txt
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz da pasta `backend`:

```env
GROQ_API_KEY=sua_chave_gsk_aqui
```

### 4. Inicie o servidor FastAPI

```bash
uvicorn main:app --reload --port 8000
```

O backend estará disponível em:

```
http://localhost:8000
```

---

# 💻 Configuração do Frontend

Abra um novo terminal:

### 1. Acesse a pasta frontend

```bash
cd frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute o projeto React

```bash
npm run dev
```

O frontend estará disponível em:

```
http://localhost:5173
```

---

# ☁️ Deploy em Produção (Render)

A aplicação foi configurada para funcionar na plataforma **Render**, utilizando uma arquitetura integrada onde o backend FastAPI gerencia os endpoints da inteligência artificial e também disponibiliza os arquivos estáticos gerados pelo React.

## Configurações do Render

### Root Directory

```
(deixar vazio)
```

---

## Build Command

```bash
cd frontend && npm install && node node_modules/vite/bin/vite.js build && cd .. && pip install -r backend/requirements.txt
```

---

## Start Command

```bash
uvicorn backend.main:app --host 0.0.0.0 --port $PORT
```

---

## Variáveis de Ambiente

Configure no painel do Render:

```env
PYTHON_VERSION=3.11.8

GROQ_API_KEY=sua_chave_privada_da_groq
```

---

# 🏗️ Arquitetura do Projeto

```
assistente-de-aula/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

---

# 🎯 Objetivos do Projeto

* Aplicar conceitos de Inteligência Artificial em uma aplicação real.
* Utilizar LLMs para auxiliar no processo de aprendizagem.
* Criar uma ferramenta educacional acessível.
* Explorar integração entre frontend, backend e APIs de IA.

---

# 👨‍💻 Autor

Desenvolvido por **Wilker Sampaio** 🚀

```
```
