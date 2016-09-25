import { SOURCE_LOADED, DESCRIPTION_CHANGED } from '../constants/ActionTypes';

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
