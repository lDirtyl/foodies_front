import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  viewedUser: null,
  isOwnProfile: false,
  isLoading: false,
  isButtonLoading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setViewedUser: (state, action) => {
      state.viewedUser = action.payload;
    },
    setIsOwnProfile: (state, action) => {
      state.isOwnProfile = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setButtonLoading: (state, action) => {
      state.isButtonLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearProfile: (state) => {
      state.currentUser = null;
      state.viewedUser = null;
      state.isOwnProfile = false;
      state.isButtonLoading = false;
      state.error = null;
    },
  },
});

export const {
  setCurrentUser,
  setViewedUser,
  setIsOwnProfile,
  setLoading,
  setButtonLoading,
  setError,
  clearProfile,
} = userProfileSlice.actions;

export default userProfileSlice.reducer; 