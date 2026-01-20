import { useState } from 'react';
import { userService } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import './CreateUser.css';

const CreateUser = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    user_name: '',
    user_type: 'BUYER',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await userService.createUser(formData);
      setCreatedUser(response);
      setSuccess(true);
      
      
      setFormData({
        user_name: '',
        user_type: 'BUYER',
      });

      
      setTimeout(() => {
        setSuccess(false);
        setCreatedUser(null);
      }, 5000);
      
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar usuário');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">👤 Cadastrar Novo Usuário</h1>
          <p className="page-subtitle">Crie uma nova conta na plataforma</p>
        </div>
      </div>

      {success && createdUser && (
        <div className="alert alert-success">
          <div>
            ✅ Usuário criado com sucesso!
          </div>
          <div style={{ marginTop: '10px', fontSize: '14px' }}>
            <strong>Nome:</strong> {createdUser.user_name} | 
            <strong> ID:</strong> {createdUser.user_id} | 
            <strong> Tipo:</strong> {createdUser.user_type}
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/')}
            style={{ marginTop: '10px' }}
          >
            Ir para Home
          </button>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-section">
          <h3 className="form-section-title">📋 Informações do Usuário</h3>
          
          <div className="form-group">
            <label htmlFor="user_name">Nome de Usuário *</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Digite o nome de usuário"
              minLength="3"
              maxLength="15"
              required
            />
            <small className="form-hint">
              Mínimo 3 caracteres, máximo 15
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="user_type">Tipo de Usuário *</label>
            <select
              id="user_type"
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
              required
            >
              <option value="BUYER">🛒 Comprador (BUYER)</option>
              <option value="SELLER">🏪 Vendedor (SELLER)</option>
              <option value="BOTH">🔄 Ambos (BOTH)</option>
            </select>
            <small className="form-hint">
              Compradores seguem vendedores, vendedores criam publicações
            </small>
          </div>

          <div className="user-type-info">
            {formData.user_type === 'BUYER' && (
              <div className="info-box info-buyer">
                <strong>🛒 Comprador:</strong> Pode seguir vendedores e ver feed de publicações
              </div>
            )}
            {formData.user_type === 'SELLER' && (
              <div className="info-box info-seller">
                <strong>🏪 Vendedor:</strong> Pode criar publicações e ter seguidores
              </div>
            )}
            {formData.user_type === 'BOTH' && (
              <div className="info-box info-both">
                <strong>🔄 Ambos:</strong> Pode seguir vendedores E criar publicações
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn btn-yellow"
            disabled={loading}
          >
            {loading ? 'Criando...' : '✨ Criar Usuário'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;