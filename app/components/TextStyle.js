/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const TextStyle = (props) => (
  <Text style={styles.container}>{props.text}</Text>
);


const styles = StyleSheet.create({
  container: {
    color: "rgba(159, 172, 177, 1)",
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 15,
    paddingBottom: 2,
  },
});

export default TextStyle;
