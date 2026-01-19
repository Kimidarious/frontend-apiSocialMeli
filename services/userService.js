import api from './api';

export const userService = {
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    await api.delete(`/users/${id}`);
  },

  followUser: async (userId, userIdToFollow) => {
    const response = await api.post(`/users/${userId}/follow/${userIdToFollow}`);
    return response.data;
  },

  unfollowUser: async (userId, userIdToFollow) => {
    const response = await api.post(`/users/${userId}/unfollow/${userIdToFollow}`);
    return response.data;
  },

  getFollowersCount: async (userId) => {
    const response = await api.get(`/users/${userId}/followers/count`);
    return response.data;
  },

  getFollowersList: async (userId, order = 'name_asc') => {
    const response = await api.get(`/users/${userId}/followers/list`, {
      params: { order }
    });
    return response.data;
  },

  getFollowedList: async (userId, order = 'name_asc') => {
    const response = await api.get(`/users/${userId}/followed/list`, {
      params: { order }
    });
    return response.data;
  },
};