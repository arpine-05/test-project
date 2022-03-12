import { reducers } from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import ReduxThunk from 'redux-thunk';


let store

export const getStore = () => store;

export function Store() {
    const middleware = [ReduxThunk]

    store = configureStore({
        reducer: reducers(),
        middleware,
        enhancers: []
    })

    return store
}