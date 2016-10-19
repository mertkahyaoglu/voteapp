import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import IIcon from 'react-native-vector-icons/Ionicons'

import {
  View, Text, Image, StyleSheet, Alert, TouchableOpacity
} from "react-native";

import { Color } from '../../constants/Styles'

class VoteView extends Component {

  render() {
    const { source1, source2, description } = this.props;
    return (
      <View style={styles.container}>
        <View style={{flex:1, position: 'relative'}}>
          <Image style={styles.uploadImage} source={source1} />
          <TouchableOpacity style={[styles.votesButton, styles.votesButtonHigh, styles.votesButtonN]} activeOpacity={1} onPress={() => console.log()}>
            <Text style={styles.votesText}>0</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={{flex:1, position: 'relative'}}>
          <Image style={styles.uploadImage} source={source2} />
          <TouchableOpacity style={[styles.votesButton,styles.votesButtonLow, styles.votesButtonN]} activeOpacity={1} onPress={() => console.log()}>
            <Text style={styles.votesText}>0</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    position: 'relative'
  },
  uploadImage: {
    flex: 1,
    width: null,
    height: null,
  },
  description: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
    color: Color.primary,
    backgroundColor: 'white'
  },
  votesButton: {
    position: 'absolute',
    width: 64,
    height: 48,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  votesButtonHigh: {
    top: 20,
    right: 0,
    paddingRight: 8,
    backgroundColor: 'rgba(20, 208, 72, 0.7)',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  votesButtonLow: {
    bottom: 20,
    left: 0,
    paddingLeft: 8,
    backgroundColor: 'rgba(255, 89, 77, 0.7)',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  votesButtonN: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  votesText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold'
  },
  bottomArrow: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  }
})

VoteView.propTypes = {
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  source1: PropTypes.any.isRequired,
  source2: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  source1: state.home.source1,
  source2: state.home.source2,
  description: state.home.description,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VoteView);
