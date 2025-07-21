import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import { userRecipesReducer } from './user/userRecipes';
import { userFavoriteRecipesReducer } from './user/userFavoriteRecipes';
import { userFollowersReducer } from './user/userFollowers';
import { userFollowingReducer } from './user/userFollowing';
import { userProfileReducer } from './user/userProfile';
import currentRecipeReducer from './currentRecipe/slice';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from './auth/slice';
import { commonReducer } from './common/slice';
import { recipesReducer } from './recipes';

const persistAuthConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

export const store = configureStore({
  reducer: {
    user: userSlice,
    recipes: recipesReducer,
    currentRecipe: currentRecipeReducer,
    userRecipes: userRecipesReducer,
    userFavoriteRecipes: userFavoriteRecipesReducer,
    userFollowers: userFollowersReducer,
    userFollowing: userFollowingReducer,
    userProfile: userProfileReducer,
    auth: persistReducer(persistAuthConfig, authReducer),
    common: commonReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
