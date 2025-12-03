import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getUsername } from '../utils/auth';
import api from '../utils/api';
import '../styles/StudySession.css';

function StudySessionPage() {
  const { setId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const username = getUsername();

  const passedSet = state?.set;

  const [set, setSet] = useState(passedSet || null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Session state
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [responses, setResponses] = useState([]); // array of { cardIdx, response: 'correct'|'forgot'|'skip' }
  const [sessionFinished, setSessionFinished] = useState(false);

  // Load set and cards
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (passedSet) {
          setSet(passedSet);
          setCards(passedSet.flashCards || passedSet.cards || []);
        } else {
          const res = await api.get(`/flashcards/get/${setId}`);
          const data = res.data;
          setSet(data);
          setCards((data && (data.flashCards || data.cards)) || []);
        }
      } catch (err) {
        console.error('Failed to load set', err);
        setSet(null);
        setCards([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [passedSet, setId]);

  const startSession = () => {
    setSessionStarted(true);
    setCurrentIndex(0);
    setIsFlipped(false);
    setResponses([]);
    setSessionFinished(false);
  };

  const handleResponse = (response) => {
    // Record response
    setResponses((prev) => [...prev, { cardIdx: currentIndex, response }]);

    // Move to next card or finish
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((i) => i + 1);
      setIsFlipped(false);
    } else {
      // Session finished
      setSessionFinished(true);
    }
  };

  const restartSession = () => {
    startSession();
  };

  const goBack = () => {
    navigate(`/${username}/dashboard`);
  };

  // Compute stats
  const correct = responses.filter((r) => r.response === 'correct').length;
  const forgot = responses.filter((r) => r.response === 'forgot').length;
  const skipped = responses.filter((r) => r.response === 'skip').length;

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (!set) return <div style={{ padding: 20 }}>Set not found.</div>;
  if (!cards || cards.length === 0) return <div style={{ padding: 20 }}>No cards in this set.</div>;

  if (!sessionStarted) {
    return (
      <div className="study-session-container">
        <header className="study-header">
          <button className="study-back-btn" onClick={goBack}>← Back</button>
          <div />
        </header>
        <main className="study-main">
          <div className="study-intro">
            <h1>{set.title}</h1>
            <p className="study-intro-desc">{set.description || 'Start learning!'}</p>
            <div className="study-intro-stats">
              <div className="stat-item">
                <span className="stat-label">Cards</span>
                <span className="stat-value">{cards.length}</span>
              </div>
            </div>
            <button className="study-start-btn" onClick={startSession}>
              Start learning
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (sessionFinished) {
    return (
      <div className="study-session-container">
        <header className="study-header">
          <button className="study-back-btn" onClick={goBack}>← Back</button>
          <div />
        </header>
        <main className="study-main">
          <div className="study-results">
            <h1>Session Complete!</h1>
            <div className="results-grid">
              <div className="result-card correct-bg">
                <div className="result-icon">✓</div>
                <div className="result-label">Remembered</div>
                <div className="result-count">{correct}</div>
              </div>
              <div className="result-card forgot-bg">
                <div className="result-icon">✗</div>
                <div className="result-label">Forgot</div>
                <div className="result-count">{forgot}</div>
              </div>
              <div className="result-card skip-bg">
                <div className="result-icon">⊘</div>
                <div className="result-label">Skipped</div>
                <div className="result-count">{skipped}</div>
              </div>
            </div>
            <div className="results-summary">
              <p>You reviewed {correct + forgot + skipped} out of {cards.length} cards</p>
              {correct > 0 && <p className="results-accuracy">Accuracy: {Math.round((correct / (correct + forgot)) * 100)}%</p>}
            </div>
            <div className="results-actions">
              <button className="study-restart-btn" onClick={restartSession}>
                Start again
              </button>
              <button className="study-close-btn" onClick={goBack}>
                Exit
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className="study-session-container">
      <header className="study-header">
        <button className="study-back-btn" onClick={goBack}>← Back</button>
        <div className="study-progress">
          <span className="progress-text">{currentIndex + 1} / {cards.length}</span>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </header>

      <main className="study-main">
        <div className="study-content">
          <div
            className={`study-card ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped((f) => !f)}
          >
            <div className="study-card-inner">
              <div className="study-card-front">
                <div className="study-card-label">Question</div>
                <div className="study-card-text">{currentCard.question || currentCard.front || '—'}</div>
              </div>
              <div className="study-card-back">
                <div className="study-card-label">Answer</div>
                <div className="study-card-text">{currentCard.answer || currentCard.back || '—'}</div>
              </div>
            </div>
          </div>

          <div className="study-hint">Click card to reveal answer</div>

          <div className="study-actions">
            <button
              className="study-action-btn correct-btn"
              onClick={() => handleResponse('correct')}
            >
              ✓ Remembered
            </button>
            <button
              className="study-action-btn forgot-btn"
              onClick={() => handleResponse('forgot')}
            >
              ✗ Forgot
            </button>
            <button
              className="study-action-btn skip-btn"
              onClick={() => handleResponse('skip')}
            >
              ⊘ Skip
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudySessionPage;
