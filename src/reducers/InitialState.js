export const initialState = {
  tweetsById:{
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
    }
  },
  threadsById:{
    '1': {
      name: 'My Tweets',
      active: true
    },
    '2': {
      name: 'Wall',
      active: false
    }
  }
}
