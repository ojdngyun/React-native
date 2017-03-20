import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  LayoutAnimation,
  PanResponder,
  TouchableHighlight,
} from 'react-native';
import { defaultStyles } from './styles';
import Options from './Options';

// get screen dimensions
const { width, height } = Dimensions.get('window');
// set default popup height to 67% of screen height
const defaultHeight = height * 0.67;

export default class MoviePopup extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    // movie object that has title, genre, poster, days and times
    movie: PropTypes.object,
    // index of chosen day
    chosenDay: PropTypes.number,
    // index of chosen show time
    chosenTime: PropTypes.number,
    // gets called when user chooses a day
    onChooseDay: PropTypes.func,
    // gets called when user chooses a time
    onChooseTime: PropTypes.func,
    // gets called when user books their ticket
    onBook: PropTypes.func,
    // gets called when popup is closed
    onClose: PropTypes.func,
  }

  state = {
    // animates the height of the popup
    position: new Animated.Value(this.props.isOpen ? 0 : height),
    // backdrop opacity
    opacity: new Animated.Value(0),
    // popup height that can be changed by pulling it up or down
    height: defaultHeight,
    // expanded mode with bigger poster flag
    expanded: false,
    // visibility of flag
    visibility: this.props.isOpen,
   };

   // when user starts pulling the popup previous height gets store here
   // to help calculate new height value during and after pulling
   _previousHeight = 0

   componentWillMount() {
     // initialize PanResponder to handle move gestures
     this._panResponder = PanResponder.create({
       onStartShouldSetPanResponder: (evt, gestureState) => true,
       onMoveShouldSetPanResponder: (evt, gestureState) => {
         const { dx, dy } = gestureState;
         // ignore taps
         if (dx !== 0 && dy ===0) {
           return true;
         }
         return false;
       },
       onPanResponderGrant: (evt, gestureState) => {
         // store previous height before user changed it
         this._previousHeight = this.state.height;
       },
       onPanResponderMove: (evt, gestureState) => {
         // pull delta and velocity values for y axis from gestureState
         const { dy, vy } = gestureState;
         // subtract delta y from previous height to get new height
         let newHeight = this._previousHeight - dy;

         // animate height change so it looks smooth
         LayoutAnimation.easeInEaseOut();

         // switch to expanded mode if popup is pulled up above 80% height of screen
         if (newHeight > (height - (height / 5))) {
           this.setState({ expanded: true });
         } else {
           this.setState({ expanded: false });
         }

         if (vy < -0.75) { // expand to full height if pulled up rapidly
           this.setState({
             expanded: true,
             height: height
           });
         } else if (vy > 0.75) { // close if pulled down rapidly
           this.props.onClose();
         } else if (newHeight < (defaultHeight * 0.75)) { // close if pulled below 75% of default height
           this.props.onClose();
         } else if (newHeight > height) { // limit max height to screen height
           this.setState({ height: height });
         } else {
           this.setState({ height: newHeight });
         }
       },
       onPanResponderTerminationRequest: (evt, gestureState) => true,
       onPanResponderRelease: (evt, gestureState) => {
         const { dy } = gestureState;
         const newHeight = this._previousHeight - dy;

         // close if pulled below default height
         if (newHeight < defaultHeight) {
           this.props.onClose();
         }

         // update previous height
         this._previousHeight = this.state.height;
       },
       onShouldBlockNativeResponder: (evt, gestureState) => {
         // return whether this component should block native components from becoming the JS
         // responder. returns try by default. is currenlty only supported on android
         return true;
       },
     });
   }

   // handle isOpen changes to either open or close popup
   componentWillReceiveProps(nextProps) {
     // isOpen prop changed to true from false
     if (!this.props.isOpen && nextProps.isOpen) {
       this.animateOpen();
     }
     // isOpen prop changed to false from true
     else if (this.props.isOpen && !nextProps.isOpen) {
       this.animateClose();
     }
   }

   // open popup with animation
   animateOpen() {
     // update state first
     this.setState({ visible: true }, () => {
       Animated.parallel([
         // animate opacity
         Animated.timing(
           this.state.opacity, { toValue: 0.5 } // semi-transparent
         ),
         // slide up
         Animated.timing(
           this.state.position, { toValue: 0 } // top of the screen
         ),
       ]).start();
     });
   }

   // close popup with animation
   animateClose() {
     Animated.parallel([
       // animate opacity
       Animated.timing(
         this.state.opacity, { toValue: 0 } // transparent
       ),
       // slide down
       Animated.timing(
         this.state.position, { toValue: height } // bottom of the screen
       ),
     ]).start(() => this.setState({
       // reset to default values
       height: defaultHeight,
       expanded: false,
       visible: false,
     }));
   }

   // dynamic styles that depend on state
   getStyles = () => {
     return {
       imageContainer: this.state.expanded ? {
         width: width / 2,  // half of screen width
       } : {
         maxWidth: 110,     // limit width
         marginRight: 10,
       },
       movieContainer : this.state.expanded ? {
         flexDirection: 'column',   // arrange image and movie info in a column
         alignItems: 'center',      // and center them
       } : {
         flexDirection: 'row',      // arrange image and movie info ina row
       },
       movieInfo: this.state.expanded ? {
         flex: 0,
         alignItems: 'center',      // center horizontally
         paddingTop: 20,
       } : {
         flex: 1,
         justifyContent: 'center',  // center vertically
       },
       title: this.state.expanded ? {
         textAlign: 'center',
       } : {},
     };
   }

   render() {
     const {
       movie,
       chosenDay,
       chosenTime,
       onChooseDay,
       onChooseTime,
       onBook,
     } = this.props;
     // pull out movie data
     const { title, genre, poster, days, times } = movie || {};
     // render nothing if not visible
     if (!this.state.visible) {
       return null;
     }
     return (
       <View style={styles.container}>
         {/* closes popup if user taps on semi-transparent backdrop */}
         <TouchableWithoutFeedback onPress={this.props.onClose}>
           <Animated.View style={[styles.backdrop, { opacity: this.state.opacity}]}/>
         </TouchableWithoutFeedback>
         <Animated.View
           style={[styles.modal, {
             // animates height
             height: this.state.height,
             // animates position on the screen
             transform: [{ translateY: this.state.position }, { translateX: 0 }]
           }]}>

           {/* content */}
           <View style={styles.content}>
             {/* movie poster, title and genre */}
             <View
               style={[styles.movieContainer, this.getStyles().movieContainer]}
               {...this._panResponder.panHandlers}>

               {/* poster */}
               <View style={[styles.imageContainer, this.getStyles().imageContainer]}>
                 <Image source={{ uri: poster }} style={styles.image}/>
               </View>

               {/* title and genre */}
               <View style={[styles.movieInfo, this.getStyles().movieInfo]}>
                 <Text sytle={[styles.title, this.getStyles().title]}>{title}</Text>
                 <Text style={styles.genre}>{genre}</Text>
               </View>
             </View>

             {/* show times */}
             <View>
               {/* day */}
               <Text style={styles.sectionHeader}>Day</Text>
               <Options
                 values={days}
                 chosen={chosenDay}
                 onChoose={onChooseDay}/>
               {/* time */}
               <Text style={styles.sectionHeader}>Showtime</Text>
               <Options
                 values={times}
                 chosen={chosenTime}
                 onChoose={onChooseTime}/>
             </View>
           </View>

           {/* footer */}
           <View style={styles.footer}>
             <TouchableHighlight
               underlayColor="#9575CD"
               style={styles.buttonContainer}
               onPress={onBook}>
                 <Text style={styles.button}>Book My Tickets</Text>
               </TouchableHighlight>
           </View>
         </Animated.View>
       </View>
     )
   }
}

