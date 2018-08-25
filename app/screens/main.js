/*
 * Main screen with top Navbar, chat scroll view,
 * and Ad space components
 */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  DrawerLayoutAndroid,
  AsyncStorage
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

    this.state = {
      position: {
        long: props.long,
        lat: props.lat
      }
    }

    this.retrieveAvatar();
  }

  retrieveAvatar = async () => {
    try {
      const value = await AsyncStorage.getItem('avatar');
      if (value !== null) {
        // We have data!!
        console.log("Have avatar: " + value);

        this.setState({
          avatar: parseInt(value)
        });
      } else {
        var newValue = Math.floor(Math.random() * allAvatarLinks.length);
        this.storeAvatar(newValue.toString());

        this.setState({
          avatar: newValue
        });
      }


     } catch (error) {
       // Error retrieving data
       console.log(error);
     }
  }

  storeAvatar = async (linkIndex) => {
    try {
      await AsyncStorage.setItem('avatar', linkIndex);
    } catch (error) {
      // Error saving data
      console.log(error);
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

    this.storeAvatar(newAvatar.toString());
  }

  openDrawer = () => {
    this.refs['menu'].openDrawer();
  }

  render() {
    console.log('in Main');

    const { position, avatar } = this.state;
    const avatarLink = allAvatarLinks[avatar];

    console.log(position);

    return (
      <DrawerLayoutAndroid
        ref="menu"
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <Menu refreshConnection={this.refreshConnection}
                                          refreshAvatar={this.refreshAvatar}
                                          disconnect={this.disconnect}
                                          avatar={avatarLink} />}>
        <View style={styles.container}>
          <View style={styles.navbar}>
            <Navbar openDrawer={this.openDrawer} avatar={avatarLink} />
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
    flex: 0
  }
}
