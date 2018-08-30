/* @flow */

import React, { Component } from 'react';
// import { Button } from 'native-base';

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button
} from 'react-native';
import { Navigation } from 'react-native-navigation';


class SideBar extends Component {


  onPushToFirstTab = () => {
     this.toggleDrawer();
     this.props.navigator.handleDeepLink({
       link: 'login/Buddy.Login'
     });
   };

   onPushToPageSwiper = () => {
      this.toggleDrawer();
      this.props.navigator.handleDeepLink({
        link: 'swiper/Buddy.PageSwiper'
      });
    };

   onPushToProfile = () => {
      this.toggleDrawer();
      this.props.navigator.handleDeepLink({
        link: 'profile/Buddy.Profile'
      });
    };

    onPushToPolicy = () => {
       this.toggleDrawer();
       this.props.navigator.handleDeepLink({
         link: 'policy/Buddy.PrivacyPolicy'
       });
     };

   toggleDrawer = () => {
     this.props.navigator.toggleDrawer({
       side: 'left'
     });
   };


  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Side Menu</Text>
          <Button
              onPress={()=> this.onPushToProfile()}
          title="Profile"
          color="#fff"
          />
          <Button
              onPress={()=> this.onPushToPolicy()}
          title="Privacy Policy"
          color="#fff"
          />
          <Button
            onPress={()=> this.onPushToPageSwiper()}
          title="Instructions"
          color="#fff"
          />
          <Button
            onPress={()=> this.onPushToFirstTab()}
          title="Logout"
          color="#fff"
          />
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    marginRight: 5
  },
  text: {
    color: '#fff',
    marginTop: 50,
    marginLeft: 10,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  topImage: {
    width: "100%",
    height: 100,
    margin: 10,
    opacity: 0.7
  },
  button: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  }
});

export default SideBar;
