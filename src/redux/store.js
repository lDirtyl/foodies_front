import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from './slices/userSlice';
import { userRecipesReducer } from './user/userRecipes/slice';
import { userFavoriteRecipesReducer } from './user/userFavoriteRecipes';
import { userFollowersReducer } from './user/userFollowers';
import { userFollowingReducer } from './user/userFollowing';
import { userProfileReducer } from './user/userProfile';
import { authReducer } from './auth/slice';
import recipesReducer from './recipes/slice';
import { commonReducer } from './common/slice';


const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  common: commonReducer,
  user: userSlice,
  userRecipes: userRecipesReducer,
  userFavorites: userFavoriteRecipesReducer,
  userFollowers: userFollowersReducer,
  userFollowing: userFollowingReducer,
  userProfile: userProfileReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  recipes: recipesReducer,

});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
export default store;
