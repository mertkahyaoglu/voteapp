import { VOTED, VOTE_CLEARED } from '../constants/ActionTypes';

export function vote(source) {
  return {
    type: VOTED,
    source,
  }
}

export function clearVote() {
  return {
    type: VOTE_CLEARED,
  }
}
