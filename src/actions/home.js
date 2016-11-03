import {
  SOURCE_LOADED,
  DESCRIPTION_CHANGED,
  ADD_FRIEND,
  REMOVE_FRIEND,
  CLEAR_SOURCES,
  VOTE_UPLOADED,
} from '../constants/ActionTypes';
import { NEW_VOTE } from '../constants/API'
import { FileUpload } from 'NativeModules';

export function sourceLoaded(index, source) {
  return {
    type: SOURCE_LOADED,
    index,
    source,
  }
}

export function descriptionChanged(description) {
  return {
    type: DESCRIPTION_CHANGED,
    description,
  }
}

export function addFriend(id) {
  return {
    type: ADD_FRIEND,
    id
  }
}

export function removeFriend(id) {
  return {
    type: REMOVE_FRIEND,
    id
  }
}

export function voteUploaded(uploadedVote) {
  return {
    type: VOTE_UPLOADED,
    uploadedVote
  }
}

function clearSources() {
  return {
    type: CLEAR_SOURCES,
  }
}

export function uploadVote(info, source1, source2, description) {
  return dispatch => {
    const obj = {
      uploadUrl: NEW_VOTE,
      method: 'POST',
      headers: {
        'Accept': 'application/json', 'startup-access-token': info.token
      },
      fields: {
        'user_id': String(info.id),
        'description': description,
        'email': info.email,
      },
      files: [
        {
          name: 'source1',
          filename: 'source1.jpg',
          filepath: source1.uri,
          filetype: 'image/jpeg',
        },
        {
          name: 'source2',
          filename: 'source2.jpg',
          filepath: source2.uri,
          filetype: 'image/jpeg',
        },
      ]
    };
    return FileUpload.upload(obj, (err, result) => {
      if (!err) {
        const data = JSON.parse(result.data)
        if (!data.error) {
          dispatch(clearSources())
          dispatch(voteUploaded(data.id))
        } else {
          console.log(data);
        }
      } else {
        console.log(err);
      }
    })
  };
}
