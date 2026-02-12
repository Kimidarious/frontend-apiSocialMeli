import { useUser } from '../contexts/UserContext';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { activeUserId, activeUserName } = useUser();

  return (
    <div className="container home">
      <div className="home-hero">
        <h1 className="home-title">
          Bem-vindo ao <span className="highlight-yellow">Social</span>
          <span className="highlight-blue">Meli</span>
        </h1>

        {activeUserId ? (
          <div className="home-welcome">
            <p className="home-greeting">
              Olá, <strong>{activeUserName}</strong>! 👋
            </p>
            <p className="home-subtitle">
              Use o menu acima para navegar
            </p>
          </div>
        ) : (
          <div className="home-login-prompt">
            <p className="home-subtitle">
              👆 Selecione seu usuário no canto superior esquerdo
            </p>
          </div>
        )}
      </div>
      <div className="home-features">
        <div className="feature-card" onClick={() => navigate('/explore')} style={{ cursor: 'pointer' }}>
          <div className="feature-icon">🔍</div>
          <h3>Explorar</h3>
          <p>Descubra novos vendedores e comece a seguir</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">✨</div>
          <h3>Novo Usuário</h3>
          <p>Cadastre uma nova conta na plataforma</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>Seguidores</h3>
          <p>Veja quem te segue e quem você está seguindo</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📰</div>
          <h3>Feed</h3>
          <p>Acompanhe publicações dos vendedores que você segue</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔥</div>
          <h3>Promoções</h3>
          <p>Descubra produtos em promoção exclusivos</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">➕</div>
          <h3>Publicar</h3>
          <p>Crie suas próprias publicações de produtos</p>
        </div>
      </div>
    </div>
  );
};

export default Home;