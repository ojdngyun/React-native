'use strict';

import React, { Component } from 'react';
import {
 AppRegistry,
 StyleSheet,
 Text,
 View,
 Image,
 TextInput,
 TouchableHighlight,
 ActivityIndicator,
 TouchableOpacity,
 TouchableNativeFeedback
} from 'react-native';

var ScrollableTabView = require('react-native-scrollable-tab-view');
var DefaultTab = require('./DefaultTab');

class AppContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'feed'
    }

    this.onPress = this.onPress.bind(this);
  }

  render(){
    return (
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>
      //   </Text>
      // </View>
      <ScrollableTabView
        style={styles.container}
        renderTabBar={() => <DefaultTab />}
        ref={(tabView) => {this.tabView = tabView;}}>
        <Text tabLabel='Tab #1'
          style={styles.text}>page one</Text>
        <Text tabLabel='Tab #2'
          style={styles.text}>page two</Text>
        <Text tabLabel='Tab #3'
          style={styles.text}>page three</Text>
        <TouchableNativeFeedback tabLabel='Button'
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={this.onPress(0)}>
          <View
            style={{width: 150, height: 100, backgroundColor: 'gray'}}>
            <Image style={{height: 50, width: 50}}
              source={require('./Octocat.png')}/>
          </View>
        </TouchableNativeFeedback>
        <TouchableOpacity tabLabel='Back' onPress={() => this.tabView.goToPage(0)}>
          <Image style={{height: 50, width: 50}}
            source={require('./Octocat.png')}/>
        </TouchableOpacity>
      </ScrollableTabView>
    );
  }

  onPress(value){
    console.log(value);
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
  page: {
    flex: 0.1,
    flexDirection: 'column',
    backgroundColor: 'red'
  },
  text: {
    flex: 1,
    fontSize: 25,
    color: 'red',
    backgroundColor: 'black'
  }
});

module.exports = AppContainer;
