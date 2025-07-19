import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  following: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
};

const userFollowingSlice = createSlice({
  name: 'userFollowing',
  initialState,
  reducers: {
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    removeFromFollowing: (state, action) => {
      const userId = action.payload;
      state.following = state.following.filter(u => u.id !== userId);
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
  setFollowing,
  removeFromFollowing,
  setCurrentPage,
  setTotalPages,
  setLoading,
  setError,
} = userFollowingSlice.actions;

export default userFollowingSlice.reducer;
