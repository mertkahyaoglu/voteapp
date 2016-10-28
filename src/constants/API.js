export const HOST = "http://35.160.20.129:3000/";

export const REGISTER = `${HOST}register`;
export const LOGIN = `${HOST}login`;
export const NEW_VOTE = `${HOST}api/new_vote`;

export const getVoteUrl = voteId => `${HOST}api/vote/${voteId}`
export const getVotesUrl = userId => `${HOST}api/votes/${userId}`

export const getNotificationsUrl = userId => `${HOST}api/notifications/${userId}`
