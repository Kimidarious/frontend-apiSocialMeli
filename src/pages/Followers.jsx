import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { userService } from '../services/userService';
import UserCard from '../components/user/UserCard';
import './Followers.css';

const Followers = () => {
  const { activeUserId } = useUser();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState('name_asc');

  useEffect(() => {
    if (!activeUserId) return;
    
    fetchFollowers();
  }, [activeUserId, order]);

  const fetchFollowers = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await userService.getFollowersList(activeUserId, order);
      setData(response);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao buscar seguidores');
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
          <h1 className="page-title">👥 Meus Seguidores</h1>
          <p className="page-subtitle">
            Pessoas que seguem <strong>{data?.user_name || 'você'}</strong>
          </p>
        </div>

        <div className="sort-controls">
          <label>Ordenar por:</label>
          <select 
            value={order} 
            onChange={(e) => setOrder(e.target.value)}
            className="sort-select"
          >
            <option value="name_asc">Nome (A-Z)</option>
            <option value="name_desc">Nome (Z-A)</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando seguidores...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          ❌ {error}
        </div>
      )}

      {!loading && !error && data && (
        <>
          <div className="stats-card">
            <div className="stat">
              <span className="stat-value">{data.followers.length}</span>
              <span className="stat-label">Seguidores</span>
            </div>
          </div>

          {data.followers.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">😔</p>
              <p className="empty-text">Você ainda não tem seguidores</p>
            </div>
          ) : (
            <div className="user-grid">
              {data.followers.map((follower) => (
                <UserCard key={follower.user_id} user={follower} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Followers;