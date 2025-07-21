import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Окрема операція тільки для поточного рецепту
export const fetchCurrentRecipe = createAsyncThunk(
  'currentRecipe/fetch',
  async (id, { rejectWithValue }) => {
    try {
      // TODO: Підключити реальний API для отримання рецепту за ID
      return rejectWithValue('API для рецептів поки не підключено');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  recipe: null,
  isLoading: false,
  error: null,
};

const currentRecipeSlice = createSlice({
  name: 'currentRecipe',
  initialState,
  reducers: {
    clearCurrentRecipe: (state) => {
      console.log('Clearing current recipe');
      state.recipe = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentRecipe.pending, (state) => {
        console.log('=== currentRecipe: PENDING ===');
        state.isLoading = true;
        state.error = null;
        // Не очищаємо поточний рецепт
      })
      .addCase(fetchCurrentRecipe.fulfilled, (state, action) => {
        console.log('=== currentRecipe: FULFILLED ===', action.payload?.title);
        state.isLoading = false;
        state.recipe = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentRecipe.rejected, (state, action) => {
        console.log('=== currentRecipe: REJECTED ===', action.payload);
        state.isLoading = false;
        state.error = action.payload;
        // Не очищаємо поточний рецепт при помилці
      });
  },
});

export const { clearCurrentRecipe } = currentRecipeSlice.actions;
export default currentRecipeSlice.reducer;
