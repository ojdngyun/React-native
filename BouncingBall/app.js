import React, { Component } from 'react';
import {
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import Animation from 'lottie-react-native';

// get screen Dimensions
const { width, height } = Dimensions.get('window');

export default class App extends Component {
  state = {
    // used by animation component to run animation
    progress: new Animated.Value(0),
  };

  componentDidMount() {
    // wait for 1 second before stating animation
    setTimeout(this.animate, 1000);
  }

  animate = () => {
    Animated.timing(this.state.progress, {
      // change from 0 to 1 to turn animation
      toValue: 1,
      // animation duration
      duration: 5000, // higher the value slower the animation and vice versa
      // linear easing
      easing: Easing.linear,
    }).start(() => {
      // reset progress to zero after animation is done
      this.state.progress.setValue(0);
      // animate again
      this.animate();
    });
  }

  render() {
    return (
      <Animation
        style={{
          // black background
          backgroundColor: '#000',
          width: width,
          height: height,
        }}
        // load animation from json file
        source={require('./ball.json')}
        // animate json file
        progress={this.state.progress}/>
    );
  }
}
