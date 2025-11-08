import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegisterPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        username,
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      if (response.data.username) {
        localStorage.setItem('username', response.data.username);
      } else {
        localStorage.setItem('username', username);
      }
      navigate('/dashboard');
    } catch (err) {
      setError('Ошибка регистрации: ' + (err.response?.data?.message || 'Проверьте данные'));
    }
  };

  return (
    <div className="register-form-container">
      <h2 className="register-title">Регистрация</h2>
      {error && <p className="register-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Имя пользователя" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="register-form-input"
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="register-form-input"
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="register-form-input"
        />
        <button type="submit" className="register-btn register-btn-primary">Зарегистрироваться</button>
      </form>
      <p className="register-form-link">Уже есть аккаунт? <a href="/login">Войти</a></p>
    </div>
  );
}

export default RegisterPage;