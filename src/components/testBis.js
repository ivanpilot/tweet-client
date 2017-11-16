state = [
  {
    id:'1',
    description: 'I am comment 1 of tweet 1',
    tweet_id: '1',
    user_id: '1',
    editable: false,
    ownership: true
  },
  {
    id:'2',
    description: 'I am comment 2 of tweet 1',
    tweet_id: '1',
    user_id: '1',
    editable: true,
    ownership: true
  },
  {
    id:'3',
    description: 'I am comment 3 of tweet 2',
    tweet_id: '2',
    user_id: '1',
    editable: false,
    ownership: true
  },
  {
    id:'4',
    description: 'I am comment 4 of tweet 2',
    tweet_id: '2',
    user_id: '1',
    editable: false,
    ownership: true
  },
]

// const comments = Object.keys(state).reduce((result, id) => {
//   if(state[id].tweet_id === '1'){
//     return Object.assign({}, result, Object.assign({}, {[id]: state[id]}))
//   }
//   return result
// }, {})


const comments = Object.keys(state).reduce((result, id) => {
  return Object.assign({}, result, Object.assign({}, {[state[id].id]: state[id]}))
}, {})

console.log(comments)
