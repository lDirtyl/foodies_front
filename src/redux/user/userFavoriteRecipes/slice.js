import { createSlice } from '@reduxjs/toolkit';

const mockFavoriteRecipes = [
  {
    id: '3',
    title: 'ROCK CAKES',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image:
      'https://i.natgeofe.com/n/aed9f829-849c-4902-88bb-27e570c2a398/GettyImages-180258510.jpg',
    category: 'desserts',
    prepTime: 25,
    author: {
      id: '1',
      name: 'VICTORIA',
      avatar: '/images/users/victoria.jpg',
    },
    isFavorite: true,
  },
  {
    id: '5',
    title: 'CHOCOLATE MOUSSE',
    description:
      'A rich and creamy chocolate mousse that melts in your mouth. Perfect for special occasions and chocolate lovers.',
    image:
      'https://i.natgeofe.com/n/aed9f829-849c-4902-88bb-27e570c2a398/GettyImages-180258510.jpg',
    category: 'desserts',
    prepTime: 20,
    author: {
      id: '2',
      name: 'ALEX',
      avatar: '/images/users/alex.jpg',
    },
    isFavorite: true,
  },
  {
    id: '6',
    title: 'MEDITERRANEAN SALAD',
    description:
      'Fresh and healthy Mediterranean salad with olives, feta cheese, and fresh vegetables. A perfect light meal.',
    image:
      'https://i.natgeofe.com/n/aed9f829-849c-4902-88bb-27e570c2a398/GettyImages-180258510.jpg',
    category: 'vegetarian',
    prepTime: 15,
    author: {
      id: '3',
      name: 'MARIE',
      avatar: '/images/users/marie.jpg',
    },
    isFavorite: true,
  },
  {
    id: '7',
    title: 'GRILLED SALMON',
    description:
      'Perfectly grilled salmon with herbs and lemon. A healthy and delicious main course option.',
    image:
      'https://i.natgeofe.com/n/aed9f829-849c-4902-88bb-27e570c2a398/GettyImages-180258510.jpg',
    category: 'seafood',
    prepTime: 30,
    author: {
      id: '4',
      name: 'SARAH',
      avatar: '/images/users/sarah.jpg',
    },
    isFavorite: true,
  },
];

const initialState = {
  favoriteRecipes: mockFavoriteRecipes,
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
};

const userFavoriteRecipesSlice = createSlice({
  name: 'userFavoriteRecipes',
  initialState,
  reducers: {
    setFavoriteRecipes: (state, action) => {
      state.favoriteRecipes = action.payload;
    },
    removeFromFavorites: (state, action) => {
      const recipeId = action.payload;
      state.favoriteRecipes = state.favoriteRecipes.filter(r => r.id !== recipeId);
    },
    addToFavorites: (state, action) => {
      const recipe = action.payload;
      if (!state.favoriteRecipes.find(r => r.id === recipe.id)) {
        state.favoriteRecipes.push({ ...recipe, isFavorite: true });
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
  setFavoriteRecipes,
  removeFromFavorites,
  addToFavorites,
  setCurrentPage,
  setTotalPages,
  setLoading,
  setError,
} = userFavoriteRecipesSlice.actions;

export default userFavoriteRecipesSlice.reducer; 