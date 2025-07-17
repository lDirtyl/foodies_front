import { createSlice } from '@reduxjs/toolkit';

const mockFollowers = [
  {
    id: '2',
    name: 'NADIA',
    email: 'nadia28682@gmail.com',
    avatar: '/images/users/nadia.jpg',
    isFollowing: false,
    recipesCount: 12,
  },
  {
    id: '3',
    name: 'ALEX',
    email: 'alex.chef@gmail.com',
    avatar: '/images/users/alex.jpg',
    isFollowing: true,
    recipesCount: 8,
  },
  {
    id: '4',
    name: 'MARIE',
    email: 'marie.cuisine@gmail.com',
    avatar: '/images/users/marie.jpg',
    isFollowing: false,
    recipesCount: 15,
  },
];

const initialState = {
  followers: mockFollowers,
  following: mockFollowers.filter(user => user.isFollowing),
  currentPage: 1,
  totalPages: 2,
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
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    toggleFollow: (state, action) => {
      const userId = action.payload;
      const user = state.followers.find(u => u.id === userId);
      if (user) {
        user.isFollowing = !user.isFollowing;
        if (user.isFollowing) {
          state.following.push(user);
        } else {
          state.following = state.following.filter(u => u.id !== userId);
        }
      }
    },
    removeFromFollowing: (state, action) => {
      const userId = action.payload;
      state.following = state.following.filter(u => u.id !== userId);
      const user = state.followers.find(u => u.id === userId);
      if (user) {
        user.isFollowing = false;
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
  setFollowing,
  toggleFollow,
  removeFromFollowing,
  setCurrentPage,
  setTotalPages,
  setLoading,
  setError,
} = userFollowersSlice.actions;

export default userFollowersSlice.reducer; 