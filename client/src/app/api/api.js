import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
});