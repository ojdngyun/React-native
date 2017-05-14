import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import Communications from 'react-native-communications';
import {
    employeeUpdate,
    employeeEdit,
    employeeFormReset,
    employeeDelete
} from '../actions';
import EmployeeForm from './EmployeeForm';
import {Card, CardSection, Button, Confirm} from './common';

class EmployeeFormEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            invalidInput: false
        };
    }

    componentWillMount() {
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({prop, value});
        });
    }

    componentWillUnmount() {
        this.props.employeeFormReset();
    }

    onSavePressed() {
        const {name, phone, shift} = this.props;

        if (name && phone) {
            this.setState({invalidInput: false});
            this.props.employeeEdit({name, phone, shift, uid: this.props.employee.uid});
        } else {
            this.setState({invalidInput: true});
        }
    }

    onTextPressed() {
        const {phone, shift} = this.props;

        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }

    onAccept() {
        const {uid} = this.props.employee;
        this.props.employeeDelete({uid});
        this.setState({showModal: !this.state.showModal});
    }

    onDecline() {
        this.setState({showModal: !this.state.showModal});
    }

    renderErrorText() {
        if (this.state.invalidInput) {
            return (
                <Text
                    style={styles.errorTextStyle}
                >Invalid Input</Text>
            );
        }
        return null;
    }

    render() {
        return (
            <Card>

                <EmployeeForm {...this.props}/>

                {this.renderErrorText()}

                <CardSection style={{borderBottomWidth: 0}}>
                    <Button onPress={this.onSavePressed.bind(this)}>
                        Save
                    </Button>
                </CardSection>

                <CardSection style={{borderBottomWidth: 0}}>
                    <Button onPress={this.onTextPressed.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>

                <CardSection style={{borderBottomWidth: 0}}>
                    <Button
                        onPress={() => this.setState({showModal: !this.state.showModal})}
                    >
                        Fire
                    </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to fire this employee?
                </Confirm>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        backgroundColor: 'transparent',
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

EmployeeFormEdit.defaultProps = {
    name: '',
    phone: '',
    shift: ''
};

EmployeeFormEdit.propTypes = {
    name: PropTypes.string,
    phone: PropTypes.string,
    shift: PropTypes.string,
    employee: PropTypes.shape({
        uid: PropTypes.string.isRequired
    }).isRequired
};

const mapStateToProps = (state) => {
    const {name, phone, shift} = state.employeeForm;

    return {name, phone, shift};
};

export default connect(mapStateToProps, {
    employeeUpdate,
    employeeEdit,
    employeeFormReset,
    employeeDelete
})(EmployeeFormEdit);