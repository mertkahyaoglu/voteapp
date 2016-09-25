import { STORE_TOKEN } from '../constants/ActionTypes';

export function storeUserInfo(info) {
  return {
    type: STORE_TOKEN,
    info,
  }
}
