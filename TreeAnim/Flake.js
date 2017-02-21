import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
} from 'react-native';

// detect screen size
const {width, height} = Dimensions.get('window');

export default class Flake extends Component {

  // angle of falling flakes
  angle = 0;

  componentWillMount(){
    // Pull x and y out of props
    const { x, y } = this.props;
    // Initialize animated. valueXY with passed x and y coordinates for animation
    this.setState({
      position: new Animated.ValueXY({ x, y })
    });
  }

  getStyle = ({radius, x, y} = this.props) => ({
    position: 'absolute',
    borderRadius: radius,
  })

  getFlakeColor = () => ({
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  })

  getImageStyle = ({radius, x, y} = this.props) => ({
    width: radius * 5,
    height: radius * 5
  })

  componentDidMount(){
    this.animate();
  }

  animate = () => {
    // animation duration
    let duration = 500;
    // pull x and y out of animated. valueXY in this.state.position
    const { x: { _value: x }, y: { _value: y } } = this.state.position;
    // pull radius and density out of props
    const { radius, density } = this.props;

    this.angle += 0.02;

    let newX = x + Math.sin(this.angle) * 10;
    let newY = y + Math.cos(this.angle + density) + 10 + radius / 2;

    // send flakes back from the top once they exit the screen
    if( x > width + radius * 2 || x < -(radius * 2) || y > height){
      duration = 0;                 // no animation
      newX = Math.random() * width;  // random x
      newY = -10;                   // above the screen top

      // send 2/3 of flakes back to the top
      if( Math.floor(Math.random() * 3) + 1 > 1 ){
        newX = Math.random() * width;
        newY = -10;
      } else { // send the rest to either left or right
        // if the flake is exiting from the right
        if( Math.sin(this.angle) > 0){
          // enter from the left
          newX = -5;
          newY = Math.random() * height;
        } else {
          // enter from the right
          newX = width + 5;
          newY = Math.random() * height;
        }
      }
    }

    // Animate the movement
    Animated.timing(this.state.position, {
      duration,
      easing: Easing.linear,
      toValue: {
        x: newX,
        y: newY,
      }
    }).start(() => {
      // Animate again after the current animation finished
      this.animate();
    });
  }

  render(){
    return <Animated.View style={[this.getStyle(),
      // this.getFlakeColor(), 
      this.getImageStyle(),
      this.state.position.getLayout()]} >
      <Image
        style={this.getImageStyle()}
        source={require('./Octocat.png')}/>
    </Animated.View>;
  }
}
