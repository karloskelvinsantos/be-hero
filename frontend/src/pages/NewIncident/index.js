import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../service/api';

import './styles.css';

import LogoImage from '../../assets/logo.svg';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ong_id = localStorage.getItem('ongId');

  async function handleCreateIncident(event) {
    event.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try {
      const response = await api.post('/incidents', data, {
        headers: {
          Authorization: ong_id,
        },
      });


      alert(`Incidente ${response.data} cadastrado com sucesso!`);
      history.push('/profile');
    } catch (error) {
      alert('Ocorreu um erro ao cadastrar incidente, tente novamente.');
    }
    

  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={LogoImage} alt="Be The Hero"/>
          <h1>Cadastrar Novo Caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói pra resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>

        <form onSubmit={handleCreateIncident}>
          <input 
            placeholder="Título do caso" 
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea 
            placeholder="Descrição" 
            onChange={(event) => setDescription(event.target.value)}
          />
          <input 
            placeholder="Valor em Reais" 
            onChange={(event) => setValue(event.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
