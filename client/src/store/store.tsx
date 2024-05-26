import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from './reducer';
import {apiSlice} from './apiSlice';

const store = configureStore({
    reducer: {
        expense: expenseReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)

})

export default store;