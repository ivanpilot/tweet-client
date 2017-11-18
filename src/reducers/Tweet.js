export function tweet(state, action){
  switch(action.type){
    case 'ADD_TWEET': {
      return {
        id: action.tweet.id,
        title: action.tweet.title,
        body: action.tweet.body,
        editable: false,
        active: false,
        ownership: true,
        author_id: '1'
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

    case 'LOAD_TWEETS': {
      return {
        ...state,
        editable: false,
        active: false,
        ownership: true,
      }
    }

  }
}
