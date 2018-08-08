/*
 * Twitter view component for the chat
 */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Image,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {};
export default class TwitterLocal extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Icon
          name='twitter'
          style={styles.icon}
        />
        <Text style={styles.bodyTxt}>'this is the content of the tweet body longer than ever....Donal TRump you genius marketer awesome man!!!!!!!!!!!!!!!!asdfasdfsdfsd'</Text>
        <Text style={styles.screenNameTxt}>@Arjun Patel</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#0e8f9e',
    margin: 30,
    padding: 10,
    borderRadius: 5,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 4
  },
  icon: {
    borderRadius: 60,
    fontSize: 20,
    color: 'white'
  },
  bodyTxt: {
    fontSize: 16,
    color: 'white',
    margin: 5
  },
  screenNameTxt: {
    fontSize: 12,
    color: '#e5e7ea',
    margin: 5,
    alignSelf: 'flex-end'
  }
}
