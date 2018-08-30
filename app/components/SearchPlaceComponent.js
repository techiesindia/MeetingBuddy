/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const SearchPlaceComponent = (searchText) => {
    const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText}&key=AIzaSyAbjpHVRy39RbBFZJxbVmXMZE7T7ATXoZs';
    return fetch(URL)
              .then((res) => res.json())
              .then((responseJson) => {
                return responseJson.predictions;
              })
              .catch((error) => {
                console.error(error);
              })

}

export default SearchPlaceComponent;
