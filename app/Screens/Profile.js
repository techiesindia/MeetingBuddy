/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';

import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import TextStyle from '../components/TextStyle';
import firebase from 'firebase';

import { Navigation } from 'react-native-navigation';

export default class Profile extends Component {

  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props){
    super(props);
    this.state={
      name: "",
      email: "",
      password: "",
      notes: ""
    };
  }

  componentWillMount(){
    if (firebase.auth().currentUser) {
    userId = firebase.auth().currentUser.uid;
      if (userId) {
        let ref1 = firebase.database().ref('users/' + userId + '/profile')

        var getName = "";
        var getEmail = "";
        var getPassword = "";
        var getNotes = "";

        ref1.once('value', (snap) => {
          console.log(snap.val());

          if (snap.val()){
            getName = snap.val().userName,
            getEmail = snap.val().userEmailId,
            getPassword = snap.val().password,
            getNotes = snap.val().personalNotes
          }

          this.setState({
            name: getName,
            email: getEmail,
            password: getPassword,
            notes: getNotes
          });

        });
      }
    }
  }

  handleProfileData = () => {
    if (firebase.auth().currentUser) {
    userId = firebase.auth().currentUser.uid;
      if (userId) {
        console.log(userId);
        let ref1 = firebase.database().ref('users/' + userId + '/profile')
        console.log(ref1);

        let userRef = ref1.set({
          userName: this.state.name,
          userEmailId: this.state.email,
          password: this.state.password,
          personalNotes: this.state.notes
        }).then((data) => {
          console.log(data);
          this.props.navigator.pop({
              animated: true
          })
        }).catch((error) => {
          console.log(error);
        })
      }
    }
  }


  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position" keyboardVerticalOffset={10} enabled>
        <TextStyle
          text="Name"
        />
        <InputComponent
        onChangeText={(text) => this.setState({name: text})}
        value={this.state.name}
        autoCorrect={false}
        />
      <TextStyle text="Email"/>
        <InputComponent
        onChangeText={(text) => this.setState({email: text})}
        value={this.state.email}
        autoCorrect={false}
        keyboardType='email-address'
        />
      <TextStyle text="Password"/>
        <InputComponent
        onChangeText={(text) => this.setState({password: text})}
        value={this.state.password}
        autoCorrect={false}
        secureTextEntry
        />
      <TextStyle text="Notes"/>
        <InputComponent
        onChangeText={(text) => this.setState({notes: text})}
        value={this.state.notes}
        autoCorrect={false}
        multiline={true}
        />
      <TouchableOpacity onPress={this.handleProfileData}>
          <ButtonComponent
            text="SAVE"
            />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(241, 245, 246)'
  }
});
