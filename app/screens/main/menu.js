/*
 * Menu with few options
 */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const backgroundLink = '../../assets/images/homeBg.jpg';

type Props = {};
export default class Menu extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.header} source={require(backgroundLink)} >
          <Text style={styles.hdrTxt}>Menu</Text>
        </ImageBackground>
        <View style={styles.main}>
          <TouchableOpacity>
            <View style={styles.option}>
              <Text style={styles.optTxt}>Refresh Connection</Text>
              <Icon
                name='track-changes'
                style={styles.icons}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.option}>
              <Text style={styles.optTxt}>Change Avatar</Text>
              <Icon
                name='refresh'
                style={styles.icons}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.option}>
              <Text style={styles.optTxt}>Disconnect</Text>
              <Icon
                name='exit-to-app'
                style={styles.icons}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 13,
    backgroundColor: 'white'
  },
  header: {
    flex: 3,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center'
  },
    hdrTxt: {
      color: '#0e8f9e',
      fontSize: 30
    },
  main: {
    flex: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  option: {
    flex: 0,
    flexBasis: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#d7d9dd'
  },
    icons: {
      fontSize: 30,
      color: '#0e8f9e'
    },
    optTxt: {
      fontSize: 20
    }
}
