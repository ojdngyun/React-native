import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Dimensions from 'Dimensions';

//detect screen size to calculate row height
const screen = Dimensions.get('window');

export default class Row extends Component {
  //extract movie and onPress props passed from List component
  render({ movie, onPress } = this.props) {
    // extract values from movie object
    const { title, rating, image } = movie;
    return (
      // Row press handler
      <TouchableOpacity
        // Pass row style
        style={styles.row}
        // Call onPress function passed from List component when pressed
        onPress={onPress}
        // Dim row a little bit when pressed
        activeOpacity={0.7}>
        {/* Background image */}
        <Image source={{uri: image}} style={styles.imageBackground}>
          {/* Title */}
          <Text style={[styles.text, styles.title]}>{title.toUpperCase()}</Text>
          {/* Rating */}
          <View style={styles.rating}>
            {/* Icon */}
            <Image
              source={{uri: 'https://staticv2.rottentomatoes.com/static/images/icons/cf-lg.png'}}
              style={styles.icon}/>
            {/* Value */}
            <Text style={[styles.text, styles.value]}>{rating}%</Text>
          </View>
        </Image>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  // row
  row: {
    paddingBottom: 4,
  },
  // background image
  imageBackground: {
    height: screen.height / 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // shared text style
  text: {
    color: '#fff',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    // text shadow
    textShadowColor: '#222',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
  },
  // movie title
  title: {
    fontSize: 22,
  },
  // rating row
  rating: {
    flexDirection: 'row',
  },
  // certified fresh icon
  icon: {
    width: 22,
    height: 22,
    marginRight: 5,
  },
  // rating value
  value: {
    fontSize: 16,
  },
});
