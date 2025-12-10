import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
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
  const [friends, setFriends] = useState([]);
  const [searchFriendQuery, setSearchFriendQuery] = useState('');
  const [activeProfileTab, setActiveProfileTab] = useState('about');

  // notifications
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]); // placeholder, load from backend later
  const notifRef = useRef(null);

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
        // TODO: fetch friends list from backend when endpoint is ready
        setFriends([]); // placeholder
        // TODO: fetch user notifications when endpoint ready
        setNotifications([]); // placeholder
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

  // Закрытие окна уведомлений при клике вне его
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showNotifications]);

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
  const location = useLocation();

  const handleAvatarClick = () => {
    if (!currentUsername) return;
    const profilePath = `/${currentUsername}/profile`;
    const altProfilePath = `/${currentUsername}`;
    if (location.pathname === profilePath || location.pathname === altProfilePath) return;
    navigate(profilePath);
  };

  // Generate friend code removed — search will use username directly

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
            <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Notifications bell placeholder in loading state */}
              <button className="icon-btn" aria-label="Notifications" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 17H9" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div
                className="user-avatar"
                title={currentUsername ? currentUsername : 'User'}
                onClick={handleAvatarClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAvatarClick(); }}
                style={{ cursor: 'pointer' }}
              >
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
            <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button className="icon-btn" aria-label="Notifications" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 17H9" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div
                className="user-avatar"
                title={currentUsername ? currentUsername : 'User'}
                onClick={handleAvatarClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAvatarClick(); }}
                style={{ cursor: 'pointer' }}
              >
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
          <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Notifications bell */}
            <div style={{ position: 'relative' }} ref={notifRef}>
              <button
                onClick={() => setShowNotifications((s) => !s)}
                aria-label="Notifications"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #e5e7eb',
                  background: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                {/* bell icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 17H9" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22c1.104 0 2-.672 2-1.5h-4c0 .828.896 1.5 2 1.5z" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: 44,
                  width: 300,
                  background: '#fff',
                  borderRadius: 8,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                  padding: 12,
                  zIndex: 120,
                  transition: 'opacity .18s ease, transform .18s ease',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <strong style={{ fontSize: 14 }}>Уведомления</strong>
                    <button onClick={() => setShowNotifications(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#9ca3af' }}>✕</button>
                  </div>
                  <div style={{ maxHeight: 260, overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <p style={{ color: '#9ca3af', textAlign: 'center', padding: '28px 6px', margin: 0 }}>Уведомлений пока нет</p>
                    ) : (
                      notifications.map((n, idx) => (
                        <div key={idx} style={{ padding: 10, borderRadius: 6, background: '#f8fafc', marginBottom: 8 }}>
                          <div style={{ fontSize: 13, color: '#111827' }}>{n.title}</div>
                          <div style={{ fontSize: 12, color: '#6b7280' }}>{n.body}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div
              className="user-avatar"
              title={currentUsername ? currentUsername : 'User'}
              onClick={handleAvatarClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAvatarClick(); }}
              style={{ cursor: 'pointer' }}
            >
              {currentUsername ? currentUsername.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </header>
        <main className="dashboard-content" style={{ display: 'flex', gap: 20, paddingRight: 20 }}>
          {/* Main profile section */}
          <div style={{ flex: 1 }}>
            {/* Profile header with avatar and username */}
            <div className="profile-header" style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              <div className="profile-avatar-large" style={{ width: 100, height: 100, borderRadius: 12, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                {profile.username ? profile.username.charAt(0).toUpperCase() : 'U'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
                  <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#111827' }}>{profile.username}</h1>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>{profile.aboutMe || 'No description provided yet.'}</p>
                {isOwnProfile && (
                  <button className="profile-edit-btn" onClick={goToEdit} style={{ marginTop: 12, padding: '8px 16px', borderRadius: 6, background: '#f97316', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
                    Edit profile
                  </button>
                )}
              </div>
            </div>

            {/* Profile tabs */}
            <div className="profile-tabs" style={{ display: 'flex', gap: 8, marginBottom: 16, borderBottom: '1px solid #e5e7eb', paddingBottom: 8 }}>
              {['about', 'statistics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveProfileTab(tab)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 6,
                    border: activeProfileTab === tab ? '2px solid #f97316' : '1px solid #e5e7eb',
                    background: activeProfileTab === tab ? '#fff7ed' : '#ffffff',
                    cursor: 'pointer',
                    fontWeight: activeProfileTab === tab ? 600 : 500,
                    fontSize: 14,
                    transition: 'all 0.2s'
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* About tab */}
            {activeProfileTab === 'about' && (
              <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: 14, fontWeight: 700, color: '#111827' }}>About</h3>
                  <p style={{ margin: 0, fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
                    {profile.aboutMe || 'No description provided yet.'}
                  </p>
                </div>
                {/* User ID removed - not needed */}
              </div>
            )}

            {/* Statistics tab */}
            {activeProfileTab === 'statistics' && (
              <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                  <div style={{ textAlign: 'center', padding: 16, borderRadius: 8, background: '#f0fdf4', border: '1px solid #dcfce7' }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#10b981' }}>0</div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Sets created</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 16, borderRadius: 8, background: '#f0f9ff', border: '1px solid #e0f2fe' }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#3b82f6' }}>0</div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Cards learned</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 16, borderRadius: 8, background: '#fef3c7', border: '1px solid #fde68a' }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#f59e0b' }}>0</div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Day streak</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar - Friends section */}
          <div style={{ width: 300, flexShrink: 0 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'sticky', top: 20 }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: 16, fontWeight: 700, color: '#111827' }}>Friends</h3>
              
              {/* Search bar (search by username) */}
              <input
                type="text"
                placeholder="Search friends by username..."
                value={searchFriendQuery}
                onChange={(e) => setSearchFriendQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: '1px solid #e5e7eb',
                  fontSize: 13,
                  marginBottom: 12,
                  boxSizing: 'border-box'
                }}
              />

              {/* Friends list */}
              <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                {friends.length === 0 ? (
                  <p style={{ fontSize: 13, color: '#9ca3af', textAlign: 'center', padding: '20px 0' }}>
                    No friends yet
                  </p>
                ) : (
                  friends.map((friend, idx) => (
                    <div key={idx} style={{ padding: 10, borderRadius: 6, background: '#f9fafb', marginBottom: 8, cursor: 'pointer', transition: 'all 0.2s', border: '1px solid #e5e7eb' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 6, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 14 }}>
                          {friend.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{friend}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add friend button */}
              <button style={{ width: '100%', padding: '8px 12px', marginTop: 12, borderRadius: 6, background: '#10b981', color: '#fff', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
                Add friend
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;
