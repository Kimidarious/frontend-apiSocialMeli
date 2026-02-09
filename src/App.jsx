import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import AppRoutes from './routes/AppRoutes';
import './styles/global.css';
import './styles/theme.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;