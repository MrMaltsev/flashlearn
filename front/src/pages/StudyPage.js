import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import '../styles/Dashboard.css';

function StudyPage() {
  const { username, setId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const passedSet = location.state && location.state.set;

  const [set, setSet] = useState(passedSet || null);
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (passedSet) {
          setSet(passedSet);
          setCards(passedSet.cardsData || passedSet.cards || []);
        } else {
          // Try to fetch set by id from backend
          const res = await api.get(`/flashcards/get/${setId}`);
          const data = res.data;
          setSet(data || null);
          setCards((data && (data.cardsData || data.cards)) || []);
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

  const goBack = () => navigate(`/${username}/dashboard`);

  const handleNext = () => {
    setFlipped(false);
    setIndex((i) => Math.min(cards.length - 1, i + 1));
  };

  const handlePrev = () => {
    setFlipped(false);
    setIndex((i) => Math.max(0, i - 1));
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (!set) return <div style={{ padding: 20 }}>Set not found.</div>;
  if (!cards || cards.length === 0) return <div style={{ padding: 20 }}>No cards in this set.</div>;

  const card = cards[index];

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div style={{ padding: 16 }}>
          <button onClick={goBack} style={{ padding: '8px 10px', borderRadius: 6 }}>Back</button>
        </div>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">Study: {set.title}</div>
          <div className="header-right" />
        </header>
        <main className="dashboard-content" style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
          <div style={{ width: 520, textAlign: 'center' }}>
            <div style={{ marginBottom: 12, color: '#6b7280' }}>{index + 1} / {cards.length}</div>
            <div
              onClick={() => setFlipped((f) => !f)}
              style={{
                minHeight: 180,
                padding: 24,
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fff',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: 22 }}>
                {flipped ? (card.back || '—') : (card.front || '—')}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
              <button onClick={handlePrev} disabled={index === 0} style={{ padding: '8px 12px', borderRadius: 6 }}>Prev</button>
              <button onClick={() => setFlipped((f) => !f)} style={{ padding: '8px 12px', borderRadius: 6 }}>{flipped ? 'Show Front' : 'Flip'}</button>
              <button onClick={handleNext} disabled={index === cards.length - 1} style={{ padding: '8px 12px', borderRadius: 6 }}>Next</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudyPage;
