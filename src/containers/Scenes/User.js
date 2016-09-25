import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import {
  View, ScrollView, Text, Image, TouchableHighlight, StyleSheet, Alert,
} from "react-native";
import { LoginManager } from 'react-native-fbsdk'

import Icon from 'react-native-vector-icons/EvilIcons'
import GridImages from '../../components/GridImages';

import { routeSettings } from '../../constants/Routes'
const image_logout = require('../../assets/img/fb_logout.png')

class User extends Component {

  onPress() {
    const { navigator } = this.props
    Alert.alert(
      'Logout ?',
      'Are you sure to log out?',
      [
        {text: 'No', onPress: () => false},
        {text: 'Yes', onPress: () => {
          LoginManager.logOut()
          navigator.replace(routeSettings())
        }},
      ]
    )
  }

  render() {
    const { navigator } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image style={styles.picture} source={{ uri: 'https://unsplash.it/128/128'}} />
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={styles.user}>Mert Kahyaoğlu</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#59B5CF'}}>10</Text>
                <Text style={{fontSize: 16, color: '#444'}}>Gönderi</Text>
              </View>
              <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#59B5CF'}}>42</Text>
                <Text style={{fontSize: 16, color: '#444'}}>Oylama</Text>
              </View>
            </View>
          </View>
        </View>
        <GridImages />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: .7,
  },
  profile: {
    flex: .3,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  picture: {
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#59B5CF',
    width: 108,
    height: 108,
    marginRight: 20,
  },
  user: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  settings: {
  },
})

User.propTypes = {
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);
