import { createSlice } from '@reduxjs/toolkit';

const mockRecipes = [
  {
    id: '1',
    title: 'CHILLI PRAWN LINGUINE',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image:
      'https://i.natgeofe.com/n/aed9f829-849c-4902-88bb-27e570c2a398/GettyImages-180258510.jpg',
    category: 'seafood',
    prepTime: 30,
    author: {
      id: '1',
      name: 'VICTORIA',
      avatar: '/images/users/victoria.jpg',
    },
    isFavorite: false,
  },
  {
    id: '2',
    title: 'SALMON PRAWN RISOTTO',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image:
      'https://i.natgeofe.com/n/aed9f829-849c-4902-88bb-27e570c2a398/GettyImages-180258510.jpg',
    category: 'seafood',
    prepTime: 45,
    author: {
      id: '1',
      name: 'VICTORIA',
      avatar: '/images/users/victoria.jpg',
    },
    isFavorite: false,
  },
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
    id: '4',
    title: 'PORTUGUESE FISH STEW (CALDEIRADA DE PEIXE)',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image:
      'https://i.natgeofe.com/n/aed9f829-849c-4902-88bb-27e570c2a398/GettyImages-180258510.jpg',
    category: 'seafood',
    prepTime: 60,
    author: {
      id: '1',
      name: 'VICTORIA',
      avatar: '/images/users/victoria.jpg',
    },
    isFavorite: false,
  },
];

const initialState = {
  userRecipes: mockRecipes,
  favorites: mockRecipes.filter(recipe => recipe.isFavorite),
  currentPage: 1,
  totalPages: 3,
  isLoading: false,
  error: null,
  activeTab: 'MY RECIPES',
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setUserRecipes: (state, action) => {
      state.userRecipes = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    toggleFavorite: (state, action) => {
      const recipeId = action.payload;
      const recipe = state.userRecipes.find(r => r.id === recipeId);
      if (recipe) {
        recipe.isFavorite = !recipe.isFavorite;
        if (recipe.isFavorite) {
          state.favorites.push(recipe);
        } else {
          state.favorites = state.favorites.filter(r => r.id !== recipeId);
        }
      }
    },
    deleteRecipe: (state, action) => {
      const recipeId = action.payload;
      state.userRecipes = state.userRecipes.filter(r => r.id !== recipeId);
      state.favorites = state.favorites.filter(r => r.id !== recipeId);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      state.currentPage = 1; // Reset to first page when changing tabs
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
  setUserRecipes,
  setFavorites,
  toggleFavorite,
  deleteRecipe,
  setCurrentPage,
  setTotalPages,
  setActiveTab,
  setLoading,
  setError,
} = recipesSlice.actions;

export default recipesSlice.reducer;
