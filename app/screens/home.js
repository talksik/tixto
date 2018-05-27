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
  AsyncStorage
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import { Fonts } from '../utils/Fonts.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const backgroundLink = '../assets/images/homeBg.jpg';

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
          <Text style={homeStyles.logo}>Nexto</Text>
          <Text style={homeStyles.motto}>spontaneous connection</Text>
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
    color: 'grey',
    fontSize: 50,
    textAlign: 'center',
    zIndex: 100,
    fontFamily: Fonts.Sunflower
  },
  motto: {
    color: '#0e8f9e',
    fontSize: 18,
    fontFamily: Fonts.Sunflower
  },
  connect: {
    backgroundColor: '#0e8f9e',
    padding: 15,
    width: windowWidth - 100,
    justifyContent: 'flex-end',
  },
  connectTxt: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25
  }
}
