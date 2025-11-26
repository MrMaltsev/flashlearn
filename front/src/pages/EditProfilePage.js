import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import usePing from '../hooks/usePing';
import { isLoggedIn, getUsername, clearAuthData } from '../utils/auth';
import {
  HomeIcon,
  ProfileIcon,
  SettingsIcon,
  SearchIcon,
  FAQIcon,
  LogoutIcon,
  LightningIcon
} from '../components/Icons';
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

  // Вызываем ping при загрузке страницы
  usePing();

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
        // Получаем информацию о профиле с контроллера profile
        const response = await api.get(`/profile/${username}`);
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
      const response = await api.put(`/profile/update/${username}`, {
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

  const currentUsername = getUsername();
  const base = currentUsername ? `/${currentUsername}` : '';
  const goHome = () => navigate(`${base}/dashboard`);
  const goProfile = () => {
    if (currentUsername) {
      navigate(`${base}`);
    }
  };
  const goSettings = () => navigate(`${base}/settings`);
  const goSearch = () => navigate(`${base}/search`);

  if (loading) {
    return (
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <div className="sidebar-icon-group">
            <button className="sidebar-icon-btn" onClick={goHome} title="Главная страница">
              <HomeIcon />
            </button>
            <button className="sidebar-icon-btn active" onClick={goProfile} title="Профиль">
              <ProfileIcon active={true} />
            </button>
            <button className="sidebar-icon-btn" onClick={goSettings} title="Настройки">
              <SettingsIcon />
            </button>
            <button className="sidebar-icon-btn" onClick={goSearch} title="Поиск">
              <SearchIcon />
            </button>
          </div>
          <div className="sidebar-icon-group-bottom">
              <button className="sidebar-icon-btn" onClick={() => navigate(`${base}/faq`)} title="FAQ">
              <FAQIcon />
            </button>
            <button className="sidebar-icon-btn" onClick={handleLogout} title="Выход">
              <LogoutIcon />
            </button>
          </div>
        </aside>
        <div className="dashboard-main">
          <header className="dashboard-header">
            <div className="header-left">
              <LightningIcon />
              <span className="header-logo">Flashlearn</span>
            </div>
            <div className="header-right">
              <div className="user-avatar">
                {currentUsername ? currentUsername.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
          </header>
          <main className="dashboard-content">
            <div className="stats-card">
              <p>Загрузка...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-icon-group">
          <button className="sidebar-icon-btn" onClick={goHome} title="Главная страница">
            <HomeIcon />
          </button>
          <button className="sidebar-icon-btn active" onClick={goProfile} title="Профиль">
            <ProfileIcon active={true} />
          </button>
          <button className="sidebar-icon-btn" onClick={goSettings} title="Настройки">
            <SettingsIcon />
          </button>
          <button className="sidebar-icon-btn" onClick={goSearch} title="Поиск">
            <SearchIcon />
          </button>
        </div>
        <div className="sidebar-icon-group-bottom">
            <button className="sidebar-icon-btn" onClick={() => navigate(`${base}/faq`)} title="FAQ">
            <FAQIcon />
          </button>
          <button className="sidebar-icon-btn" onClick={handleLogout} title="Выход">
            <LogoutIcon />
          </button>
        </div>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <LightningIcon />
            <span className="header-logo">Flashlearn</span>
          </div>
          <div className="header-right">
            <div className="user-avatar">
              {currentUsername ? currentUsername.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </header>
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
    </div>
  );
}

export default EditProfilePage;

