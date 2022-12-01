import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isComposeTweetShown: boolean;
  isSubmitDisabled: boolean;
}

const initialState: UiState = {
  isComposeTweetShown: false,
  isSubmitDisabled: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleComposeTweet: state => {
      state.isComposeTweetShown = !state.isComposeTweetShown;
    },
    handleSubmitDisabled: (state, action: PayloadAction<boolean>) => {
      state.isSubmitDisabled = action.payload;
    },
  },
});

export const { toggleComposeTweet, handleSubmitDisabled } = uiSlice.actions;

export default uiSlice.reducer;
