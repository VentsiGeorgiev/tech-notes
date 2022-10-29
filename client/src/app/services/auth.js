import { api } from './api';

export const authApi = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: 'api/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        })
    })
});

export const { useLoginMutation } = authApi;