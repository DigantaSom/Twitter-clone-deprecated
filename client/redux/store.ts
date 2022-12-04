import { configureStore } from '@reduxjs/toolkit';

import uiReducer from './UI/ui.slice';
import trendingSlice from './trending/trending.slice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    trending: trendingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
