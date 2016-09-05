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

class Login extends Component{
  constructor(props){
    super(props);

    this.state = {
      showProgress: false
    }
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

      var bufferString = new buffer.Buffer(this.state.username + ':' + this.state.password);
      var encodedAuth1 = bufferString.toString('base64');

      fetch('https://api.github.com/user', {
        headers: {
          'Authorization' : 'Basic ' + encodedAuth1
        }
      })
      .then((response) => {
        if(response.status >= 200 && response.status < 300){
          return response;
        }
        throw {
          // console.log('error occured');
          badCredentials: response.status == 401,
          unknownError: response.status != 401
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        this.setState({success: true});
        console.log(results);
      })
      .catch((err) => {
        // console.log(err);
        this.setState(err);
      })
      .finally(() => {
        this.setState({showProgress: false});
      });
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
