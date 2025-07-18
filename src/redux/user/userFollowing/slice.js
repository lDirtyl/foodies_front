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

const mockFollowing = [
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
    id: '5',
    name: 'SARAH',
    email: 'sarah.cooking@gmail.com',
    avatar: '/images/users/sarah.jpg',
    isFollowing: true,
    recipesCount: 22,
    recipes: mockRecipes,
  },
  {
    id: '6',
    name: 'MIKE',
    email: 'mike.chef@gmail.com',
    avatar: '/images/users/mike.jpg',
    isFollowing: true,
    recipesCount: 15,
    recipes: mockRecipes,
  },
];

const initialState = {
  following: mockFollowing,
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