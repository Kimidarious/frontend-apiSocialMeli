import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="not-found">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Página não encontrada</h2>
        <p className="not-found-text">
          A página que você está procurando não existe ou foi movida.
        </p>
        <button className="btn btn-yellow" onClick={() => navigate('/')}>
          🏠 Voltar para Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;