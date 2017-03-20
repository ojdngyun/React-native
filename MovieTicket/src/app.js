import React, { Component } from 'react';
import {
  Navigator,
} from 'react-native';
import Movies from './Movies';
import Confirmation from './Confirmation';

const RouteMapper = (route, navigator) => {
  if (route.name === 'movies') {
    return <Movies navigator={navigator} />;
  } else if (route.name === 'confirmation') {
    return <Confirmation code={route.code} navigator={navigator}/>;
  }
};

export default class App extends Component {
  render() {
    return (
      <Navigator
      // default to movies route
      initialRoute={{name: 'movies'}}
      // use FloatFromBottom transition between screens
      configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
      // pass a route mapper functions
      renderScene={RouteMapper}
      />
    );
  }
}
