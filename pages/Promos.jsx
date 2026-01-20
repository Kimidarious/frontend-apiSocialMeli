import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { postService } from '../services/postService';
import PostCard from '../components/post/PostCard';
import './Feed.css';

const Promos = () => {
  const { activeUserId } = useUser();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!activeUserId) return;
    
    fetchPromos();
    fetchCount();
  }, [activeUserId]);

  const fetchPromos = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await postService.getPromoPostsByUser(activeUserId);
      setData(response);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao buscar promoções');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCount = async () => {
    try {
      const response = await postService.countPromoProducts(activeUserId);
      setCount(response.promo_products_count);
    } catch (err) {
      console.error(err);
    }
  };

  if (!activeUserId) {
    return (
      <div className="container">
        <div className="alert alert-error">
          ⚠️ Selecione um usuário no menu superior para continuar
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">🔥 Produtos em Promoção</h1>
          <p className="page-subtitle">
            Suas publicações promocionais
          </p>
        </div>
      </div>

      <div className="stats-card" style={{ background: 'linear-gradient(135deg, #FFE600 0%, #F2C811 100%)' }}>
        <div className="stat">
          <span className="stat-value" style={{ color: '#1A1A1A' }}>{count}</span>
          <span className="stat-label" style={{ color: '#1A1A1A' }}>Produtos em Promoção</span>
        </div>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando promoções...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          ❌ {error}
        </div>
      )}

      {!loading && !error && data && (
        <>
          {data.posts.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">🎁</p>
              <p className="empty-text">Você ainda não tem produtos em promoção</p>
              <button 
                className="btn btn-yellow"
                onClick={() => navigate('/create-post')}
                style={{ marginTop: '20px' }}
              >
                ➕ Criar Publicação Promocional
              </button>
            </div>
          ) : (
            <div className="post-list">
              {data.posts.map((post) => (
                <PostCard key={post.post_id} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Promos;