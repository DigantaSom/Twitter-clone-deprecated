import { configureStore } from '@reduxjs/toolkit';

import uiReducer from './UI/ui.slice';
import authReducer from './auth/auth.slice';
import tweetReducer from './tweet/tweet.slice';
import trendingReducer from './trending/trending.slice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    tweet: tweetReducer,
    trending: trendingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
