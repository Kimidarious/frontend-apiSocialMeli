import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { postService } from '../services/postService';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

const CreatePost = () => {
  const { activeUserId } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    product_name: '',
    type: '',
    brand: '',
    color: '',
    notes: '',
    category: '',
    price: '',
    date: new Date().toLocaleDateString('pt-BR').split('/').join('-'), // dd-MM-yyyy
    has_promo: false,
    discount: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const postData = {
      user_id: activeUserId,
      date: formData.date,
      product: {
        product_name: formData.product_name,
        type: formData.type,
        brand: formData.brand || undefined,
        color: formData.color || undefined,
        notes: formData.notes || undefined,
      },
      category: Number(formData.category),
      price: Number(formData.price),
      has_promo: formData.has_promo,
      discount: formData.has_promo ? Number(formData.discount) : 0,
    };

    try {
      if (formData.has_promo) {
        await postService.createPromoPost(postData);
      } else {
        await postService.createPost(postData);
      }
      
      setSuccess(true);
      
      // Limpar form
      setFormData({
        product_name: '',
        type: '',
        brand: '',
        color: '',
        notes: '',
        category: '',
        price: '',
        date: new Date().toLocaleDateString('pt-BR').split('/').join('-'),
        has_promo: false,
        discount: 0,
      });

      // Redirecionar após 2 segundos
      setTimeout(() => navigate('/feed'), 2000);
      
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar publicação');
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
          <h1 className="page-title">➕ Criar Nova Publicação</h1>
          <p className="page-subtitle">Publique um produto para seus seguidores</p>
        </div>
      </div>

      {success && (
        <div className="alert alert-success">
          ✅ Publicação criada com sucesso! Redirecionando...
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-section">
          <h3 className="form-section-title">📦 Informações do Produto</h3>
          
          <div className="form-group">
            <label htmlFor="product_name">Nome do Produto *</label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              placeholder="Ex: Notebook Dell Inspiron"
              maxLength="40"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="type">Tipo *</label>
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Ex: Eletrônico"
                maxLength="15"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="brand">Marca</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Ex: Dell"
                maxLength="50"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="color">Cor</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Ex: Preto"
                maxLength="20"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Categoria *</label>
              <input
                type="number"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Ex: 100"
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Observações</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Informações adicionais..."
              rows="3"
              maxLength="80"
            />
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">💰 Preço e Data</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Preço *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ex: 3500.00"
                step="0.01"
                min="0"
                max="10000000"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Data (dd-MM-yyyy) *</label>
              <input
                type="text"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Ex: 19-01-2026"
                pattern="\d{2}-\d{2}-\d{4}"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section form-section-promo">
          <div className="form-group-checkbox">
            <input
              type="checkbox"
              id="has_promo"
              name="has_promo"
              checked={formData.has_promo}
              onChange={handleChange}
            />
            <label htmlFor="has_promo">
              🔥 Este produto está em promoção
            </label>
          </div>

          {formData.has_promo && (
            <div className="form-group">
              <label htmlFor="discount">Desconto (%) *</label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="Ex: 20"
                min="0"
                max="100"
                required={formData.has_promo}
              />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/feed')}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn btn-yellow"
            disabled={loading}
          >
            {loading ? 'Publicando...' : '📤 Publicar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;