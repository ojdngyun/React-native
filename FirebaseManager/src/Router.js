import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';

const RouterComponent = () => {
  return (
    <Router sceneStyle={getStyle()}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="FirebaseManager" initial />
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
        <Scene key="employeeCreate" component={EmployeeCreate} title="Add Employee" />
      </Scene>
    </Router>
  );
};

const getStyle = () => {
  if (Platform.OS === 'ios') {
    return { paddingTop: 65 };
  }
  return { paddingTop: 55 };
};

export default RouterComponent;
