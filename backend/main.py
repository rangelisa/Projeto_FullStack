import json
import os
from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Person(BaseModel):
    id: int
    name: str
    age: int


DB: List[Person] = [
    Person(id=1, name="Jamila", age=22),
    Person(id=2, name="Alex", age=18),
    Person(id=3, name="Isabella", age=19)
]


@app.get("/")
def root():
    return {"message": "Servidor funcionando"}


@app.get("/api01")
def api01():
    return DB


@app.get("/api02")
def api02():
    try:
        
        caminho_arquivo = os.path.abspath("dados.json")
        print(f"[DEBUG] Lendo arquivo: {caminho_arquivo}")

        with open(caminho_arquivo, "r", encoding="utf-8") as f:
            dados = json.load(f)

     
        if "curriculo" in dados:
            return dados["curriculo"]
        return dados

    except FileNotFoundError:
        return {"error": "dados.json não encontrado"}
    except json.JSONDecodeError:
        return {"error": "Erro ao decodificar o JSON"}
