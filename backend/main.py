import json
import os

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles  # <-- IMPORTANTE
from pydantic import BaseModel

# Carrega variáveis do .env
load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")

# Modelo atualizado (esse aqui é mais seguro usar)
MODEL = "llama-3.3-70b-versatile"

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

SYSTEM_PROMPT = """Você é um assistente educacional inteligente especializado em análise de aulas.

A partir de uma transcrição de aula em português, gere APENAS um JSON válido (sem markdown, sem texto fora do JSON) no formato:

{
  "resumo": "resumo claro e objective da aula, de 3 a 5 frases",
  "ideia_central": "uma única frase explicando o principal tema da aula",
  "topicos": ["tópico 1", "tópico 2", "tópico 3", "tópico 4", "tópico 5"],
  "perguntas": [
    {
      "pergunta": "pergunta de revisão sobre a aula",
      "opcoes": ["resposta correta", "resposta incorreta plausível"],
      "correta": 0
    }
  ]
}

REGRAS IMPORTANTES:
- Os tópicos devem ser FRASES COMPLETAS
- Gere entre 4 e 6 tópicos
- Gere entre 3 e 5 perguntas
- A ideia central deve ser clara e direta

Responda SOMENTE com JSON.
"""

app = FastAPI(title="Assistente de Aula - API")

# Libera acesso (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],
)


class GerarRequest(BaseModel):
    texto: str


@app.get("/api/status")
def status():
    return {
        "ok": True,
        "ia_configurada": bool(API_KEY)
    }


@app.post("/api/gerar")
async def gerar(req: GerarRequest):
    texto = (req.texto or "").strip()

    if len(texto) < 5:
        raise HTTPException(
            status_code=400,
            detail="Transcrição muito curta."
        )

    if not API_KEY:
        raise HTTPException(
            status_code=500,
            detail="GROQ_API_KEY não configurada no .env"
        )

    payload = {
        "model": MODEL,
        "temperature": 0.3,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": texto},
        ],
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }

    try:
        async with httpx.AsyncClient(timeout=60) as client:
            resp = await client.post(GROQ_URL, headers=headers, json=payload)

        if resp.status_code != 200:
            raise HTTPException(
                status_code=502,
                detail=f"Erro na Groq: {resp.text}"
            )

        data = resp.json()
        raw_text = data["choices"][0]["message"]["content"].strip()

        # Limpeza extra (caso venha com markdown)
        clean = raw_text.replace("```json", "").replace("```", "").strip()

        parsed = json.loads(clean)

        return parsed

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail="IA não retornou JSON válido"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

# ==========================================================================
# SERVIR FRONTEND REACT JUNTOS NO RENDER
# ==========================================================================
# Procura a pasta 'dist' gerada pelo build do Vite do seu frontend
dist_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

if os.path.exists(dist_path):
    app.mount("/", StaticFiles(directory=dist_path, html=True), name="static")