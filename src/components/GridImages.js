import React, { Component, PropTypes } from "react"
import _ from 'lodash'

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native"

const { width, height } = Dimensions.get('window')

const IMAGE_URLS = [
  'http://lorempixel.com/150/150',
  'http://lorempixel.com/151/154',
  'http://lorempixel.com/152/153',
  'http://lorempixel.com/151/152',
  'http://lorempixel.com/152/151',
  'http://lorempixel.com/151/151',
  'http://lorempixel.com/152/150',
  'http://lorempixel.com/153/151',
  'http://lorempixel.com/155/155',
  'http://lorempixel.com/153/153',
  'http://lorempixel.com/154/155',
  'http://lorempixel.com/154/154',
]
const IMAGES_PER_ROW = 3

export default class GridImages extends Component {

    calculatedSize() {
      const size = width / IMAGES_PER_ROW
      return { width: size, height: size }
    }

    renderRow(images) {
      return images.map((uri, i) => {
        return (
          <Image
            key={i}
            style={[styles.image, this.calculatedSize()]}
            source={{uri: uri}} />
        )
      })
    }

    renderImagesInGroupsOf(count) {
      return _.chunk(IMAGE_URLS, IMAGES_PER_ROW).map((imagesForRow, i) => {
        return (
          <View key={i} style={styles.row}>
            {this.renderRow(imagesForRow)}
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
  image: {
    borderWidth: 0.6,
    borderColor: 'white',
  },
});

GridImages.propTypes = {

};
