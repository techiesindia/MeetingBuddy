/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';



const CustomButton = ({ text, icon }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: 'tomato' }]}
    onPress={() => console.log('pressed me!')}
  >
    <View style={styles.button}>
      <Image source={icon} style={{width: "100%", height: "100%"}}/>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomButton;
