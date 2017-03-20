import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import Option from './Option';

const { width } = Dimensions.get('window');
const optionWidth = (width / 3) - 10;

export default class Options extends Component {
  static propTypes = {
    // set of vlaues to choose from
    values: PropTypes.array.isRequired,
    // chosen value index
    chosen: PropTypes.number,
    // gets called when user chooses a value
    onChoose: PropTypes.func.isRequired,
  }

  render() {
    const { values, chosen, onChoose } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          ref={(scrollView) => { this._scrollView = scrollView; }}
          // horizontal scrolling
          horizontal={true}
          // decelerate fast after user lifts their finger
          decelerateRate={0.1}
          // hide all scroll indicators
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // do not adjust content automatically
          automaticallyAdjustContentInsets={false}
          // snap interval to stop at option edges
          snapToInterval={optionWidth}
          style={styles.options}>
            {values.map((value, index) =>
            <View style={{ width: optionWidth }} key={index}>
              <Option
                value={value}
                isChosen={index === chosen}
                onChoose={() => {
                  onChoose(index);
                }}/>
            </View>)}
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  options: {
    flexDirection: 'row',
    marginRight: -10
  },
});
