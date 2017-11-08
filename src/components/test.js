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

console.log(activeThread)
