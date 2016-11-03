import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'

import Icon from 'react-native-vector-icons/EvilIcons'
import * as Animatable from 'react-native-animatable';

import { View, StyleSheet } from "react-native"

import { authenticate } from '../../actions/login'

import { routeLogin, routeHome } from '../../constants/Routes'

import { Color } from '../../constants/Styles'

class Splash extends Component {

  componentDidMount() {
    const { navigator, authenticate } = this.props
    authenticate()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authFailed === true) {
      nextProps.navigator.resetTo(routeLogin())
    } else {
      nextProps.navigator.resetTo(routeHome())
    }
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
  authenticate: PropTypes.func.isRequired,
  authFailed: PropTypes.any.isRequired,
  navigator: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authFailed: state.login.authFailed
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  authenticate
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
