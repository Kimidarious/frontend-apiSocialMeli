import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>SocialMeli</h4>
            <p>Conectando compradores e vendedores</p>
          </div>
          
          <div className="footer-section">
            <h4>Tecnologias</h4>
            <ul>
              <li>React + Vite</li>
              <li>Go + Gin</li>
              <li>PostgreSQL</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Links</h4>
            <ul>
              <li><a href="https://github.com/Kimidarious" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="/">Documentação</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {currentYear} SocialMeli - Projeto Prático Bootcamp Mercado Livre</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;