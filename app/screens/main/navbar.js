/*
 * Navbar component within Main
 */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  Image
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {};
export default class Navbar extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconCont}>
          <Image
          style={styles.menuIcon}
          source={require('../../assets/images/menuIcon.png')}
          />
        </View>
        <View style={styles.headerTxt}>
          <Text style={styles.head}>Main Chat</Text>
          <Text style={styles.status}>online</Text>
        </View>
        <View style={styles.iconCont}>
          <Image
          style={styles.inboxIcon}
          source={require('../../assets/images/inboxIcon.jpg')}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0e8f9e'
  },
  iconCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuIcon: {
    height: 50,
    width: 50
  },
  headerTxt: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  head: {
    fontSize: 20,
    color: 'white'
  },
  status: {
    fontSize: 13,
    color: 'white'
  },
  inboxIcon: {
    height: 40,
    width: 40
  }
}
