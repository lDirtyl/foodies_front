// Basic selectors
export const selectRecipes = state => state.recipes.recipes;
export const selectUserRecipes = state => state.recipes.userRecipes;
export const selectFavoriteIdsSet = state => new Set(state.recipes.favoriteIds || []);
export const selectCurrentRecipe = state => state.recipes.currentRecipe;
export const selectCategories = state => state.recipes.categories;
export const selectAreas = state => state.recipes.areas;

// Pagination selectors
export const selectCurrentPage = state => state.recipes.currentPage;
export const selectTotalPages = state => state.recipes.totalPages;
export const selectTotalRecipes = state => state.recipes.totalRecipes;

// UI state selectors
export const selectIsLoading = state => state.recipes.isLoading;
export const selectError = state => state.recipes.error;
export const selectActiveTab = state => state.recipes.activeTab;

// Filter selectors
export const selectFilters = state => state.recipes.filters;
export const selectCategoryFilter = state => state.recipes.filters.category;
export const selectAreaFilter = state => state.recipes.filters.area;

// Computed selectors
export const selectFilteredRecipes = state => {
  const recipes = selectRecipes(state);
  const filters = selectFilters(state);
  
  return recipes.filter(recipe => {
    const categoryMatch = !filters.category || recipe.categoryId === filters.category;
    const areaMatch = !filters.area || recipe.areaId === filters.area;
    return categoryMatch && areaMatch;
  });
};

export const selectHasFilters = state => {
  const filters = selectFilters(state);
  return Boolean(filters.category || filters.area);
};

export const selectRecipeById = (state, recipeId) => {
  const recipes = selectRecipes(state);
  const userRecipes = selectUserRecipes(state);
  
  return recipes.find(recipe => recipe.id === recipeId) ||
         userRecipes.find(recipe => recipe.id === recipeId);
};

export const selectIsFavorite = (state, recipeId) => {
  const favoriteIds = selectFavoriteIds(state);
  return favoriteIds.includes(recipeId);
};
