/*
 * Home screen with logo and connect button
 */
import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  Text,
  TouchableOpacity,
  Permissions,
  AsyncStorage
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const backgroundLink = 'https://cdn.shopify.com/s/files/1/2567/6484/products/Polygon_Esprit_geometric_white_and_gold_5.jpg?v=1517325402';

type Props = {};
export default class Home extends Component<Props> {
  componentDidMount() {
    console.log('mounted');
    AsyncStorage.getItem('longitude').then((lon) => {
      console.log(lon);
    });
    AsyncStorage.getItem('latitude').then((lat) => {
      console.log(lat);
    });
  }

  connect() {
    Actions.loading();
  }

  render() {
    return (
      <View style={homeStyles.container}>
        <ImageBackground style={homeStyles.bg} source={{uri : backgroundLink}} >
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
    zIndex: 100
  },
  motto: {
    color: '#0e8f9e',
    fontSize: 18
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
