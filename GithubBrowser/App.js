import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

import Login from './Login';
import AppContainer from './AppContainer';
import AuthService from './AuthService';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      checkingAuth: true,
    };
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    console.log('checking login status');
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null,
      });
      console.log((authInfo != null) ? 'logged in' : 'not logged in');
      console.log(err);
      if (err == null && authInfo == null) {
        console.log('empty callback');
      }
    });
  }

  onLogin() {
    console.log('inside onlogin');
    this.setState({
      isLoggedIn: true,
    });
  }

  render() {
    if (this.state.checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating
            size="large"
            style={styles.loader}
          />
        </View>
      );
    }

    if (this.state.isLoggedIn) {
      console.log('showing logged in');
      return (
        // <Text>Hi there! </Text>
        <AppContainer />
      );
    } else {
      console.log('showing login page');
      return (
        <Login onLogin={this.onLogin} />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
