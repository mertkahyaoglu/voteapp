import { SOURCE_LOADED, DESCRIPTION_CHANGED, ADD_FRIEND, REMOVE_FRIEND, CLEAR_SOURCES } from '../constants/ActionTypes';

export function sourceLoaded(index, source) {
  return {
    type: SOURCE_LOADED,
    index,
    source,
  }
}

export function descriptionChanged(description) {
  return {
    type: DESCRIPTION_CHANGED,
    description,
  }
}

export function addFriend(id) {
  return {
    type: ADD_FRIEND,
    id
  }
}

export function removeFriend(id) {
  return {
    type: REMOVE_FRIEND,
    id
  }
}

export function clearSources() {
  return {
    type: CLEAR_SOURCES,
  }
}
