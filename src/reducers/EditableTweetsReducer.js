import {editableTweetReducer} from './EditableTweetReducer'

export function editableTweetsReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TWEET': {
      return [
        editableTweetReducer(null, action),
        ...state
      ]
    }

    case 'EDIT_TWEET': {
      const editableTweetIndex = state.findIndex((eT) => (
        eT.id === action.editableTweetId
      ))
      const oldEditableTweet = state[editableTweetIndex]
      const newEditableTweet = editableTweetReducer(oldEditableTweet, action)

      return [
        ...state.slice(0, editableTweetIndex),
        newEditableTweet,
        ...state.slice(editableTweetIndex + 1, state.length)
      ]
    }

    case 'DELETE_TWEET': {
      return [
        ...state.filter(eT => eT.id !== action.editableTweetId)
      ]
    }

    default:
      return state
  }
}
