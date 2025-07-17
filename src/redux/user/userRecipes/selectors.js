// Base selector to get the userRecipes slice
export const selectUserRecipesState = state => state.userRecipes;

// Recipe data selectors
export const selectUserRecipes = state => state.userRecipes.userRecipes;
export const selectUserRecipesCount = state => state.userRecipes.userRecipes.length;

// Pagination selectors
export const selectCurrentPage = state => state.userRecipes.currentPage;
export const selectTotalPages = state => state.userRecipes.totalPages;
export const selectHasNextPage = state => state.userRecipes.currentPage < state.userRecipes.totalPages;
export const selectHasPreviousPage = state => state.userRecipes.currentPage > 1;

// Loading and error selectors
export const selectIsLoading = state => state.userRecipes.isLoading;
export const selectError = state => state.userRecipes.error;

// Computed selectors
export const selectUserRecipesWithPagination = state => ({
  recipes: state.userRecipes.userRecipes,
  currentPage: state.userRecipes.currentPage,
  totalPages: state.userRecipes.totalPages,
  isLoading: state.userRecipes.isLoading,
  error: state.userRecipes.error,
});

// Recipe by ID selector
export const selectRecipeById = (state, recipeId) => 
  state.userRecipes.userRecipes.find(recipe => recipe.id === recipeId);

// Recipes by category selector
export const selectRecipesByCategory = (state, category) =>
  state.userRecipes.userRecipes.filter(recipe => recipe.category === category);

// Recipes by author selector
export const selectRecipesByAuthor = (state, authorId) =>
  state.userRecipes.userRecipes.filter(recipe => recipe.author.id === authorId); 