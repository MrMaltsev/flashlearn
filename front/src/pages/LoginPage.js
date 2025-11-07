import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Ошибка логина: ' + (err.response?.data?.message || 'Проверьте данные'));
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-title">Вход</h2>
      {error && <p className="login-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Имя пользователя" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="login-form-input"
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="login-form-input"
        />
        <button type="submit" className="login-btn login-btn-primary">Войти</button>
      </form>
      <p className="login-form-link">Нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
    </div>
  );
}

export default LoginPage;