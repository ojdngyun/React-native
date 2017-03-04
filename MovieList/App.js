import React, {Component} from 'react';
import {
  Navigator,
  StatusBar,
  Text,
} from 'react-native';
import List from './List';
import Movie from './Movie';

const RouteMapper = (route, navigationOperations, onComponentRef) => {
  if (route.name === 'list') {
    return (
      <List navigator={navigationOperations}/>
    );
  } else if (route.name === 'movie'){
    return (
      <Movie
        // pass movie object passed with route down as a props
        movie={route.movie}
        // pass navigationOperations as navigator props
        navigator={navigationOperations}/>
    );
  }
};

export default class App extends Component {
  componentDidMount(){ // this method runs when the components have been rendered
    // hide the status bar
    StatusBar.setHidden(true);
  }

  render() {
    return (
      // handle navigation between screens
      <Navigator
        // default to list route
        initialRoute={{name: 'list'}}
        // use FloatFromBottom transition between screens
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
        // pass a route mapper functions
        renderScene={RouteMapper}/>
    );
  }
}
