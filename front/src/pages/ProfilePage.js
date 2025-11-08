import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProfilePage.css';
import '../styles/Dashboard.css';

function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${username}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка загрузки профиля: ' + (err.response?.data?.message || 'Пользователь не найден'));
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const goHome = () => navigate('/dashboard');
  const goToEdit = () => navigate(`/${username}/edit`);

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

  if (error || !profile) {
    return (
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">Меню</div>
          <button className="sidebar-btn sidebar-btn-primary" onClick={goHome}>Главная страница</button>
          <button className="sidebar-btn sidebar-btn-danger" onClick={handleLogout}>Выход</button>
        </aside>
        <main className="dashboard-content">
          <div className="profile-container">
            <p className="profile-error">{error || 'Профиль не найден'}</p>
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
          const currentUsername = localStorage.getItem('username');
          if (currentUsername) {
            navigate(`/${currentUsername}`);
          }
        }}>Профиль</button>
        <button className="sidebar-btn sidebar-btn-danger" onClick={handleLogout}>Выход</button>
      </aside>
      <main className="dashboard-content">
        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-avatar">
              {/* Placeholder for avatar */}
            </div>
            <div className="profile-info">
              <h2 className="profile-username">{profile.username}</h2>
              <div className="profile-field">
                <label className="profile-label">Уникальный ID:</label>
                <span className="profile-value">{profile.uniqueId}</span>
              </div>
              <div className="profile-field">
                <label className="profile-label">О себе:</label>
                <p className="profile-about">{profile.aboutMe || 'Не указано'}</p>
              </div>
              <button className="profile-edit-btn" onClick={goToEdit}>
                Редактировать
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;

