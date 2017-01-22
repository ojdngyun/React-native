// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
//
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// export default class weekdays extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//
// AppRegistry.registerComponent('weekdays', () => weekdays);


// Imports
import React, { Component } from 'react';
import Moment from 'moment';
import DayItem from './src/day-item';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Create a react Component
var Weekdays = React.createClass({
  render: function() {
    return <View style={styles.container}>
      {this.days()}
    </View>
  },
  days: function(){
    var daysItems = [];
     for(var i = 0; i < 7; i++){
       var dayOfWeek = Moment().add(i, 'days').format('dddd');
       daysItems.push(
         <DayItem day={dayOfWeek} daysUntil={i} />
       )
     }
     return daysItems
  }
});

// Style the React Component
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

// Show the react component on the screen
AppRegistry.registerComponent('weekdays', function(){
  return Weekdays;
});
