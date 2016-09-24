import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TaskList from './TaskList';

class App extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      todos: [
        {
          task: 'Learn React Native',
        },
        {
          task: 'Learn Redux',
        },
      ],
    };
  }

  onAddStarted(){
    console.log("alsdjf;als");
  }

  render() {
    return (
      <TaskList
        onAddStarted={this.onAddStarted.bind(this)}
        todos = {this.state.todos}/>
    );
  }
}

Exponent.registerRootComponent(App);
