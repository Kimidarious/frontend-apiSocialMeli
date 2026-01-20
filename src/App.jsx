import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
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
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;