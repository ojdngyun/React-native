import React from 'react';
import {Platform} from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeFormCreate from './components/EmployeeFormCreate';
import EmployeeFormEdit from './components/EmployeeFormEdit';

const RouterComponent = () => {
    return (
        <Router sceneStyle={getStyle()}>
            <Scene key="auth" initial>
                <Scene key="login" component={LoginForm} title="FirebaseManager"/>
            </Scene>

            <Scene key="main">
                <Scene
                    onRight={() => Actions.employeeCreate()}
                    rightTitle="Add"
                    key="employeeList"
                    component={EmployeeList}
                    title="Employees"
                    initial
                />
                <Scene
                    key="employeeCreate"
                    component={EmployeeFormCreate}
                    title="Add Employee"
                />
                <Scene
                    key="employeeEdit"
                    component={EmployeeFormEdit}
                    title="Edit Employee"
                />
            </Scene>
        </Router>
    );
};

const getStyle = () => {
    if (Platform.OS === 'ios') {
        return {paddingTop: 65};
    }
    return {paddingTop: 55};
};

export default RouterComponent;
