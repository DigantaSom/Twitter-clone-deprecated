import { createSlice } from '@reduxjs/toolkit';

import { IWhatsHappening, IWhoToFollow } from './trending.types';

import whatsHappening from '../../demo-data/trending/whats-happening';
import whoToFollow from '../../demo-data/trending/whoToFollow';

interface TrendingState {
  whatsHappening: IWhatsHappening[];
  whoToFollow: IWhoToFollow[];
}

const initialState: TrendingState = {
  whatsHappening: [],
  whoToFollow: [],
};

const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {
    showWhatsHappening: state => {
      state.whatsHappening = whatsHappening;
    },
    showWhoToFollow: state => {
      state.whoToFollow = whoToFollow;
    },
  },
});

export const { showWhatsHappening, showWhoToFollow } = trendingSlice.actions;

export default trendingSlice.reducer;
