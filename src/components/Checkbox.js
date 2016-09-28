import React, { Component, PropTypes } from "react"
import IIcon from 'react-native-vector-icons/Ionicons'

import {
  StyleSheet, TouchableOpacity
} from "react-native"

import { Color } from '../constants/Styles'

export default class Checkbox extends Component {

  onChange() {
    if (this.props.onChange) {
      this.props.onChange(!this.props.checked)
    }
  }

  render() {
    const { checked, onChange } = this.props
    return (
      <TouchableOpacity onPress={() => this.onChange()}>
        <IIcon
          name={checked ? "md-checkbox-outline" : "md-square-outline"}
          size={30}
          color={Color.primary} />
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
})

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
}
