import { SETUP_SOCKET } from '../constants/ActionTypes';

export function setupSocket(socket) {
  return {
    type: SETUP_SOCKET,
    socket,
  }
}
