import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    });
  }, [handleRemoveRepository])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: '123',
      title: `Novo projeto ${Date.now()}`,
      url: "Marco Pinho.com.br",
      techs: [
        'Express',
        'Node.js'
      ]
    });

    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    const response = await api.delete(`repositories/${id}`)

    repositories.splice(response, 1);

      api.get('repositories').then(response => {
      setRepository(response.data);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
