export const HOST = "http://192.168.1.101:3000/";

export const REGISTER = `${HOST}register`;
export const LOGIN = `${HOST}login`;
export const NEW_VOTE = `${HOST}api/new_vote`;

export const getVoteUrl = voteId => `${HOST}api/vote/${voteId}`
export const getVotesUrl = userId => `${HOST}api/votes/${userId}`
