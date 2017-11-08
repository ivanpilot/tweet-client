export const initialState = {
  activeThreadId: 'user-v1',
  activeEditableTweetId: '',
  threads: [
    {
      id: 'user-v1',
      name: 'My Tweets',
      editableTweets: []
    },
    {
      id: 'all',
      name: 'Wall',
      editableTweets: []
    }
  ],
  editableTweets: [],
  editableTweet: {},
  tweet: {}
}

//full state //////
// state = {
//   tweetsById:{
//     '1': {
//       title: '',
//       body: '',
//       userId: '',
//       active: false
//     },
//   },
//   threadsById:{
//     '1': {
//       name: '',
//       active: true
//     }
//   }
// }
