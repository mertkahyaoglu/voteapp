import React, { Component, PropTypes } from "react";

import { View, StyleSheet } from "react-native";
import { AccessToken } from 'react-native-fbsdk'

import Icon from 'react-native-vector-icons/EvilIcons'
import * as Animatable from 'react-native-animatable';

import { routeLogin, routeHome } from '../../constants/Routes'

export default class Splash extends Component {

  componentDidMount() {
    const { navigator } = this.props
    setTimeout(() => AccessToken.getCurrentAccessToken().then(data => {
      if (data && data.accessToken) {
        navigator.replace(routeHome())
      }else {
        navigator.replace(routeLogin())
      }
    }), 1000)
  }

  render() {
    return (
      <View style={styles.container}>
        <Animatable.View animation="rotate" easing="linear" iterationCount="infinite">
          <Icon name="spinner-3" size={64} color="#fff" />
        </Animatable.View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5FC6DC'
  }
});

Splash.propTypes = {
  navigator: PropTypes.object.isRequired,
};
