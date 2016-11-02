import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Fumi } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/EvilIcons'
import map from 'lodash/map'

import {
  View, Text, Image, StyleSheet, Alert, ListView, TouchableOpacity
} from "react-native";

import { Color } from '../../constants/Styles'
import { friends } from '../../constants/MockUps'

class Friends extends Component {

  componentDidMount() {
    
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <View style={styles.friendContainer}>
        <View style={styles.userInfo}>
          <Image style={styles.friendThumb} source={{ uri: friends[rowID].picture }} />
          <View style={{ justifyContent: 'space-between'}}>
            <Text style={styles.friendText}>{rowData}</Text>
          </View>
        </View>
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
          dataSource={ds.cloneWithRows(data)}
          renderRow={this.renderRow.bind(this)}
        />
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
})

Friends.propTypes = {
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
