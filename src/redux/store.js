import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import recipesSlice from './slices/recipesSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    recipes: recipesSlice,
    ui: uiSlice,
  },
});

export default store; 