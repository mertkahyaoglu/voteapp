import { SOURCE_LOADED, DESCRIPTION_CHANGED, ADD_FRIEND, REMOVE_FRIEND } from '../constants/ActionTypes';

export default function home(state = {
  source1: '',
  source2: '',
  description: '',
  chosenfriends: [],
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
    case ADD_FRIEND:
      return Object.assign({}, state, {
        chosenfriends: [
          ...state.chosenfriends,
          action.id
        ],
      });
    case REMOVE_FRIEND:
      return Object.assign({}, state, {
        chosenfriends: state.chosenfriends.filter(f => action.id != f),
      });
  default:
    return state;
  }
}
