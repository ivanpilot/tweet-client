// import _ from 'lodash'

let state = {
  '1': {
    name: 'My Tweets',
    active: true
  },
  '2': {
    name: 'Wall',
    active: false
  }
}

let keys = Object.keys(state)
let result = Object.keys(state).map(id => ({
  id: id,
  name: state[id].name,
  active: state[id].active
}))

let activeThread = Object.keys(state).find(id => state[id].active)

// let filter = Object.keys(state).filter(id => id !== )
let copy = Object.assign({}, state)
let newState = delete copy['1']

console.log(state)
