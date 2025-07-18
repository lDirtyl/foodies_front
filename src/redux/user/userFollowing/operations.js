import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setFollowing,
  removeFromFollowing,
  setCurrentPage,
  setTotalPages,
  setLoading,
  setError,
} from './slice';

// Fetch following users
export const fetchFollowing = createAsyncThunk(
  'userFollowing/fetchFollowing',
  async ({ page = 1, limit = 10 }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // TODO: Replace with actual API call
      // const response = await userFollowingApi.getFollowing({ page, limit });
      
      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockResponse = {
        following: [
          {
            id: '3',
            name: 'ALEX',
            email: 'alex.chef@gmail.com',
            avatar: '/images/users/alex.jpg',
            isFollowing: true,
            recipesCount: 8,
            recipes: [
              { id: '1', title: 'Chocolate Cake', image: 'https://i.natgeofe.com/n/aed9f829-849c-4902-88bb-27e570c2a398/GettyImages-180258510.jpg' },
              { id: '2', title: 'Pasta Carbonara', image: 'https://i.natgeofe.com/n/aed9f829-849c-4902-88bb-27e570c2a398/GettyImages-180258510.jpg' },
              { id: '3', title: 'Green Soup', image: 'https://i.natgeofe.com/n/aed9f829-849c-4902-88bb-27e570c2a398/GettyImages-180258510.jpg' },
              { id: '4', title: 'Vanilla Pudding', image: 'https://i.natgeofe.com/n/aed9f829-849c-4902-88bb-27e570c2a398/GettyImages-180258510.jpg' },
            ],
          },
        ],
        pagination: {
          currentPage: page,
          totalPages: 1,
          totalItems: 1,
          limit,
        },
      };

      dispatch(setFollowing(mockResponse.following));
      dispatch(setCurrentPage(mockResponse.pagination.currentPage));
      dispatch(setTotalPages(mockResponse.pagination.totalPages));
      dispatch(setLoading(false));

      return mockResponse;
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
  async (userId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // TODO: Replace with actual API call
      // await userFollowingApi.unfollowUser(userId);
      
      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
      dispatch(setLoading(true));
      dispatch(setError(null));

      // TODO: Replace with actual API call
      // await userFollowingApi.followUser(user.id);
      
      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 500));
      
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