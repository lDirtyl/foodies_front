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
    isFavorite: true,
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
    isFavorite: true,
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
    isFavorite: true,
  },
];

// Fetch favorite recipes
export const fetchFavoriteRecipes = createAsyncThunk(
  'userFavoriteRecipes/fetchFavoriteRecipes',
  async ({ page = 1, limit = 10 }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // TODO: Replace with actual API call
      // const response = await userFavoriteRecipesApi.getFavoriteRecipes({ page, limit });
      
      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockResponse = {
        recipes: mockRecipes,
        pagination: {
          currentPage: page,
          totalPages: 1,
          totalItems: 1,
          limit,
        },
      };

      dispatch(setFavoriteRecipes(mockResponse.recipes));
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

// Add recipe to favorites
export const addRecipeToFavorites = createAsyncThunk(
  'userFavoriteRecipes/addToFavorites',
  async (recipe, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // TODO: Replace with actual API call
      // await userFavoriteRecipesApi.addToFavorites(recipe.id);
      
      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
  async (recipeId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // TODO: Replace with actual API call
      // await userFavoriteRecipesApi.removeFromFavorites(recipeId);
      
      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 500));
      
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