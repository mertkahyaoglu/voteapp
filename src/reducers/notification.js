import { NOTIFICATIONS_RECEIVED } from '../constants/ActionTypes';

export default function notification(state = {
  notifications: [],
}, action) {
  switch (action.type) {
    case NOTIFICATIONS_RECEIVED:
      return Object.assign({}, state, {
        notifications: action.notifications
      });
  default:
    return state;
  }
}
