import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../common/LoginModal';
import './UserSelector.css';

const UserSelector = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <div className="user-selector">
        {isAuthenticated ? (
          <div className="user-active">
            <div className="user-active-info">
              <span className="user-active-label">👤 Logado como:</span>
              <span className="user-active-name">{user.userName}</span>
              <span className="user-active-id">#{user.userId}</span>
            </div>
            <button 
              className="btn-logout" 
              onClick={handleLogout}
              title="Sair"
            >
              🚪 Sair
            </button>
          </div>
        ) : (
          <button 
            className="btn btn-yellow btn-login"
            onClick={openLoginModal}
          >
            🔐 Login
          </button>
        )}
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal}
      />
    </>
  );
};

export default UserSelector;