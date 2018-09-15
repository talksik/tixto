/*
 * Twitter view component for the chat
 */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {};
export default class NewsPost extends Component<Props> {

  handleClick = () => {
    Linking.canOpenURL(this.props.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  };

  render() {
    const { title, source } = this.props;

    return (
      <TouchableOpacity onPress={this.handleClick} style={styles.container}>
        <Icon
          name='newspaper-o'
          style={styles.icon}
        />
        <Text style={styles.bodyTxt}>{title}</Text>

        <View style={styles.infoCont}>
          <Text style={styles.typeTxt}>unversal</Text>
          <Text style={styles.screenNameTxt}>@{source}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'black',
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
    color: 'gold'
  },
  bodyTxt: {
    fontSize: 16,
    color: 'white',
    margin: 5
  },
  infoCont: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5
  },
    typeTxt: {
      fontSize: 12,
      color: 'gold',
      borderRadius: 4,
      padding: 5
    },
    screenNameTxt: {
      fontSize: 12,
      color: 'gold'
    }
}
