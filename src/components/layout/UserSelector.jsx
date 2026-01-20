import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { userService } from '../../services/userService';
import './UserSelector.css';

const UserSelector = () => {
  const { activeUserId, activeUserName, setActiveUser, clearActiveUser } = useUser();
  const [inputUserId, setInputUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSelectUser = async (e) => {
    e.preventDefault();
    
    if (!inputUserId) {
      setError('Digite um ID de usuário');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = await userService.getUserById(Number(inputUserId));
      setActiveUser(user.user_id, user.user_name);
      setInputUserId('');
    } catch (err) {
      setError('Usuário não encontrado');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-selector">
      {activeUserId ? (
        <div className="user-active">
          <div className="user-active-info">
            <span className="user-active-label">Usuário ativo:</span>
            <span className="user-active-name">{activeUserName}</span>
            <span className="user-active-id">#{activeUserId}</span>
          </div>
          <button 
            className="btn-logout" 
            onClick={clearActiveUser}
            title="Trocar usuário"
          >
            🔄
          </button>
        </div>
      ) : (
        <form onSubmit={handleSelectUser} className="user-selector-form">
          <input
            type="number"
            placeholder="Digite seu ID"
            value={inputUserId}
            onChange={(e) => setInputUserId(e.target.value)}
            className="user-input"
            min="1"
          />
          <button 
            type="submit" 
            className="btn btn-yellow"
            disabled={loading}
          >
            {loading ? '...' : 'Entrar'}
          </button>
        </form>
      )}
      {error && <p className="user-selector-error">{error}</p>}
    </div>
  );
};

export default UserSelector;