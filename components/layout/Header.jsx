import logoMeli from '../../assets/logo-meli.svg';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <img src={logoMeli} alt="SocialMeli Logo" className="logo-img" />
        </div>
        <p className="header-subtitle">
          Conecte-se com seus vendedores favoritos
        </p>
      </div>
    </header>
  );
};

export default Header;