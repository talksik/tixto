/*
 * Twitter view component for the chat
 */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {};
export default class WelcomeMsg extends Component<Props> {
  render() {
    return (
      <View style={styles.welcomeMsg}>
        <Text style={styles.welcomeTxt}>Welcome to Tixto! Break the ice by starting a conversation!</Text>
      </View>
    );
  }
}

const styles = {
  welcomeMsg: {
    margin: 30,
    padding: 20,
    backgroundColor: 'black',
    borderRadius: 8,
    borderWidth: 3,
    borderColor: 'gold'
  },
    welcomeTxt: {
      textAlign: 'center',
      fontSize: 15,
      color: 'gold'
    }
}
