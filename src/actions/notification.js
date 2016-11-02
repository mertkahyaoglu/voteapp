import { REQUEST_NOTIFICATIONS, NOTIFICATIONS_RECEIVED } from '../constants/ActionTypes';

export function requestNotifications() {
  return {
    type: REQUEST_NOTIFICATIONS
  }
}

export function getNotifications(notifications) {
  return {
    type: NOTIFICATIONS_RECEIVED,
    notifications
  }
}
