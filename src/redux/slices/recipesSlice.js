import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  recipesService,
  categoriesService,
  areasService,
} from '../../services/api';

export const fetchCategories = createAsyncThunk(
  'recipes/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoriesService.getAll(1, 100);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAreas = createAsyncThunk(
  'recipes/fetchAreas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await areasService.getAll(1, 100);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (
    {
      page = 1,
      limit = 10,
      category = '',
      ingredient = '',
      area = '',
      search = '',
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await recipesService.getAll(
        page,
        limit,
        category,
        ingredient,
        area,
        search
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchUserRecipes = createAsyncThunk(
  'recipes/fetchUserRecipes',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await recipesService.getUserRecipes(page, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  'recipes/fetchFavorites',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await recipesService.getFavorites(page, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await recipesService.getById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const toggleFavoriteThunk = createAsyncThunk(
  'recipes/toggleFavorite',
  async ({ id, isFavorite }, { rejectWithValue }) => {
    try {
      if (isFavorite) {
        await recipesService.removeFromFavorites(id);
      } else {
        await recipesService.addToFavorites(id);
      }
      return { id, isFavorite: !isFavorite };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createRecipe = createAsyncThunk(
  'recipes/createRecipe',
  async (recipeData, { rejectWithValue }) => {
    try {
      const response = await recipesService.create(recipeData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteRecipeThunk = createAsyncThunk(
  'recipes/deleteRecipe',
  async (id, { rejectWithValue }) => {
    try {
      await recipesService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  recipes: [],
  userRecipes: [],
  favorites: [],
  currentRecipe: null,
  categories: [],
  areas: [],
  currentPage: 1,
  totalPages: 3,
  totalRecipes: 0,
  isLoading: false,
  error: null,
  activeTab: 'MY RECIPES',
  filters: {
    category: '',
    area: '',
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
      state.filters = { category: '', area: '' };
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
        state.isLoading = false;
        state.recipes = action.payload.data || action.payload.recipes || [];
        state.totalPages = action.payload.totalPages || 1;
        state.totalRecipes = action.payload.total || 0;
        state.currentPage = action.payload.page || 1;
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
        state.userRecipes = action.payload.data || action.payload.recipes || [];
        state.totalPages = action.payload.totalPages || 1;
        state.totalRecipes = action.payload.total || 0;
        state.currentPage = action.payload.page || 1;
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
        state.favorites = action.payload.data || action.payload.recipes || [];
        state.totalPages = action.payload.totalPages || 1;
        state.totalRecipes = action.payload.total || 0;
        state.currentPage = action.payload.page || 1;
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
