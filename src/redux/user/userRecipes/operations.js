import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setUserRecipes,
  setCurrentPage,
  setTotalPages,
  setLoading,
  setError,
} from './slice';
import { fetchCurrentUserRecipes, fetchUserRecipes as fetchUserRecipesApi, deleteRecipe, createRecipe as createRecipeApi } from '../../../api/recipesApi';
import { fetchUserProfileData } from '../userProfile/operations';
import { selectToken } from '../../auth/selectors';

// Fetch user recipes
export const fetchUserRecipes = createAsyncThunk(
  'userRecipes/fetchUserRecipes',
  async ({ page = 1, limit = 10, userId }, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const token = selectToken(getState());
      const currentUser = getState().auth.user;
      const isOwnProfile = currentUser && currentUser.id === userId;

      let response;
      if (isOwnProfile) {
        // Fetch current user's recipes
        response = await fetchCurrentUserRecipes({ page, limit, token });
      } else {
        // Fetch other user's recipes
        response = await fetchUserRecipesApi(userId, { page, limit, token });
      }

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

// Create recipe
export const createRecipe = createAsyncThunk(
  'userRecipes/createRecipe',
  async (recipeData, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const token = selectToken(getState());
      const response = await createRecipeApi(recipeData, token);

      // After creating, refetch user data to update counts and recipes
      const userId = getState().auth.user.id;
      await dispatch(fetchUserProfileData(userId));
      await dispatch(fetchUserRecipes({ userId }));

      dispatch(setLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);
