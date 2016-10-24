import { VOTED, VOTE_CLEARED, VOTE_RECEIVED, VOTES_RECEIVED } from '../constants/ActionTypes';

export default function vote(state = {
  chosenSource: '',
  vote: '',
  votes: [],
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
    case VOTE_RECEIVED:
      return Object.assign({}, state, {
        vote: action.vote
      });
    case VOTES_RECEIVED:
      return Object.assign({}, state, {
        votes: action.votes
      });
  default:
    return state;
  }
}
