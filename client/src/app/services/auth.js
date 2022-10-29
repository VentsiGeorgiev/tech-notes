import { api } from './api';

export const authApi = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: 'api/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        refresh: builder.mutation({
            query: () => ({
                url: 'api/auth/refresh',
                method: 'GET',
            })
        }),
    })
});

export const {
    useLoginMutation,
    useRefreshMutation
} = authApi;