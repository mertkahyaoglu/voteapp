import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import map from 'lodash/map'

import {
  View, ScrollView, Text, Image, TouchableHighlight, StyleSheet, ListView,
} from "react-native";

import { getNotifications } from '../../actions/notification'
import { getNotificationsUrl } from '../../constants/API'
import { Color } from '../../constants/Styles'

const Row = (props) => (
  <View style={styles.container}>
    <Image source={{ uri: props.picture.large}} style={styles.photo} />
    <Text style={styles.text}>
      {`${props.name.first} ${props.name.last}`}
    </Text>
  </View>
);

class Notifications extends Component {

  componentDidMount() {
    const { info, getNotifications } = this.props
    fetch(getNotificationsUrl(info.id), {
      headers: {
        'startup-access-token': info.token
      }
    })
    .then(res => res.json())
    .then(getNotifications)
    .catch(console.log);
  }

  renderRow(rowData) {
    return (
      <View style={styles.notificationContainer}>
        <View style={{flex:1, flexDirection: 'column'}}>
          <Text style={styles.notificationText}>{rowData.type}</Text>
          <Text style={styles.notificationDateText}>{rowData.id}</Text>
        </View>
      </View>
    )
  }

  render() {
    const { notifications } = this.props
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <View style={styles.container}>
        {
          notifications.length > 0 && <ListView
            dataSource={ds.cloneWithRows(notifications)}
            renderRow={(data) => this.renderRow(data)}
          />
        }
        {
          notifications.length < 1 && <Text style={{padding: 10, fontSize:24}}>You do not have any notifications.</Text>
        }
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
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  notificationThumb: {
    borderRadius: 24,
    width: 48,
    height: 48,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Color.primary
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
  getNotifications: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  info: state.login.info,
  notifications: state.notification.notifications,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getNotifications
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
