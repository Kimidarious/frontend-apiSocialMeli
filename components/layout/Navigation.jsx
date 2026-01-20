import { NavLink } from 'react-router-dom';
import UserSelector from './UserSelector';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            🏠 Home
          </NavLink>
          <NavLink to="/create-user" className="nav-link">
            ✨ Novo Usuário
          </NavLink>
          <NavLink to="/explore" className="nav-link">
            🔍 Explorar
          </NavLink>
          <NavLink to="/followers" className="nav-link">
            👥 Meus Seguidores
          </NavLink>
          <NavLink to="/following" className="nav-link">
            ➡️ Quem Sigo
          </NavLink>
          <NavLink to="/feed" className="nav-link">
            📰 Feed
          </NavLink>
          <NavLink to="/create-post" className="nav-link">
            ➕ Nova Publicação
          </NavLink>
          <NavLink to="/promos" className="nav-link">
            🔥 Promoções
          </NavLink>
        </div>
        
        <UserSelector />
      </div>
    </nav>
  );
};

export default Navigation;