export function comment(state, action){
  switch (action.type) {
    case 'ADD_COMMENT': {
      return {
        id: action.comment.id,
        description: action.comment.description,
        post_id: action.comment.activeTweetId,
        editable: false,
        commenter_id: 1, // for now
        ownership: true // do we keep?
      }
    }

    case 'EDIT_COMMENT': {
      return {
        ...state,
        description: action.comment.description
      }
    }

    case 'TRIGGER_EDITABLE_COMMENT': {
      return {
        ...state,
        editable: !state.editable
      }
    }

    case 'LOAD_COMMENTS': {
      return {
        ...state,
        editable: false,
        ownership: true,
      }
    }
  }
}
