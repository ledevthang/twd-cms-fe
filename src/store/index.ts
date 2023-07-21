import { configureStore } from '@reduxjs/toolkit';
import dialogSlice from './slices/dialogSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    dialog: dialogSlice,
    auth: authSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
