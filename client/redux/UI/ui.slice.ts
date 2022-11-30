import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

interface UiState {
  isComposeTweetShown: boolean;
}

const initialState: UiState = {
  isComposeTweetShown: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleComposeTweet: state => {
      state.isComposeTweetShown = !state.isComposeTweetShown;
    },
  },
});

export const { toggleComposeTweet } = uiSlice.actions;

export const selectIsComposeTweetShown = (state: RootState) =>
  state.ui.isComposeTweetShown;

export default uiSlice.reducer;
