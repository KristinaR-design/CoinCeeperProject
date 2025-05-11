import { configureStore } from '@reduxjs/toolkit';
import { typeReducer } from './reducers/typeReducer';
import { historyReducer } from './reducers/historyReducer';
import { accountReducer } from './reducers/accountReducer';

export const store = configureStore({
    reducer: {
        types: typeReducer,
        history: historyReducer,
        account: accountReducer,
    },
});

export default store;