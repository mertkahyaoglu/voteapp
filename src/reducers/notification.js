import { REQUEST_NOTIFICATIONS, NOTIFICATIONS_RECEIVED } from '../constants/ActionTypes';

export default function notification(state = {
  notifications: [],
  isFetching: false
}, action) {
  switch (action.type) {
    case REQUEST_NOTIFICATIONS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case NOTIFICATIONS_RECEIVED:
      return Object.assign({}, state, {
        notifications: action.notifications,
        isFetching: false
      });
  default:
    return state;
  }
}
