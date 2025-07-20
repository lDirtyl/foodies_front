// Base selector to get the userFavoriteRecipes slice
export const selectUserFavoriteRecipesState = state => state.userFavorites;

// Recipe data selectors
export const selectFavoriteRecipes = state => state.userFavorites.favoriteRecipes;
export const selectFavoriteRecipesCount = state => state.userFavorites.favoriteRecipes.length;

// Pagination selectors
export const selectCurrentPage = state => state.userFavorites.currentPage;
export const selectTotalPages = state => state.userFavorites.totalPages;
export const selectHasNextPage = state => state.userFavorites.currentPage < state.userFavorites.totalPages;
export const selectHasPreviousPage = state => state.userFavorites.currentPage > 1;

// Loading and error selectors
export const selectIsLoading = state => state.userFavorites.isLoading;
export const selectError = state => state.userFavorites.error;

// Computed selectors
export const selectFavoriteRecipesWithPagination = state => ({
  recipes: state.userFavorites.favoriteRecipes,
  currentPage: state.userFavorites.currentPage,
  totalPages: state.userFavorites.totalPages,
  isLoading: state.userFavorites.isLoading,
  error: state.userFavorites.error,
});

// Recipe by ID selector
export const selectFavoriteRecipeById = (state, recipeId) => 
  state.userFavorites.favoriteRecipes.find(recipe => recipe.id === recipeId);

// Check if recipe is in favorites
export const selectIsRecipeInFavorites = (state, recipeId) =>
  state.userFavorites.favoriteRecipes.some(recipe => recipe.id === recipeId);

// Recipes by category selector
export const selectFavoriteRecipesByCategory = (state, category) =>
  state.userFavorites.favoriteRecipes.filter(recipe => recipe.category === category);

// Recipes by author selector
export const selectFavoriteRecipesByAuthor = (state, authorId) =>
  state.userFavorites.favoriteRecipes.filter(recipe => recipe.author.id === authorId);

// Get unique categories from favorite recipes
export const selectFavoriteRecipeCategories = state => {
  const categories = state.userFavorites.favoriteRecipes.map(recipe => recipe.category);
  return [...new Set(categories)];
};

// Get unique authors from favorite recipes
export const selectFavoriteRecipeAuthors = state => {
  const authors = state.userFavorites.favoriteRecipes.map(recipe => recipe.author);
  return authors.filter((author, index, self) => 
    index === self.findIndex(a => a.id === author.id)
  );
}; 