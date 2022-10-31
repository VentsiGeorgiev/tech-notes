import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { api } from './api';

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApi = api.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => 'api/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id;
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ];
                } else {
                    return [{ type: 'User', id: 'LIST' }];
                }
            }
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: 'api/users',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: 'LIST' }
            ]
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: 'api/users',
                method: 'PUT',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: 'api/users',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
    }),
});

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApi;

// returns the query result object
export const selectUsersResult = usersApi.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);