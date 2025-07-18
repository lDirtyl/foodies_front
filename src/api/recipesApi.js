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
