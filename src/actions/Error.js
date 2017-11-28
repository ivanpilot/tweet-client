import * as types from './ActionTypes';

export function fetchItemFailure(item, message, id = null){
  return {
    type: types.FETCH_ITEM_FAILURE,
    item,
    message,
    id
  }
}
