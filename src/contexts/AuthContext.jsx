import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { useUser } from './UserContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setActiveUser, clearActiveUser } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticatedUser = authService.getAuthenticatedUser();
    if (authenticatedUser) {
      setIsAuthenticated(true);
      setUser(authenticatedUser);
      setActiveUser(authenticatedUser.userId, authenticatedUser.userName);
    }
    setLoading(false);
  }, [setActiveUser]);

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
      
      // Atualiza o UserContext com os dados do usuário logado
      setActiveUser(loginData.user_id, loginData.user_name);
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao fazer login',
      };
    }
  };

  const logout = () => {
    authService.clearAuthData();
    setUser(null);
    setIsAuthenticated(false);
    clearActiveUser();
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
