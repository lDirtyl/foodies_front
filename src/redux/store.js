import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import recipesSlice from './slices/recipesSlice';
import uiSlice from './slices/uiSlice';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from './auth/slice';
import { commonReducer } from './common/slice';

const persistAuthConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    user: userSlice,
    recipes: recipesSlice,
    ui: uiSlice,
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
