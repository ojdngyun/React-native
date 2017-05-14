import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    Picker,
    Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {employeeUpdate} from '../actions';
import {
    CardSection,
    Input
} from './common';

const {width} = Dimensions.get('window');

class EmployeeForm extends Component {
    render() {
        return (
            <View>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="Jane"
                        value={this.props.name}
                        onChangeText={value => this.props.employeeUpdate({prop: 'name', value})}
                    />
                    <Text></Text>
                </CardSection>

                <CardSection>
                    <Input
                        keyboardType="numeric"
                        label="Phone"
                        placeholder="555-555-5555"
                        value={this.props.phone}
                        onChangeText={value => this.props.employeeUpdate({prop: 'phone', value})}
                    />
                </CardSection>

                <CardSection style={{flexDirection: 'column'}}>
                    <Text style={styles.pickerTextStyle}>Shift</Text>
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={this.props.shift}
                        onValueChange={value => this.props.employeeUpdate({prop: 'shift', value})}
                    >
                        <Picker.Item label="Monday" value="Monday"/>
                        <Picker.Item label="Tuesday" value="Tuesday"/>
                        <Picker.Item label="Wednesday" value="Wednesday"/>
                        <Picker.Item label="Thursday" value="Thursday"/>
                        <Picker.Item label="Friday" value="Friday"/>
                        <Picker.Item label="Saturday" value="Saturday"/>
                        <Picker.Item label="Sunday" value="Sunday"/>
                    </Picker>
                </CardSection>
            </View>
        );
    }
}

EmployeeForm.propTypes = {
    name: PropTypes.string,
    phone: PropTypes.string,
    shift: PropTypes.string,
};

const styles = {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20
    },
    pickerStyle: {
        width: width * 0.9,
        justifyContent: 'center'
    }
};

const mapStateToProps = (state) => {
    const {name, phone, shift} = state.employeeForm;

    return {name, phone, shift};
};

export default connect(mapStateToProps, {employeeUpdate})(EmployeeForm);