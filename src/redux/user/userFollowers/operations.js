import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setFollowers,
  toggleFollow,
  setCurrentPage,
  setTotalPages,
  setLoading,
  setError,
} from './slice';
import { fetchUserFollowers } from '../../../api/usersApi';

// Fetch followers
export const fetchFollowers = createAsyncThunk(
  'userFollowers/fetchFollowers',
  async ({ page = 1, limit = 10 }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await fetchUserFollowers({ page, limit });
      const currentPage = response.pagination.page;
      const totalPages = Math.ceil(response.pagination.total / limit);

      dispatch(setFollowers(response.followers));
      dispatch(setCurrentPage(currentPage));
      dispatch(setTotalPages(totalPages));
      dispatch(setLoading(false));

      return response;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

// Follow a user
export const followUser = createAsyncThunk(
  'userFollowers/followUser',
  async (userId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // TODO: Replace with actual API call
      // await userFollowersApi.followUser(userId);
      
      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch(toggleFollow(userId));
      dispatch(setLoading(false));

      return userId;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

// Unfollow a user
export const unfollowUser = createAsyncThunk(
  'userFollowers/unfollowUser',
  async (userId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // TODO: Replace with actual API call
      // await userFollowersApi.unfollowUser(userId);
      
      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch(toggleFollow(userId));
      dispatch(setLoading(false));

      return userId;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

// Toggle follow status
export const toggleFollowUser = createAsyncThunk(
  'userFollowers/toggleFollow',
  async (userId, { dispatch, getState }) => {
    const state = getState();
    const follower = state.userFollowers.followers.find(f => f.id === userId);
    const isFollowing = follower ? follower.isFollowing : false;

    if (isFollowing) {
      await dispatch(unfollowUser(userId));
    } else {
      await dispatch(followUser(userId));
    }

    return { userId, isFollowing: !isFollowing };
  }
);

// Change page
export const changeFollowersPage = createAsyncThunk(
  'userFollowers/changePage',
  async (page, { dispatch }) => {
    dispatch(setCurrentPage(page));
    // Optionally fetch new data for the page
    // await dispatch(fetchFollowers({ page }));
  }
); 