import { AUTHENTICATED, AUTH_FAILED, LOGGED_IN, LOGGED_OUT } from '../constants/ActionTypes';

export default function login(state = {
  info: {},
  loggedIn: false,
  authFailed: '',
}, action) {
  switch (action.type) {
    case LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: true,
      });
    case LOGGED_OUT:
      return Object.assign({}, state, {
        loggedIn: false,
        info: {}
      });
    case AUTHENTICATED:
      return Object.assign({}, state, {
        info: action.info,
        authFailed: false
      });
    case AUTH_FAILED:
      return Object.assign({}, state, {
        authFailed: true,
      });
  default:
    return Object.assign({}, state, {
      authFailed: '',
    });
  }
}
