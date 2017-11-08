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
    title: 'First Tweet',
    body: 'Hi I am the first',
    user_id: '1',
    editable: false
  }
}

let keys = Object.keys(state)
let result = Object.keys(state).map(id => ({
  id: id,
  title: state[id].title,
  body: state[id].body,
  userId: state[id].user_id,
  editable: false,
  ownership: true,
  // ownership: state[id].user_id === client.currentUser().id
})
)

let activeThread = Object.keys(state).find(id => state[id].active)

// let filter = Object.keys(state).filter(id => id !== )
let copy = Object.assign({}, state)
let newState = delete copy['1']

console.log(result)
