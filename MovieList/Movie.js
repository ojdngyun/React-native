import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Movie extends Component {
  //extract movie object passed as a prop from row component
  render({ movie } = this.props) {
    // extract values from movie object
    const {title, rating, large, plot } = movie;
    return (
      <View style={styles.container}>
        {/* background image with lage image */}
        <Image source={{uri: large}} style={styles.imageBackground}>
          {/* use scrollView in case plot is too large to fit on the screen */}
          <ScrollView style={{flex: 1}}>
            {/* title */}
            <Text style={[styles.text, styles.title]}>{title.toUpperCase()}</Text>
            {/* rating */}
            <View style={styles.rating}>
              {/* icon */}
              <Image
                source={{uri: 'https://staticv2.rottentomatoes.com/static/images/icons/cf-lg.png'}}
                style={styles.icon}/>
              {/* value */}
              <Text style={[styles.text, styles.value]}>{rating}%</Text>
            </View>
            {/* plot */}
            <View style={styles.plot}>
              <Text style={styles.plotText}>{plot}</Text>
            </View>
          </ScrollView>
          {/* button container */}
          <View style={styles.buttonContainer}>
            {/* press handler */}
            <TouchableOpacity
              // go to previous screen
              onPress={() => {this.props.navigator.pop();}}
              // dim button a little bit when pressed
              activeOpacity={0.7}
              // pass button style
              style={styles.button}>
                <Text style={styles.buttonText}>CLOSE</Text>
              </TouchableOpacity>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // main container
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  // background image
  imageBackground: {
    flex: 1,
    padding: 20,
  },
  text: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    // text SHADOWS
    textShadowColor: '#222',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
  },
  title: {
    fontSize: 22,
    marginTop: 30,
    marginBottom: 5,
    textAlign: 'center',
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 5,
  },
  value: {
    fontSize: 16,
  },
  plot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    marginTop: 40,
    padding: 15,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#617D8A',
    padding: 15,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
