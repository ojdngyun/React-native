import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    // color: '#007aff',
    color: 'rgb(245, 140, 11)',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#0000',
    borderRadius: 5,
    borderWidth: 1,
    // borderColor: '#007aff',
    borderColor: 'rgb(245, 140, 11)',
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button };
