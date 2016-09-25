import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'

import {
  Text, View, Image, TouchableHighlight, StyleSheet,
} from "react-native"
import { LoginManager } from 'react-native-fbsdk'

import Icon from 'react-native-vector-icons/EvilIcons'

import { routeSplash } from '../../constants/Routes'
import { Color } from '../../constants/Styles'

const image_logo = require('../../assets/img/logo.png')

class Login extends Component {

  onLoginButtonPress() {
    const { navigator } = this.props
    LoginManager.logInWithReadPermissions(
      ['public_profile', 'user_friends']).then(result => {
        if (result.isCancelled) {} else {
          navigator.replace(routeSplash())
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
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
