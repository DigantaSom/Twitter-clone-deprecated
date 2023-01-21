import { apiSlice } from '../../app/api/api.slice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/api/auth',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation } = authApiSlice;
