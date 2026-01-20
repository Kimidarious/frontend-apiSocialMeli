import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { postService } from '../services/postService';
import PostCard from '../components/post/PostCard';
import './Feed.css';

const Feed = () => {
  const { activeUserId } = useUser();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState('date_desc');

  useEffect(() => {
    if (!activeUserId) return;
    
    fetchFeed();
  }, [activeUserId, order]);

  const fetchFeed = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await postService.getFollowedPosts(activeUserId, order);
      setData(response);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao buscar feed');
      console.error(err);
    } finally {
      setLoading(false);
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
          <h1 className="page-title">📰 Feed de Publicações</h1>
          <p className="page-subtitle">
            Últimas 2 semanas dos vendedores que você segue
          </p>
        </div>

        <div className="sort-controls">
          <label>Ordenar por:</label>
          <select 
            value={order} 
            onChange={(e) => setOrder(e.target.value)}
            className="sort-select"
          >
            <option value="date_desc">Mais Recentes</option>
            <option value="date_asc">Mais Antigos</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando feed...</p>
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
              <p className="empty-icon">📭</p>
              <p className="empty-text">Nenhuma publicação encontrada</p>
              <p className="empty-hint">
                Comece seguindo vendedores para ver publicações aqui!
              </p>
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

export default Feed;