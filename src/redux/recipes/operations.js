import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  recipesService,
  categoriesService,
  areasService,
} from '../../services/api';
import { mockRecipeData, mockPopularRecipes } from '../../utils/mockData';

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
      // Використовуємо mock дані якщо API недоступний
      console.log('API недоступний, використовуємо mock дані:', error.message);
      
      // Створюємо список рецептів з mockData
      const mockRecipes = [
        mockRecipeData, // Класичний борщ
        {
          ...mockRecipeData,
          id: 'mock-recipe-2',
          title: 'Салат Цезар',
          description: 'Класичний салат з курячим філе та пармезаном',
          thumb: '/images/default-recipe.jpg',
          category: 'Салати',
          area: 'Італія'
        },
        {
          ...mockRecipeData,
          id: 'mock-recipe-3', 
          title: 'Паста Карбонара',
          description: 'Традиційна італійська паста з беконом та сиром',
          thumb: '/images/default-recipe.jpg',
          category: 'Основні страви',
          area: 'Італія'
        },
        {
          ...mockRecipeData,
          id: 'mock-recipe-4',
          title: 'Суп-пюре з гарбуза',
          description: 'Ніжний крем-суп з гарбуза з додаванням вершків',
          thumb: '/images/default-recipe.jpg',
          category: 'Супи',
          area: 'Україна'
        }
      ];
      
      return {
        data: mockRecipes,
        total: mockRecipes.length,
        page: page,
        totalPages: 1
      };
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
  async (id, { rejectWithValue, getState }) => {
    try {
      console.log('=== fetchRecipeById START ===');
      console.log('ID:', id);
      console.log('Current state before:', getState().recipes);
      
      // Перевіряємо, чи це тестовий рецепт
      if (id.startsWith('test-recipe-')) {
        const mockRecipe = mockRecipeData[id];
        console.log('Found mock recipe:', mockRecipe);
        if (mockRecipe) {
          console.log('Returning mock recipe');
          return mockRecipe;
        } else {
          console.log('Mock recipe not found');
          return rejectWithValue('Тестовий рецепт не знайдено');
        }
      }
      
      // Для звичайних рецептів використовуємо API
      console.log('Using API for recipe:', id);
      const response = await recipesService.getById(id);
      console.log('API response:', response);
      return response;
    } catch (error) {
      console.error('fetchRecipeById ERROR:', error);
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

export const fetchPopularRecipes = createAsyncThunk(
  'recipes/fetchPopularRecipes',
  async (limit = 4, { rejectWithValue }) => {
    try {
      // Спочатку намагаємося отримати дані з API
      try {
        const response = await recipesService.getPopularRecipes();
        return response;
      } catch {
        // Якщо API не працює, повертаємо mock дані
        console.log('API недоступне, використовуємо mock дані для популярних рецептів');
        return mockPopularRecipes.slice(0, limit);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
