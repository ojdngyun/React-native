import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import LoginForm from './components/LoginForm';

export default class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAePPCK1oC7va-LDyDGTV8CK5epJ4o3pqY',
      authDomain: 'fir-manager-8ef7d.firebaseapp.com',
      databaseURL: 'https://fir-manager-8ef7d.firebaseio.com',
      projectId: 'fir-manager-8ef7d',
      storageBucket: 'fir-manager-8ef7d.appspot.com',
      messagingSenderId: '20130822038',
    };
    firebase.initializeApp(config);
  }

  render() {
    // {}: currently an empty object -> pass in initial state to the application
    // applyMiddleware(ReduxThunk): store enhancer -> adds functionality
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
