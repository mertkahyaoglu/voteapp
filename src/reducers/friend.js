import { REQUEST_FRIENDS, FRIENDS_RECEIVED } from '../constants/ActionTypes';

export default function friend(state = {
  friends: [],
  isFetching: false
}, action) {
  switch (action.type) {
    case REQUEST_FRIENDS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FRIENDS_RECEIVED:
      return Object.assign({}, state, {
        friends: action.friends,
        isFetching: false
      });
  default:
    return state;
  }
}
