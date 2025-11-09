import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import { isLoggedIn, getUsername, clearAuthData } from '../utils/auth';
import '../styles/ProfilePage.css';
import '../styles/Dashboard.css';

function EditProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    aboutMe: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Проверяем, аутентифицирован ли пользователь
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    // Проверяем, что пользователь редактирует свой собственный профиль
    const currentUsername = getUsername();
    if (currentUsername && currentUsername !== username) {
      setError('Вы можете редактировать только свой профиль');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        // Используем api instance, который автоматически добавляет токен и обрабатывает ошибки
        const response = await api.get(`/users/${username}`);
        setProfile(response.data);
        setFormData({
          username: response.data.username || '',
          aboutMe: response.data.aboutMe || ''
        });
        setLoading(false);
      } catch (err) {
        // Обрабатываем различные типы ошибок
        if (err.response) {
          const status = err.response.status;
          if (status === 401) {
            // 401 обрабатывается в interceptor, просто перенаправляем
            navigate('/login');
          } else if (status === 403) {
            setError('У вас нет прав для редактирования этого профиля');
          } else if (status === 404) {
            setError('Пользователь не найден');
          } else {
            setError('Ошибка загрузки профиля: ' + (err.response?.data?.message || 'Неизвестная ошибка'));
          }
        } else {
          setError('Ошибка сети. Проверьте подключение к интернету.');
        }
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      // Используем api instance для отправки запроса
      const response = await api.put(`/users/${username}/update`, {
        username: formData.username,
        aboutMe: formData.aboutMe
      });

      // Обновляем имя пользователя в localStorage, если оно изменилось
      if (response.data.username && response.data.username !== username) {
        localStorage.setItem('username', response.data.username);
        navigate(`/${response.data.username}`);
      } else {
        navigate(`/${username}`);
      }
    } catch (err) {
      // Обрабатываем различные типы ошибок
      if (err.response) {
        const status = err.response.status;
        if (status === 401) {
          // 401 обрабатывается в interceptor
          navigate('/login');
        } else if (status === 403) {
          setError('У вас нет прав для обновления этого профиля');
        } else {
          setError('Ошибка сохранения: ' + (err.response?.data?.message || 'Не удалось обновить профиль'));
        }
      } else {
        setError('Ошибка сети. Проверьте подключение к интернету.');
      }
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/${username}`);
  };

  const handleLogout = () => {
    // Очищаем данные аутентификации
    clearAuthData();
    navigate('/login');
  };

  const goHome = () => navigate('/dashboard');

  if (loading) {
    return (
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">Меню</div>
          <button className="sidebar-btn sidebar-btn-primary" onClick={goHome}>Главная страница</button>
          <button className="sidebar-btn sidebar-btn-danger" onClick={handleLogout}>Выход</button>
        </aside>
        <main className="dashboard-content">
          <div className="profile-container">
            <p>Загрузка...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">Меню</div>
        <button className="sidebar-btn sidebar-btn-primary" onClick={goHome}>Главная страница</button>
        <button className="sidebar-btn" onClick={() => {
          const currentUsername = getUsername();
          if (currentUsername) {
            navigate(`/${currentUsername}`);
          }
        }}>Профиль</button>
        <button className="sidebar-btn sidebar-btn-danger" onClick={handleLogout}>Выход</button>
      </aside>
      <main className="dashboard-content">
        <div className="profile-container">
          <div className="profile-card">
            <h2 className="profile-edit-title">Редактирование профиля</h2>
            {error && <p className="profile-error">{error}</p>}
            <form onSubmit={handleSubmit} className="profile-edit-form">
              <div className="profile-edit-field">
                <label className="profile-edit-label">Имя пользователя:</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="profile-edit-input"
                  required
                />
              </div>
              <div className="profile-edit-field">
                <label className="profile-edit-label">О себе:</label>
                <textarea
                  value={formData.aboutMe}
                  onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
                  className="profile-edit-textarea"
                  rows="5"
                />
              </div>
              <div className="profile-edit-buttons">
                <button type="submit" className="profile-edit-btn profile-edit-btn-primary" disabled={saving}>
                  {saving ? 'Сохранение...' : 'Сохранить'}
                </button>
                <button type="button" className="profile-edit-btn profile-edit-btn-secondary" onClick={handleCancel}>
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EditProfilePage;

