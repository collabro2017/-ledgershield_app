import { WEBSOCKET_URL } from "./../constants/app";
import { fetchTransactionSuccess } from './transactionActions'

export const CONNECT_SOCKET = "CONNECT_SOCKET";
export const connect_socket = txid => {
  return dispatch => {
    const socket_url = `${WEBSOCKET_URL}/tx/${txid}`;
    const socket = new WebSocket(socket_url);

    socket.onopen = e => {
      dispatch(socket_onopen(e));
    };

    socket.onmessage = e => {
      try {
        const data = JSON.parse(e.data);
        dispatch(fetchTransactionSuccess(data));
      } catch (err) {
          console.log(`${err}`)
      }
    };

    socket.onerror = e => {
      dispatch(connect_socket(txid));
    };

    socket.onclose = e => {
      dispatch(connect_socket(txid));
    };

    return {
      action: CONNECT_SOCKET,
      payload: socket
    };
  };
};

export const SOCKET_ON_OPEN = "SOCKET_OPEN";
export const socket_onopen = payload => {
  return {
    type: SOCKET_ON_OPEN,
    payload: payload
  };
};

export const SOCKET_ON_MESSAGE = "SOCKET_ON_MESSAGE";
export const socket_onmessage = payload => {
  return {
    type: SOCKET_ON_MESSAGE,
    payload: payload
  };
};

export const SOCKET_ON_CLOSE = "SOCKET_ON_CLOSE";
export const socket_onclose = payload => {
  return {
    type: SOCKET_ON_CLOSE,
    payload: payload
  };
};
export const SOCKET_ON_ERROR = "SOCKET_ON_ERROR";
export const socket_onerror = payload => {
  return {
    type: SOCKET_ON_ERROR,
    payload: payload
  };
};
