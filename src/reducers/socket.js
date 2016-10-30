import { SETUP_SOCKET } from '../constants/ActionTypes';

export default function socket(state = {
  socket: {},
}, action) {
  switch (action.type) {
    case SETUP_SOCKET:
      return Object.assign({}, state, {
        socket: action.socket
      });
  default:
    return state;
  }
}
