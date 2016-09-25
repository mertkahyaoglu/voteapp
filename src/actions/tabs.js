import { TAB_SELECTED } from '../constants/ActionTypes';

export function tabSelected(tabName) {
  return {
    type: TAB_SELECTED,
    tabName
  }
}
