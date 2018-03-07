
import {SUBMIT_TRANSACTION, SUBMIT_TRANSACTION_SUCCESS, FETECH_TRANSACTION, FETCH_TRANSACTION_SUCCESS, FETCH_TRANSACTION_ERROR } from './../actions/transactionActions';

const TRANSACTION_INITIAL_STATE = {
    transaction: {submited:false, loading: false, data: null}
}

export const createTransactionReducer = (state = TRANSACTION_INITIAL_STATE, action) => {
    switch(action.type) {
        case SUBMIT_TRANSACTION:
            state = [...state, { transaction:{ submited: false, loading: true, data: null}}];
            break;
        case SUBMIT_TRANSACTION_SUCCESS:
            state = [...state, { transaction: {submited: true, loading: false, data: action.payload}}]
            break;       
        default:
            break;
    }

    return state;
}

const TRANSACTION_DETAIL_INITIAL_STATE = {loading: true,  data: null,    error: null }

export const TransactionDetailReducer = (state = TRANSACTION_DETAIL_INITIAL_STATE, action) => {
    switch(action.type){
        case FETECH_TRANSACTION:
            state = {...state, loading: true, error: null, data: null}
            break;
        case FETCH_TRANSACTION_SUCCESS:
            state = {...state, loading: false, error: null, data: action.payload}
            break;
        case FETCH_TRANSACTION_ERROR:
            state = {...state, loading: false, error: action.payload, data: null}
            break;
        default:
            break;
    }
    return state;
}