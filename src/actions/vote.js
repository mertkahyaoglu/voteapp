import { VOTED, VOTE_CLEARED, VOTE_RECEIVED, VOTES_RECEIVED } from '../constants/ActionTypes';
import { getVotesUrl, getVoteUrl } from '../constants/API'

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

function votesReceived(votes) {
  return {
    type: VOTES_RECEIVED,
    votes
  }
}

function voteReceived(vote) {
  return {
    type: VOTE_RECEIVED,
    vote
  }
}

function getVote(vote) {
  return {
    type: VOTE_RECEIVED,
    vote
  }
}

export function getVotes(info) {
  return dispatch => {
    return fetch(getVotesUrl(info.id), {
      headers: { "startup-access-token": info.token }
    })
    .then(res => res.json())
    .then(res => {
      if (!res.error) {
        dispatch(votesReceived(res))
      } else {
        console.log(res.error);
      }
    })
    .catch(console.log);
  }
}

export function getVote(voteId, info) {
  return dispatch => {
    return fetch(getVoteUrl(voteId), {
      headers: { "startup-access-token": info.token }
    })
    .then(res => res.json())
    .then(res => {
      if (!res.error) {
        dispatch(voteReceived(res))
      } else {
        console.log(res.error);
      }
    })
    .catch(console.log);
  }
}
