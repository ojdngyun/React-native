import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  Platform,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// get screen dimensions
const { width, height } = Dimensions.get('window');

export default class Messages extends Component {
  // define prop types
  static propTypes = {
    // pass messages to show as children
    children: PropTypes.any,
    // whether the window is open or not
    isOpen: PropTypes.bool,
    // header that shows up on top of the screen when opened
    header: PropTypes.string,
    // header height
    headerHeight: PropTypes.number,
    // heaght of the visible teaser are at the botto of the screen
    teaserHeight: PropTypes.number,
  };

  // set default prop values
  static defaultProps = {
    isOpen: false,
    header: 'Messages',
    headerHeight: 70,
    teaserHeight: 75,
  };

  // define state
  state = {
    // whether it's open or not
    open: false,
    // whether the window is being pulled up/down or not
    pulling: false,
    // zero means user hasn't scrolled the content yet
    scrollOffset: 0,
  };

  // animation configuration
  config = {
    // window position
    position: {
      // maximum possible value - bottom edge of the screen
      max: height,
      // starting value - teaserHeight higher than the bottom of the screen
      start: height - this.props.teaserHeight,
      // end value - header height lower than the top of the screen
      end: this.props.headerHeight,
      // minimum possible value - a bit lower than the top of the screen
      min: this.props.headerHeight,
      // when animation is triggered, these value updates
      animates: [
        () => this._animatedOpacity,
        () => this._animatedWidth
      ]
    },

    // window width
    width: {
      end: width,         // takes full with once opened
      start: width - 20,  // slightly narrower than the screen when closed
    },

    // window backdrop opacity
    opacity: {
      start: 0,       // fully transparent when closed
      end: 1,         // not transparent once opened
    },
  };

  // pan responder to handle gestures
  _panResponder = {};

  // animate backdrop opacity
  _animatedOpacity = new Animated.Value(this.config.opacity.start);

  // animate window width
  _animatedWidth = new Animated.Value(this.config.width.start);

  // animate window position
  _animatedPosition = new Animated.Value(this.props.isOpen
  ? this.config.position.end
  : this.config.position.start);

