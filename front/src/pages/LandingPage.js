import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="landing-title">Добро пожаловать в наше приложение!</h1>
      <p className="landing-description">Пожалуйста, войдите или зарегистрируйтесь.</p>
      <button 
        onClick={() => navigate('/login')} 
        className="landing-btn landing-btn-primary"
      >
        Вход
      </button>
      <button 
        onClick={() => navigate('/register')} 
        className="landing-btn landing-btn-primary"
      >
        Регистрация
      </button>
    </div>
  );
}

export default LandingPage;