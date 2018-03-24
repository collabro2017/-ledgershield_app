import {coinReducer, cpReducer } from './coinReducer';

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'


import {createTransactionReducer, TransactionDetailReducer} from './transactionReducer'

export default combineReducers(
    {
        router: routerReducer,
        coins: coinReducer, 
        cp: cpReducer,
        create_transaction:createTransactionReducer,
        tx_detail: TransactionDetailReducer
    }
);