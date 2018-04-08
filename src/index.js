import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

// import logger from "redux-logger";
import thunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './assets/index.css';
import AppRoutes from './routes';
import rootReducer from './reducers';
import history from './utils/history';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
    rootReducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
      <Router history={history}>
          <AppRoutes />
      </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
