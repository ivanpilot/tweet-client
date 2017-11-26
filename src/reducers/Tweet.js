export function tweet(state, action){
  switch(action.type){
    case 'ADD_TWEET': {
      return {
        id: action.tweet.id,
        title: action.tweet.title,
        body: action.tweet.body,
        comments: action.tweet.comments,
        editable: false,
        active: false,
        ownership: true, //to be changed by function testing if author_id === currentUser.id
        author_id: action.tweet.author_id
      }
    }

    case 'CREATE_TWEET': {
      return {
        id: action.tweet.id,
        title: action.tweet.title,
        body: action.tweet.body,
        // comments: action.tweet.comments,
        editable: false,
        active: false,
        ownership: true,
        author_id: 1 //to be changed by replacing currentUser.id
      }
    }

    case 'EDIT_TWEET': {
      return {
        ...state,
        title: action.tweet.title,
        body: action.tweet.body,
      }
    }

    case 'TRIGGER_EDITABLE_TWEET': {
      return {
        ...state,
        editable: !state.editable
      }
    }

    case 'TRIGGER_ACTIVABLE_TWEET': {
      return {
        ...state,
        active: !state.active
      }
    }

    case 'ADD_COMMENT_TO_TWEET': {
      return {
        ...state,
        comments: [action.commentId, ...state.comments]
      }
    }

    case 'DELETE_COMMENT_IN_TWEET': {
      return {
        ...state,
        comments: state.comments.filter(id => id !== action.commentId)
      }
    }

  }
}
