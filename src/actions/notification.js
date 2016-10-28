import { NOTIFICATIONS_RECEIVED } from '../constants/ActionTypes';

export function getNotifications(notifications) {
  return {
    type: NOTIFICATIONS_RECEIVED,
    notifications
  }
}
