import { VOTED, VOTE_CLEARED } from '../constants/ActionTypes';

export default function vote(state = {
  chosenSource: ''
}, action) {
  switch (action.type) {
    case VOTED:
      return Object.assign({}, state, {
        chosenSource: action.source
      });
    case VOTE_CLEARED:
      return Object.assign({}, state, {
        chosenSource: ''
      });
  default:
    return state;
  }
}
