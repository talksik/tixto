/*
 * AdSpace component within Main
 */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {};
export default class AdSpace extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>adspace</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
}
