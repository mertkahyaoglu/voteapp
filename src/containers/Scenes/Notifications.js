import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import map from 'lodash/map'

import {
  View, ScrollView, Text, Image, TouchableHighlight, StyleSheet, ListView,
} from "react-native";

import { notifs } from '../../constants/MockUps'

class Notifications extends Component {

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <View style={styles.notificationContainer}>
        <Image style={styles.notificationThumb} source={{ uri: notifs[rowID].picture }} />
        <View style={{flex:1, flexDirection: 'column'}}>
          <Text style={styles.notificationText}>{rowData}</Text>
          <Text style={styles.notificationDateText}>{notifs[rowID].date}</Text>
        </View>
      </View>
    )
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const data = map(notifs, n => n.text)
    // EMPTY CHECK
    return (
      <View style={styles.container}>
        <ListView
          style={{padding: 10}}
          dataSource={ds.cloneWithRows(data)}
          renderRow={this.renderRow}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notificationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  notificationThumb: {
    borderRadius: 24,
    width: 48,
    height: 48,
    marginRight: 10,
  },
  notificationText: {
    color: '#000',
    fontSize: 16,
  },
  notificationDateText: {
    color: '#888',
    fontSize: 14,
  },
})

Notifications.propTypes = {
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
