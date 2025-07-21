import axios from 'axios';
import { store } from '../redux/store';

export const API_BASE_URL = import.meta.env.VITE_API_URL;
export const SERVER_URL = API_BASE_URL.replace(/\/api$/, '');

// Public API instance
export const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Private API instance
export const privateApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

privateApi.interceptors.request.use(
  config => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const categoriesService = {
  getAll: async (page = 1, limit = 100) => {
    try {
      const response = await publicApi.get(`/categories?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // get single category
  getById: async id => {
    try {
      const response = await publicApi.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  },

  // get full image URL
  getImageUrl: imagePath => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `${SERVER_URL}/${imagePath}`;
  },
};

export const ingredientsService = {
  getAll: async (page = 1, limit = 300) => {
    try {
      const response = await publicApi.get(`/ingredients?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      throw error;
    }
  },
};

export const areasService = {
  getAll: async (page = 1, limit = 100) => {
    try {
      const response = await publicApi.get(`/areas?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching areas:', error);
      throw error;
    }
  },
};

export const testimonialsService = {
  getAll: async () => {
    try {
      const response = await publicApi.get('/testimonials');
      return response.data;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },
};

export const recipesService = {
  getAll: async (
    page = 1,
    limit = 10,
    category = '',
    ingredient = '',
    area = '',
    search = ''
  ) => {
    try {
      const params = new URLSearchParams({ page, limit });
      if (category) params.append('category', category);
      if (ingredient) params.append('ingredient', ingredient);
      if (area) params.append('area', area);
      if (search) params.append('search', search);

      const response = await publicApi.get(`/recipes?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  },

  getById: async id => {
    try {
      const response = await publicApi.get(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    }
  },

  getUserRecipes: async (page = 1, limit = 10) => {
    try {
      const response = await privateApi.get(
        `/recipes/own-recipes?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching user recipes:', error);
      throw error;
    }
  },

  getFavorites: async (page = 1, limit = 10) => {
    try {
      const response = await privateApi.get(
        `/recipes/favorites?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching favorite recipes:', error);
      throw error;
    }
  },

  addToFavorites: async id => {
    try {
      const response = await privateApi.post(`/recipes/${id}/favorite`);
      return response.data;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  },

  removeFromFavorites: async id => {
    try {
      const response = await privateApi.delete(`/recipes/${id}/favorite`);
      return response.data;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  },

  create: async recipeData => {
    try {
      const response = await privateApi.post('/recipes', recipeData);
      return response.data;
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  },

  delete: async id => {
    try {
      const response = await privateApi.delete(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  },

  // get full image URL
  getImageUrl: imagePath => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `${SERVER_URL}/${imagePath}`;
  },
};


