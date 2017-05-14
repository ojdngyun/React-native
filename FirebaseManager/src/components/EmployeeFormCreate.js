import React, {Component, PropTypes} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {
    employeeUpdate,
    employeeCreate,
    employeeFormReset
} from '../actions';
import {
    Card,
    CardSection,
    Button
} from './common';
import EmployeeForm from './EmployeeForm';


class EmployeeFormCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {invalidInput: false};
    }

    componentWillUnmount() {
        this.props.employeeFormReset();
    }

    onButtonPressed() {
        const {name, phone, shift} = this.props;

        if (name && phone) {
            this.setState({invalidInput: false});
            this.props.employeeCreate({name, phone, shift: shift || 'Monday'});
        } else {
            this.setState({invalidInput: true});
        }
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
                    <Button onPress={this.onButtonPressed.bind(this)}>
                        Create
                    </Button>
                </CardSection>
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

EmployeeFormCreate.defaultProps = {
    name: '',
    phone: '',
    shift: ''
};

EmployeeFormCreate.propTypes = {
    name: PropTypes.string,
    phone: PropTypes.string,
    shift: PropTypes.string
};

const mapStateToProps = (state) => {
    const {name, phone, shift} = state.employeeForm;

    return {name, phone, shift};
};

export default connect(mapStateToProps, {
    employeeUpdate,
    employeeCreate,
    employeeFormReset
})(EmployeeFormCreate);
