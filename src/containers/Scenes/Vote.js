import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/EvilIcons'
import * as Animatable from 'react-native-animatable';

import {
  View, Text, Image, StyleSheet, TouchableOpacity, TextInput
} from "react-native";

import { Color } from '../../constants/Styles'
import { HOST, getVoteUrl } from '../../constants/API'

import { voteOne, getVote, clearVote } from '../../actions/vote'

class Vote extends Component {

  componentDidMount() {
    const { route, getVote, clearVote, info } = this.props
    clearVote()
    fetch(getVoteUrl(route.voteId), {
      headers: { "startup-access-token": info.token }
    })
    .then(res => res.json())
    .then(getVote)
    .catch(console.log);
  }

  handleChoose(source) {
    const { voteOne, chosenSource } = this.props
    if (!chosenSource) {
      voteOne(source)
    }
  }

  render() {
    const { vote, chosenSource } = this.props;
    console.log(vote);
    return (
      <View style={styles.container}>
        <View style={{flex:1, position: 'relative'}}>
          <TouchableOpacity style={{flex: 1}} activeOpacity={0.8} onPress={() => this.handleChoose(1)}>
            <Image style={styles.uploadImage} source={{uri: `${HOST+vote.source1_path}`}} />
          </TouchableOpacity>
          {
            chosenSource == 1 &&
            <View style={styles.modalContainer} >
              <Animatable.View animation="fadeIn" style={styles.modal}>
                <View style={styles.submitButton}>
                  <Icon color={Color.green} name="check" size={144} />
                </View>
              </Animatable.View>
            </View>
          }
        </View>
        <Text style={styles.description}>{vote.description}</Text>
          <View style={{flex:1, position: 'relative'}}>
            <TouchableOpacity style={{flex: 1}} activeOpacity={0.8} onPress={() => this.handleChoose(2)}>
              <Image style={styles.uploadImage} source={{uri:`${HOST+vote.source2_path}`}} />
            </TouchableOpacity>

            {
              chosenSource == 2 &&
              <View style={styles.modalContainer} >
                <Animatable.View animation="fadeIn" style={styles.modal}>
                  <View style={styles.submitButton}>
                    <Icon color={Color.green} name="check" size={144} />
                  </View>
                </Animatable.View>
              </View>
            }
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
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0, 0.6)',
  },
  modal: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voteText: {
    backgroundColor: Color.secondary,
    borderRadius: 32,
    color: 'white'
  },
})

Vote.propTypes = {
  voteOne: PropTypes.func.isRequired,
  vote: PropTypes.any.isRequired,
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  chosenSource: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  chosenSource: state.vote.chosenSource,
  vote: state.vote.vote,
  info: state.login.info
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  voteOne,
  getVote,
  clearVote
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
