import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'

import {
  Text, View, Image, TouchableHighlight, StyleSheet,
} from "react-native"
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

import Icon from 'react-native-vector-icons/EvilIcons'

import { routeHome } from '../../constants/Routes'
import { Color } from '../../constants/Styles'
import { REGISTER } from '../../constants/API'

import { storeUserInfo } from '../../actions/login'
const image_logo = require('../../assets/img/logo.png')

class Login extends Component {

  onLoginButtonPress() {
    const { navigator, storeUserInfo } = this.props
    LoginManager.logInWithReadPermissions(
      ['public_profile', 'user_friends', 'email']).then(result => {
        if (result.isCancelled) {}
        else {
          AccessToken.getCurrentAccessToken().then(token => {
            if (token && token.accessToken) {
              const infoRequest = new GraphRequest('/me?fields=id,name,email', null,
                (error, result) => {
                  storeUserInfo(result);
                  fetch(REGISTER, {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      access_token: token.accessToken,
                      name: result.name,
                      email: result.email,
                    })
                  })
                  .then(res => res.json())
                  .then((res) => {
                    if (!res.error) {
                      storeUserInfo({
                        id: res.id,
                        face_id: result.id,
                        name: result.name,
                        token: res.token
                      });
                      navigator.replace(routeHome())
                    } else {
                      console.log(res.error);
                    }
                  })
                  .catch(console.error);
                }
              );
              new GraphRequestManager().addRequest(infoRequest).start();
            }
          })
        }
      }, (error) => {}
    )
  }

  render() {
    const { navigator } = this.props
    return (
      <View style={styles.container}>
        <Image source={image_logo} style={styles.logo} />
        <Text style={styles.title}>Startup</Text>
        <Text style={styles.slogan}>Choosing made simple!</Text>
        <Icon.Button
          name="sc-facebook"
          backgroundColor="#3b5998"
          size={48}
          onPress={() => this.onLoginButtonPress()}>
          <Text style={styles.login}>Login with Facebook</Text>
        </Icon.Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 40,
  },
  title: {
    color: 'white',
    fontSize: 48,
    fontFamily: 'hobo',
    marginBottom: 10,
  },
  slogan: {
    color: 'white',
    fontSize: 24,
    marginBottom: 60,
  },
  login: {
    fontSize: 24,
    color: 'white'
  },
})

Login.propTypes = {
  storeUserInfo: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  storeUserInfo
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
