import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setFollowers,
  toggleFollow,
  setCurrentPage,
  setTotalPages,
  setLoading,
  setError,
} from './slice';
import {
  fetchUserFollowers,
  followUser as followUserApi,
  unfollowUser as unfollowUserApi,
} from '../../../api/usersApi';
import { selectToken } from '../../auth/selectors';

// Fetch followers
export const fetchFollowers = createAsyncThunk(
  'userFollowers/fetchFollowers',
  async ({ page = 1, limit = 10, userId }, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const token = selectToken(getState());
      const response = await fetchUserFollowers(userId, { token, page, limit });

      const currentPage = response.pagination.page;
      const totalPages = Math.ceil(response.pagination.total / limit);

      dispatch(setFollowers(response.followers));
      dispatch(setCurrentPage(currentPage));
      dispatch(setTotalPages(totalPages));
      dispatch(setLoading(false));

      return response;
    } catch (error) {
      console.log('>>> error', error);
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

// Follow a user
export const followUser = createAsyncThunk(
  'userFollowers/followUser',
  async (userId, { dispatch, getState }) => {
    try {
      // dispatch(setLoading(true));
      // dispatch(setError(null));

      const token = selectToken(getState());
      await followUserApi(userId, token);

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
  async (userId, { dispatch, getState }) => {
    try {
      // dispatch(setLoading(true));
      // dispatch(setError(null));

      const token = selectToken(getState());
      await unfollowUserApi(userId, token);

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
    const isFollowing = follower ? follower.following : false;

    if (isFollowing) {
      await dispatch(unfollowUser(userId));
    } else {
      await dispatch(followUser(userId));
    }

    return { userId, following: !isFollowing };
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
