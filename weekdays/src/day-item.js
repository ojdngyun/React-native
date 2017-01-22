// Imports
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Create the Component
var DayItem = React.createClass({
  render: function(){
    return <Text style={this.style()}>
      {this.props.day}
    </Text>
  },
  style: function(){
    return {
      color: this.color(),
      fontWeight: this.fontWeight(),
      fontSize: this.fontSize(),
      lineHeight: this.lineHeight()
    }
  },
  color: function(){
    var opacity = 1 / (this.props.daysUntil + 1);
    return 'rgba(0, 125, 125, '+ opacity +')';
  },
  fontWeight: function(){
    return ''+(7 - this.props.daysUntil) * 100+'';

  },
  fontSize: function(){
    return 60 - 6 * this.props.daysUntil;
  },
  lineHeight: function(){
    return 70 - 4 * this.props.daysUntil;
  }
});

// Style our Component
// var styles = StyleSheet.create({
//   day: {
//     fontSize: 18,
//     color: '#0000FF'
//   }
// });

// Make this code available else where
module.exports = DayItem;
