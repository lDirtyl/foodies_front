// Basic selectors
export const selectUserProfile = (state) => state.userProfile;
export const selectCurrentUser = (state) => state.userProfile.currentUser;
export const selectViewedUser = (state) => state.userProfile.viewedUser;
export const selectIsOwnProfile = (state) => state.userProfile.isOwnProfile;
export const selectIsLoading = (state) => state.userProfile.isLoading;
export const selectError = (state) => state.userProfile.error;
export const selectIsButtonLoading = (state) => state.userProfile.isButtonLoading;

// Computed selectors
export const selectActiveUser = (state) => {
  const { viewedUser } = state.userProfile;
  return viewedUser;
};

export const selectUserTabs = (state) => {
  const isOwnProfile = state.userProfile.isOwnProfile;
  
  if (isOwnProfile) {
    // Current user - show all tabs
    return ['MY RECIPES', 'MY FAVORITES', 'FOLLOWERS', 'FOLLOWING'];
  } else {
    // Other user - show only 2 tabs
    return ['RECIPES', 'FOLLOWERS'];
  }
};

export const selectUserInfoData = (state) => {
  const user = selectActiveUser(state);
  const isOwnProfile = state.userProfile.isOwnProfile;
  
  if (!user) return null;
  
  const baseData = {
    name: user.name,
    email: user.email,
    avatarURL: user.avatarURL,
    recipesCount: user.recipesCount,
    followers: user.followers,
  };
  
  if (isOwnProfile) {
    // Current user - show all stats
    return {
      ...baseData,
      favorites: user.favorites,
      following: user.following,
    };
  } else {
    // Other user - hide favorites and following
    return {
      ...baseData,
      following: user.following,
    };
  }
};

export const selectCanFollow = (state) => {
  return !state.userProfile.isOwnProfile;
};

export const selectIsFollowing = (state) => {
  const user = selectViewedUser(state);
  return user ? user.following : false;
}; 