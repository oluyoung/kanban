import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage';
import firebase from 'firebase';
import "firebase/firestore";
import rootReducer from './store/rootReducer';
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyArMVNWhoG9LhcjU_UvUTFo0r-0XGVlXDk",
  authDomain: "six-task.firebaseapp.com",
  databaseURL: "https://six-task.firebaseio.com",
  projectId: "six-task",
  storageBucket: "six-task.appspot.com",
  messagingSenderId: "28885894950",
  appId: "1:28885894950:web:e30d98fcfbcf96ba8323e7",
  measurementId: "G-QJLXFXG8JZ"
};

firebase.initializeApp(firebaseConfig);

const log = createLogger({ diff: true, collapsed: true });
const middlewares = [thunk, log];
const enhancers = [];

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, compose(applyMiddleware(...middlewares), ...enhancers));

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
