import {
  SOURCE_LOADED,
  DESCRIPTION_CHANGED,
  ADD_FRIEND,
  REMOVE_FRIEND,
  CLEAR_SOURCES,
  VOTE_UPLOADED
} from '../constants/ActionTypes';

export default function home(state = {
  source1: '',
  source2: '',
  description: '',
  chosenfriends: [],
  uploadedVote: ''
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
    case VOTE_UPLOADED:
      return Object.assign({}, state, {
        uploadedVote: action.uploadedVote
      });
    case CLEAR_SOURCES:
      return Object.assign({}, state, {
        source1: '',
        source2: '',
        description: '',
      });
  default:
    return Object.assign({}, state, {
      uploadVote: '',
    });
  }
}
