import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {
    id: '1',
    name: 'VICTORIA',
    email: 'victoria28682@gmail.com',
    avatar: '/images/users/victoria.jpg',
    followers: 5,
    following: 5,
    recipesCount: 9,
    isLoggedIn: true,
  },
  viewedUser: {
    id: '2',
    name: 'NADIA',
    email: 'nadia28682@gmail.com',
    avatar: '/images/users/nadia.jpg',
    followers: 5,
    following: 4,
    recipesCount: 4,
    isFollowing: false,
  },
  followers: [],
  following: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setViewedUser: (state, action) => {
      state.viewedUser = action.payload;
    },
    toggleFollow: (state) => {
      if (state.viewedUser) {
        state.viewedUser.isFollowing = !state.viewedUser.isFollowing;
        if (state.viewedUser.isFollowing) {
          state.viewedUser.followers += 1;
        } else {
          state.viewedUser.followers -= 1;
        }
      }
    },
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser.isLoggedIn = false;
    },
  },
});

export const {
  setCurrentUser,
  setViewedUser,
  toggleFollow,
  setFollowers,
  setFollowing,
  setLoading,
  setError,
  logout,
} = userSlice.actions;

export default userSlice.reducer; 