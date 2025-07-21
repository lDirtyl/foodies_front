import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCategories,
  fetchAreas,
  fetchRecipes,
  fetchUserRecipes,
  fetchFavorites,
  fetchRecipeById,
  toggleFavoriteThunk,
  createRecipe,
  deleteRecipeThunk,
} from './operations';

const initialState = {
  recipes: [],
  userRecipes: [],
  favorites: [],
  currentRecipe: null,
  categories: [],
  areas: [],
  availableIngredients: [],
  availableAreas: [],
  currentPage: 1,
  totalPages: 1,
  totalRecipes: 0,
  isLoading: false,
  error: null,
  activeTab: 'my-recipes',
  filters: {
    category: '',
    area: '',
    ingredient: '',
  },
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    setUserRecipes: (state, action) => {
      state.userRecipes = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setCurrentRecipe: (state, action) => {
      state.currentRecipe = action.payload;
    },
    toggleFavorite: (state, action) => {
      const recipeId = action.payload;
      const recipe = state.recipes.find(r => r.id === recipeId);
      if (recipe) {
        recipe.isFavorite = !recipe.isFavorite;
      }
      // Update in userRecipes array
      const userRecipe = state.userRecipes.find(r => r.id === recipeId);
      if (userRecipe) {
        userRecipe.isFavorite = !userRecipe.isFavorite;
        if (userRecipe.isFavorite) {
          state.favorites.push(userRecipe);
        } else {
          state.favorites = state.favorites.filter(r => r.id !== recipeId);
        }
      }
    },
    deleteRecipe: (state, action) => {
      const recipeId = action.payload;
      state.recipes = state.recipes.filter(r => r.id !== recipeId);
      state.userRecipes = state.userRecipes.filter(r => r.id !== recipeId);
      state.favorites = state.favorites.filter(r => r.id !== recipeId);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalRecipes: (state, action) => {
      state.totalRecipes = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      state.currentPage = 1;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    clearFilters: state => {
      state.filters = { category: '', area: '', ingredient: '' };
      state.currentPage = 1;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, state => {
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories || [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch categories';
      })

      // Fetch areas
      .addCase(fetchAreas.pending, state => {
        state.error = null;
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.areas = action.payload.areas || [];
      })
      .addCase(fetchAreas.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch areas';
      })

      // Fetch all recipes
      .addCase(fetchRecipes.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload.recipes;
        state.totalPages = action.payload.pagination.totalPages;
        state.totalRecipes = action.payload.pagination.total;
        if (action.payload.availableIngredients) {
          state.availableIngredients = action.payload.availableIngredients;
        }
        if (action.payload.availableAreas) {
          state.availableAreas = action.payload.availableAreas;
        }
        state.isLoading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch recipes';
      })

      // Fetch user recipes
      .addCase(fetchUserRecipes.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userRecipes = action.payload.recipes || action.payload.data || [];
        state.totalPages = action.payload.pagination ? Math.ceil((action.payload.pagination.total || 0) / (action.payload.pagination.limit || 10)) : action.payload.totalPages || 1;
        state.totalRecipes = action.payload.pagination?.total || action.payload.total || 0;
        state.currentPage = action.payload.pagination?.page || action.payload.page || 1;
      })
      .addCase(fetchUserRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch user recipes';
      })

      // Fetch favorites
      .addCase(fetchFavorites.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload.recipes || action.payload.data || [];
        state.totalPages = action.payload.pagination ? Math.ceil((action.payload.pagination.total || 0) / (action.payload.pagination.limit || 10)) : action.payload.totalPages || 1;
        state.totalRecipes = action.payload.pagination?.total || action.payload.total || 0;
        state.currentPage = action.payload.pagination?.page || action.payload.page || 1;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch favorites';
      })

      // Fetch single recipe
      .addCase(fetchRecipeById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRecipe = action.payload.data || action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch recipe';
      })

      // Toggle favorite
      .addCase(toggleFavoriteThunk.pending, state => {
        state.error = null;
      })
      .addCase(toggleFavoriteThunk.fulfilled, (state, action) => {
        const { id, isFavorite } = action.payload;

        // Update in all relevant arrays
        [state.recipes, state.userRecipes].forEach(array => {
          const recipe = array.find(r => r.id === id);
          if (recipe) {
            recipe.isFavorite = isFavorite;
          }
        });

        // Update current recipe if it's the same
        if (state.currentRecipe && state.currentRecipe.id === id) {
          state.currentRecipe.isFavorite = isFavorite;
        }

        // Update favorites array
        if (isFavorite) {
          const recipe =
            state.userRecipes.find(r => r.id === id) ||
            state.recipes.find(r => r.id === id);
          if (recipe && !state.favorites.find(r => r.id === id)) {
            state.favorites.push(recipe);
          }
        } else {
          state.favorites = state.favorites.filter(r => r.id !== id);
        }
      })
      .addCase(toggleFavoriteThunk.rejected, (state, action) => {
        state.error = action.payload || 'Failed to toggle favorite';
      })

      // Create recipe
      .addCase(createRecipe.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        const newRecipe = action.payload.data || action.payload;
        state.userRecipes.unshift(newRecipe);
        state.recipes.unshift(newRecipe);
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to create recipe';
      })

      // Delete recipe
      .addCase(deleteRecipeThunk.pending, state => {
        state.error = null;
      })
      .addCase(deleteRecipeThunk.fulfilled, (state, action) => {
        const recipeId = action.payload;
        state.recipes = state.recipes.filter(r => r.id !== recipeId);
        state.userRecipes = state.userRecipes.filter(r => r.id !== recipeId);
        state.favorites = state.favorites.filter(r => r.id !== recipeId);
      })
      .addCase(deleteRecipeThunk.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete recipe';
      });
  },
});

export const {
  setRecipes,
  setUserRecipes,
  setFavorites,
  setCurrentRecipe,
  toggleFavorite,
  deleteRecipe,
  setCurrentPage,
  setTotalPages,
  setTotalRecipes,
  setActiveTab,
  setFilters,
  clearFilters,
  setLoading,
  setError,
  clearError,
} = recipesSlice.actions;

export default recipesSlice.reducer;
