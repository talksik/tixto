/*
 * Chat component within Main
 */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Fonts } from '../../utils/Fonts.js';

// Socket.io imports
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {};
export default class Chat extends Component<Props> {
  constructor(props) {
    super(props);
    this.userId = 1;
    this.state = {
      messageToSend : '',
      messagesDOM: [],
      prevMessageUser: -1
    };
    this.socket = io('10.0.2.2:3000', {jsonp: false});
    this.socket.on('initMessages', (allMsg) => {
      console.log('Initial messages received: ' + allMsg);
      allMsg.map((msg) => {
        this.addMessage(msg);
      });
    });

    this.socket.on('newMessage', (msg) => {
      this.addMessage(msg);
    });
  }

  addMessage = (msg) => {
    console.log('New message received: ' + msg);
    var oldDOM = this.state.messagesDOM;
    var newMessage = this.createMessage(msg);
    this.setState({
      messagesDOM: oldDOM.concat(newMessage),
      prevMessageUser: msg.userId
    });
  }

  sendMessage = () => {
    console.log('Message to send: ' + this.state.messageToSend);
    this.socket.emit('newMessage', this.state.messageToSend);
    this.setState({
      messageToSend: ''
    });
  }

  createMessage = (msg) => {
    console.log(msg.userId);
    var isUser = msg.userId === this.userId;
    var contStyle = isUser ? styles.userMsg : styles.otherMsg;
    var txtContStyle = isUser ? styles.userMsgBox : styles.otherMsgBox;
    var txtStyle = isUser ? styles.userTxt : null;
    var avatar = (
      <View>
        <Image style={styles.avatar} source={{uri: 'https://images.pexels.com/photos/430207/pexels-photo-430207.jpeg?auto=compress&cs=tinysrgb&h=350'}} />
      </View>
    );
    var avatarAlready = this.state.prevMessageUser == msg.userId;
    var result = (
      <View key={msg.id} style={[contStyle, styles.msgCont]}>
        {isUser || avatarAlready ? null : avatar}
        <View style={[txtContStyle, styles.msgTxtCont]}>
          <Text style={[styles.msgText, txtStyle]}>{msg.text}</Text>
        </View>
        {isUser && !avatarAlready ? avatar : null}
      </View>
    );
    return result;
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

        {this.state.messagesDOM.length == 0 ?
          <View style={styles.chatFieldEmpty}>
            <View style={styles.emptyMsg}>
              <Text>No one's talkin around you! Start it up!</Text>
            </View>
          </View>
          :
          <View style={styles.chatField}>
            {this.state.messagesDOM}
          </View>
        }

        <View style={styles.inputMsgField}>
          <View style={styles.inputCont}>
            <TextInput
              style={styles.inputField}
              placeholder="Type a message..."
              onChangeText={this.messageInput}
            />
          </View>
          <View style={styles.iconCont}>
            <TouchableOpacity onPress={this.sendMessage}>
              <Icon
                name='send'
                style={styles.sendIcon}
              />
            </TouchableOpacity>
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
    justifyContent: 'flex-end'
  },
    chatFieldEmpty: {
      flex: 8,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    msgCont: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10
    },
      userMsg: {
        alignSelf: 'flex-end'
      },
      otherMsg: {
        alignSelf: 'flex-start'
      },
    avatar: {
      height: 35,
      width: 35,
      borderRadius: 100
    },
    msgTxtCont: {
      margin: 12,
      padding: 12,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15
    },
      userMsgBox: {
        backgroundColor: '#0e8f9e',
        borderTopLeftRadius: 15
      },
      otherMsgBox: {
        backgroundColor: 'white',
        borderTopRightRadius: 15
      },
    msgText: {
      fontFamily: Fonts.SunflowerLight,
      fontSize: 18
    },
      userTxt: {
        color: 'white'
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
    alignSelf: 'flex-end',
    marginLeft: 10
  },
    inputField : {
      fontSize: 18,
      fontFamily: Fonts.SunflowerLight
    },
  sendIcon: {
    fontSize: 25
  }
}
