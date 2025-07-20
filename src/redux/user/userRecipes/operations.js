import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCurrentPage } from './slice';
import { fetchCurrentUserRecipes, fetchUserRecipes as fetchUserRecipesApi, deleteRecipe, createRecipe as createRecipeApi } from '../../../api/recipesApi';
import { fetchUserProfileData } from '../userProfile/operations';
import { selectToken } from '../../auth/selectors';

// Fetch user recipes
export const fetchUserRecipes = createAsyncThunk(
  'userRecipes/fetchUserRecipes',
  async ({ page = 1, limit = 10, userId }, { dispatch, getState }) => {
    try {
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

      

      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Delete recipe
export const deleteUserRecipe = createAsyncThunk(
  'userRecipes/deleteUserRecipe',
  async (recipeId, { dispatch, getState }) => {
    try {
      const token = selectToken(getState());
      await deleteRecipe(recipeId, token);

      return recipeId;
    } catch (error) {
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
      const token = selectToken(getState());
      const response = await createRecipeApi(recipeData, token);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
