import { STORE_TOKEN } from '../constants/ActionTypes';

export default function login(state = {
  info: {}
}, action) {
  switch (action.type) {
    case STORE_TOKEN:
      return Object.assign({}, state, {
        info: action.info,
      });
  default:
    return state;
  }
}
