import React, { Component, PropTypes } from "react"

import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native"

export default class Notification extends Component {

    render() {
      const { picture, text, type, date } = this.props
      return (
        <View>
          <Text>{text}</Text>
        </View>
      );
    }

}

const styles = StyleSheet.create({
  row: {
    flex: 1,
  },
})

Notification.propTypes = {
  picture: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}
