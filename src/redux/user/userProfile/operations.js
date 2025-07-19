import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setCurrentUser,
  setViewedUser,
  setIsOwnProfile,
  setLoading,
  setError,
  setButtonLoading,
} from './slice';
import { currentUserDetailFetch, userDetailFetch } from '../../../api/usersApi';
import { selectToken } from '../../auth/selectors';
import { followUser, unfollowUser } from '../../../api/usersApi';

export const fetchUserProfileData = createAsyncThunk(
  'userProfile/fetchUserProfileData',
  async (userId, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const token = selectToken(getState());
      // Get current user from auth state
      const currentUser = getState().auth.user;
      const isOwnProfile = currentUser && currentUser.id === userId;

      dispatch(setIsOwnProfile(isOwnProfile));

      if (isOwnProfile) {
        // Fetch current user's full profile
        const userData = await currentUserDetailFetch(token);
        dispatch(setCurrentUser(userData));
        return { user: userData, isOwnProfile: true };
      } else {
        // Fetch other user's profile (limited data)
        const userData = await userDetailFetch(userId, token);
        dispatch(setViewedUser(userData));
        return { user: userData, isOwnProfile: false };
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
