import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  recipesService,
  categoriesService,
  areasService,
} from '../../services/api';

export const fetchCategories = createAsyncThunk(
  'recipes/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoriesService.getAll(1, 100);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAreas = createAsyncThunk(
  'recipes/fetchAreas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await areasService.getAll(1, 100);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (
    {
      page = 1,
      limit = 10,
      category = '',
      ingredient = '',
      area = '',
      search = '',
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await recipesService.getAll(
        page,
        limit,
        category,
        ingredient,
        area,
        search
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchUserRecipes = createAsyncThunk(
  'recipes/fetchUserRecipes',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await recipesService.getUserRecipes(page, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  'recipes/fetchFavorites',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await recipesService.getFavorites(page, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await recipesService.getById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const toggleFavoriteThunk = createAsyncThunk(
  'recipes/toggleFavorite',
  async ({ id, isFavorite }, { rejectWithValue }) => {
    try {
      if (isFavorite) {
        await recipesService.removeFromFavorites(id);
      } else {
        await recipesService.addToFavorites(id);
      }
      return { id, isFavorite: !isFavorite };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createRecipe = createAsyncThunk(
  'recipes/createRecipe',
  async (recipeData, { rejectWithValue }) => {
    try {
      const response = await recipesService.create(recipeData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteRecipeThunk = createAsyncThunk(
  'recipes/deleteRecipe',
  async (id, { rejectWithValue }) => {
    try {
      await recipesService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
