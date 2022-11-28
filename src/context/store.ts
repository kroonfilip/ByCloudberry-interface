import { configureStore } from '@reduxjs/toolkit';
import { bagSlice } from './bagSlice';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux'

export const store = configureStore({
    reducer: {
        bag: bagSlice.reducer,
    },
    middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;