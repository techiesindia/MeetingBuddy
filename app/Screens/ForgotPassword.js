/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import validate from '../utility/validation';

export default class ForgotPassword extends Component {

  static navigationOptions = {
      header: {
         visible: true
      }
  }

  constructor(props){
    super(props);
    this.state={
      controls: {
        email:{
          value: "",
          valid: false,
          validationRules: {
            isEmail: true
          },
          touched: false
        }
      }
    };
  }

  updateInputState = (key, value) => {
    let connectedValue = {};

    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appFirstTitle}>Meeting</Text>
        <Text style={styles.appSecondTitle}>Buddy</Text>
        <InputComponent
          placeholder="Email"
          onChangeText={(text) => this.updateInputState("email", text)}
          value={this.state.controls.email.value}
          valid={this.state.controls.email.valid}
          touched={this.state.controls.email.touched}
          autoCapitilize='none'
          autoCorrect={false}
          keyboardType='email-address'
        />
        <TouchableOpacity
          onPress={() => this.props.navigator.pop({
          animated: true
        })}
        disabled={
          !this.state.controls.email.valid
        }
        >
          <ButtonComponent
            text="RECOVER"
            />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(241, 245, 246)'
  },
  appFirstTitle: {
    color: 'rgba(0,172,179,1)',
    fontSize: 60,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 100,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  appSecondTitle: {
    color: 'rgba(0,172,179,1)',
    fontSize: 60,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  }
});
