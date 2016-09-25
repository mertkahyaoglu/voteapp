import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import map from 'lodash/map'

import Button from 'apsl-react-native-button'

import {
  View, Text, Image, StyleSheet, Alert
} from "react-native";
import { LoginManager } from 'react-native-fbsdk'

import { routeLogin } from '../../constants/Routes'

class Settings extends Component {

  handleLogoutPress() {
    Alert.alert(
      'Kaçıyor musun?',
      'Son kararın mı?',
      [
        {text: 'Az daha kalayım.', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Evet', onPress: () => {
          LoginManager.logOut()
          this.props.navigator.resetTo(routeLogin)
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
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
