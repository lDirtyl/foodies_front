import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isGlobalLoading: false,
  isProfileLoading: false,
  isRecipesLoading: false,
  notifications: [],
  modals: {
    isDeleteConfirmOpen: false,
    deleteRecipeId: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setGlobalLoading: (state, action) => {
      state.isGlobalLoading = action.payload;
    },
    setProfileLoading: (state, action) => {
      state.isProfileLoading = action.payload;
    },
    setRecipesLoading: (state, action) => {
      state.isRecipesLoading = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    openDeleteConfirm: (state, action) => {
      state.modals.isDeleteConfirmOpen = true;
      state.modals.deleteRecipeId = action.payload;
    },
    closeDeleteConfirm: (state) => {
      state.modals.isDeleteConfirmOpen = false;
      state.modals.deleteRecipeId = null;
    },
  },
});

export const {
  setGlobalLoading,
  setProfileLoading,
  setRecipesLoading,
  addNotification,
  removeNotification,
  openDeleteConfirm,
  closeDeleteConfirm,
} = uiSlice.actions;

export default uiSlice.reducer; 