import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';
import authReducer from '../features/auth/authSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware),
    devTools: true
});

setupListeners(store.dispatch);