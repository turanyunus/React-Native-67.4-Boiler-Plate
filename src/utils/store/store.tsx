import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../../pages/auth/auth.slice';
import commonSlice from './commonSlice';
import searchSlice from '../../pages/search/search.slice';

const reducer = { authSlice, commonSlice, searchSlice };

export const store = configureStore({
  reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
