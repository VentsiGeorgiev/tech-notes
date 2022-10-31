import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { api } from './api';

const notesAdapter = createEntityAdapter({});

const initialState = notesAdapter.getInitialState();

export const notesApi = api.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => 'api/notes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id;
                    return note;
                });
                return notesAdapter.setAll(initialState, loadedNotes);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Note', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Note', id }))
                    ];
                } else {
                    return [{ type: 'Note', id: 'LIST' }];
                }
            }
        }),
        addNewNote: builder.mutation({
            query: initialNoteData => ({
                url: 'api/notes',
                method: 'POST',
                body: {
                    ...initialNoteData
                }
            }),
            invalidatesTags: [
                { type: 'Note', id: 'LIST' }
            ]
        }),
        updateNote: builder.mutation({
            query: initialNoteData => ({
                url: 'api/notes',
                method: 'PUT',
                body: {
                    ...initialNoteData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),
        deleteNote: builder.mutation({
            query: ({ id }) => ({
                url: 'api/notes',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),
    }),
});

export const {
    useGetNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation
} = notesApi;

// returns the query result object
export const selectNotesResult = notesApi.endpoints.getNotes.select();

// creates memoized selector
const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState);