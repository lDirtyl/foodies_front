import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setFollowing,
  removeFromFollowing,
  setCurrentPage,
  setTotalPages,
  setLoading,
  setError,
} from './slice';
import { selectToken } from '../../auth/selectors';
import {
  fetchUserFollowing,
  followUser,
  unfollowUser as unfollowUserApi,
} from '../../../api/usersApi';

// Fetch following users
export const fetchFollowing = createAsyncThunk(
  'userFollowing/fetchFollowing',
  async ({ page = 1, limit = 10 }, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const token = selectToken(getState());
      const response = await fetchUserFollowing({ page, limit, token });

      const currentPage = response.pagination.page;
      const totalPages = Math.ceil(response.pagination.total / limit);

      dispatch(setFollowing(response.followings));
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

// Unfollow a user
export const unfollowUser = createAsyncThunk(
  'userFollowing/unfollowUser',
  async (userId, { dispatch, getState }) => {
    try {
      // dispatch(setLoading(true));
      // dispatch(setError(null));

      const token = selectToken(getState());
      await unfollowUserApi(userId, token);

      dispatch(removeFromFollowing(userId));
      dispatch(setLoading(false));

      return userId;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

// Add user to following (when following from followers list)
export const addToFollowing = createAsyncThunk(
  'userFollowing/addToFollowing',
  async (user, { dispatch, getState }) => {
    try {
      // dispatch(setLoading(true));
      // dispatch(setError(null));

      const token = selectToken(getState());
      await followUser(user.id, token);

      const currentFollowing = getState().userFollowing.following;
      const userWithFollowing = { ...user, isFollowing: true };

      if (!currentFollowing.find(u => u.id === user.id)) {
        dispatch(setFollowing([...currentFollowing, userWithFollowing]));
      }

      dispatch(setLoading(false));

      return userWithFollowing;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

// Change page
export const changeFollowingPage = createAsyncThunk(
  'userFollowing/changePage',
  async (page, { dispatch }) => {
    dispatch(setCurrentPage(page));
    // Optionally fetch new data for the page
    // await dispatch(fetchFollowing({ page }));
  }
);
