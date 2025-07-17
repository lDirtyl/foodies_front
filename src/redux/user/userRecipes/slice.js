import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  userRecipes: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
};

const userRecipesSlice = createSlice({
  name: 'userRecipes',
  initialState,
  reducers: {
    setUserRecipes: (state, action) => {
      state.userRecipes = action.payload;
    },
    deleteRecipe: (state, action) => {
      const recipeId = action.payload;
      state.userRecipes = state.userRecipes.filter(r => r.id !== recipeId);
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
  setUserRecipes,
  deleteRecipe,
  setCurrentPage,
  setTotalPages,
  setLoading,
  setError,
} = userRecipesSlice.actions;

export default userRecipesSlice.reducer;
