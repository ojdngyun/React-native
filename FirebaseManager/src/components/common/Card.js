import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    // <View style={styles.containerStyle}>
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const getStyle = (props) => {
  if (props.style) {
    return props.style;
  }

  return styles.containerStyle;
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  }
};

export { Card };
