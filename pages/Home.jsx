import { useUser } from '../contexts/UserContext';
import './Home.css';

const Home = () => {
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
              👆 Selecione seu usuário no canto superior direito
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;