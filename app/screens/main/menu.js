/*
 * AdSpace component within Main
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

const remote = 'http://www.frugalsoft.com/images/nice-cute-wallpaper-designs-cute-iphone-wallpaper-patterns';

type Props = {};
export default class Menu extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Arjun Patel</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.option}>
            <Text>Refresh Connection</Text>
          </View>
          <View style={styles.option}>
            <Text>Change Avatar</Text>
          </View>
          <View style={styles.option}>
            <Text>Disconnect</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 4,
    backgroundColor: 'white'
  },
  header: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  option: {
    height: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#d7d9dd'
  }
}
