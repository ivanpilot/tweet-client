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
      description: 'I am comment 1 of tweet 1',
      tweet_id: '1',
      user_id: '1',
      editable: false
    },
    '2': {
      description: 'I am comment 2 of tweet 1',
      tweet_id: '1',
      user_id: '1',
      editable: false
    },
    '3': {
      description: 'I am comment 3 of tweet 2',
      tweet_id: '2',
      user_id: '1',
      editable: false
    },
    '4': {
      description: 'I am comment 4 of tweet 2',
      tweet_id: '2',
      user_id: '1',
      editable: false
    },
  }
}
