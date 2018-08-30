/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Platform,
  WebView
} from 'react-native';
import {Navigation} from 'react-native-navigation';

const CloseModalButton = ({text}) =>
<TouchableOpacity
  style={[styles.buttonContainer]}
  onPress={() => navigator.dismissModal()}
>
  <View style={styles.closeModalButton}>
    <Text style={styles.buttonText}>{text}</Text>
  </View>
</TouchableOpacity>;
Navigation.registerComponent('CloseModalButton', () => CloseModalButton);


class PrivacyPolicy extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        id: 'close-modal-button',
        component: Platform.OS === 'ios' ? 'CloseModalButton' : null,
        passProps: {
          text: 'Close'
        }
      }
    ]
  };
  componentWillMount() {
    navigator = this.props.navigator;
  }

  render() {
    return (
      <WebView
        source={{uri: 'https://techiesindiainc.com/privacy-policy/'}}
        style={{width: "100%", height: "100%"}}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 16
  },
  buttonContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeModalButton: {
    backgroundColor: 'tomato',
    width: 50,
    height: 25,
    borderRadius: 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white'
  }
});

export default PrivacyPolicy;
