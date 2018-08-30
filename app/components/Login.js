/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import startMainTabs from '../Screens/MainTabs';
import InputComponent from './InputComponent';
import ButtonComponent from './ButtonComponent';
import validate from '../utility/validation';
import PageSwiper from '../Screens/PageSwiper';
import firebase from 'firebase';

export default class Login extends Component {

    constructor(props){
      super(props);

      this.state = {
        controls: {
          email:{
            value: "tester@test.com",
            valid: false,
            validationRules: {
              isEmail: true
            },
            touched: false
          },
          password: {
            value: "tester",
            valid: false,
            validationRules: {
              minLength: 6
            },
            touched: false
          }
        },
        newView: false
      };
    }


  static navigationOptions = {
      header: {
         visible: false
      }
    }

    componentWillMount() {
     firebase.initializeApp({
       apiKey: "AIzaSyBHf58_RIte-M-S41l0JNXY6pBBW4lWR2I",
        authDomain: "meeting-buddy-f461c.firebaseapp.com",
        databaseURL: "https://meeting-buddy-f461c.firebaseio.com",
        projectId: "meeting-buddy-f461c",
        storageBucket: "meeting-buddy-f461c.appspot.com",
        messagingSenderId: "997358587074"
       });

       firebase
      .auth()
      .createUserWithEmailAndPassword("tester@test.com", "tester")
      .then(() => console.log("Signed up"))
      .catch(error => this.setState({ errorMessage: error.message }))


   }

  updateInputState = (key, value) => {
    let connectedValue = {};

    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }

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

  changeView = () => {
    this.setState({
      newView: true
    })
  }

  onLogin = () => {
    // firebase.auth().onAuthStateChanged((user) => {
    //    if (user) {
    //      this.setState({ loggedIn: true });
    //      console.log("Logged In");
    //    } else {
    //      this.setState({ loggedIn: false });
    //      console.log("Not Logged In");
    //
    //    }
    // });

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.controls.email.value, this.state.controls.password.value)
      .then(() => this.changeView())
      .catch(error => this.setState({ errorMessage: error.message }))

      // if (firebase.auth().currentUser) {
      // userId = firebase.auth().currentUser.uid;
      //   if (userId) {
      //     firebase.database().ref('users/' + userId).set({
      //         firstName: "Komal",
      //         lastName: "Gupta",
      //         email: this.state.controls.email.value
      //     })
      //   }
      // }
  }

  render() {
    if (this.state.newView){
      return (
        <PageSwiper />
      );
    }
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
        <InputComponent
          placeholder="Password"
          onChangeText={(passwordText) => this.updateInputState("password", passwordText)}
          value={this.state.controls.password.value}
          valid={this.state.controls.email.valid}
          touched={this.state.controls.email.touched}
          autoCorrect={false}
          secureTextEntry={true}
        />
      <TouchableOpacity
        color="#29aaf4"
        onPress={() => {
        startMainTabs()
        }
        }
        disabled={
          !this.state.controls.email.valid ||
          !this.state.controls.password.valid
        }
        >
          <ButtonComponent
            text="SIGN IN"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigator.push({
          screen: "Buddy.ForgotPassword"
        })}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'rgba(156, 169, 174, 1)', padding: 15}}>Forgot Password?</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigator.push({
            screen: 'Buddy.SignUp',
            title: 'Sign Up',
          })
          }
          >
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'rgba(156, 169, 174, 1)', marginVertical: 120, height: 50}}>{"Don't have an account?"}</Text>
          </View>
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
