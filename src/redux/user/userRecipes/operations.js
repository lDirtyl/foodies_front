import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setUserRecipes,
  setCurrentPage,
  setTotalPages,
  setLoading,
  setError,
} from './slice';

const mockRecipes = [
  {
    id: '1',
    title: 'CHILLI PRAWN LINGUINE',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image:
      'https://i.natgeofe.com/n/aed9f829-849c-4902-88bb-27e570c2a398/GettyImages-180258510.jpg',
    category: 'seafood',
    prepTime: 30,
    author: {
      id: '1',
      name: 'VICTORIA',
      avatar: '/images/users/victoria.jpg',
    },
    isFavorite: false,
  },
  {
    id: '2',
    title: 'SALMON PRAWN RISOTTO',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image:
      'https://i.natgeofe.com/n/aed9f829-849c-4902-88bb-27e570c2a398/GettyImages-180258510.jpg',
    category: 'seafood',
    prepTime: 45,
    author: {
      id: '1',
      name: 'VICTORIA',
      avatar: '/images/users/victoria.jpg',
    },
    isFavorite: false,
  },
  {
    id: '4',
    title: 'PORTUGUESE FISH STEW (CALDEIRADA DE PEIXE)',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image:
      'https://i.natgeofe.com/n/aed9f829-849c-4902-88bb-27e570c2a398/GettyImages-180258510.jpg',
    category: 'seafood',
    prepTime: 60,
    author: {
      id: '1',
      name: 'VICTORIA',
      avatar: '/images/users/victoria.jpg',
    },
    isFavorite: false,
  },
];

// Fetch user recipes
export const fetchUserRecipes = createAsyncThunk(
  'userRecipes/fetchUserRecipes',
  async ({ page = 1, limit = 10 }, { dispatch }) => {
    try {
      console.log('fetchUserRecipes', page, limit);
      dispatch(setLoading(true));
      dispatch(setError(null));

      // TODO: Replace with actual API call
      // const response = await userRecipesApi.getUserRecipes({ page, limit });

      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockResponse = {
        recipes: mockRecipes,
        pagination: {
          currentPage: page,
          totalPages: 1,
          totalItems: 3,
          limit,
        },
      };

      dispatch(setUserRecipes(mockResponse.recipes));
      dispatch(setCurrentPage(mockResponse.pagination.currentPage));
      dispatch(setTotalPages(mockResponse.pagination.totalPages));
      dispatch(setLoading(false));

      return mockResponse;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

// Create new recipe
export const createUserRecipe = createAsyncThunk(
  'userRecipes/createUserRecipe',
  async (recipeData, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // TODO: Replace with actual API call
      // const response = await userRecipesApi.createRecipe(recipeData);

      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newRecipe = {
        id: Date.now().toString(),
        ...recipeData,
        author: {
          id: '1',
          name: 'VICTORIA',
          avatar: '/images/users/victoria.jpg',
        },
        isFavorite: false,
      };

      const currentRecipes = getState().userRecipes.userRecipes;
      dispatch(setUserRecipes([...currentRecipes, newRecipe]));
      dispatch(setLoading(false));

      return newRecipe;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

// Update recipe
export const updateUserRecipe = createAsyncThunk(
  'userRecipes/updateUserRecipe',
  async ({ recipeId, recipeData }, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // TODO: Replace with actual API call
      // const response = await userRecipesApi.updateRecipe(recipeId, recipeData);

      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 1000));

      const currentRecipes = getState().userRecipes.userRecipes;
      const updatedRecipes = currentRecipes.map(recipe =>
        recipe.id === recipeId ? { ...recipe, ...recipeData } : recipe
      );

      dispatch(setUserRecipes(updatedRecipes));
      dispatch(setLoading(false));

      return { id: recipeId, ...recipeData };
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

      // TODO: Replace with actual API call
      // await userRecipesApi.deleteRecipe(recipeId);

      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 1000));

      const currentRecipes = getState().userRecipes.userRecipes;
      const filteredRecipes = currentRecipes.filter(
        recipe => recipe.id !== recipeId
      );

      dispatch(setUserRecipes(filteredRecipes));
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
    await dispatch(fetchUserRecipes({ page }));
  }
);
