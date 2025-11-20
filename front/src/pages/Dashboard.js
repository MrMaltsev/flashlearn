import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, clearAuthData, getUsername } from '../utils/auth';
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
    dailyGoal: 0,
    timeSpent: 0,
    accuracy: 0,
    streak: 0
  });
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(10);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    // Загружаем данные о профиле пользователя для получения статистики
    const fetchProfileData = async () => {
      try {
        const profileResponse = await api.get(`/users/${username}`);
        const userData = profileResponse.data;
        
        // Обновляем статистику из профиля пользователя
        setStats(prevStats => ({
          ...prevStats,
          dailyGoal: userData.dailyGoal,
          streak: userData.streakCount
        }));
        
        // Получаем все флешкарты пользователя
        const cardsResponse = await api.get(`/flashcards/getAll/${userData.uniqueId}`);
        setFlashCards(cardsResponse.data || []);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        // Используем mock данные при ошибке
        setFlashCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username, navigate]);

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  }

  const updateDailyGoal = async () => {
    try {
      const response = await api.put(`/users/${username}/daily-goal`, {
        dailyGoal: selectedGoal
      });
      
      // Обновляем статистику с новой целью
      setStats(prevStats => ({
        ...prevStats,
        dailyGoal: response.data.dailyGoal
      }));
      
      setShowGoalModal(false);
    } catch (error) {
      console.error('Ошибка при обновлении ежедневной цели:', error);
    }
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

  // Mock данные для наборов карточек (в реальности будут приходить с бэкенда)
  const flashcardSets = [
    { id: 1, title: 'Biology: Cell Basics', icon: BookIcon, cards: 24, accuracy: 82, type: 'BIOLOGY' },
    { id: 2, title: 'Chemistry: Periodic Trends', icon: AtomIcon, cards: 32, accuracy: 75, type: 'CHEMISTRY' },
    { id: 3, title: 'Spanish: Common Verbs', icon: LanguageIcon, cards: 18, accuracy: 90, type: 'LANGUAGES' },
    { id: 4, title: 'Algorithms: Big-O', icon: CodeIcon, cards: 20, accuracy: 68, type: 'COMPUTER_SCIENCE' },
    { id: 5, title: 'Psych: Memory Models', icon: BrainIcon, cards: 22, accuracy: 79, type: 'PSYCHOLOGY' },
    { id: 6, title: 'Geography: Capitals', icon: GlobeIcon, cards: 40, accuracy: 71, type: 'GEOGRAPHY' },
    { id: 7, title: 'Math: Derivatives', icon: HashIcon, cards: 28, accuracy: 64, type: 'MATHEMATICS' },
    { id: 8, title: 'Design: Color Theory', icon: PenIcon, cards: 16, accuracy: 88, type: 'DESIGN' },
    { id: 9, title: 'Law: Key Doctrines', icon: ScalesIcon, cards: 26, accuracy: 73, type: 'LAW' },
    { id: 10, title: 'Microbio: Pathogens', icon: MicroscopeIcon, cards: 30, accuracy: 69, type: 'BIOLOGY' },
    { id: 11, title: 'Finance: Ratios', icon: CalculatorIcon, cards: 15, accuracy: 77, type: 'FINANCE' },
    { id: 12, title: 'History: WW2 Dates', icon: DocumentIcon, cards: 35, accuracy: 70, type: 'HISTORY' }
  ];

  const progressPercentage = (stats.todayReviewed / stats.dailyGoal) * 100;

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
              <div className="goal-card-header">
                <h3 className="stats-card-title">Today's goal</h3>
                <button 
                  className="set-goal-btn" 
                  onClick={() => setShowGoalModal(true)}
                >
                  Set daily goal
                </button>
              </div>
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
          <div className="sets-section">
            <div className="sets-header">
              <h2 className="sets-title">Suggested flashcard sets</h2>
              <button className="customize-btn">
                <FilterIcon /> Customize
              </button>
            </div>
            <div className="sets-grid">
              {flashcardSets.map((set) => {
                const IconComponent = set.icon;
                return (
                  <div key={set.id} className="set-card">
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
        </main>
      </div>
    </div>

    {/* Модальное окно для установки ежедневной цели */}
    {showGoalModal && (
      <div className="modal-overlay" onClick={() => setShowGoalModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Set Daily Goal</h3>
            <button className="modal-close" onClick={() => setShowGoalModal(false)}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <p>How many cards would you like to review today?</p>
            <div className="goal-options">
              {[5, 10, 15, 20, 25, 30, 50, 100].map((goal) => (
                <button
                  key={goal}
                  className={`goal-option ${selectedGoal === goal ? 'selected' : ''}`}
                  onClick={() => setSelectedGoal(goal)}
                >
                  {goal} cards
                </button>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowGoalModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={updateDailyGoal}>
                Set Goal
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  );
}

export default Dashboard;
