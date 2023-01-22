import { apiSlice } from '../../app/api/api.slice';
import { setCredentials, logout } from './auth.slice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/api/auth',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/api/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          // clears cache, query subscriptions and everything to do with our 'api.slice'
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log('Error while logging out:', err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/api/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log('Error while getting refresh token:', err);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useRefreshMutation, useSendLogoutMutation } =
  authApiSlice;
