import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
});