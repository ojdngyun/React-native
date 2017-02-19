import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

var Login = require('./Login');
var AppContainer = require('./AppContainer');
var AuthService = require('./AuthService');

export default class GithubBrowser extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    }
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount(){
    console.log('checking login status')
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      });
      console.log((authInfo != null) ? 'logged in' : 'not logged in');
      console.log(err);
      if(err == null && authInfo == null){
        console.log('empty callback');
      }
    });
  }

  render() {
    if(this.state.checkingAuth){
      return(
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loader}/>
        </View>
      )
    }
    if(this.state.isLoggedIn) {
      return (
        <AppContainer/>
      );
      console.log('showing loggedIn');
    } else {
      console.log('showing login page');
      return (
        <Login onLogin={this.onLogin}/>
      );
    }
  }

  onLogin() {
    console.log('inside onLogin');
    this.setState({
      isLoggedIn: true
    });
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

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
