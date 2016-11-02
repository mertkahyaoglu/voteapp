import { REQUEST_FRIENDS, FRIENDS_RECEIVED } from '../constants/ActionTypes';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

function requestFriends() {
  return {
    type: REQUEST_FRIENDS
  }
}

function receiveFriends(friends) {
  return {
    type: FRIENDS_RECEIVED,
    friends
  }
}

export function getFriends() {
  return dispatch => {
    dispatch(requestFriends())
    const infoRequest = new GraphRequest('/me/friends', null,
      (error, result) => {
        if (result.data.length) {
          dispatch(receiveFriends(result.data))
        }
      }
    );
    return new GraphRequestManager().addRequest(infoRequest).start();
  };
}
