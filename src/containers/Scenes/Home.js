import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Text, View, Image, TouchableOpacity, StyleSheet, Platform } from "react-native";

import Icon from 'react-native-vector-icons/EvilIcons'
import { Fumi } from 'react-native-textinput-effects';
import Button from 'apsl-react-native-button'
import ImagePicker from 'react-native-image-picker'

import { routeFriends } from '../../constants/Routes'

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
          uri: 'data:image/jpeg;base64,' + response.data,
          isStatic: true,
        }
        sourceLoaded(index, source)
      }
    })
  }

  handleFriendsChoose() {
    const { navigator} = this.props
    navigator.push(routeFriends())
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
          <View style={styles.imageContainer1}>
          {(
            source1 ?
              <TouchableOpacity style={{flex: 1}} onPress={() => this.onPress(1)}>
                <Image
                  onPress={() => this.handleImageChoose(1)} style={styles.uploadImage}
                  source={source1} />
              </TouchableOpacity> :
              <TouchableOpacity style={styles.uploadHolder} onPress={() => this.handleImageChoose(1)}>
                <Icon color="#5FC6DC" name="question" size={48} />
                <Text style={{fontSize: 24}}>This</Text>
              </TouchableOpacity>
          )}
          </View>
          <View style={styles.imageContainer2}>
          {(
            source2 ?
              <TouchableOpacity style={{flex: 1}} onPress={() => this.onPress(2)}>
                <Image
                  style={styles.uploadImage}
                  source={source2} />
              </TouchableOpacity> :
              <TouchableOpacity style={styles.uploadHolder} onPress={() => this.handleImageChoose(2)}>
                <Icon color="#5FC6DC" name="question" size={48} />
                <Text style={{fontSize: 24}}>That</Text>
              </TouchableOpacity>
          )}
          </View>
        </View>
        <View style={styles.alt}>
          <Fumi
            label={'Description'}
            iconClass={Icon}
            iconName={'pencil'}
            iconColor={'#59B5CF'}
            onChangeText={(text) => this.handleDescriptionChange(text)}
          />
          <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <TouchableOpacity onPress={() => { if(chooseFriendsEnabled) this.handleFriendsChoose()}} activeOpacity={0.8} style={{backgroundColor: chooseFriendsEnabled ? '#59B5CF' : '#ccc', padding: 15}}>
              <Text style={{color: 'white', textAlign: 'center', fontSize: 24}}>Choose Friends</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  imagesContainer: {
    flex: .4,
    flexDirection: 'row'
  },
  imageContainer1: {
    flex:1,
    backgroundColor: 'white',
    marginRight: 5
  },
  imageContainer2: {
    flex:1,
    backgroundColor: 'white',
    marginLeft: 5
  },
  uploadImage: {
    flex: 1,
    width: null,
    height: null,
    borderWidth: 2,
    borderColor: '#5FC6DC'
  },
  uploadHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadHolderText: {
    fontSize: 36,
    color: '#3C3C3C',
  },
  alt: {
    flex: .6,
    marginTop: 10
  },
  friends: {

  }
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
