import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, clearAuthData, getUsername } from '../utils/auth';
import usePing from '../hooks/usePing';
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
import '../styles/SettingsPage.css';
import api from '../utils/api';

function SettingsPage() {
  const navigate = useNavigate();
  const username = getUsername();
  const base = username ? `/${username}` : '';
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [settings, setSettings] = useState({
    language: 'en',
    showHints: true,
    autoPlay: false,
    darkMode: false
  });
  const [notif, setNotif] = useState({ show: false, type: 'success', message: '' });

  // Вызываем ping при загрузке страницы
  usePing();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Load existing settings from backend for the user
    const fetchSettings = async () => {
      if (!username) return;
      try {
        setLoading(true);
        const resp = await api.get(`/settings/${username}`);
        if (resp && resp.data) {
          // Ensuring boolean values are correctly typed
          const normalizedSettings = {
            language: resp.data.language || 'en',
            showHints: resp.data.showHints === true || resp.data.showHints === 'true',
            autoPlay: resp.data.autoPlay === true || resp.data.autoPlay === 'true',
            darkMode: resp.data.darkMode === true || resp.data.darkMode === 'true'
          };
          setSettings(normalizedSettings);
        }
      } catch (err) {
        console.error('Failed to load settings, using defaults', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [username]);

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  };

  const goHome = () => navigate(`${base}/dashboard`);
  const goProfile = () => {
    if (username) {
      navigate(`${base}`);
    }
  };
  const goSearch = () => navigate(`${base}/search`);

  const handleToggle = (key) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }));
  };

  const handleChange = (key, value) => {
    setSettings((s) => ({ ...s, [key]: value }));
  };

  const showNotification = (type, message) => {
    setNotif({ show: true, type, message });
    setTimeout(() => setNotif({ show: false, type, message: '' }), 3000);
  };

  const handleSave = async () => {
    try {
      // Save settings to backend using PUT method
      await api.put(`/settings/update/${username}`, settings);
      showNotification('success', 'Настройки сохранены');
    } catch (err) {
      console.error('Failed to save settings', err);
      showNotification('error', 'Что-то пошло не так');
    }
  };

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
            className="sidebar-icon-btn active" 
            onClick={() => {}}
            title="Настройки"
          >
            <SettingsIcon active={true} />
          </button>
          <button 
            className="sidebar-icon-btn" 
            onClick={goSearch}
            title="Поиск"
          >
            <SearchIcon />
          </button>
        </div>
        <div className="sidebar-icon-group-bottom">
          <button 
            className="sidebar-icon-btn" 
            onClick={() => navigate(`${base}/faq`)}
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

        <main className="dashboard-content settings-content">
          {/* Notification banner */}
          {notif.show && (
            <div className={`settings-notif ${notif.type === 'success' ? 'ok' : 'err'}`}>
              {notif.message}
            </div>
          )}

          <div className="settings-card">
            <h2 className="settings-title">Настройки</h2>

            {loading ? (
              <div className="settings-loading">Загрузка...</div>
            ) : (
              <div className="settings-form">
                <div className="setting-row">
                  <label className="setting-label">Язык</label>
                  <div className="setting-control">
                    <select
                      className="select-language"
                      value={settings.language}
                      onChange={(e) => handleChange('language', e.target.value)}
                    >
                      <option value="en">English</option>
                      <option value="ru">Русский</option>
                    </select>
                    <div className="current-language">Выбран: {settings.language === 'ru' ? 'Русский' : 'English'}</div>
                  </div>
                </div>

                <div className="setting-row">
                  <label className="setting-label">Показывать подсказки</label>
                  <div className="setting-control">
                    <div className={`toggle ${settings.showHints ? 'on' : 'off'}`} onClick={() => handleToggle('showHints')}>
                      <div className="toggle-knob" />
                    </div>
                  </div>
                </div>

                <div className="setting-row">
                  <label className="setting-label">Автоплей звука</label>
                  <div className="setting-control">
                    <div className={`toggle ${settings.autoPlay ? 'on' : 'off'}`} onClick={() => handleToggle('autoPlay')}>
                      <div className="toggle-knob" />
                    </div>
                  </div>
                </div>

                <div className="setting-row">
                  <label className="setting-label">Тёмная тема</label>
                  <div className="setting-control">
                    <div className={`toggle ${settings.darkMode ? 'on' : 'off'}`} onClick={() => handleToggle('darkMode')}>
                      <div className="toggle-knob" />
                    </div>
                  </div>
                </div>

                <div className="settings-actions">
                  <button className="save-btn" onClick={handleSave}>Сохранить</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default SettingsPage;

