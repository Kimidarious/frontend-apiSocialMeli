import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { userService } from '../services/userService';
import UserCard from '../components/user/UserCard';
import './Followers.css'; // Reutilizar estilos

const Following = () => {
  const { activeUserId } = useUser();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState('name_asc');

  useEffect(() => {
    if (!activeUserId) return;
    
    fetchFollowing();
  }, [activeUserId, order]);

  const fetchFollowing = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await userService.getFollowedList(activeUserId, order);
      setData(response);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao buscar seguidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (userIdToUnfollow) => {
    if (!window.confirm('Deseja deixar de seguir este usuário?')) return;

    try {
      await userService.unfollowUser(activeUserId, userIdToUnfollow);
      fetchFollowing(); // Recarregar lista
    } catch (err) {
      alert('Erro ao deixar de seguir: ' + (err.response?.data?.error || err.message));
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
          <h1 className="page-title">➡️ Quem Eu Sigo</h1>
          <p className="page-subtitle">
            Vendedores seguidos por <strong>{data?.user_name || 'você'}</strong>
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
          <p>Carregando...</p>
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
              <span className="stat-value">{data.followed.length}</span>
              <span className="stat-label">Seguindo</span>
            </div>
          </div>

          {data.followed.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">🔍</p>
              <p className="empty-text">Você ainda não segue ninguém</p>
            </div>
          ) : (
            <div className="user-grid">
              {data.followed.map((user) => (
                <UserCard 
                  key={user.user_id} 
                  user={user}
                  onUnfollow={() => handleUnfollow(user.user_id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Following;