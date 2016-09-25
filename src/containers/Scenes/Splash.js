import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import Icon from 'react-native-vector-icons/EvilIcons'
import * as Animatable from 'react-native-animatable';

import { View, StyleSheet } from "react-native"

import { storeUserInfo } from '../../actions/login'

import { routeLogin, routeHome } from '../../constants/Routes'
import { Color } from '../../constants/Styles'

class Splash extends Component {

  componentDidMount() {
    const { navigator, storeUserInfo } = this.props
    AccessToken.getCurrentAccessToken().then(token => {
      if (token && token.accessToken) {
        const infoRequest = new GraphRequest(
          '/me',
          null,
          (error, result) => {
            storeUserInfo(result);
            navigator.replace(routeHome())
          }
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      }else {
        navigator.replace(routeLogin())
      }
    })
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
    backgroundColor: Color.primary,
  }
});

Splash.propTypes = {
  navigator: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  storeUserInfo
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
