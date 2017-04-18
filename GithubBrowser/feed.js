import React, { Component } from 'react';
import {
 StyleSheet,
 Text,
 View,
 Image,
 TouchableHighlight,
 TouchableOpacity,
 ListView,
} from 'react-native';

export default class Feed extends Component {
  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(['A', 'B', 'C']),
    };
  }

  renderRow(rowData) {
    return <Text style={styles.row}>
      {rowData}
    </Text>;
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  row: {
    color: '#333',
  },
});
