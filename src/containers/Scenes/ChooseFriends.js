import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Fumi } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/EvilIcons'
import IIcon from 'react-native-vector-icons/Ionicons'
import map from 'lodash/map'
import indexOf from 'lodash/indexOf'

import { FileUpload } from 'NativeModules';

import {
  View, Text, Image, StyleSheet, ListView, TouchableOpacity
} from "react-native";

import Checkbox from '../../components/Checkbox'

import { Color } from '../../constants/Styles'
import { friends } from '../../constants/MockUps'
import { routeVoteView } from '../../constants/Routes'
import { NEW_VOTE } from '../../constants/API'

import { addFriend, removeFriend } from '../../actions/home'

class ChooseFriends extends Component {

  handleShare() {
    const { navigator, info, source1, source2, description } = this.props

    var obj = {
        uploadUrl: NEW_VOTE,
        method: 'POST', // default 'POST',support 'POST' and 'PUT'
        headers: {
          'Accept': 'application/json',
        },
        fields: {
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
    FileUpload.upload(obj, function(err, result) {
      if (!err) {
        const voteId = JSON.parse(result.data).id
        console.log(voteId);
        navigator.push(routeVoteView(voteId))
      } else {
        // error
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
    const { chosenfriends } = this.props
    return (
      <View style={styles.friendContainer}>
        <View style={styles.userInfo}>
          <Image style={styles.friendThumb} source={{ uri: friends[rowID].picture }} />
          <View style={{ justifyContent: 'space-between'}}>
            <Text style={styles.friendText}>{rowData}</Text>
          </View>
        </View>
        <Checkbox
          checked={indexOf(chosenfriends, friends[rowID].userid) != -1}
          onChange={(checked) => this.handleChangeCheckbox(friends[rowID].userid, checked)} />
      </View>
    )
  }

  render() {
    const { navigator, chosenfriends } = this.props
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
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  chosenfriends: PropTypes.array.isRequired,
  info: PropTypes.object.isRequired,
  source1: PropTypes.any.isRequired,
  source2: PropTypes.any.isRequired,
  description: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  chosenfriends: state.home.chosenfriends,
  info: state.login.info,
  source1: state.home.source1,
  source2: state.home.source2,
  description: state.home.description,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addFriend,
  removeFriend
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChooseFriends);
