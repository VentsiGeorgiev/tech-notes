import { api } from './api';
import { setCredentials, logOut } from '../../features/auth/authSlice';

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
        sendLogout: builder.mutation({
            query: () => ({
                url: 'api/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(logOut());
                    setTimeout(() => {
                        dispatch(api.util.resetApiState());
                    }, 1000);
                } catch (err) {
                    console.log(err);
                }
            }
        }),
    })
});

export const {
    useLoginMutation,
    useRefreshMutation,
    useSendLogoutMutation,
} = authApi;