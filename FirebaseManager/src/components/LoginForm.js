import React, { Component } from 'react';
import { Dimensions, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import {
  Card,
  CardSection,
  Input,
  Button,
  Spinner,
  Header,
} from './common';

const { width, height } = Dimensions.get('window');

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <Image
        style={styles.image}
        source={require('../res.firebaseLogo1.png')}
      >
        <View style={[styles.image, styles.overlay]}
        />

        {/* <Image
          style={styles.image}
          source={require('../res.firebaseLogo.png')}
        /> */}

        {/* <Header headerText="FirebaseManager" /> */}

        <Card style={styles.cardContainer}>

          <CardSection>
            <Input
              label="Email"
              placeholder="email@gmail.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          <CardSection style={{ borderBottomWidth: 0 }}>
            {/* <Button onPress={this.onButtonPress.bind(this)}>
              Login
            </Button> */}
            {this.renderButton()}
          </CardSection>
        </Card>
      </Image>
    );
  }
}

const styles = {
  errorTextStyle: {
    backgroundColor: 'transparent',
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
  mainContainer: {
    flex: 1,
  },
  image: {
    height,
    width,
  },
  cardContainer: {
    backgroundColor: '#fffc',
    marginTop: 100,
    marginLeft: 20,
    marginRight: 20,
  },
  overlay: {
    // backgroundColor: 'rgba(255, 199, 42, 0.5)',
    backgroundColor: '#0001',
    position: 'absolute'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
})(LoginForm);
