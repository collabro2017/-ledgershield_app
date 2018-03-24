import axios from "axios";
import { ROOT_URL } from "./../constants/app";

export const FETCH_COINS = "FETCH_COINS";
export function fetchCoins() {
  return function action(dispatch) {
    const request = axios({
      method: "get",
      url: `${ROOT_URL}/coins/list/`,
      headers: []
    });

    request
      .then(response => {
        dispatch(fetchCoinsSuccess(response));
      })
      .catch(err => {
        dispatch(
          fetchCoinsError(
            "Error while fetching supported coins list from server!"
          )
        );
      });

    return {
      type: FETCH_COINS,
      payload: request
    };
  };
}

export const FETCH_COINS_SUCCESS = "FETCH_COINS_SUCCESS";
export function fetchCoinsSuccess(data) {
  return {
    type: FETCH_COINS_SUCCESS,
    payload: data
  };
}

export const FETCH_COINS_ERROR = "FETCH_COINS_ERROR";
export function fetchCoinsError(err) {
  return {
    type: FETCH_COINS_ERROR,
    payload: err
  };
}

export const CHOOSE_SOURCE_COIN = "CHOOSE_SOURCE_COIN";
export function chooseSourceCoin(coin) {
  return function action(dispatch) {
    return {
      type: CHOOSE_SOURCE_COIN,
      payload: coin
    };
  };
}

export const FETCH_COIN_CP_RATES = "FETCH_COIN_CP_RATES";
export function fetchCP(source_coin) {
  return function action(dispatch) {
    const request = axios({
      method: "get",
      url: `${ROOT_URL}/coins/cp/list/` + source_coin,
      headers: []
    });

    request
      .then(response => {        
        dispatch(fetchCoinCPSuccess(response));
      })
      .catch(err => {
        dispatch(
          fetchCoinCPError(
            "Error while fetching supported coins list from server!"
          )
        );
      });

    return {
      type: FETCH_COIN_CP_RATES,
      payload: request
    };
  };
}

export const FETCH_COINS_CP_SUCCESS = "FETCH_COINS_CP_SUCCESS";
export function fetchCoinCPSuccess(data) {
  return {
    type: FETCH_COINS_CP_SUCCESS,
    payload: data
  };
}

export const FETCH_COINS_CP_ERROR = "FETCH_COINS_CP_ERROR";
export function fetchCoinCPError(err) {
  return {
    type: FETCH_COINS_CP_ERROR,
    payload: err
  };
}
