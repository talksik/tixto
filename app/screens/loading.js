/*
 * Universal Loading screen that can be used for any situations
 */
import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  AsyncStorage
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const loadingGIF = 'http://www.playrosy.com/ourgames/vampiregirlmakeover/images/_preloader.gif';

type Props = {};
export default class Loading extends Component<Props> {
  componentWillMount() {
    // Getting the location of the user
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('Getting User Location:');
      this.latitude = parseFloat(position.coords.latitude);
      this.longitude = parseFloat(position.coords.longitude);
      console.log(String(this.latitude) + ' ' + String(this.longitude));
      AsyncStorage.setItem('longitude', this.longitude);
      AsyncStorage.setItem('latitude', this.latitude);
      Actions.home();
      },
      (error) => console.log(error),
      // high accuracy might need slight adjusting with its values
      // or perhaps do high accuracy and if it times out then do
      // regular getPosition
      //{ enableHighAccuracy: false, timeout: 2000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <View style={loadingStyles.container}>
        <Image style={loadingStyles.gif} source={{ uri: 'http://www.playrosy.com/ourgames/vampiregirlmakeover/images/_preloader.gif' }} />
        <Text style={loadingStyles.waitTxt}>Please wait to be connected...</Text>
        <View style={loadingStyles.copyright}>
          <Text style={loadingStyles.copyTxt}>&copy; Nexto</Text>
        </View>
      </View>
    );
  }
}

const loadingStyles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#0e8f9e',
  },
  gif: {
    height: 50,
    width: 50
  },
  waitTxt: {
    color: 'white',
    fontSize: 15
  },
  copyright: {
    position: 'absolute',
    bottom: 30,
    zIndex: 10
  },
  copyTxt: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'TitilliumWeb-Regular'
  }
}
