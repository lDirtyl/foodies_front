import { createSlice } from '@reduxjs/toolkit';

const mockRecipes = [
  {
    id: '1',
    title: 'Chocolate Cake',
    image: '/images/recipes/chocolate-cake.jpg',
  },
  {
    id: '2',
    title: 'Pasta Carbonara',
    image: '/images/recipes/pasta-carbonara.jpg',
  },
  {
    id: '3',
    title: 'Green Soup',
    image: '/images/recipes/green-soup.jpg',
  },
  {
    id: '4',
    title: 'Vanilla Pudding',
    image: '/images/recipes/vanilla-pudding.jpg',
  },
];

const mockFollowers = [
  {
    id: '2',
    name: 'NADIA',
    email: 'nadia28682@gmail.com',
    avatar: '/images/users/nadia.jpg',
    isFollowing: false,
    recipesCount: 12,
    recipes: mockRecipes,
  },
  {
    id: '3',
    name: 'ALEX',
    email: 'alex.chef@gmail.com',
    avatar: '/images/users/alex.jpg',
    isFollowing: true,
    recipesCount: 8,
    recipes: mockRecipes,
  },
  {
    id: '4',
    name: 'MARIE',
    email: 'marie.cuisine@gmail.com',
    avatar: '/images/users/marie.jpg',
    isFollowing: false,
    recipesCount: 15,
    recipes: mockRecipes,
  },
];

const initialState = {
  followers: mockFollowers,
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
        user.isFollowing = !user.isFollowing;
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