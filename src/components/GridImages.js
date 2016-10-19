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
import { Color } from '../constants/Styles'
import { routeVote } from '../constants/Routes'

const IMAGES = [
  ['http://lorempixel.com/150/150','http://lorempixel.com/152/150'],
  ['http://lorempixel.com/151/154','http://lorempixel.com/153/151'],
  ['http://lorempixel.com/152/153','http://lorempixel.com/155/155'],
  ['http://lorempixel.com/151/152','http://lorempixel.com/153/153'],
  ['http://lorempixel.com/152/151','http://lorempixel.com/154/155'],
  ['http://lorempixel.com/151/151','http://lorempixel.com/154/154'],
]

const DESCRIPTION = [
  "This is a test message!",
  "This is a test message!",
  "This is a test message!",
  "This is a test message!",
  "This is a test message!",
  "This is a test message!",
]

const IMAGES_PER_ROW = 3

export default class GridImages extends Component {

    calculatedSize() {
      const size = width / IMAGES_PER_ROW
      return { width: size, height: size/2 }
    }

    handleImageClick(source, description) {
      const { navigator } = this.props
      navigator.push(routeVote(source, description))
    }

    renderRow(rowData) {
      return rowData.imagesForRow.map((source, i) => {
        return (
          <TouchableOpacity key={i} style={styles.imagesContainer} onPress={() => this.handleImageClick(source, rowData.description)}>
            <Image
              style={[this.calculatedSize(), {borderColor: Color.primary, borderBottomWidth: 1}]}
              source={{uri: source[0]}} />
            <Image
              style={this.calculatedSize()}
              source={{uri: source[1]}} />
          </TouchableOpacity>
        )
      })
    }

    renderImagesInGroupsOf(count) {
      return _.chunk(IMAGES, IMAGES_PER_ROW).map((imagesForRow, i) => {
        return (
          <View key={i} style={styles.row}>
            {this.renderRow({imagesForRow, description: DESCRIPTION[i]})}
          </View>
        )
      })
    }

    render() {
      return (
        <ScrollView
          contentContainerStyle={styles.scrollView}>
          {this.renderImagesInGroupsOf(IMAGES_PER_ROW)}
        </ScrollView>
      );
    }

}

const styles = StyleSheet.create({
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
