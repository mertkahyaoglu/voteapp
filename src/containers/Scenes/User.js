import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { LoginManager } from 'react-native-fbsdk'
import Icon from 'react-native-vector-icons/EvilIcons'

import {
  View, ScrollView, Text, Image, TouchableHighlight, StyleSheet, Alert,
} from "react-native";

import GridImages from '../../components/GridImages';

import { routeSettings } from '../../constants/Routes'
import { Color } from '../../constants/Styles'

import { getVotes } from '../../actions/vote'

const default_user = require('../../assets/img/default-user.jpg')

class User extends Component {

  componentDidMount() {
    const { getVotes, info } = this.props
    getVotes(info)
  }

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
    const { navigator, info, votes } = this.props
    const profile_pic = info ?
      { uri: `http://graph.facebook.com/${info.face_id}/picture?type=large`} : ''

    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image style={styles.picture} ref="profile_picture" source={profile_pic || default_user} />
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={styles.user}>{info.name}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: Color.secondary}}>{votes.length}</Text>
                <Text style={{fontSize: 16, color: '#444'}}>Gönderi</Text>
              </View>
              <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: Color.secondary}}>42</Text>
                <Text style={{fontSize: 16, color: '#444'}}>Oylama</Text>
              </View>
            </View>
          </View>
        </View>
        <GridImages votes={votes} navigator={navigator} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    flex: .25,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  picture: {
    borderRadius: 64,
    borderWidth: 4,
    borderColor: Color.primary,
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
  getVotes: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  info: state.login.info,
  votes: state.vote.votes
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getVotes
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);
