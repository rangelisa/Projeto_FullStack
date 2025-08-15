import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [people, setPeople] = useState([]);
  const [curriculo, setCurriculo] = useState(null);

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

  useEffect(() => {
    axios
      .get(`${API_BASE}/api01`)
      .then((res) => setPeople(res.data))
      .catch((err) => console.error("Erro ao buscar pessoas:", err));

    axios
      .get(`${API_BASE}/api02`)
      .then((res) => {
        console.log("Resposta da API /api02:", res.data);
        
        if (res.data && res.data.curriculo) {
          setCurriculo(res.data.curriculo);
        } else {
          setCurriculo(res.data);
        }
      })
      .catch((err) => console.error("Erro ao buscar currículo:", err));
  }, [API_BASE]);

  return (
    <div className="container-column">
      {/* Pessoas */}
      <div className="card pessoas">
        <h2>Pessoas</h2>
        {people.length > 0 ? (
          <ul>
            {people.map((p) => (
              <li key={p.id}>
                <strong>{p.name}</strong> - {p.age} anos
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">Nenhuma pessoa encontrada.</p>
        )}
      </div>

      {/* Currículo */}
      <div className="card curriculo">
        <h2>Currículo</h2>
        {curriculo ? (
          <div className="curriculo-dados">
            <h3>{curriculo.nome}</h3>
            <p><strong>Cargo:</strong> {curriculo.cargo}</p>

            {curriculo.contato && (
              <>
                <h4>Contato</h4>
                <p>Email: {curriculo.contato.email}</p>
                <p>Telefone: {curriculo.contato.telefone}</p>
              </>
            )}

            {curriculo.habilidades && curriculo.habilidades.length > 0 && (
              <>
                <h4>Habilidades</h4>
                <ul>
                  {curriculo.habilidades.map((hab, i) => (
                    <li key={i}>{hab}</li>
                  ))}
                </ul>
              </>
            )}

            {curriculo.experiencia && curriculo.experiencia.length > 0 && (
              <>
                <h4>Experiência</h4>
                {curriculo.experiencia.map((exp, i) => (
                  <div key={i} className="experiencia-item">
                    <p><strong>{exp.empresa}</strong> ({exp.periodo})</p>
                    <p>{exp.cargo}</p>
                  </div>
                ))}
              </>
            )}

            {curriculo.educacao && (
              <>
                <h4>Educação</h4>
                <p>{curriculo.educacao.curso}</p>
                <p>
                  {curriculo.educacao.instituicao} - {curriculo.educacao["ano de formação"]}
                </p>
              </>
            )}
          </div>
        ) : (
          <p className="empty">Nenhum currículo encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default App;

// certo
