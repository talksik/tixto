/*
 * Menu with few options
 */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet
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
    const { refreshConnection, refreshAvatar, disconnect, avatar } = this.props;

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.header}
          source={{uri: avatar}}>
          <View style={styles.overlay}>
            <Text style={styles.hdrTxt}>Menu</Text>
          </View>
        </ImageBackground>

        <View style={styles.main}>
          <TouchableOpacity onPress={refreshConnection}>
            <View style={styles.option}>
              <Icon
                name='track-changes'
                style={styles.icons}
              />
              <Text style={styles.optTxt}>Refresh Connection</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={refreshAvatar}>
            <View style={styles.option}>
              <Icon
                name='refresh'
                style={[styles.icons, styles.refresh]}
              />
              <Text style={styles.optTxt}>Change Avatar</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={disconnect}>
            <View style={styles.option}>
              <Icon
                name='exit-to-app'
                style={[styles.icons, styles.disconnect]}
              />
              <Text style={styles.optTxt}>Disconnect</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.copyrightCont}>
          <Text style={styles.copyrightTxt}>&copy; Nexto</Text>
          <Text style={styles.copyrightTxtExtra}>2018.</Text>
        </View>

      </View>
    );
  }
}

const styles = {
  container: {
    flex: 14,
    backgroundColor: 'white'
  },
  header: {
    flex: 3
  },
    overlay: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'rgba(0,0,0,0.5)'
    },
    hdrTxt: {
      color: 'white',
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 25
  },
    icons: {
      fontSize: 20,
      color: '#0e8f9e',
      padding: 10
    },
      refresh: {
        color: 'green'
      },
      disconnect: {
        color: 'red'
      },
    optTxt: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'left',
      padding: 10
    },
  copyrightCont: {
    flex: 1,
    backgroundColor: '#202021',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
    copyrightTxt: {
      color: '#0e8f9e'
    },
    copyrightTxtExtra: {
      fontSize: 10,
      color: '#0e8f9e'
    }
}
