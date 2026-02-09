import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verifica se há usuário logado ao carregar a aplicação
  useEffect(() => {
    const authenticatedUser = authService.getAuthenticatedUser();
    if (authenticatedUser) {
      setIsAuthenticated(true);
      setUser(authenticatedUser);
    }
    setLoading(false);
  }, []);

  /**
   * Faz login do usuário
   * @param {string} userName - Nome de usuário
   * @param {string} password - Senha
   */
  const login = async (userName, password) => {
    try {
      const loginData = await authService.login(userName, password);
      
      // Salva no localStorage
      authService.saveAuthData(loginData);
      
      // Atualiza o estado
      setUser({
        userId: loginData.user_id.toString(),
        userName: loginData.user_name,
        userType: loginData.user_type,
      });
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao fazer login',
      };
    }
  };

  /**
   * Faz logout do usuário
   */
  const logout = () => {
    authService.clearAuthData();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
