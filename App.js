import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import firebase from 'firebase';

import Login from './app/components/Login';
import SideBar from './app/components/SideBar';
import Dashboard from './app/Screens/Dashboard';
import Meetings from './app/Screens/Meetings';
import TimeConvertor from './app/Screens/TimeConvertor';
import SignUp from './app/Screens/SignUp';
import AddMeeting from './app/Screens/AddMeeting';
import ForgotPassword from './app/Screens/ForgotPassword';
import Profile from './app/Screens/Profile';
import PrivacyPolicy from './app/Screens/PrivacyPolicy';
import CustomComponent from './app/components/CustomComponent';
import PageSwiper from './app/Screens/PageSwiper';

Navigation.registerComponent("Buddy.Dashboard", () => Dashboard);
Navigation.registerComponent("Buddy.Login", () => Login);
Navigation.registerComponent("Buddy.Meetings", () => Meetings);
Navigation.registerComponent("Buddy.TimeConvertor", () => TimeConvertor);
Navigation.registerComponent("Buddy.SignUp", () => SignUp);
Navigation.registerComponent("Buddy.SideBar", () => SideBar);
Navigation.registerComponent("Buddy.AddMeeting", () => AddMeeting);
Navigation.registerComponent("Buddy.ForgotPassword", () => ForgotPassword);
Navigation.registerComponent("Buddy.Profile", () => Profile);
Navigation.registerComponent("Buddy.PrivacyPolicy", () => PrivacyPolicy);
Navigation.registerComponent('CustomButton', () => CustomComponent);
Navigation.registerComponent('Buddy.PageSwiper', () => PageSwiper);

Navigation.startSingleScreenApp({
  screen: {
    screen: "Buddy.Login",
    navigatorStyle: {
		    navBarHidden: true
	 }
  }
});

// export default class App extends React.Component {
//
//   componentWillMount() {
//     firebase.auth().onAuthStateChanged((user) => {
//        if (user) {
//          this.setState({ loggedIn: true });
//          console.log("Logged In");
//
//        } else {
//          this.setState({ loggedIn: false });
//          console.log("Not Logged In");
//
//          Navigation.startSingleScreenApp({
//            screen: {
//              screen: "Buddy.Login",
//              navigatorStyle: {
//          		    navBarHidden: true
//          	 }
//            }
//          });
//        }
//     });
//
//   }
// }
//
//   async componentWillMount() {
//     await Expo.Font.loadAsync({
//       'Roboto': require('native-base/Fonts/Roboto.ttf'),
//       'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
//     });
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Login />
//       </View>
//     );
//   }

//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'rgb(241, 245, 246)',
//   },
// });
