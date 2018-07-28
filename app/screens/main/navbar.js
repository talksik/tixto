/*
 * Navbar component within Main
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Fonts } from '../../utils/Fonts.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {};
export default class Navbar extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { avatar } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.iconCont}>
          <Icon
            name='menu'
            style={styles.menuIcon}
          />
        </View>
        <View style={styles.headerTxt}>
          <Text style={styles.head}>Chat</Text>
          <Text style={styles.status}>online</Text>
        </View>
        <View style={styles.iconCont}>
          <Image style={styles.avatar} source={{uri: avatar}} />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0e8f9e'
  },
  iconCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuIcon: {
    fontSize: 30,
    color: 'white'
  },
  headerTxt: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  head: {
    fontSize: 20,
    color: 'white',
    fontFamily: Fonts.Sunflower
  },
  status: {
    fontSize: 13,
    color: 'white',
    fontFamily: Fonts.Sunflower
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 100
  }
}
