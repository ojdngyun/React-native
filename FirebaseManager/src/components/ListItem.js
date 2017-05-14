import React, {Component, PropTypes} from 'react';
import {
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {CardSection} from './common';

class ListItem extends Component {
    onRowPressed() {
        Actions.employeeEdit({employee: this.props.employee});
    }

    render() {
        const {name} = this.props.employee;
        return (
            <TouchableHighlight
                underlayColor={'#EEEEEE'}
                onPress={this.onRowPressed.bind(this)}
            >
                <View>
                    <CardSection>
                        <Text>
                            {name}
                        </Text>
                    </CardSection>
                </View>
            </TouchableHighlight>
        );
    }
}

ListItem.propTypes = {
    employee: PropTypes.shape({
        name: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired
    }).isRequired
};

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

export default ListItem;