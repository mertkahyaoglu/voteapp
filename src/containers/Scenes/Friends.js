import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import Button from 'apsl-react-native-button'

import {
  View, Text, Image, StyleSheet, Alert
} from "react-native";

class Friends extends Component {

  render() {
    const { navigator } = this.props
    return (
      <View style={styles.container}>
        <Text>friends</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
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
