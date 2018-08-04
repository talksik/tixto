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
const io = require('socket.io-client/dist/socket.io');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {};
export default class Chat extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      messageToSend : '',
      messagesDOM: [],
      prevMessageUser: null,
      userId: null,

    };
    /**
    *   todo fix AsyncStorage
    */

    console.log(props);
  }

  componentDidMount() {
    this.socket = io('http://10.0.2.2:3000', {jsonp: false});
    this.socket.on('connect', () => {
      this.socket.emit('initial', {position: this.props.position, avatar: this.props.avatar});
    });

    this.socket.on("userId", (obj) => {
      console.log("User Id assigned: " + obj.userId);
      this.setState({userId: obj.userId});
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
    var oldDOM = this.state.messagesDOM;

    var newMessage = this.createMessage(msg);

    if (this.state.prevMessageUser != msg.user_id && this.state.prevMessageUser) {
      var dotSeparator = (
        <View key={msg.text} style={styles.separatorCont}>
          <Text>. .</Text>
        </View>
      );
      oldDOM.push(dotSeparator);
    }

    oldDOM.push(newMessage);

    this.setState({
      messagesDOM: oldDOM,
      prevMessageUser: msg.user_id
    });
  }

  sendMessage = () => {
    console.log(this.state.userId);
    console.log('Message to send: ' + this.state.messageToSend);

    this.socket.emit('newMessage', {
      user_id: this.state.userId,
      text: this.state.messageToSend,
      long: this.props.position.long,
      lat: this.props.position.lat,
      avatar: this.props.avatar
    });

    this.setState({
      messageToSend: ''
    });
  }

  createMessage = (msg) => {
    var isUser = msg.user_id == this.state.userId;
    var contStyle = isUser ? styles.userMsg : styles.otherMsg;
    var txtContStyle = isUser ? styles.userMsgBox : styles.otherMsgBox;
    var txtStyle = isUser ? styles.userTxt : null;
    var avatarLink = msg.avatar;
    var avatar = (
      <View>
        <Image style={styles.avatar} source={{uri: avatarLink}} />
      </View>
    );
    var avatarAlready = this.state.prevMessageUser == msg.user_id;
    var result = (
      <View key={msg.id}
        style={[contStyle, styles.msgCont, avatarAlready ? styles.avatarAlready : null]}>
        {!isUser && !avatarAlready ? avatar : null}
        <View style={[txtContStyle, styles.msgTxtCont]}>
          <Text style={[styles.msgText, txtStyle]}>{msg.text}</Text>
        </View>
        {isUser && !avatarAlready ? avatar : null}
      </View>
    );
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
      alignItems: 'center',
      margin: 2
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
      width: 0,
        flex: 1,
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
