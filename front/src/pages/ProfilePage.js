import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import usePing from '../hooks/usePing';
import { isLoggedIn, clearAuthData, getUsername } from '../utils/auth';
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

function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Вызываем ping при загрузке страницы
  usePing();

  useEffect(() => {
    // Проверяем, аутентифицирован ли пользователь
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        // Получаем информацию о профиле с контроллера profile
        const response = await api.get(`/profile/${username}`);
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        // Обрабатываем различные типы ошибок
        if (err.response) {
          const status = err.response.status;
          if (status === 401) {
            // 401 обрабатывается в interceptor, просто перенаправляем
            navigate('/login');
          } else if (status === 403) {
            setError('У вас нет прав для просмотра этого профиля');
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

  const handleLogout = () => {
    // Очищаем данные аутентификации
    clearAuthData();
    navigate('/login');
  };

  const currentUsername = getUsername();
  const base = currentUsername ? `/${currentUsername}` : '';
  const goHome = () => navigate(`${base}/dashboard`);
  const goToEdit = () => navigate(`/${username}/edit`);
  const goSettings = () => navigate(`${base}/settings`);
  const goSearch = () => navigate(`${base}/search`);
  const isOwnProfile = currentUsername === username;

  if (loading) {
    return (
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <div className="sidebar-icon-group">
            <button className="sidebar-icon-btn" onClick={goHome} title="Главная страница">
              <HomeIcon />
            </button>
            <button className="sidebar-icon-btn active" onClick={() => {}} title="Профиль">
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

  if (error || !profile) {
    return (
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <div className="sidebar-icon-group">
            <button className="sidebar-icon-btn" onClick={goHome} title="Главная страница">
              <HomeIcon />
            </button>
            <button className="sidebar-icon-btn active" onClick={() => {}} title="Профиль">
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
              <p className="profile-error">{error || 'Профиль не найден'}</p>
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
          <button className="sidebar-icon-btn active" onClick={() => {}} title="Профиль">
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
              <div className="profile-avatar">
                {profile.username ? profile.username.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="profile-info">
                <h2 className="profile-username">{profile.username}</h2>
                <div className="profile-field">
                  <label className="profile-label">Уникальный ID:</label>
                  <span className="profile-value">{profile.id || 'N/A'}</span>
                </div>
                <div className="profile-field">
                  <label className="profile-label">О себе:</label>
                  <p className="profile-about">{profile.aboutMe || 'Не указано'}</p>
                </div>
                {isOwnProfile && (
                  <button className="profile-edit-btn" onClick={goToEdit}>
                    Редактировать
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;

