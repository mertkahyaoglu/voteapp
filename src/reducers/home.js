import { SOURCE_LOADED, DESCRIPTION_CHANGED } from '../constants/ActionTypes';

export default function home(state = {
  source1: '',
  source2: '',
  description: '',
}, action) {
  switch (action.type) {
    case SOURCE_LOADED:
      return Object.assign({}, state, {
        ["source"+action.index]: action.source,
      });
    case DESCRIPTION_CHANGED:
      return Object.assign({}, state, {
        description: action.description,
      });
  default:
    return state;
  }
}
