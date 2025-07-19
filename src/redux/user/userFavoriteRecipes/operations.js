import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setFavoriteRecipes,
  addToFavorites,
  removeFromFavorites,
  setCurrentPage,
  setTotalPages,
  setLoading,
  setError,
} from './slice';
import {
  favoriteRecipe,
  getFavoriteRecipes,
  unfavoriteRecipe,
} from '../../../api/recipesApi';
import { selectToken } from '../../auth/selectors';

// Fetch favorite recipes
export const fetchFavoriteRecipes = createAsyncThunk(
  'userFavoriteRecipes/fetchFavoriteRecipes',
  async ({ page = 1, limit = 10 }, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const token = selectToken(getState());
      const response = await getFavoriteRecipes({ page, limit, token });

      const currentPage = response.pagination.page;
      const totalPages = Math.ceil(response.pagination.total / limit);

      dispatch(setFavoriteRecipes(response.recipes));
      dispatch(setCurrentPage(currentPage));
      dispatch(setTotalPages(totalPages));
      dispatch(setLoading(false));

      return response;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

// Add recipe to favorites
export const addRecipeToFavorites = createAsyncThunk(
  'userFavoriteRecipes/addToFavorites',
  async (recipe, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const token = selectToken(getState());
      await favoriteRecipe(recipe.id, token);

      const recipeWithFavorite = { ...recipe, isFavorite: true };
      dispatch(addToFavorites(recipeWithFavorite));
      dispatch(setLoading(false));

      return recipeWithFavorite;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

// Remove recipe from favorites
export const removeRecipeFromFavorites = createAsyncThunk(
  'userFavoriteRecipes/removeFromFavorites',
  async (recipeId, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const token = selectToken(getState());
      await unfavoriteRecipe(recipeId, token);

      dispatch(removeFromFavorites(recipeId));
      dispatch(setLoading(false));

      return recipeId;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

// Toggle favorite status
export const toggleFavoriteRecipe = createAsyncThunk(
  'userFavoriteRecipes/toggleFavorite',
  async (recipe, { dispatch, getState }) => {
    const state = getState();
    const isInFavorites = state.userFavoriteRecipes.favoriteRecipes.some(
      favRecipe => favRecipe.id === recipe.id
    );

    if (isInFavorites) {
      await dispatch(removeRecipeFromFavorites(recipe.id));
    } else {
      await dispatch(addRecipeToFavorites(recipe));
    }

    return { recipe, isFavorite: !isInFavorites };
  }
);

// Change page
export const changeFavoriteRecipesPage = createAsyncThunk(
  'userFavoriteRecipes/changePage',
  async (page, { dispatch }) => {
    dispatch(setCurrentPage(page));
    // Optionally fetch new data for the page
    // await dispatch(fetchFavoriteRecipes({ page }));
  }
);
