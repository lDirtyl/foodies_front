import { createSlice } from '@reduxjs/toolkit';
import { fetchUserRecipes, deleteUserRecipe, createRecipe } from './operations';

const initialState = {
  userRecipes: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const userRecipesSlice = createSlice({
  name: 'userRecipes',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRecipes.pending, handlePending)
      .addCase(fetchUserRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userRecipes = action.payload.recipes;
        state.totalPages = Math.ceil(action.payload.pagination.total / action.payload.pagination.limit);
        state.currentPage = action.payload.pagination.page;
      })
      .addCase(fetchUserRecipes.rejected, handleRejected)
      .addCase(deleteUserRecipe.pending, handlePending)
      .addCase(deleteUserRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userRecipes = state.userRecipes.filter(
          (recipe) => recipe._id !== action.payload
        );
      })
      .addCase(deleteUserRecipe.rejected, handleRejected)
      .addCase(createRecipe.pending, handlePending)
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add the new recipe to the beginning of the list
        if (action.payload && action.payload.data) {
          state.userRecipes.unshift(action.payload.data);
        }
      })
      .addCase(createRecipe.rejected, handleRejected);
  },
});

export const { setCurrentPage } = userRecipesSlice.actions;

export const userRecipesReducer = userRecipesSlice.reducer;
