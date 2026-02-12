import { useAuth } from '../../contexts/AuthContext';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="protected-route-container">
        <div className="loading-spinner">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="protected-route-container">
        <div className="login-required-message">
          <div className="lock-icon">🔒</div>
          <h2>Acesso Restrito</h2>
          <p className="message-text">
            É necessário você realizar o login para acessar esta página.
          </p>
          <p className="help-text">
            👆 Selecione seu usuário no canto superior esquerdo para continuar
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
