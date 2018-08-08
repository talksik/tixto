/*
 * Home screen with logo and connect button
 */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Permissions,
  AsyncStorage,
  Image
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import { Fonts } from '../utils/Fonts.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const backgroundLink = '../assets/images/mainBg.jpg';
const logoLink = '../assets/images/logo.png';

type Props = {};
export default class Home extends Component<Props> {
  connect() {
    Actions.loading();
  }

  render() {
    return (
      <View style={homeStyles.container}>
        <ImageBackground style={homeStyles.bg} source={require(backgroundLink)} >
        <View>
          <Image style={homeStyles.logo} source={require(logoLink)} />
        </View>

        <TouchableOpacity style={homeStyles.connect} onPress={this.connect.bind(this)}>
          <Text style={homeStyles.connectTxt}>Connect</Text>
        </TouchableOpacity>
      </ImageBackground>
      </View>
    );
  }
}

const homeStyles = {
  container: {
    flex: 1,
    backgroundColor: '#0e8f9e',
  },
  bg: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight
  },
  logo: {
    zIndex: 2,
    height: 350,
    width: 350,
    padding: 0
  },
  connect: {
    padding: 15,
    width: windowWidth - 100,
    justifyContent: 'flex-end',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5
  },
  connectTxt: {
    textAlign: 'center',
    color: 'black',
    fontSize: 25
  }
}
