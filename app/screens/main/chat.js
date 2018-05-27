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
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Fonts } from '../../utils/Fonts.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {};
export default class Chat extends Component<Props> {
  constructor(props) {
    super(props);
    var exMessages = [
      {
        id: 1,
        text: "hey anyone wanna study 61A"
      },
      {
        id: 2,
        text: "Yea im down"
      }
    ];
    this.state = {
      messageToSend : '',
      messagesDOM: exMessages.map(
        (msg) => <View key={msg.id}><Text>{msg.text}</Text></View>
        )
    };
  }

  messageInput = (text) => {
    console.log('changing state of messageToSend');
    this.setState({
      messageToSend : text
    });
    console.log(this.state.messageToSend);
  }

  render() {
    console.log(this.state.messagesDOM);
    return (
      <View style={styles.container}>
        <View style={this.state.messagesDOM.length == 0 ?
          styles.chatField : styles.chatFieldEmpty}>

          {this.state.messagesDOM.length == 0 ?
            (<View style={styles.emptyMsg}>
              <Text>No one's talkin around you! Start it up!</Text>
            </View>)
            :
            (<View>
              {this.state.messagesDOM}
            </View>)
          }

        </View>
        <View style={styles.inputMsgField}>
          <View style={styles.iconCont}>
            <Text>cra</Text>
          </View>
          <View style={styles.inputCont}>
            <TextInput
              style={styles.inputField}
              placeholder="Type a message..."
              onChangeText={this.messageInput}
            />
          </View>
          <View style={styles.iconCont}>
            <Icon
              name='send'
              style={styles.sendIcon}
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
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
    chatFieldEmpty: {
      flex: 8,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
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
    inputField : {
      fontSize: 18,
      fontFamily: Fonts.SunflowerLight
    },
  sendIcon: {
    fontSize: 25
  }
}
