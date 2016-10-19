import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Text, View, Image, TouchableOpacity, TextInput, StyleSheet, Platform } from "react-native";

import Icon from 'react-native-vector-icons/EvilIcons'
import { Fumi } from 'react-native-textinput-effects';
import Button from 'apsl-react-native-button'
import ImagePicker from 'react-native-image-picker'

import { routeChooseFriends } from '../../constants/Routes'
import { Color } from '../../constants/Styles'

import { sourceLoaded, descriptionChanged } from '../../actions/home'

const options = {
  title: 'Select a photo',
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo.',
  chooseFromLibraryButtonTitle: 'Choose from Library.',
  mediaType: 'photo',
  maxWidth: 640,
  maxHeight: 640,
  quality: 0.8,
  allowsEditing: true,
}

class Home extends Component {

  handleImageChoose(index) {
    const { sourceLoaded } = this.props
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        return false;
      }
      else if (response.error) {
        return false;
      }
      else if (response.customButton) {
        return false;
      }else {
        const source = {
          uri: response.uri,
          isStatic: true,
        }
        sourceLoaded(index, source)
      }
    })
  }

  handleFriendsChoose() {
    const { navigator} = this.props
    this.refs.fumi.refs.input.blur()
    navigator.push(routeChooseFriends())
  }

  handleDescriptionChange(text) {
    const { descriptionChanged } = this.props
    descriptionChanged(text)
  }

  render() {
    const { source1, source2, description } = this.props;
    let chooseFriendsEnabled = (source1 != '' && source2 != '' && description) ? true : false;
    return (
      <View style={styles.container}>
        <View style={styles.imagesContainer}>
          <View style={styles.imageContainer}>
          {(
            source1 ?
              <TouchableOpacity style={{flex: 1}} onPress={() => this.handleImageChoose(1)}>
                <Image style={styles.uploadImage} source={source1} />
              </TouchableOpacity> :
              <TouchableOpacity style={styles.uploadHolder} onPress={() => this.handleImageChoose(1)}>
                <Icon color={Color.secondary} name="question" size={48} />
                <Text style={{fontSize: 24}}>This</Text>
              </TouchableOpacity>
          )}
          </View>
          <View style={styles.imageContainer}>
          {(
            source2 ?
              <TouchableOpacity style={{flex: 1}} onPress={() => this.handleImageChoose(2)}>
                <Image style={styles.uploadImage} source={source2} />
              </TouchableOpacity> :
              <TouchableOpacity style={styles.uploadHolder} onPress={() => this.handleImageChoose(2)}>
                <Icon color={Color.secondary} name="question" size={48} />
                <Text style={{fontSize: 24}}>That</Text>
              </TouchableOpacity>
          )}
          </View>
        </View>
        <View style={styles.alt}>
          <View style={{flex:1}}>
            <Fumi
              label={'Description'}
              iconClass={Icon}
              iconName={'pencil'}
              blurOnSubmit={true}
              ref="fumi"
              iconColor={Color.secondary}
              style={styles.descriptionInput}
              onChangeText={(text) => this.handleDescriptionChange(text)}
            />
          </View>
          <TouchableOpacity
            onPress={() => { if(chooseFriendsEnabled) this.handleFriendsChoose()}} activeOpacity={0.8}
            style={{backgroundColor: chooseFriendsEnabled ? Color.secondary : '#ccc', padding: 15}}>
            <Text
              style={{color: 'white', textAlign: 'center', fontSize: 24}}>
              Choose friends
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagesContainer: {
    flex: .4,
    flexDirection: 'row',
    padding: 10,
    paddingRight: 0,
    backgroundColor: Color.bgImages,
  },
  imageContainer: {
    flex:1,
    backgroundColor: 'white',
    marginRight: 10
  },
  uploadImage: {
    flex: 1,
    width: null,
    height: null,
  },
  uploadHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadHolderText: {
    fontSize: 36,
    color:  Color.textPrimary,
  },
  alt: {
    flex: .6,
  },
  descriptionInput: {
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#ccc',
  },
});

Home.propTypes = {
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  sourceLoaded: PropTypes.func.isRequired,
  descriptionChanged: PropTypes.func.isRequired,
  source1: PropTypes.any.isRequired,
  source2: PropTypes.any.isRequired,
  description: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  source1: state.home.source1,
  source2: state.home.source2,
  description: state.home.description,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sourceLoaded,
  descriptionChanged
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
