import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
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
        setFormData({
          username: response.data.username || '',
          aboutMe: response.data.aboutMe || ''
        });
        setLoading(false);
      } catch (err) {
        setError('Ошибка загрузки профиля: ' + (err.response?.data?.message || 'Пользователь не найден'));
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:8080/api/users/${username}/update`,
        {
          username: formData.username,
          aboutMe: formData.aboutMe
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update username in localStorage if it changed
      if (response.data.username && response.data.username !== username) {
        localStorage.setItem('username', response.data.username);
        navigate(`/${response.data.username}`);
      } else {
        navigate(`/${username}`);
      }
    } catch (err) {
      setError('Ошибка сохранения: ' + (err.response?.data?.message || 'Не удалось обновить профиль'));
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/${username}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
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

