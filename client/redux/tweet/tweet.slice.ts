import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { Tweet } from '../../types';

import constants from '../../constants';
import DemoPost1 from '../../images/demo-post-1.jpeg';
import DemoPost2 from '../../images/demo-post-2.jpg';
import DemoPost3 from '../../images/demo-post-3.jpeg';

interface TweetState {
  isLoading: boolean;
  tweets: Tweet[];
  error: string | null;
}

const initialState: TweetState = {
  isLoading: false,
  tweets: [],
  error: null,
};

const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {
    fetchTweetStart: state => {
      state.isLoading = true;
    },
    fetchTweetSuccess: state => {
      state.isLoading = false;
      state.tweets = [
        {
          id: '1',
          userId: 'user1',
          fullName: 'Jenna Ortega',
          twitterHandle: 'jennaortega',
          profilePicture: constants.placeholder_profilePicture,
          caption:
            "Eat your turkey and maybe watch the show. Please don't let this outfit be for nothing.",
          media: [DemoPost1],
          creationDate: new Date().toISOString(),
          likes: [],
          retweets: [],
        },
        {
          id: '2',
          userId: 'user2',
          fullName: 'Diganta Som',
          twitterHandle: 'DigSmash',
          profilePicture: constants.placeholder_profilePicture,
          caption:
            "Eat your turkey and maybe watch the show. Please don't let this outfit be for nothing.",
          media: [DemoPost2],
          creationDate: new Date().toISOString(),
          likes: [],
          retweets: [],
        },
        {
          id: '3',
          userId: 'user3',
          fullName: 'Netflix',
          twitterHandle: 'netflix',
          profilePicture: constants.placeholder_profilePicture,
          caption:
            "Eat your turkey and maybe watch the show. Please don't let this outfit be for nothing.",
          media: [DemoPost3],
          creationDate: new Date().toISOString(),
          likes: [],
          retweets: [],
        },
      ];
      state.error = null;
    },
    fetchTweetFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchTweetStart, fetchTweetSuccess, fetchTweetFailure } =
  tweetSlice.actions;

export default tweetSlice.reducer;
