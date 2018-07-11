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
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Fonts } from '../../utils/Fonts.js';
require('react-native');

// Socket.io imports
import './UserAgent';
window.navigator.userAgent = "react-native";
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
      prevMessageUser: -1,
      messages: [(<View key={0}><Text>adf</Text></View>), (<View key={1}><Text>second</Text></View>)]
    };
    /**
    *   todo fix AsyncStorage
    */
    this.position = this.props.position;
  }

  componentWillMount() {
    this.socket = io('10.0.2.2:3000', {jsonp: false});
    this.socket.on('connect', () => {
      console.log('again');
      this.socket.emit('initial', this.position);
    });

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
    console.log('New message received: ');
    console.log(msg);
    var oldDOM = this.state.messagesDOM;
    var newMessage = this.createMessage(msg);
    oldDOM.push(newMessage);
    if (this.state.prevMessageUser != msg.userId) {
      var dotSeparator = (
        <View key={-msg.id} style={styles.separatorCont}>
          <Text>. .</Text>
        </View>
      );
      oldDOM.push(dotSeparator);
    }
    this.setState({
      messagesDOM: oldDOM,
      prevMessageUser: msg.userId
    });
  }

  sendMessage = () => {
    console.log('Message to send: ' + this.state.messageToSend);
    this.socket.emit('newMessage', {
      userId: this.userId,
      text: this.state.messageToSend,
      lng: this.position.long,
      lat: this.position.lat
    });
    this.setState({
      messageToSend: ''
    });
  }

  createMessage = (msg) => {
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
      <View key={msg.id}
        style={[contStyle, styles.msgCont, avatarAlready ? styles.avatarAlready : null]}>
        {isUser || avatarAlready ? null : avatar}
        <View style={[txtContStyle, styles.msgTxtCont]}>
          <Text style={[styles.msgText, txtStyle]}>{msg.text}</Text>
        </View>
        {isUser && !avatarAlready ? avatar : null}
      </View>
    );
    console.log(result);
    return result;
  }

  messageInput = (text) => {
    this.setState({
      messageToSend : text
    });
  }

  sendFieldStyle = () => {
    return this.state.messageToSend == '' ? styles.sendIcon : styles.sendIconColor;
  }

  render() {
    console.log('rrendering');
    console.log(this.state.messagesDOM);
    return (
      <View style={styles.container}>

        {this.state.messagesDOM.length == 0 ?
          (<View style={styles.chatFieldEmpty}>
            <View style={styles.emptyMsg}>
              <Text>No one's talkin around you! Start it up!</Text>
            </View>
          </View>)
          :
          (<View style={styles.chatField}>
            {this.state.messagesDOM}
          </View>)
        }

        <View style={styles.inputMsgField}>
          <View style={styles.inputCont}>
            <TextInput
              style={styles.inputField}
              placeholder="Type a message..."
              onChangeText={this.messageInput}
              value={this.state.messageToSend}
            />
          </View>
          <View style={styles.iconCont}>
            <TouchableOpacity onPress={this.sendMessage}>
              <Icon
                name='send'
                style={this.sendFieldStyle()}
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
      alignItems: 'center'
    },
      userMsg: {
        alignSelf: 'flex-end'
      },
      otherMsg: {
        alignSelf: 'flex-start'
      },
      avatarAlready: {
        marginRight: 45,
        marginLeft: 45
      },
    avatar: {
      height: 35,
      width: 35,
      borderRadius: 100,
      margin: 5
    },
    msgTxtCont: {
      margin: 3,
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
    separatorCont: {
      justifyContent: 'center',
      alignItems: 'center'
    },
  inputMsgField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: 'white',
    marginTop: 10
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
  },
    sendIconColor: {
      fontSize: 25,
      color: '#0e8f9e'
    }
}
