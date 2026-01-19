import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <h1>
            <span className="logo-social">Social</span>
            <span className="logo-meli">Meli</span>
          </h1>
        </div>
        <p className="header-subtitle">
          Conecte-se com seus vendedores favoritos
        </p>
      </div>
    </header>
  );
};

export default Header;