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
import OnboardingTour from '../components/OnboardingTour';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const username = getUsername();
  const [flashCards, setFlashCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [stats, setStats] = useState({
    todayReviewed: 34,
    dailyGoal: 50,
    timeSpent: 22,
    accuracy: 86,
    streak: 12
  });

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    // Загружаем данные о флешкартах
    const fetchFlashCards = async () => {
      try {
        // Получаем userId из профиля пользователя
        const profileResponse = await api.get(`/users/${username}`);
        const userId = profileResponse.data.id;
        
        // Получаем все флешкарты пользователя
        const cardsResponse = await api.get(`/flashcards/getAll/${userId}`);
        setFlashCards(cardsResponse.data || []);
      } catch (err) {
        console.error('Ошибка загрузки флешкарт:', err);
        // Используем mock данные при ошибке
        setFlashCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashCards();

    // Проверяем, нужно ли показать онбординг для нового пользователя
    const onboardingKey = `onboarding_completed_${username}`;
    const hasCompletedOnboarding = localStorage.getItem(onboardingKey);
    if (!hasCompletedOnboarding) {
      // Небольшая задержка, чтобы элементы успели отрендериться
      setTimeout(() => {
        setShowOnboarding(true);
      }, 500);
    }
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

  const handleOnboardingComplete = () => {
    const onboardingKey = `onboarding_completed_${username}`;
    localStorage.setItem(onboardingKey, 'true');
    setShowOnboarding(false);
  };

  // Определяем шаги онбординг-тура
  const onboardingSteps = [
    {
      target: '[data-onboarding="sidebar"]',
      content: 'Это боковая панель навигации. Здесь вы можете перейти к профилю, настройкам, поиску и другим разделам приложения.'
    },
    {
      target: '[data-onboarding="new-set-btn"]',
      content: 'Кнопка "New set" позволяет создать новый набор флешкарт. Нажмите на неё, чтобы начать создавать свои карточки для изучения.'
    },
    {
      target: '[data-onboarding="goal-card"]',
      content: 'Карточка "Today\'s goal" показывает ваш прогресс на сегодня. Здесь отображается количество просмотренных карточек, время, потраченное на обучение, и точность ответов.'
    },
    {
      target: '[data-onboarding="streak-card"]',
      content: 'Карточка "Streak" показывает вашу серию дней подряд. Поддерживайте её, просматривая хотя бы 10 карточек каждый день!'
    },
    {
      target: '[data-onboarding="review-now-btn"]',
      content: 'Кнопка "Review now" запускает сессию повторения карточек. Используйте её для активного изучения материала.'
    },
    {
      target: '[data-onboarding="flashcard-sets"]',
      content: 'Здесь отображаются рекомендуемые наборы флешкарт. Вы можете выбрать любой набор и начать изучение. Нажмите на карточку, чтобы открыть набор.'
    }
  ];

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
      <aside className="dashboard-sidebar" data-onboarding="sidebar">
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
            <button 
              className="new-set-btn" 
              onClick={handleNewSet}
              data-onboarding="new-set-btn"
            >
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
            <div className="stats-card goal-card" data-onboarding="goal-card">
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
            </div>

            {/* Streak карточка */}
            <div className="stats-card streak-card" data-onboarding="streak-card">
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
                  <button 
                    className="review-now-btn" 
                    onClick={handleReviewNow}
                    data-onboarding="review-now-btn"
                  >
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
            <div className="sets-grid" data-onboarding="flashcard-sets">
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

      {/* Онбординг-тур */}
      <OnboardingTour
        steps={onboardingSteps}
        isActive={showOnboarding}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
}

export default Dashboard;
