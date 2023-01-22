import { apiSlice } from '../../app/api/api.slice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation({
      query: userData => ({
        url: '/api/users',
        method: 'POST',
        body: { ...userData },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useSignUpMutation } = userApiSlice;
