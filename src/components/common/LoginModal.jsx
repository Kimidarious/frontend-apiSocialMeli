import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userName || !password) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');

    const result = await login(userName, password);
    
    if (result.success) {
      // Limpa o formulário e fecha o modal
      setUserName('');
      setPassword('');
      onClose();
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleClose = () => {
    setUserName('');
    setPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🔐 Login</h2>
          <button className="modal-close" onClick={handleClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="userName">Nome de Usuário</label>
            <input
              id="userName"
              type="text"
              placeholder="Digite seu username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="form-input"
              autoFocus
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="login-error">
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-yellow btn-full"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-footer">
          <p className="login-hint">
            💡 Dica: Use suas credenciais cadastradas no sistema
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
