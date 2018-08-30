/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native';

import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import SegmentControl from 'react-native-segment-controller';

export default class Meetings extends Component {
  state = {
    index: 0,
    dataSource: ""
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.handlePress = this.handlePress.bind(this);

  }

  handlePress(index) {
    this.setState({index});
  }


  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
      else if (event.id === "addMeeting"){
        this.props.navigator.push({
          screen: "Buddy.AddMeeting",
          side: "right",
          title: "Add Meeting"
        })
      }
      if (event.id == 'back-button') { // this is the same id field from the static navigatorButtons definition
        this.props.navigator.pop({
          animated: true
        });
      }
      if (event.id == 'logout-button') {
        this.props.navigator.popToRoot({
          animated: true,
          animationType: 'fade'
        });
      }
    }
    else if (event.type === 'DeepLink') {
      const parts = event.link.split('/');
      if (parts[0] === 'login') {
        this.props.navigator.resetTo({
          screen: parts[1],
          navigatorStyle: {
            tabBarHidden: true
          },
          navigationOptions: {
              header: {
                 visible: false
              }
          }
        })
      }
      else if (parts[0] === 'profile'){
        this.props.navigator.push({
          screen: parts[1],
          title: "Profile",
          navigatorButtons: {
            leftButtons: [
              {
                id: 'back-button',
                component: 'CustomButton', // This line loads our component as a nav bar button item
                icon: Icon.getImageSource(Platform.OS === "android" ? "md-log" : "ios-log" : "",30),
                passProps: {
                  text: "Hi",
                },
              }
            ],
            rightButtons: [
              {
                id: 'logout-button',
                component: 'CustomButton', // This line loads our component as a nav bar button item
                icon: Icon.getImageSource(Platform.OS === "android" ? "md-arrow" : "ios-arrow" : "",30),
                passProps: {
                  text: "Hello",
                },
              }
            ]
          },

        });
      }
      else if (parts[0] === 'policy'){
        this.props.navigator.showModal({
          screen: parts[1],
          title: "Privacy Policy"
        });
      }
      else if (parts[0] === 'swiper'){
        this.props.navigator.push({
          screen: parts[1]
        });
      }
    }

  };

  handleSearch = (text) => {
    let placeValue = text.toLowerCase()
    console.log(placeValue);
    if (placeValue.length >= 3){
    fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${placeValue}&key=AIzaSyAbjpHVRy39RbBFZJxbVmXMZE7T7ATXoZs')
        .then((res) => res.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({
            dataSource: responseJson.predictions
          })
        })
        .catch((error) => {
          console.error(error);
        })
    }

  }

  render() {
    return (
      <View style={styles.container}>
          <SearchBar
          lightTheme
          round
          searchIcon={{ size: 24 }}
          placeholder='Type Here...'
          onChangeText={(text) => {this.handleSearch(text)}}
           />
          <SegmentControl
            values={['History', 'Upcoming']}
            selectedIndex={this.state.index}
            height={30}
            onTabPress={this.handlePress}
            borderRadius={5}
            tabBadgeContainerStyle={{ backgroundColor: 'red'}}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    alignSelf: 'center',
    margin: 50
  }
});
