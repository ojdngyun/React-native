import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
// import data
import { characters } from './data';

export default class Map extends Component {
  state = {
    // show good or all characters flag
    showGoodOnly: true,
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Map*/}
        <MapView
          style={styles.map}
          // Position on Manhattan, New York
          initialRegion={{
            latitude: 40.77096,
            longitude: -73.97702,
            latitudeDelta: 0.0491,
            longitudeDelta: 0.0375,
          }}>
          {/* Loop through characters and add pins on the map */}
          {characters.map((character, index) =>
            // If showGoodOnly is true, but the character is bad - do not show it
            this.state.showGoodOnly && !character.good || <MapView.Marker
              coordinate={{
                latitude: character.coordinate[0],
                longitude: character.coordinate[1],
              }}
              // Greed color for good characters and red for others
              pinColor={character.good ? '#009688' : '#f44336'}
              key={index}/>
          )}
        </MapView>
        {/* Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            // Toggle this.state.showGoodOnly
            onPress={() => this.setState({
              showGoodOnly: !this.state.showGoodOnly
            })}>
            <Text>{this.state.showGoodOnly ? 'Show All' : 'Show Good Only'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // shorter version of
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 12,
    width: 160,
  },
});
