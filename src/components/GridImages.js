import React, { Component, PropTypes } from "react"
import _ from 'lodash'

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native"

const { width, height } = Dimensions.get('window')
import { HOST } from '../constants/API'
import { Color } from '../constants/Styles'
import { routeVote } from '../constants/Routes'

const VOTES_PER_ROW = 3

export default class GridImages extends Component {

    calculatedSize() {
      const size = width / VOTES_PER_ROW
      return { width: size, height: size/2 }
    }

    handleImageClick(voteId) {
      const { navigator } = this.props
      navigator.push(routeVote(voteId))
    }

    renderRow(votesForRow) {
      return votesForRow.map((vote, i) => {
        return (
          <TouchableOpacity key={i} style={styles.imagesContainer} onPress={() => this.handleImageClick(vote.id)}>
            <Image
              style={[this.calculatedSize(), {borderColor: Color.primary, borderBottomWidth: 1}]}
              source={{uri: `${HOST+vote.source1_path}`}} />
            <Image
              style={this.calculatedSize()}
              source={{uri: `${HOST+vote.source2_path}`}} />
          </TouchableOpacity>
        )
      })
    }

    renderImagesInGroupsOf(count) {
      const { votes } = this.props
      return _.chunk(votes, VOTES_PER_ROW).map((votesForRow, i) => {
        return (
          <View key={i} style={styles.row}>
            {this.renderRow(votesForRow)}
          </View>
        )
      })
    }

    render() {
      return (
        <ScrollView
          contentContainerStyle={styles.scrollView}>
          {this.renderImagesInGroupsOf(VOTES_PER_ROW)}
        </ScrollView>
      );
    }

}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imagesContainer: {
    borderWidth: 0.6,
    borderColor: 'white',
  },
});

GridImages.propTypes = {

};
