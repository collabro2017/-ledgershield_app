import { ROOT_URL } from './../constants/app';
import axios from 'axios';
import history from './../utils/history';

export const SUBMIT_TRANSACTION = 'SUBMIT_TRANSACTION';
export function submitTrnsaction(data) {
  return function action(dispatch){

    const request = axios({
      method: 'post',
      url: `${ROOT_URL}/transactions/`,
      headers: [],
      data: data
    });

    request.then((response) => {      
      history.replace(`/tx/status/${response.data.order_id}`);      
    }).catch((error) => {
      console.log(error);
    })


    

    return {
      type: SUBMIT_TRANSACTION,
      payload: request
    };
  }
}


export const SUBMIT_TRANSACTION_SUCCESS = 'SUBMIT_TRANSACTION_SUCCESS';
export function submitTransactionSuccessl(payload){
    return history.replace(`/tx/${payload.order_id}/status`);
    // return function action(dispatch) {
    //   history.push(`/tx/${payload.id}/status`);
    //     return {
    //         type: SUBMIT_TRANSACTION_SUCCESS,
    //         payload: payload
    //     };
    // }
}

export const SUBMIT_TRANSACTION_ERROR = 'SUBMIT_TRANSACTION_ERROR';
export function submitTransactionError(payload){
  return {
    type: submitTransactionError,
    payload: payload
  }
}


export const FETECH_TRANSACTION = 'FETCH_TRANSACTION';
export function fetchTransaction(txid){
  return (dispatch) => {
    const request = axios({
      url: `${ROOT_URL}/transactions/detail/${txid}`,
      method: 'get'
    });
  
    request.then((response) => {
      dispatch(fetchTransactionSuccess(response.data));  
    }).catch(err => {
      dispatch(fetchTransactionError("Simething went wrong while fetching tx detail from server, try later!"));  
    })
  
    return {
      type: FETECH_TRANSACTION,
      payload: request
    }
  }
  
}

export const FETCH_TRANSACTION_SUCCESS = 'FETCH_TRANSACTION_SUCCESS';
export function fetchTransactionSuccess(payload){
  return {
    type: FETCH_TRANSACTION_SUCCESS,
    payload: payload
  }
}

export const FETCH_TRANSACTION_ERROR = 'FETCH_TRANSACTION_ERROR';
export function fetchTransactionError(payload){
  return {
    type: FETCH_TRANSACTION_ERROR,
    payload: payload
  }
}