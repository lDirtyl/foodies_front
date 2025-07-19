import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  followers: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
};

const userFollowersSlice = createSlice({
  name: 'userFollowers',
  initialState,
  reducers: {
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    toggleFollow: (state, action) => {
      const userId = action.payload;
      const user = state.followers.find(u => u.id === userId);
      if (user) {
        user.following = !user.following;
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
  setFollowers,
  toggleFollow,
  setCurrentPage,
  setTotalPages,
  setLoading,
  setError,
} = userFollowersSlice.actions;

export default userFollowersSlice.reducer;
