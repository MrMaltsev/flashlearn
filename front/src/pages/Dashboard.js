import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, clearAuthData, getUsername } from '../utils/auth';
import usePing from '../hooks/usePing';
import api from '../utils/api';
import {
  HomeIcon,
  ProfileIcon,
  SettingsIcon,
  SearchIcon,
  FAQIcon,
  LogoutIcon,
  LightningIcon,
  FlameIcon,
  BookIcon,
  AtomIcon,
  LanguageIcon,
  CodeIcon,
  BrainIcon,
  GlobeIcon,
  HashIcon,
  PenIcon,
  ScalesIcon,
  MicroscopeIcon,
  CalculatorIcon,
  DocumentIcon,
  FilterIcon
} from '../components/Icons';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const username = getUsername();
  const [flashCards, setFlashCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayReviewed: 0,
    dailyGoal: 50,
    timeSpent: 0,
    accuracy: 0,
    streak: 0
  });

  // Вызываем ping при загрузке страницы
  usePing();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    // Загружаем данные о флешкартах и статистике
    const fetchFlashCards = async () => {
      try {
        setLoading(true);
        
        // Получаем данные с эндпоинта dashboard
        const dashboardResponse = await api.get(`/dashboard/${username}`);
        const dashboardData = dashboardResponse.data;
        
        // Обновляем статистику из полученных данных
        setStats({
          todayReviewed: dashboardData.todayReviewed || 0,
          dailyGoal: dashboardData.dailyGoal || 50,
          timeSpent: dashboardData.timeSpent || 0,
          accuracy: dashboardData.accuracy   || 0,
          streak: dashboardData.streak || 0
        });
        
        // Если есть флешкарты в ответе, загружаем их
        if (dashboardData.flashcards) {
          setFlashCards(dashboardData.flashcards);
        } else {
          // Если нет, загружаем отдельно через flashcards контроллер
          const cardsResponse = await api.get(`/flashcards/getAll/${username}`);
          setFlashCards(cardsResponse.data || []);
        }
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setFlashCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashCards();
  }, [username, navigate]);

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  };

  const currentUsername = getUsername();
  const base = currentUsername ? `/${currentUsername}` : '';

  const goProfile = () => {
    if (currentUsername) {
      navigate(`${base}`);
    }
  };

  const goSettings = () => {
    navigate(`${base}/settings`);
  };

  const goSearch = () => {
    navigate(`${base}/search`);
  };

  const handleNewSet = () => {
    // TODO: Открыть модальное окно для создания нового набора
    console.log('Create new set');
  };

  const handleReviewNow = () => {
    // TODO: Начать сессию повторения
    console.log('Start review session');
  };

  // Пустой массив - наборы будут загружаться с бэка позже
  // Categories and sample Basic sets (starter content for new users)
  const flashcardSetsByCategory = {
    Popular: [],
    Saved: [],
    Basic: [
      {
        id: 'basic-1',
        title: 'English Basics: Everyday Words',
        icon: BookIcon,
        cards: 12,
        accuracy: 0,
        type: 'BASIC',
        cardsData: [
          { front: 'Car', back: 'Машина' },
          { front: 'House', back: 'Дом' },
          { front: 'Book', back: 'Книга' }
        ]
      },
      {
        id: 'basic-2',
        title: 'Spanish Basics: Greetings',
        icon: GlobeIcon,
        cards: 8,
        accuracy: 0,
        type: 'BASIC',
        cardsData: [
          { front: 'Hola', back: 'Привет' },
          { front: 'Adiós', back: 'До свидания' }
        ]
      }
    ]
  };

  const [setsTab, setSetsTab] = useState('Popular');
  const flashcardSets = flashcardSetsByCategory[setsTab] || [];

  const progressPercentage = (stats.todayReviewed / stats.dailyGoal) * 100;

  // State for Set Goal modal
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(stats.dailyGoal);

  const goalOptions = [10, 20, 35, 50, 100];

  const openGoalModal = () => {
    setSelectedGoal(stats.dailyGoal || 50);
    setShowGoalModal(true);
  };

  const closeGoalModal = () => setShowGoalModal(false);

  const handleSaveGoal = async () => {
    try {
      // send update to backend
      const res = await api.put(`/dashboard/update_daily_goal/${username}`, { dailyGoal: selectedGoal });
      // merge backend-returned stats into local state if present
      if (res && res.data) {
        // backend may return { stats: { ... } } or updated object directly
        const returned = res.data.stats || res.data;
        setStats((s) => ({ ...s, ...returned, dailyGoal: selectedGoal }));
      } else {
        // optimistic fallback
        setStats((s) => ({ ...s, dailyGoal: selectedGoal }));
      }
      setShowGoalModal(false);
    } catch (err) {
      console.error('Failed to update daily goal', err);
      // could show notification to user
    }
  };

  return (
    <div className="dashboard-container">
      {/* Левая боковая панель */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-icon-group">
          <button 
            className="sidebar-icon-btn active" 
            onClick={() => {}} 
            title="Главная страница"
          >
            <HomeIcon active={true} />
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

      {/* Основной контент */}
      <div className="dashboard-main">
        {/* Верхняя панель */}
        <header className="dashboard-header">
          <div className="header-left">
            <LightningIcon />
            <span className="header-logo">Flashlearn</span>
          </div>
          <div className="header-right">
            <button className="new-set-btn" onClick={handleNewSet}>
              + New set
            </button>
            <div className="user-avatar">
              {username ? username.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </header>

        {/* Основной контент */}
        <main className="dashboard-content">
          {/* Today's goal и Streak */}
          <div className="stats-row">
            {/* Today's goal карточка */}
            <div className="stats-card goal-card">
              <h3 className="stats-card-title">Today's goal</h3>
              <div className="goal-progress">
                <span className="goal-progress-text">
                  {stats.todayReviewed}/{stats.dailyGoal} cards reviewed
                </span>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="goal-tags">
                <span className="goal-tag">Daily: {stats.dailyGoal} cards</span>
                <span className="goal-tag">Time spent: {stats.timeSpent}m</span>
                <span className="goal-tag">Accuracy: {stats.accuracy}%</span>
              </div>
              <div className="goal-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button className="new-set-btn" onClick={openGoalModal} style={{ background: '#f97316', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px' }}>
                  Set a goal
                </button>
              </div>
            </div>

            {/* Streak карточка */}
            <div className="stats-card streak-card">
              <h3 className="stats-card-title">Streak</h3>
              <div className="streak-content">
                <div className="streak-number">{stats.streak}</div>
                <p className="streak-label">Consecutive days</p>
                <p className="streak-message">
                  Keep it up! Review at least 10 cards today to maintain your streak.
                </p>
                <div className="streak-actions">
                  <button className="streak-tips-btn">
                    <FlameIcon /> Streak tips
                  </button>
                  <button className="review-now-btn" onClick={handleReviewNow}>
                    Review now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Suggested flashcard sets */}
          {flashcardSets.length > 0 && (
          <div className="sets-section">
            <div className="sets-header">
                <h2 className="sets-title">Suggested flashcard sets</h2>
                <div className="sets-tabs" style={{ display: 'flex', gap: 8, marginLeft: 12 }}>
                  {Object.keys(flashcardSetsByCategory).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSetsTab(tab)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: 6,
                        border: setsTab === tab ? '2px solid #f97316' : '1px solid #e5e7eb',
                        background: setsTab === tab ? '#fff7ed' : '#ffffff',
                        cursor: 'pointer'
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              <button className="customize-btn">
                <FilterIcon /> Customize
              </button>
            </div>
            <div className="sets-grid">
              {flashcardSets.map((set) => {
                const IconComponent = set.icon;
                return (
                    <div key={set.id} className="set-card" onClick={() => navigate(`${base}/study/${set.id}`, { state: { set } })} style={{ cursor: 'pointer' }}>
                    <div className="set-icon">
                      <IconComponent />
                    </div>
                    <h4 className="set-title">{set.title}</h4>
                    <div className="set-info">
                      <span className="set-cards">{set.cards} cards</span>
                      <span className="set-accuracy">Avg {set.accuracy}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          )}
          {/* Goal modal */}
          {showGoalModal && (
            <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }}>
              <div className="modal" style={{ background: '#fff', borderRadius: 8, padding: 20, width: 360, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                <h3 style={{ marginTop: 0 }}>Set your daily goal</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginTop: 12 }}>
                  {goalOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedGoal(opt)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 6,
                        border: selectedGoal === opt ? '2px solid #f97316' : '1px solid #e5e7eb',
                        background: selectedGoal === opt ? '#fff7ed' : '#ffffff',
                        cursor: 'pointer'
                      }}
                    >
                      {opt} cards
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                  <button onClick={closeGoalModal} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff' }}>Cancel</button>
                  <button onClick={handleSaveGoal} style={{ padding: '8px 12px', borderRadius: 6, border: 'none', background: '#f97316', color: '#fff' }}>Save</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
