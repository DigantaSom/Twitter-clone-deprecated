import { createEntityAdapter } from '@reduxjs/toolkit';

import { apiSlice } from '../../app/api/api.slice';

import { Tweet } from '../../types';
import { TweetResponse } from './tweet.types';

const tweetsAdapter = createEntityAdapter({});

const initialState = tweetsAdapter.getInitialState();

export const tweetApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTweets: builder.query<TweetResponse, void>({
      query: () => ({
        url: '/api/tweets',
        method: 'GET',
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      transformResponse: (responseData: Tweet[]): any => {
        const loadedTweets = responseData.map(tweet => ({
          ...tweet,
          id: tweet._id,
        }));
        return tweetsAdapter.setAll(initialState, loadedTweets);
      },
      providesTags: (result, error, args) => {
        if (result?.ids) {
          return [
            { type: 'Tweet', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Tweet' as const, id })),
          ];
        } else {
          // error
          return [{ type: 'Tweet', id: 'LIST' }];
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetTweetsQuery } = tweetApiSlice;
