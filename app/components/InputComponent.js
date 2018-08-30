/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions
} from 'react-native';

const InputComponent = (props) => (
      <TextInput
        style={styles.TextInputStyle}
        underlineColorAndroid="transparent"
        onChangeText={props.onChangeText}
        placeholderTextColor='rgb(241, 245, 246)'
        placeholder={props.placeholder}
        {...props}
       />
);

const styles = StyleSheet.create({
  TextInputStyle: {
    padding: 10,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width - 40,
    height: 40,
    marginTop: 20,
    fontSize: 18,
    color: 'rgba(0,172,179,1)'
  }
});

export default InputComponent;
