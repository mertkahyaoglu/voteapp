import { REQUEST_NOTIFICATIONS, NOTIFICATIONS_RECEIVED } from '../constants/ActionTypes';
import { getNotificationsUrl } from '../constants/API'

function requestNotifications() {
  return {
    type: REQUEST_NOTIFICATIONS
  }
}

function notificationsReceived(notifications) {
  return {
    type: NOTIFICATIONS_RECEIVED,
    notifications
  }
}

export function getNotifications(info) {
  return dispatch => {
    dispatch(requestNotifications())
    return fetch(getNotificationsUrl(info.id), {
      headers: { 'startup-access-token': info.token }
    })
    .then(res => res.json())
    .then(res => {
      if (!res.error) {
        dispatch(notificationsReceived(res))  
      } else {
        console.log(res.error);
      }
    })
    .catch(console.log);
  }
}
