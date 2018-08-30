/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

const ButtonComponent = (props) => (
  <View style={styles.container}>
    <Text style={styles.buttonTextStyle}>{props.text}</Text>
  </View>
);


const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 40,
    height: 40,
    backgroundColor: 'rgba(107, 123, 129, 1)',
    marginTop: 15,
    alignItems: 'center'
  },
  buttonTextStyle: {
    color: '#fff',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default ButtonComponent;
