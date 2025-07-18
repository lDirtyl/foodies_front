import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteRecipes: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
};

const userFavoriteRecipesSlice = createSlice({
  name: 'userFavoriteRecipes',
  initialState,
  reducers: {
    setFavoriteRecipes: (state, action) => {
      state.favoriteRecipes = action.payload;
    },
    removeFromFavorites: (state, action) => {
      const recipeId = action.payload;
      state.favoriteRecipes = state.favoriteRecipes.filter(r => r.id !== recipeId);
    },
    addToFavorites: (state, action) => {
      const recipe = action.payload;
      if (!state.favoriteRecipes.find(r => r.id === recipe.id)) {
        state.favoriteRecipes.push({ ...recipe, isFavorite: true });
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setFavoriteRecipes,
  removeFromFavorites,
  addToFavorites,
  setCurrentPage,
  setTotalPages,
  setLoading,
  setError,
} = userFavoriteRecipesSlice.actions;

export default userFavoriteRecipesSlice.reducer; 