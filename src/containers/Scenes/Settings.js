import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import map from 'lodash/map'

import Button from 'apsl-react-native-button'

import {
  View, Text, Image, StyleSheet, Alert
} from "react-native";

import { LoginManager } from 'react-native-fbsdk'

import { logout } from '../../actions/login'
import { routeLogin } from '../../constants/Routes'

class Settings extends Component {

  handleLogoutPress() {
    const { logout } = this.props
    Alert.alert(
      'Logout',
      'Are you sure to log out?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => {
          LoginManager.logOut()
          this.props.navigator.resetTo(routeLogin())
        }},
      ]
    )
  }

  render() {
    const { navigator } = this.props
    return (
      <View style={styles.container}>
        <Button onPress={() => this.handleLogoutPress()} style={{backgroundColor: 'white'}} textStyle={{fontSize: 18, color: '#444'}}>
          Çıkış Yap
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
})

Settings.propTypes = {
  logout: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