const styles = StyleSheet.create({
 // main container
 container: {
   ...StyleSheet.absoluteFillObject,    // fill up all screen
   justifyContent: 'flex-end',          // align popup at the bottom
   backgroundColor: 'transparent',      // transparent background
 },
 // semi-transparent background below popup
 backdrop: {
   ...StyleSheet.absoluteFillObject,    // fill up all screen
   backgroundColor: 'black',
 },
 // popup
 modal: {
   backgroundColor: 'white',
 },
 content: {
   flex: 1,
   marginTop: 40,
   marginRight: 20,
   marginLeft: 20,
   marginBottom: 0,
 },
 // movie container
 movieContainer: {
   flex: 1,
   marginBottom: 20,
 },
 imageContainer: {
   flex: 1,
 },
 image: {
   borderRadius: 10,
   ...StyleSheet.absoluteFillObject,
 },
 movieInfo: {
   backgroundColor: 'transparent',
 },
 title: {
   ...defaultStyles.text,
   fontSize: 20,
 },
 genre: {
   ...defaultStyles.text,
   color: '#BBBBBB',
   fontSize: 14,
 },
 sectionHeader: {
   ...defaultStyles.text,
   color: '#AAAAAA',
 },
 // footer
 footer: {
   padding: 20,
 },
 buttonContainer: {
   backgroundColor: '#673Ab7',
   borderRadius: 100,
   paddingVertical: 10,
   paddingHorizontal: 15,
   alignItems: 'center',
 },
 button: {
   ...defaultStyles.text,
   color: '#FFFFFF',
   fontSize: 18,
 },
});
