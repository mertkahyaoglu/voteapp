import { VOTED, VOTE_CLEARED, VOTE_RECEIVED, VOTES_RECEIVED } from '../constants/ActionTypes';

export function voteOne(source) {
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

export function getVote(vote) {
  return {
    type: VOTE_RECEIVED,
    vote
  }
}

export function getVotes(votes) {
  return {
    type: VOTES_RECEIVED,
    votes
  }
}
