/*
 * Chat component within Main
 */
import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
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
import TwitterPost from './apis/twitter.js';
import NewsPost from './apis/news.js';

import WelcomeMsg from './components/welcomemsg.js';

window.navigator.userAgent = "react-native";
const io = require('socket.io-client/dist/socket.io');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const loadingGIF = '../../assets/images/loadingChat.gif';

type Props = {};
export default class Chat extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      messageToSend : '',
      messagesDOM: [],
      prevMessageUser: null,
      userId: null,
      avatar: null
    };
    /**
    *   todo fix AsyncStorage
    */

    console.log(props);
  }

  storeItem = async (location, item) => {
    try {
      await AsyncStorage.setItem(location, item);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }

  retrieveUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      var id;
      if (value !== null) {
        // We have data!!
        console.log("Have user id: " + value);
        this.socket.emit('userId', {user_id: parseInt(value), newUser: false, position: this.props.position, avatar: this.props.avatar});
        id = parseInt(value);
      } else {
        this.socket.emit('userId', {user_id: value, newUser: true, position: this.props.position, avatar: this.props.avatar});
        this.socket.on('getNewUserId', (result) => {
          console.log('New id: ' + result.user_id);
          this.storeItem('userId', result.user_id.toString());
          id = result.user_id;
        });
      }

      this.setState({
        userId: id
      });
     } catch (error) {
       // Error retrieving data
       console.log(error);
     }
  }

  componentDidMount() {
    var stored_userId = this.retrieveUserId();

    this.socket = io('http://10.0.2.2:3000', {jsonp: false});
    this.socket.on('connect', () => {
      this.socket.emit('initial', {position: this.props.position, avatar: this.props.avatar});
    });

    this.socket.on('initMessages', (allMsg) => {
      console.log('Initial messages received: ' + allMsg);
      allMsg.map((msg) => {
        this.addMessage(msg);
      });
    });

    var oldDOM = this.state.messagesDOM;



    this.socket.on('initNews', (posts) => {
      console.log(posts);

      oldDOM.push(
        <WelcomeMsg key={0} />
      );

      this.setState({
        news: posts,
        postNum: 0
      });
    });

    this.socket.on('newMessage', (msg) => {
      this.addMessage(msg);
    });
  }

  addMessage = (msg) => {
    console.log('New message received!');
    var oldDOM = this.state.messagesDOM;

    var newNews = oldDOM.length % 5 == 0;

    if (newNews) {
      var actualPost = this.state.news[this.state.postNum];
      var newPost = (
        <NewsPost key={actualPost.uuid} title={actualPost.title} source={actualPost.thread.site} url={actualPost.url} />
      );

      oldDOM.push(newPost);
    }

    var newMessage = this.createMessage(msg);

    if (this.state.prevMessageUser != msg.user_id && this.state.prevMessageUser || newNews) {
      var dotSeparator = (
        <View key={msg.created} style={styles.separatorCont}>
          <Text>. .</Text>
        </View>
      );
      oldDOM.push(dotSeparator);

      var dateParts = isoFormatDateString.split("-");
      var jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));

      var dateUpdate = (
        <View key={msg.created} style={styles.dateUpdateCont}>
          <Text style={styles.dateUpdateTxt}>{jsDate}</Text>
        </View>
      );
      oldDOM.push(dateUpdate);
    }

    oldDOM.push(newMessage);



    this.setState({
      messagesDOM: oldDOM,
      prevMessageUser: msg.user_id,
      postNum: this.state.postNum + 1
    });
  }

  sendMessage = () => {
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
    console.log(msg.id);
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
            <Image style={styles.loadingGif} source={require(loadingGIF)} />
            <Text>Looking for conversations going around you!!!</Text>
          </View>)
          :
          (
          <View style={styles.chatField}>
            <ScrollView
              ref={ref => this.scrollView = ref}
              onContentSizeChange={(contentWidth, contentHeight) => {
                  this.scrollView.scrollToEnd({animated: true});
              }}
              scrollEnabled={true}
              contentContainerStyle={styles.chatFieldScroll}>

              {this.state.messagesDOM}

            </ScrollView>
          </View>
          )
        }

        <View style={styles.inputMsgField}>
          <View style={styles.inputCont}>
            <TextInput
              style={styles.inputField}
              placeholder="Type a message..."
              onChangeText={this.messageInput}
              value={this.state.messageToSend}
              multiline = {true}
              numberOfLines = {4}
              maxLength = {220}
              underlineColorAndroid='rgba(0,0,0,0)'
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
    flex: 8
  },
  chatFieldScroll: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
    chatFieldEmpty: {
      flex: 8,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
      loadingGif: {
        height: 50,
        width: 50
      },
    msgCont: {
      flexDirection: 'row',
      alignSelf: 'stretch',
      padding: 5
    },
      userMsg: {
        justifyContent: 'flex-end'
      },
      otherMsg: {
        justifyContent: 'flex-start'
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
      maxWidth: windowWidth - 100,
      padding: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0,
      elevation: 3
    },
      userMsgBox: {
        backgroundColor: '#0e8f9e',
        borderTopLeftRadius: 10
      },
      otherMsgBox: {
        backgroundColor: 'white',
        borderTopRightRadius: 10
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
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 12,
    backgroundColor: 'white',
    shadowColor: '#0e8f9e',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 5,
    padding: 2
  },
  inputCont: {
    flex: 6
  },
    inputField : {
      fontSize: 18,
      fontFamily: Fonts.SunflowerLight
    },
  iconCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: '#c7c9cc',
    borderLeftWidth: 1
  },
    sendIcon: {
      fontSize: 15
    },
    sendIconColor: {
      fontSize: 25,
      color: '#0e8f9e'
    },
  dateUpdateCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
    dateUpdateTxt: {
      fontSize: 12
    }
}
