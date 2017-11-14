import * as types from './ActionTypes';

export function addComment(comment){
  return {
    type: types.ADD_COMMENT,
    comment: comment,
  }
}

export function editComment(comment){
  return {
    type: types.EDIT_COMMENT,
    comment: comment,
  }
}

export function deleteComment(id){
  return {
    type: types.DELETE_COMMENT,
    id: id
  }
}

export function triggerEditableComment(id){
  return {
    type: types.TRIGGER_EDITABLE_COMMENT,
    id: id
  }
}
