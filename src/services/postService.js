import api from './api';

export const postService = {
  createPost: async (postData) => {
    const response = await api.post('/products/post', postData);
    return response.data;
  },

  createPromoPost: async (postData) => {
    const response = await api.post('/products/promo-post', postData);
    return response.data;
  },

  getFollowedPosts: async (userId, order = 'date_desc') => {
    const response = await api.get(`/products/followed/${userId}/list`, {
      params: { order }
    });
    return response.data;
  },

  countPromoProducts: async (userId) => {
    const response = await api.get(`/products/${userId}/countPromo`);
    return response.data;
  },

  getPromoPostsByUser: async (userId) => {
    const response = await api.get(`/products/${userId}/promos`);
    return response.data;
  },
};