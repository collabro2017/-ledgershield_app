import {FETCH_COINS, FETCH_COINS_SUCCESS, FETCH_COINS_ERROR } from './../actions/coinActions';


const INITIAL_STATE = {
  coinsList: { coins: [], error: null, loading: false}
}

export const coinReducer = (state =  INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COINS:
        state =  {...state, coinsList: { coins:[], error: null, loading: true }}
      break;
    case FETCH_COINS_SUCCESS:
        console.log(action.payload.data)
        state =  {...state, coinsList:{ coins: action.payload.data, error:null, loading: false}}
        break;
    case  FETCH_COINS_ERROR:
        state =  {...state, coinsList:{ coins: [], error: action.payload, loading: false}}
        break
    default:
      break
  }
  return state;
}
