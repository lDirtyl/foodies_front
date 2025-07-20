import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setCurrentUser,
  setViewedUser,
  setProfileUser,
  setIsOwnProfile,
  setLoading,
  setError,
  setButtonLoading,
} from './slice';
import {
  currentUserDetailFetch,
  userDetailFetch,
  fetchUserFollowers,
  fetchUserFollowing,
} from '../../../api/usersApi';
import { fetchCurrentUserRecipes, getFavoriteRecipes } from '../../../api/recipesApi';
import { selectToken } from '../../auth/selectors';
import { followUser, unfollowUser } from '../../../api/usersApi';

export const fetchUserProfileData = createAsyncThunk(
  'userProfile/fetchUserProfileData',
  async (userId, { dispatch, getState }) => {
    try {
      const state = getState();
      const currentUser = state.auth.user;
      let effectiveUserId = userId;

      // If the userId from params is invalid, but we are logged in,
      // assume we are trying to view our own profile.
      if ((!userId || userId === 'undefined') && currentUser && currentUser.id) {
        effectiveUserId = currentUser.id;
      }

      // If there's still no valid ID, then we can't proceed.
      if (!effectiveUserId) {
        return;
      }
      dispatch(setLoading(true));
      dispatch(setError(null));

      const token = selectToken(state);
      const isOwnProfile = currentUser && currentUser.id === effectiveUserId;

      dispatch(setIsOwnProfile(isOwnProfile));

      if (isOwnProfile) {
        // Fetch current user's full profile using the detailed endpoint
        const results = await Promise.allSettled([
          userDetailFetch(currentUser.id, token),
          fetchCurrentUserRecipes({ token }),
          getFavoriteRecipes({ token }),
          fetchUserFollowers(currentUser.id, { token }),
          fetchUserFollowing(token),
        ]);

        const userDetails = results[0].status === 'fulfilled' ? results[0].value : { user: {} };
        const ownRecipes = results[1].status === 'fulfilled' ? results[1].value : { recipes: [] };
        const favoriteRecipes = results[2].status === 'fulfilled' ? results[2].value : { recipes: [] };
        const followers = results[3].status === 'fulfilled' ? results[3].value : { users: [] };
        const followings = results[4].status === 'fulfilled' ? results[4].value : { users: [] };

        const fullUserData = {
          ...userDetails,
          user: {
            ...userDetails.user,
            recipes: ownRecipes.recipes,
            favorites: favoriteRecipes.recipes,
            followers: followers.users,
            following: followings.users,
          },
        };

        dispatch(setProfileUser(fullUserData));
      } else {
        // For viewing other user's profile, we might not need all these details
        const userData = await userDetailFetch(userId, token);
        dispatch(setViewedUser(userData));
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch user profile';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const toggleFollowUser = createAsyncThunk(
  'userProfile/toggleFollowUser',
  async (userId, { dispatch, getState }) => {
    try {
      const state = getState();
      const token = selectToken(state);
      const viewedUser = state.userProfile.viewedUser;

      if (viewedUser && viewedUser.id === userId) {
        dispatch(setButtonLoading(true));
        dispatch(setError(null));

        if (viewedUser.following) {
          await unfollowUser(userId, token);
        } else {
          await followUser(userId, token);
        }
        const updatedUser = await userDetailFetch(userId, token);

        dispatch(setViewedUser(updatedUser));
        dispatch(setButtonLoading(false));
        return updatedUser;
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to toggle follow status';
      dispatch(setError(errorMessage));
      dispatch(setButtonLoading(false));
      throw error;
    }
  }
);
