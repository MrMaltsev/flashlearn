import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const goHome = () => navigate('/');
  const goProfile = () => navigate('/profile');

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">Меню</div>
        <button className="sidebar-btn sidebar-btn-primary" onClick={goHome}>Главная страница</button>
        <button className="sidebar-btn" onClick={goProfile}>Профиль</button>
        <button className="sidebar-btn sidebar-btn-danger" onClick={handleLogout}>Выход</button>
      </aside>
      <main className="dashboard-content">
        <div className="dashboard-center-text">Добро пожаловать в панель управления</div>
      </main>
    </div>
  );
}

export default Dashboard;


