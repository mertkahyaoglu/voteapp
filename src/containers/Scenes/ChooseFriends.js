import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Fumi } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/EvilIcons'
import IIcon from 'react-native-vector-icons/Ionicons'
import map from 'lodash/map'
import indexOf from 'lodash/indexOf'

import * as Animatable from 'react-native-animatable';

import { FileUpload } from 'NativeModules';

import {
  View, Text, Image, StyleSheet, ListView, TouchableOpacity
} from "react-native";

import Checkbox from '../../components/Checkbox'

import { Color } from '../../constants/Styles'
import { routeVoteView } from '../../constants/Routes'
import { NEW_VOTE } from '../../constants/API'

import { addFriend, removeFriend, clearSources } from '../../actions/home'
import { getFriends } from '../../actions/friend'

class ChooseFriends extends Component {

  componentDidMount() {
    const { getFriends } = this.props
    getFriends()
  }

  handleShare() {
    const { navigator, info, source1, source2, description, clearSources } = this.props
    const btnShare = this.refs.btn_share
    const obj = {
        uploadUrl: NEW_VOTE,
        method: 'POST', // default 'POST',support 'POST' and 'PUT'
        headers: {
          'Accept': 'application/json',
          'startup-access-token': info.token
        },
        fields: {
          'user_id': String(info.id),
          'description': description,
          'email': info.email,
        },
        files: [
          {
            name: 'source1', // optional, if none then `filename` is used instead
            filename: 'source1.jpg', // require, file name
            filepath: source1.uri,
            filetype: 'image/jpeg',
          },
          {
            name: 'source2', // optional, if none then `filename` is used instead
            filename: 'source2.jpg', // require, file name
            filepath: source2.uri,
            filetype: 'image/jpeg',
          },
        ]
    };
    FileUpload.upload(obj, (err, result) => {
      console.log(result);
      if (!err) {
        const data = JSON.parse(result.data)
        if (!data.error) {
          clearSources()
          navigator.resetTo(routeVoteView(data.id))
        } else {
          console.log(data);
        }
      } else {
        console.log(err);
      }
    })
  }

  handleChangeSearch(text) {

  }

  handleChangeCheckbox(userid, checked) {
    const { addFriend, removeFriend } = this.props
    if (checked) {
      addFriend(userid)
    }else {
      removeFriend(userid)
    }
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    const { chosenfriends, friends } = this.props
    return (
      <View style={styles.friendContainer}>
        <View style={styles.userInfo}>
          <Image style={styles.friendThumb} source={{ uri: `http://graph.facebook.com/${friends[rowID].id}/picture?type=small`}} />
          <View style={{ justifyContent: 'space-between'}}>
            <Text style={styles.friendText}>{rowData}</Text>
          </View>
        </View>
        <Checkbox
          checked={indexOf(chosenfriends, friends[rowID].id) != -1}
          onChange={(checked) => this.handleChangeCheckbox(friends[rowID].id, checked)} />
      </View>
    )
  }

  render() {
    const { navigator, chosenfriends, friends, isFetching } = this.props
    if (isFetching) {
      return (<View style={styles.container}>
        <Animatable.View style={{ padding: 15 }} animation="rotate" easing="linear" iterationCount="infinite">
          <Icon style={{ textAlign: 'center' }} name="spinner-3" size={36} color={Color.primary} />
        </Animatable.View>
      </View>)
    }
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const data = map(friends, n => n.name)
    return (
      <View style={styles.container}>
        <Fumi
          label={'Search friends'}
          iconClass={Icon}
          iconName={'search'}
          autoFocus={false}
          blurOnSubmit={true}
          iconColor={Color.secondary}
          onChangeText={(text) => this.handleChangeSearch(text)}
          style={styles.searchInput}
        />
        <ListView
          style={{marginBottom: 64}}
          dataSource={ds.cloneWithRows(data)}
          renderRow={this.renderRow.bind(this)}
        />
        <View style={styles.shareButton}>
          <TouchableOpacity
            ref="btn_share"
            onPress={() => { if(chosenfriends.length) this.handleShare()}}
            activeOpacity={0.8}
            style={{backgroundColor: chosenfriends.length ? Color.secondary : '#ccc', padding: 15}}>
              <Text
                style={{color: 'white', textAlign: 'center', fontSize: 24}}>
                Share
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchInput: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  friendThumb: {
    borderRadius: 24,
    width: 48,
    height: 48,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Color.primary
  },
  friendName: {
    color: '#000',
    fontSize: 168,
  },
  inviteText: {
    color: Color.secondary,
    fontSize: 16
  },
  shareButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
})

ChooseFriends.propTypes = {
  addFriend: PropTypes.func.isRequired,
  removeFriend: PropTypes.func.isRequired,
  clearSources: PropTypes.func.isRequired,
  getFriends: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  chosenfriends: PropTypes.array.isRequired,
  friends: PropTypes.array.isRequired,
  info: PropTypes.object.isRequired,
  source1: PropTypes.any.isRequired,
  source2: PropTypes.any.isRequired,
  description: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  chosenfriends: state.home.chosenfriends,
  friends: state.friend.friends,
  isFetching: state.friend.isFetching,
  info: state.login.info,
  source1: state.home.source1,
  source2: state.home.source2,
  description: state.home.description,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addFriend,
  removeFriend,
  clearSources,
  getFriends,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChooseFriends);
