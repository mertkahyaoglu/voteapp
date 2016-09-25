import { TAB_SELECTED } from '../constants/ActionTypes';

export default function tabs(state = {
  currentTab: 'home',
}, action) {
  switch (action.type) {
    case TAB_SELECTED:
      return Object.assign({}, state, {
        currentTab: action.tabName
      });
  default:
    return state;
  }
}
