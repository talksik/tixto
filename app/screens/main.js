/*
 * Main screen with top Navbar, chat scroll view,
 * and Ad space components
 */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  DrawerLayoutAndroid
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import { Fonts } from '../utils/Fonts.js';

import { Drawer } from 'native-base';
import Menu from './main/menu.js';

// imported components for different sections in main component
import Navbar from './main/navbar.js';
import Chat from './main/chat.js';
import AdSpace from './main/adspace.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const allAvatarLinks = ['https://images.pexels.com/photos/430207/pexels-photo-430207.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://www.graphicpear.com/wp-content/uploads/2017/05/aaa.jpg', 'https://i.pinimg.com/736x/1f/12/87/1f1287b54f9d0c8f5c5fe86d27c95bbb--blue-patterns-indoor-outdoor-rugs.jpg'];

type Props = {};
export default class Main extends Component<Props> {
  constructor(props) {
    super(props);

    var avatarRandom = Math.floor(Math.random() * allAvatarLinks.length);

    this.state = {
      position: {
        long: props.long,
        lat: props.lat
      },
      avatar: avatarRandom
    }
  }

  refreshConnection = () => {

  }

  disconnect = () => {
    Actions.home();
  }

  refreshAvatar = () => {
    var newAvatar = (this.state.avatar + 1) % allAvatarLinks.length;
    this.setState({
      avatar: newAvatar
    });
  }

  render() {
    console.log('in Main');
    const { position, avatar } = this.state;
    const avatarLink = allAvatarLinks[avatar];

    console.log(position);

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <Menu />}>
        <View style={styles.container}>
          <View style={styles.navbar}>
            <Navbar avatar={avatarLink} />
          </View>
          <View style={styles.chat}>
            <Chat position={position} avatar={avatarLink} />
          </View>
          <View style={styles.adspace}>
            <AdSpace />
          </View>
        </View>
      </DrawerLayoutAndroid>
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
