import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './store/rootReducer';
import App from './App';

const log = createLogger({ diff: true, collapsed: true });
const middlewares = [thunk, log];
const enhancers = [];

const store = createStore(rootReducer, compose(applyMiddleware(...middlewares), ...enhancers));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
