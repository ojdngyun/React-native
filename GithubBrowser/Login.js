'use strict';

import React, { Component } from 'react';
import {
 AppRegistry,
 StyleSheet,
 Text,
 View,
 Image,
 TextInput,
 Dimensions,
 TouchableHighlight,
 ActivityIndicator
} from 'react-native';

var buffer = require('./buffer');

var width = Dimensions.get('window').width;

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      showProgress: false,
      success: false
    }
  }

  render(){
    var errorControl = <View/>;
    var message = null;
    if(!this.state.success){
      if(this.state.badCredentials){
        message = 'That username and password combination did not work!';
      } else if(this.state.unknowError){
        message = 'Oops! Something went wrong!';
      } else if(this.state.nothingWasInput){
        message = 'Empty input!';
      }
    }
    errorControl = <Text style={styles.error}>
      {message}
    </Text>;

    return (
      <View style={styles.container}>
        <Image style={styles.logo}
          source={require('./Octocat.png')}/>
        <Text style={styles.heading}>
          Github Browser
        </Text>
        <TextInput
          onChangeText = {(textInput) => this.setState({username: textInput})}
          style={styles.input}
          placeholder = "Username"/>
        <TextInput
          onChangeText = {(passwordInput) => this.setState({password: passwordInput})}
          style={styles.input}
          placeholder = "Password"
          secureTextEntry = {true}/>
        <TouchableHighlight
          onPress={this.onLoginPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableHighlight>

        {errorControl}

        <ActivityIndicator
          style = {[styles.loader, {opacity: this.state.showProgress ? 1.0 : 0.0}]}
          color= "red"
          size="large"/>
      </View>
    );
  }

  onLoginPressed(){
    this.setState({
      nothingWasInput: false,
      badCredentials: false,
      unknownError: false,
      success: false
    })

    if (this.state.username == null || this.state.password == null || this.state.username == '' || this.state.password == ''){
      this.setState({nothingWasInput: true});
      return;
      // console.log('Attempting to log in: ' + this.state.username + ' ' + this.state.password);
    }
    this.setState({showProgress: true});

    var authService = require('./AuthService');
    authService.login({
      username: this.state.username,
      password: this.state.password
    }, (results) => {
      this.setState(Object.assign({
        showProgress: false
      }, results));

      if(results.success && this.props.onLogin){
        this.props.onLogin();
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width: 80,
    height: 66,
    marginTop: 10
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    // width: width * 0.8,
    alignSelf: 'stretch',
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec',
    borderRadius: 3
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 3
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF'
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red'
  }
});

module.exports = Login;
