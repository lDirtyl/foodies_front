// Base selector to get the userFollowing slice
export const selectUserFollowingState = state => state.userFollowing;

// Following data selectors
export const selectFollowing = state => state.userFollowing.following;
export const selectFollowingCount = state => state.userFollowing.following.length;

// Pagination selectors
export const selectCurrentPage = state => state.userFollowing.currentPage;
export const selectTotalPages = state => state.userFollowing.totalPages;
export const selectHasNextPage = state => state.userFollowing.currentPage < state.userFollowing.totalPages;
export const selectHasPreviousPage = state => state.userFollowing.currentPage > 1;

// Loading and error selectors
export const selectIsLoading = state => state.userFollowing.isLoading;
export const selectError = state => state.userFollowing.error;

// Computed selectors
export const selectFollowingWithPagination = state => ({
  following: state.userFollowing.following,
  currentPage: state.userFollowing.currentPage,
  totalPages: state.userFollowing.totalPages,
  isLoading: state.userFollowing.isLoading,
  error: state.userFollowing.error,
});

// User by ID selector
export const selectFollowingUserById = (state, userId) => 
  state.userFollowing.following.find(user => user.id === userId);

// Check if user is following a specific user
export const selectIsFollowingUser = (state, userId) => {
  const user = state.userFollowing.following.find(u => u.id === userId);
  return user ? user.isFollowing : false;
};

// Get users with most recipes
export const selectTopFollowingByRecipes = (state, limit = 5) =>
  [...state.userFollowing.following]
    .sort((a, b) => b.recipesCount - a.recipesCount)
    .slice(0, limit);

// Get following by recipe count range
export const selectFollowingByRecipeCount = (state, minCount, maxCount) =>
  state.userFollowing.following.filter(user => 
    user.recipesCount >= minCount && user.recipesCount <= maxCount
  );

// Get unique following emails
export const selectFollowingEmails = state => {
  const emails = state.userFollowing.following.map(user => user.email);
  return [...new Set(emails)];
};

// Get following by name (case-insensitive search)
export const selectFollowingByName = (state, searchTerm) =>
  state.userFollowing.following.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

// Get all recipes from following users
export const selectAllFollowingRecipes = state => {
  const allRecipes = [];
  state.userFollowing.following.forEach(user => {
    if (user.recipes && Array.isArray(user.recipes)) {
      allRecipes.push(...user.recipes.map(recipe => ({
        ...recipe,
        author: {
          id: user.id,
          name: user.name,
          avatar: user.avatarURL,
        },
      })));
    }
  });
  return allRecipes;
};

// Get recent recipes from following users
export const selectRecentFollowingRecipes = (state, limit = 10) => {
  const allRecipes = [];
  state.userFollowing.following.forEach(user => {
    if (user.recipes && Array.isArray(user.recipes)) {
      allRecipes.push(...user.recipes.map(recipe => ({
        ...recipe,
        author: {
          id: user.id,
          name: user.name,
          avatar: user.avatarURL,
        },
      })));
    }
  });
  return allRecipes.slice(0, limit);
}; 