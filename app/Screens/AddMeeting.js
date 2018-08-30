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
  ScrollView
} from 'react-native';

import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import TextStyle from '../components/TextStyle';
import firebase from 'firebase';

export default class AddMeeting extends Component {

  static navigatorStyle = {
    tabBarHidden: true      // or you can add this while pushing
  };

  constructor(props){
    super(props);
    this.state={
      clientName: "",
      deal: "",
      dateTime: this.props.zone,
      email: "",
      location: "",
      notes: ""
    };
  }

  saveData = () => {
    if (firebase.auth().currentUser) {
    userId = firebase.auth().currentUser.uid;
      if (userId) {
        console.log(userId);
        let ref1 = firebase.database().ref('users/' + userId + '/meetings')
        console.log(ref1);

        let userRef = ref1.push({
          clientName: this.state.clientName,
          deal: this.state.deal,
          email: this.state.email,
          dateTime: this.state.dateTime,
          location: this.state.location,
          notes: this.state.notes
        }).then((data) => {
          console.log(data);
          this.props.navigator.pop({
              animated: true
          })
        }).catch((error) => {
          console.log(error);
        })

        console.log(userRef.key);
      }
    }
  }

  render() {
    return (
      <ScrollView>
      <KeyboardAvoidingView style={styles.container} behavior="position" keyboardVerticalOffset={10} enabled>
        <TextStyle
          text="Client Name"
        />
        <InputComponent
        onChangeText={(text) => this.setState({clientName: text})}
        value={this.state.clientName}
        autoCorrect={false}
        />
        <TextStyle
          text="Deal/Agenda"
        />
        <InputComponent
        onChangeText={(text) => this.setState({deal: text})}
        value={this.state.deal}
        autoCorrect={false}
        />
        <TextStyle
          text="Date & Time"
        />
        <InputComponent
        onChangeText={(text) => this.setState({text})}
        value={this.state.dateTime}
        autoCorrect={false}
        keyboardType='email-address'
        />
        <TextStyle
          text="Email"
        />
        <InputComponent
        onChangeText={(text) => this.setState({email: text})}
        value={this.state.email}
        autoCorrect={false}
        keyboardType='email-address'
        />
        <TextStyle
          text="Location"
        />
        <InputComponent
        onChangeText={(text) => this.setState({location: text})}
        value={this.state.location}
        autoCorrect={false}
        />
        <TextStyle
          text="Notes"
        />
        <InputComponent
        onChangeText={(text) => this.setState({notes: text})}
        value={this.state.notes}
        autoCorrect={false}
        multiline={true}
        />
      <TouchableOpacity onPress={this.saveData}>
          <ButtonComponent
            text="SAVE"
            />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(241, 245, 246)',
    flexDirection: 'column'
  }
});
