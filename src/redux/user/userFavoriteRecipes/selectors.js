// Base selector to get the userFavoriteRecipes slice
export const selectUserFavoriteRecipesState = state => state.userFavoriteRecipes;

// Recipe data selectors
export const selectFavoriteRecipes = state => state.userFavoriteRecipes.favoriteRecipes;
export const selectFavoriteRecipesCount = state => state.userFavoriteRecipes.favoriteRecipes.length;

// Pagination selectors
export const selectCurrentPage = state => state.userFavoriteRecipes.currentPage;
export const selectTotalPages = state => state.userFavoriteRecipes.totalPages;
export const selectHasNextPage = state => state.userFavoriteRecipes.currentPage < state.userFavoriteRecipes.totalPages;
export const selectHasPreviousPage = state => state.userFavoriteRecipes.currentPage > 1;

// Loading and error selectors
export const selectIsLoading = state => state.userFavoriteRecipes.isLoading;
export const selectError = state => state.userFavoriteRecipes.error;

// Computed selectors
export const selectFavoriteRecipesWithPagination = state => ({
  recipes: state.userFavoriteRecipes.favoriteRecipes,
  currentPage: state.userFavoriteRecipes.currentPage,
  totalPages: state.userFavoriteRecipes.totalPages,
  isLoading: state.userFavoriteRecipes.isLoading,
  error: state.userFavoriteRecipes.error,
});

// Recipe by ID selector
export const selectFavoriteRecipeById = (state, recipeId) => 
  state.userFavoriteRecipes.favoriteRecipes.find(recipe => recipe.id === recipeId);

// Check if recipe is in favorites
export const selectIsRecipeInFavorites = (state, recipeId) =>
  state.userFavoriteRecipes.favoriteRecipes.some(recipe => recipe.id === recipeId);

// Recipes by category selector
export const selectFavoriteRecipesByCategory = (state, category) =>
  state.userFavoriteRecipes.favoriteRecipes.filter(recipe => recipe.category === category);

// Recipes by author selector
export const selectFavoriteRecipesByAuthor = (state, authorId) =>
  state.userFavoriteRecipes.favoriteRecipes.filter(recipe => recipe.author.id === authorId);

// Get unique categories from favorite recipes
export const selectFavoriteRecipeCategories = state => {
  const categories = state.userFavoriteRecipes.favoriteRecipes.map(recipe => recipe.category);
  return [...new Set(categories)];
};

// Get unique authors from favorite recipes
export const selectFavoriteRecipeAuthors = state => {
  const authors = state.userFavoriteRecipes.favoriteRecipes.map(recipe => recipe.author);
  return authors.filter((author, index, self) => 
    index === self.findIndex(a => a.id === author.id)
  );
}; 