// Base selector to get the userFollowers slice
export const selectUserFollowersState = state => state.userFollowers;

// Follower data selectors
export const selectFollowers = state => state.userFollowers.followers;
export const selectFollowersCount = state => state.userFollowers.followers.length;

// Pagination selectors
export const selectCurrentPage = state => state.userFollowers.currentPage;
export const selectTotalPages = state => state.userFollowers.totalPages;
export const selectHasNextPage = state => state.userFollowers.currentPage < state.userFollowers.totalPages;
export const selectHasPreviousPage = state => state.userFollowers.currentPage > 1;

// Loading and error selectors
export const selectIsLoading = state => state.userFollowers.isLoading;
export const selectError = state => state.userFollowers.error;

// Computed selectors
export const selectFollowersWithPagination = state => ({
  followers: state.userFollowers.followers,
  currentPage: state.userFollowers.currentPage,
  totalPages: state.userFollowers.totalPages,
  isLoading: state.userFollowers.isLoading,
  error: state.userFollowers.error,
});

// Follower by ID selector
export const selectFollowerById = (state, followerId) => 
  state.userFollowers.followers.find(follower => follower.id === followerId);

// Check if user is following a specific follower
export const selectIsFollowingFollower = (state, followerId) => {
  const follower = state.userFollowers.followers.find(f => f.id === followerId);
  return follower ? follower.isFollowing : false;
};

// Get followers that the current user is following
export const selectFollowingFollowers = state =>
  state.userFollowers.followers.filter(follower => follower.isFollowing);

// Get followers that the current user is not following
export const selectNonFollowingFollowers = state =>
  state.userFollowers.followers.filter(follower => !follower.isFollowing);

// Get followers by recipe count range
export const selectFollowersByRecipeCount = (state, minCount, maxCount) =>
  state.userFollowers.followers.filter(follower => 
    follower.recipesCount >= minCount && follower.recipesCount <= maxCount
  );

// Get followers with most recipes
export const selectTopFollowersByRecipes = (state, limit = 5) =>
  [...state.userFollowers.followers]
    .sort((a, b) => b.recipesCount - a.recipesCount)
    .slice(0, limit);

// Get unique follower emails
export const selectFollowerEmails = state => {
  const emails = state.userFollowers.followers.map(follower => follower.email);
  return [...new Set(emails)];
};

// Get followers by name (case-insensitive search)
export const selectFollowersByName = (state, searchTerm) =>
  state.userFollowers.followers.filter(follower =>
    follower.name.toLowerCase().includes(searchTerm.toLowerCase())
  ); 