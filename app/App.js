/*
 * Main file that overlooks entire app routing
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Router,
  Scene,
  Stack
} from 'react-native-router-flux';

// Imported screens to route through
import Home from './screens/home.js';
import Loading from './screens/loading.js';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Router>
        <Stack key='root' style={{paddingTop: 54}}>
          <Scene key='home' component={Home} title="Home" hideNavBar={true} />
          <Scene key='loading' component={Loading} title='Loading' />
          {/*
          <Scene key='chat' component={Chat} title='Chat' hideNavBar={false} />
          */}
        </Stack>
      </Router>
    );
  }
}
