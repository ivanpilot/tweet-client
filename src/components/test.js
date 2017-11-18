// import _ from 'lodash'

// let state = {
//   '1': {
//     name: 'My Tweets',
//     active: true
//   },
//   '2': {
//     name: 'Wall',
//     active: false
//   }
// }


let state = {
  '1': {
    title: 'First Tweet',
    body: 'Hi I am the first',
    user_id: '1',
    editable: false
  },
  '2': {
    title: 'Second Tweet',
    body: 'Hi I am the second',
    user_id: '1',
    editable: false
  },
  '3': {
    title: 'Third Tweet',
    body: 'Hi I am the third',
    user_id: '2',
    editable: true
  }
}

// let keys = Object.keys(state)
// let result = Object.keys(state).filter(id => state[id].user_id !== '2').map(id => ({
//   id: id,
//   title: state[id].title,
//   body: state[id].body,
//   userId: state[id].user_id,
//   editable: false,
//   ownership: true,
//   // ownership: state[id].user_id === client.currentUser().id
// })
// )

// let activeThread = Object.keys(state).find(id => state[id].active)
//
// // let filter = Object.keys(state).filter(id => id !== )
// let copy = Object.assign({}, state)
// let newState = delete copy['1']
//
// console.log(result)


state = {
  '1': {
    description: 'I am comment 1 of tweet 1',
    tweet_id: '1',
    user_id: '1',
    editable: false,
    ownership: true
  },
  '2': {
    description: 'I am comment 2 of tweet 1',
    tweet_id: '1',
    user_id: '1',
    editable: true,
    ownership: true
  },
  '3': {
    description: 'I am comment 3 of tweet 2',
    tweet_id: '2',
    user_id: '1',
    editable: false,
    ownership: true
  },
  '4': {
    description: 'I am comment 4 of tweet 2',
    tweet_id: '2',
    user_id: '1',
    editable: false,
    ownership: true
  },
}

// const comments = Object.keys(state).reduce((result, id) => {
//   if(state[id].tweet_id === '1'){
//     return Object.assign({}, result, Object.assign({}, {[id]: state[id]}))
//   }
//   return result
// }, {})

const comments = Object.keys(state).reduce((result, id) => {
  return Object.assign({}, result, Object.assign({}, {[id]: state[id]}))
}, {})

// const commentIds = Object.keys(state).reduce((result, id) => {
//   if(state[id].tweet_id === '1'){
//     return [...result, id]
//   }
//   return result
// }, [])

// const commentIds = Object.keys(state).filter(id => {
//   return state[id].tweet_id === '1'
// })
//
// const getTweetEditableComment = Object.keys(state).filter(id => state[id].tweet_id === '1').find(id => state[id].editable)



// console.log(state[comments])
// console.log(getTweetEditableComment)
// console.log(Object.keys(state))
console.log(comments)
