/*
 * Chat component within Main
 */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  TextInput,
  Image
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {};
export default class Chat extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chatField}>

        </View>
        <View style={styles.inputMsgField}>
          <View style={styles.iconCont}>
            <Text>cra</Text>
          </View>
          <View style={styles.inputCont}>
            <TextInput
              placeholder="Type message..."
            />
          </View>
          <View style={styles.iconCont}>
            <Image
              style={styles.sendIcon}
              source={require('../../assets/images/sendIcon.png')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#e8ebef'
  },
  chatField: {
    flex: 8
  },
  inputMsgField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: 'white'
  },
  iconCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputCont: {
    flex: 6,
    alignSelf: 'flex-end'
  },
  sendIcon: {
    height: 30,
    width: 30
  }
}
