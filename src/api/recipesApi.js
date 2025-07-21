import axios from './default';
import { getAuthorizationHeader } from './utils';

export const fetchCurrentUserRecipes = async ({ token, page, limit }) => {
  const { data } = await axios.get('/recipes/own', {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
    params: {
      page,
      limit,
    },
  });
  return data;
};

export const fetchUserRecipes = async (userId, { token, page, limit }) => {
  const { data } = await axios.get(`/recipes/user/${userId}`, {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
    params: {
      page,
      limit,
    },
  });
  return data;
};

export const getFavoriteRecipes = async ({ token, page, limit }) => {
  const { data } = await axios.get('/recipes/favorites', {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
    params: {
      page,
      limit,
    },
  });
  return data;
};

export const favoriteRecipe = async (recipeId, token) => {
  const { data } = await axios.post(`/recipes/${recipeId}/favorite`, {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return data;
};

export const unfavoriteRecipe = async (recipeId, token) => {
  const { data } = await axios.delete(`/recipes/${recipeId}/favorite`, {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return data;
};

export const deleteRecipe = async (recipeId, token) => {
  const { data } = await axios.delete(`/recipes/${recipeId}`, {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return data;
};

export const createRecipe = async (recipeData, token) => {
  const { data } = await axios.post('/recipes', recipeData, {
    headers: {
      Authorization: getAuthorizationHeader(token),
      // 'Content-Type': 'multipart/form-data' is set automatically by browser for FormData
    },
  });
  return data;
};

// Get single recipe by ID
export const getRecipeById = async (recipeId, token = null) => {
  const headers = token ? { Authorization: getAuthorizationHeader(token) } : {};
  const { data } = await axios.get(`/recipes/${recipeId}`, { headers });
  return data;
};

// Get popular recipes
export const getPopularRecipes = async (limit = 4) => {
  const { data } = await axios.get('/recipes/popular', {
    params: { limit },
  });
  return data;
};
