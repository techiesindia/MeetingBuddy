/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import ButtonComponent from '../components/ButtonComponent';

import validate from '../utility/validation';
import { connect } from 'react-redux';
import { TRY_AUTH } from '../store/actions/index';
import firebase from 'firebase';

class SignUp extends Component {

    state = {
     titleText: "By creating an account you agree to the",
     bodyText: 'Terms of use',
     controls: {
       name: {
         value: "",
         valid: false,
         validationRules: {
           notEmpty: true
         },
         touched: false
       },
       email: {
         value: "",
         valid: false,
         validationRules: {
           isEmail: true
         },
         touched: false
       },
       password: {
         value: "",
         valid: false,
         validationRules: {
           minLength: 6
         },
         touched: false
       },
       confirmPassword: {
         value: "",
         valid: false,
         validationRules: {
           equalTo: "password"
         },
         touched: false
       }
     }
   };

   updateInputState = (key, value) => {
     let connectedValue = {};
     if (this.state.controls[key].validationRules.equalTo) {
       const equalControl = this.state.controls[key].validationRules.equalTo;
       const equalValue = this.state.controls[equalControl].value;
       connectedValue = {
         ...connectedValue,
         equalTo: equalValue
       };
     }
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
           confirmPassword: {
             ...prevState.controls.confirmPassword,
             valid:
               key === "password"
                 ? validate(
                     prevState.controls.confirmPassword.value,
                     prevState.controls.confirmPassword.validationRules,
                     connectedValue
                   )
                 : prevState.controls.confirmPassword.valid
           },
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

   handleSignUp = () => {
     const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.onSignUp(authData);
    // this.props.navigator.pop({
    //       animated: true
    // })
   }

   onSignUp = () => {

     firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.controls.email.value, this.state.controls.password.value)
      .then(() => this.props.navigator.pop({
        animated: true
      }))
      .catch(error => this.setState({ errorMessage: error.message }))
     // return dispatch => {
     //   fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBHf58_RIte-M-S41l0JNXY6pBBW4lWR2I",{
     //     method: "POST",
     //     body: JSON.stringify({
     //       email: authData.email,
     //       password: authData.password,
     //       returnSecureToken: true
     //     }),
     //     headers: {
     //       "Content-Type": "application/json"
     //     }
     //   })
     //   .catch(err => {
     //     console.log(err);
     //     alert("Authentication failed, try again!!");
     //   })
     //   .then(res => res.json)
     //   .then(parsedRes => {
     //     console.log(parsedRes);
     //   })
     // };
   }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 2, alignItems: 'center'}}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Name"
            onChangeText={(name) => this.updateInputState("name", name)}
            value={this.state.controls.name.value}
            valid={this.state.controls.name.valid}
            touched={this.state.controls.name.touched}
            />
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            onChangeText={(text) => this.updateInputState("email", text)}
            value={this.state.controls.email.value}
            valid={this.state.controls.email.valid}
            touched={this.state.controls.email.touched}
            autoCapitilize='none'
            autoCorrect={false}
            keyboardType='email-address'
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            value={this.state.controls.password.value}
            onChangeText={val =>
              this.updateInputState("password", val)}
            valid={this.state.controls.password.valid}
            touched={this.state.controls.password.touched}
            secureTextEntry
            />
          <TextInput
            style={styles.inputStyle}
            placeholder="Confirm Password"
            value={this.state.controls.confirmPassword.value}
            onChangeText={val =>
              this.updateInputState("confirmPassword", val)}
            valid={this.state.controls.confirmPassword.valid}
            touched={this.state.controls.confirmPassword.touched}
            secureTextEntry
            />
          <TouchableOpacity
            onPress={() => this.onSignUp()
              }
            disabled={
              !this.state.controls.confirmPassword.valid ||
              !this.state.controls.email.valid ||
              !this.state.controls.password.valid ||
              !this.state.controls.name.valid
            }
            >
            <ButtonComponent
              text="CREATE AN ACCOUNT"
              />
          </TouchableOpacity>
          <TouchableOpacity>
          <Text style={{marginTop: 20,color: 'rgb(139, 154, 159)', fontSize: 16, flexWrap: 'wrap'}}>
          {this.state.titleText}
            <Text style={{fontWeight: 'bold', color: 'rgb(139, 154, 159)', alignSelf: 'center',fontSize: 16}}>
              {this.state.bodyText}
            </Text>
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigator.pop({
                  animated: true
                })
              }>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'rgba(156, 169, 174, 1)', marginVertical: 120, height: 50}}>{"Already have an account?"}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgb(241, 245, 246)',
    alignItems: 'center',
    flex: 1
  },
  inputStyle: {
    padding: 10,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width - 40,
    height: 40,
    marginTop: 20,
    fontSize: 18,
    color: 'rgb(156, 169, 174)'
  }
});

// const mapDispatchToProps = dispatch => {
//   return {
//     onSignUp: (authData) => dispatch(tryAuth(authData))
//   };
// };

export default SignUp;
// export default connect(null, mapDispatchToProps)(SignUp);