  componentWillMount() {
    // set current position
    this._currentPosition = this._animatedPosition._value;
    // listen for this._animatedPosition changes
    this._animatedPosition.addListener((value) => {
      // update _current position
      this._currentPosition = value.value;
      // animate depending on values
      this.config.position.animates.map(item => {
        item().setValue(value.value);
      })
    });
    // reset value once listener is registered to update depending animations
    this._animatedPosition.setValue(this._animatedPosition._value);
    // initialize PanResponder to handle gestures
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._grantpanResponder,
      onStartShouldSetPanResponderCapture: this._grantPanResponder,
      onMoveShouldSetPanResponder: this._grantPanResponder,
      onMoveshouldSetPanResponderCapture: this._grantPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });
  }

  // handle isOpen prop changes to either open or close the window
  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      // isOPen prop changed to true from false
      this.open();
    } else if (this.props.isOpen && !nextProps.isOpen) {
      // isOpen prop has changed to false from true
      this.close();
    }
  }

  render() {
    const { children, header } = this.props,
    // interpolate position value into opacity value
    // this will change the opacity of the overlay on the background
    // as the window moves across the screen
    animatedOpacity = this._animatedOpacity.interpolate({
      inputRange: [this.config.position.end, this.config.position.start],
      outputRange: [this.config.opacity.end, this.config.opacity.start],
    }),
    // interpolate position value into width
    // changes the width of the window from slightly smaller than the screen
    // to full width when the window is fully open
    animatedWidth = this._animatedWidth.interpolate({
      inputRange: [this.config.position.min,  // top of the screen
        this.config.position.start - 50,      // 50 pixels higher than the next point
        this.config.position.start,           // a bit higher than the bottom of the screen
        this.config.position.max              // bottom of the screen
      ],
      outputRange: [this.config.width.end,    // keep max width after next point
        this.config.width.end,                // end: max width at 50 pixel higher
        this.config.width.start,              // start: min width at the bottom
        this.config.width.start               // keep min width before previous point
      ],
    });
    return (
      <Animated.View style={[styles.container, this.getContainerStyle()]}>
        {/* use light status coz of dark background */}
        <StatusBar barStyle={"light-content"} />
        {/* backdrop with animated opacity */}
        <Animated.View style={[styles.backdrop, { opacity: animatedOpacity }]}>
          {/* ...........................tappable header */}
          <TouchableWithoutFeedback onPress={this.close}>
            <View style={[styles.header, this.getHeaderStyle()]}>
              {/* icon */}
              <View style={styles.headerIcon}>
                <Icon name="md-arrow-up" size={24} color="white"/>
                {/* header */}
                <View style={styles.headerTitle}>
                  <Text style={styles.headerText}>{header}</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
        {/* ......................content container */}
        <Animated.View
          style={[styles.content, {
            // add padding at the bottom to fit all content on the screen
            paddingBottom: this.props.headerHeight,
            // animate width
            width: animatedWidth,
            // animate position on the screen
            transform: [{ translateY: this._animatedPosition }, { translateX: 0 }]
          }]}
          // .....................adding panResponder handler to handle gestures
          {...this._panResponder.panHandlers}>
            {/* put all content in a scrollable container */}
            <ScrollView
              ref={(scrollView) => { this._scrollView = scrollView; }}
              // enable scrolling only when the window is open
              scrollEnabled={this.state.open}
              // hide all side scroll indicator

              // showsHorizontalScrollIndicator={false}
              // showsVerticalScrollIndicator={false}

              // trigger onScroll often
              scrollEventThrottle={16}
              onScroll={this._handleScroll}>
                {/* render children */}
                {children}
              </ScrollView>
          </Animated.View>
      </Animated.View>
    );
  }

  // either allow or deny gesture handler
  _grantPanResponder = (evt, gestureState) => {
    if (!this.state.open) {
      // allow if is not open
      return true;
    } else if (this.pulledDown(gestureState) && this.state.scrollOffset <= 0) {
      // allow if user haven't scrolled the content yet
      return true;
    } else if (this.pulledDown(gestureState) && this.pulledFast(gestureState)) {
      // allow if pulled down rapidly
      return true;
    } else {
      // deny otherwise
      return false;
    }
  };

  // called when gesture is allowed to be handled
  _handlePanResponderGrant = (evt, gesture) => {
    // update the state so we know we're in the middle of pulling it
    this.setState({ pulling: true});
    // set offset and initialize with 0 so we update it
    // with relative values from gesture handler
    this._animatedPosition.setOffset(this._currentPosition);
    this._animatedPosition.setValue(0);
  };

  // called during the gesture
  _handlePanResponderMove = (evt, gestureState) => {
    // update position unless we go outside of allowed range
    if (this.insideAllowedRange()) {
      this._animatedPosition.setValue(gestureState.dy);
    }
  };

  // called at the end of the gesture
  _handlePanResponderEnd = (evt, gestureState) => {
    // reset offset
    this._animatedPosition.flattenOffset();
    // reset pulling state
    this.setState({ pulling: false });
    if (this.pulledDown(gestureState) && this.pulledFar(gestureState)) {
      // pulled down far enough to trigger a close
      return this.close();
    } else if (this.pulledUp(gestureState) && this.pulledFar(gestureState)) {
      // pulled up far enough to trigger open
      return this.open();
    } else if (this.tapped(gestureState)) {
      // toggle if tapped
      return this.toggle();
    } else {
      // restore back to appropriate position otherwise
      this.restore();
    }
  };

  // handle content scrolling
  _handleScroll = event => {
    const { y } = event.nativeEvent.contentOffset;
    this.setState({ scrollOffset: y });
  };

  // check if gesture was a tap
  tapped = (gestureState) => gestureState.dx === 0 && gestureState.dy === 0;

  // check if pulled up
  pulledUp = (gestureState) => gestureState.dy < 0;

  // check if pulled down
  pulledDown = (gestureState) => gestureState.dy > 0;

  // check if pulled rapidly
  pulledFast = (gestureState) => Math.abs(gestureState.vy) > 0.75;

  // check if pulled far
  pulledFar = (gestureState) => Math.abs(gestureState.dy) > 50;

  // check if current position is inside allowed range
  insideAllowedRange = () =>
    this._currentPosition >= this.config.position.min
    && this._currentPosition <= this.config.position.max;

  // open up the window on full screen
  open = () => {
    this.setState({ open: true }, () => {
      Animated.timing(this._animatedPosition, {
        toValue: this.config.position.end,
        duration: 400,
      }).start();
    });
  };

  // minimize window and keep a teaser at the bottom
  close = () => {
    this._scrollView.scrollTo({ y: 0});
    Animated.timing(this._animatedPosition, {
      toValue: this.config.position.start,
      duration: 400,
    }).start(() => this.setState({
      open: false,
    }));
  };

  // toggle window state between opened and closed
  toggle = () => {
    if (!this.state.open) {
      this.open();
    } else {
      this.close();
    }
  };

  // either open or close depending on the state
  restore = () => {
    if (this.state.open) {
      this.open();
    } else {
      this.close();
    }
  }

  // get header style
  getHeaderStyle = () => ({
    height: Platform.os === 'ios'
    ? this.props.headerHeight
    : this.props.headerHeight - 40, // component for the status bar
  });

  // get container style
  getContainerStyle = () => ({
    // move the view below others if not open or moving
    // to not block gesture handlers on other views
    zIndex: this.state.pulling || this.state.open ? 1 : -1,
  });
}

const styles = StyleSheet.create({
  // main container
  container: {
    ...StyleSheet.absoluteFillObject,     // fill up all screen
    alignItems: 'center',                 // center children
    justifyContent: 'flex-end',           // align popup at the bottom
    backgroundColor: 'transparent',       // transparent background
  },
  // semi-transparent background below popup
  backdrop: {
    ...StyleSheet.absoluteFillObject,     // fill upll all screen
    alignItems: 'center',                 // center children
    justifyContent: 'flex-start',         // align popup at the bottom
    backgroundColor: 'black',
  },
  // body
  content: {
    backgroundColor: 'black',
    height: height,
  },
  // header
  header: {
    flexDirection: 'row',                 // arrange children in a row
    alignItems: 'center',                 // center vertically
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headerIcon: {
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
  },
  headerText: {
    color: 'white',
    fontFamily: 'Avenir',
    fontWeight: '600',
    fontSize: 16,
  },
});
