export const initialState = {
  tweetsById:{
    '1': {
      title: 'First Tweet',
      body: 'Hi I am the first',
      user_id: '1',
      editable: false,
      active: false
    },
    '2': {
      title: 'Second Tweet',
      body: 'Hi I am the second',
      user_id: '1',
      editable: false,
      active: false
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
  },
  commentsById:{
    '1': {
      body: 'I am comment 1 of tweet 1',
      post_id: '1'
    },
    '2': {
      body: 'I am comment 2 of tweet 1',
      post_id: '1'
    },
    '3': {
      body: 'I am comment 3 of tweet 2',
      post_id: '2'
    },
    '4': {
      body: 'I am comment 4 of tweet 2',
      post_id: '2'
    },
  }
}
