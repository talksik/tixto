/*
 * Dashboard/Menu
 */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import { Fonts } from '../utils/Fonts.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {};
export default class Dashboard extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('in dashboard');
    return (
      <View>
        <Text>hasdf</Text>
      </View>
    );
  }
}

const styles = {

}
