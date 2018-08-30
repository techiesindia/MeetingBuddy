/* @flow */

import React, { Component } from 'react';
import {
  Platform
} from 'react-native';
import { Navigation, Drawer } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startMainTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu" : "",30),
    Icon.getImageSource(Platform.OS === "android" ? "md-time" : "ios-time" : "",30),
    Icon.getImageSource(Platform.OS === "android" ? "md-briefcase" : "ios-briefcase" : "",30),
    Icon.getImageSource(Platform.OS === "android" ? "md-add" : "ios-add" : "",30)
  ]).then(sources => {
  Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "Buddy.Meetings",
          title: "Meetings",
          label: "Meetings",
          icon: sources[2],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[0],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ],
            rightButtons: [
              {
                icon: sources[3],
                title: "Add",
                id: "addMeeting"
              }
            ]
          }
        },
        {
          screen: "Buddy.TimeConvertor",
          title: "Time Convertor",
          label: "Time Convertor",
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[0],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ],
            rightButtons: [
              {
                icon: sources[3],
                title: "Add",
                id: "addMeeting"
              }
            ]
          }
        }
      ],
      tabsStyle: {
        initialTabIndex: 0,
        tabBarBackgroundColor: 'rgba(247,249,250)',
        tabBarSelectedButtonColor: 'rgba(107, 123, 129, 1)',
        tabBarLabelColor: 'rgba(139, 154, 159, 1)',
        tabBarSelectedLabelColor: 'rgba(247, 248, 249, 1)',
        tabBarTextFontSize: 18
      },
      drawer: {
        left: {
          screen: "Buddy.SideBar"
        },
        right: {
          screen: "Buddy.AddMeeting"
        }
      },
      appStyle: {
        initialTabIndex: 0,
        tabBarBackgroundColor: 'rgba(247,249,250)',
        tabBarSelectedButtonColor: "rgba(107, 123, 129, 1)",
        tabBarLabelColor: 'rgba(139, 154, 159, 1)',
        tabBarSelectedLabelColor: 'rgba(247, 248, 249, 1)',
        tabFontSize: 18
      }
    });
  });
};

export default startMainTabs;
