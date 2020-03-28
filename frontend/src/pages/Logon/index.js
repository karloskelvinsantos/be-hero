import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import { FiLogIn } from 'react-icons/fi';

import api from '../../service/api';

import './styles.css';

import LogoImage from '../../assets/logo.svg';
import heroesImage from '../../assets/heroes.png';

export default function Logon() {
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post('/session', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (error) {
      alert('Erro ao realizar login, tente novamente');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={LogoImage} alt="Be The Hero"/>
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input 
            placeholder="Sua ID" 
            value={id} 
            onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="button">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImage} alt="heroes"/>
    </div>
  );
}
