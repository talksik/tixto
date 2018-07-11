/*
 * Main screen with top Navbar, chat scroll view,
 * and Ad space components
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

import { Drawer } from 'native-base';

// imported components for different sections in main component
import Navbar from './main/navbar.js';
import Chat from './main/chat.js';
import AdSpace from './main/adspace.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {};
export default class Main extends Component<Props> {
  constructor(props) {
    super(props);
    this.position = {
      long: this.props.long,
      lat: this.props.lat
    };
  }

  render() {
    console.log('in Main');

    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };

    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Navbar />
        </View>
        <View style={styles.chat}>
          <Chat position={this.position} />
        </View>
        <View style={styles.adspace}>
          <AdSpace />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 18,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative'
  },
  navbar: {
    flex: 2
  },
  chat: {
    flex: 15
  },
  adspace: {
    flex: 2
  }
}
