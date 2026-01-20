import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer'; // ← NOVO
import ScrollToTop from './components/common/ScrollToTop'; // ← NOVO
import AppRoutes from './routes/AppRoutes';
import './styles/global.css';
import './styles/theme.css';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="app">
          <Header />
          <Navigation />
          <main className="main-content">
            <AppRoutes />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;