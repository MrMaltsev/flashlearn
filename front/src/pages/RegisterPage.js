import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { saveAuthData } from '../utils/auth';
import '../styles/RegisterPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Очищаем предыдущие ошибки
    
    try {
      // Используем api instance для регистрации (это публичный endpoint)
      const response = await api.post('/auth/register', {
        username,
        email,
        password,
      });
      
      // Сохраняем данные аутентификации (если регистрация возвращает токен)
      // Обычно после регистрации пользователь должен войти, но если токен приходит, сохраняем
      if (response.data.token) {
        saveAuthData(response.data.token, response.data.username || username);
        navigate('/dashboard');
      } else {
        // Если токен не приходит, перенаправляем на страницу логина
        navigate('/login');
      }
    } catch (err) {
      // Обрабатываем ошибки регистрации
      if (err.response) {
        const status = err.response.status;
        if (status === 400 || status === 409) {
          // 400 - неверные данные, 409 - пользователь уже существует
          setError(err.response?.data?.message || 'Ошибка регистрации. Проверьте данные.');
        } else {
          setError('Ошибка регистрации: ' + (err.response?.data?.message || 'Не удалось зарегистрироваться'));
        }
      } else {
        setError('Ошибка сети. Проверьте подключение к интернету.');
      }
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