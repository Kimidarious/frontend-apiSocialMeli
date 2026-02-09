import api from './api';

export const authService = {
  /**
   * Faz login com username e senha
   * @param {string} userName - Nome de usuário
   * @param {string} password - Senha
   * @returns {Promise<Object>} - Dados do login (token, user_id, user_name, user_type)
   */
  login: async (userName, password) => {
    const response = await api.post('/auth/login', {
      user_name: userName,
      password: password,
    });
    return response.data;
  },

  /**
   * Salva o token e dados do usuário no localStorage
   * @param {Object} loginData - Dados retornados do login
   */
  saveAuthData: (loginData) => {
    localStorage.setItem('token', loginData.token);
    localStorage.setItem('userId', loginData.user_id.toString());
    localStorage.setItem('userName', loginData.user_name);
    localStorage.setItem('userType', loginData.user_type);
  },

  /**
   * Remove os dados de autenticação do localStorage
   */
  clearAuthData: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
  },

  /**
   * Recupera o token armazenado
   * @returns {string|null} - Token JWT ou null
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Verifica se o usuário está autenticado
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Recupera os dados do usuário logado
   * @returns {Object|null}
   */
  getAuthenticatedUser: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    return {
      userId: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName'),
      userType: localStorage.getItem('userType'),
    };
  },
};
