'use-strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

var buffer = require('./buffer');
var properties;

class Login extends Component{
  constructor(props){
    super(props);

    this.state = {
      showProgress: false,
    }
    properties = props;
  }

  render(){
    var errorCtrl = <View/>;

    if(!this.state.success && this.state.badCredentials){
      errorCtrl = <Text style = {styles.error}>
        That username and password combination did not work...
      </Text>;
    } else if(!this.state.success && this.state.unknownError){
      errorCtrl = <Text style = {styles.error}>
        We experienced an unexpected issue...
      </Text>
    }

    return (
        <View style={styles.container}>
          <Image style={styles.logo}
          source={require('./Octocat.png')}/>
          <Text style={styles.heading}>
            Github browser
          </Text>
          <TextInput
            onChangeText={(text)=> this.setState({username: text})}
            style={styles.input}
            placeholder="Github username"/>
          <TextInput
            onChangeText={(text)=> this.setState({password: text})}
            style={styles.input}
            placeholder="Github password"
            secureTextEntry={true}/>
          <TouchableHighlight
            onPress={this.onLoginPressed.bind(this)}
            style={styles.button}>
            <Text style={styles.buttonText}>
              Log in
            </Text>
          </TouchableHighlight>

          {errorCtrl}

          <ActivityIndicator
            style = {styles.loader}
            animating = {this.state.showProgress}
            size="large"/>
        </View>
    );
  }

  onLoginPressed(){
    if(this.state.username && this.state.password){
      console.log('Attempting to log in with username ' + this.state.username);
      this.setState({showProgress: true});

      var authService = require('./AuthService');
      authService.login({
        username: this.state.username,
        password: this.state.password
      }
      , function(results){
        this.setState(Object.assign({
          showProgress: false
        }, results));
        console.log(results);
        if(results.success && properties.onLogin){
          properties.onLogin();
        } else {
          console.log('loging fail');
        }
      }.bind(this)
    );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width: 100,
    height: 100
  },
  heading: {
    fontSize: 30,
    paddingTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec',
    alignSelf: 'stretch'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
});

module.exports = Login;
