import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setUserRecipes,
  setCurrentPage,
  setTotalPages,
  setLoading,
  setError,
} from './slice';
import { fetchCurrentUserRecipes, deleteRecipe } from '../../../api/recipesApi';
import { selectToken } from '../../auth/selectors';

// Fetch user recipes
export const fetchUserRecipes = createAsyncThunk(
  'userRecipes/fetchUserRecipes',
  async ({ page = 1, limit = 10 }, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const token = selectToken(getState());
      console.log('fetchUserRecipes: ', token);
      const response = await fetchCurrentUserRecipes({ page, limit, token });
      const currentPage = response.pagination.page;
      const totalPages = Math.ceil(response.pagination.total / limit);

      dispatch(setUserRecipes(response.recipes));
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

// Delete recipe
export const deleteUserRecipe = createAsyncThunk(
  'userRecipes/deleteUserRecipe',
  async (recipeId, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const token = selectToken(getState());
      await deleteRecipe(recipeId, token);

      dispatch(setLoading(false));

      return recipeId;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

// Change page
export const changeUserRecipesPage = createAsyncThunk(
  'userRecipes/changePage',
  async (page, { dispatch }) => {
    dispatch(setCurrentPage(page));
  }
);
