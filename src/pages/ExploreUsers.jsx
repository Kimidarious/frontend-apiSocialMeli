import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { userService } from '../services/userService';
import './ExploreUsers.css';

const ExploreUsers = () => {
  const { activeUserId } = useUser();
  const [allUsers, setAllUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (activeUserId) {
      fetchFollowedUsers();
    }
  }, [activeUserId]);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await userService.getAllUsers();
      setAllUsers(response);
    } catch (err) {
      setError('Erro ao buscar usuários');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowedUsers = async () => {
    try {
      const response = await userService.getFollowedList(activeUserId, 'name_asc');
      setFollowedUsers(response.followed.map(u => u.user_id));
    } catch (err) {
      console.error('Erro ao buscar seguidos:', err);
    }
  };

  const handleFollow = async (userIdToFollow) => {
    if (!activeUserId) {
      alert('⚠️ Selecione um usuário primeiro!');
      return;
    }

    setActionLoading(userIdToFollow);
    
    try {
      await userService.followUser(activeUserId, userIdToFollow);
      setFollowedUsers(prev => [...prev, userIdToFollow]);
      alert('✅ Usuário seguido com sucesso!');
    } catch (err) {
      alert('❌ ' + (err.response?.data?.error || 'Erro ao seguir usuário'));
    } finally {
      setActionLoading(null);
    }
  };

  const handleUnfollow = async (userIdToUnfollow) => {
    if (!window.confirm('Deseja deixar de seguir este usuário?')) return;

    setActionLoading(userIdToUnfollow);
    
    try {
      await userService.unfollowUser(activeUserId, userIdToUnfollow);
      setFollowedUsers(prev => prev.filter(id => id !== userIdToUnfollow));
      alert('✅ Deixou de seguir com sucesso!');
    } catch (err) {
      alert('❌ ' + (err.response?.data?.error || 'Erro ao deixar de seguir'));
    } finally {
      setActionLoading(null);
    }
  };

  const isFollowing = (userId) => followedUsers.includes(userId);
  const isSelf = (userId) => userId === activeUserId;

  const filteredUsers = allUsers.filter(user => {
    if (filter === 'ALL') return true;
    return user.user_type === filter;
  });

  const getUserTypeIcon = (type) => {
    switch(type) {
      case 'BUYER': return '🛒';
      case 'SELLER': return '🏪';
      case 'BOTH': return '🔄';
      default: return '👤';
    }
  };

  const getUserTypeBadgeClass = (type) => {
    switch(type) {
      case 'BUYER': return 'badge-buyer';
      case 'SELLER': return 'badge-seller';
      case 'BOTH': return 'badge-both';
      default: return '';
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">🔍 Explorar Usuários</h1>
          <p className="page-subtitle">
            Descubra e siga vendedores interessantes
          </p>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilter('ALL')}
          >
            Todos ({allUsers.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'BUYER' ? 'active' : ''}`}
            onClick={() => setFilter('BUYER')}
          >
            🛒 Compradores ({allUsers.filter(u => u.user_type === 'BUYER').length})
          </button>
          <button 
            className={`filter-btn ${filter === 'SELLER' ? 'active' : ''}`}
            onClick={() => setFilter('SELLER')}
          >
            🏪 Vendedores ({allUsers.filter(u => u.user_type === 'SELLER').length})
          </button>
          <button 
            className={`filter-btn ${filter === 'BOTH' ? 'active' : ''}`}
            onClick={() => setFilter('BOTH')}
          >
            🔄 Ambos ({allUsers.filter(u => u.user_type === 'BOTH').length})
          </button>
        </div>
      </div>

      {!activeUserId && (
        <div className="alert alert-warning">
          ℹ️ Selecione um usuário no menu superior para seguir outros usuários
        </div>
      )}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando usuários...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          ❌ {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredUsers.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">😔</p>
              <p className="empty-text">Nenhum usuário encontrado</p>
            </div>
          ) : (
            <div className="explore-grid">
              {filteredUsers.map((user) => (
                <div key={user.user_id} className="explore-card">
                  <div className="explore-card-header">
                    <div className="explore-avatar">
                      {getUserTypeIcon(user.user_type)}
                    </div>
                    <div className="explore-info">
                      <h3 className="explore-name">{user.user_name}</h3>
                      <span className="explore-id">ID: {user.user_id}</span>
                    </div>
                    <span className={`badge ${getUserTypeBadgeClass(user.user_type)}`}>
                      {user.user_type}
                    </span>
                  </div>

                  <div className="explore-actions">
                    {isSelf(user.user_id) ? (
                      <button className="btn btn-secondary btn-disabled" disabled>
                        👤 Você
                      </button>
                    ) : isFollowing(user.user_id) ? (
                      <button 
                        className="btn btn-error btn-sm"
                        onClick={() => handleUnfollow(user.user_id)}
                        disabled={actionLoading === user.user_id}
                      >
                        {actionLoading === user.user_id ? '...' : '❌ Deixar de Seguir'}
                      </button>
                    ) : (
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleFollow(user.user_id)}
                        disabled={actionLoading === user.user_id || !activeUserId}
                      >
                        {actionLoading === user.user_id ? '...' : '➕ Seguir'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExploreUsers;