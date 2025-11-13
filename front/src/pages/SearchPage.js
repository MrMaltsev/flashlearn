import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import '../styles/Dashboard.css';

function SearchPage() {
  const navigate = useNavigate();
  const username = getUsername();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  };

  const goHome = () => navigate('/dashboard');
  const goProfile = () => {
    if (username) {
      navigate(`/${username}`);
    }
  };
  const goSettings = () => navigate('/settings');

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-icon-group">
          <button 
            className="sidebar-icon-btn" 
            onClick={goHome}
            title="Главная страница"
          >
            <HomeIcon />
          </button>
          <button 
            className="sidebar-icon-btn" 
            onClick={goProfile}
            title="Профиль"
          >
            <ProfileIcon />
          </button>
          <button 
            className="sidebar-icon-btn" 
            onClick={goSettings}
            title="Настройки"
          >
            <SettingsIcon />
          </button>
          <button 
            className="sidebar-icon-btn active" 
            onClick={() => {}}
            title="Поиск"
          >
            <SearchIcon active={true} />
          </button>
        </div>
        <div className="sidebar-icon-group-bottom">
          <button 
            className="sidebar-icon-btn" 
            onClick={() => navigate('/faq')}
            title="FAQ"
          >
            <FAQIcon />
          </button>
          <button 
            className="sidebar-icon-btn" 
            onClick={handleLogout}
            title="Выход"
          >
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
              {username ? username.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <div className="stats-card">
            <h2 className="stats-card-title">Поиск</h2>
            <p>Функция поиска в разработке...</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SearchPage;

