

export function fetchTweet(){
  // debugger
  return function(dispatch){
    debugger
    return fetch('http://localhost:3000/api/posts/1')
    .then(response => response.json())
    .then(json => {
      debugger
      return dispatch({type: 'ADD_TWEET', tweet: json})
    })
  }
}





// export function fetchTweet(){
//   // debugger
//   return function(dispatch){
//     // debugger
//     return fetch('http://localhost:3000/api/posts', {
//       headers:{
//         'Content-Type': 'application/json'
//       }
//     }).then(response => response.json())
//       .then(tweets => {
//         debugger
//         return tweets.map(tweet => {
//           const item = {
//             id: tweet.id,
//             title: tweet.title,
//             body: tweet.body,
//             userId: tweet.user_id
//           }
//           dispatch({
//             type: 'ADD_TWEET',
//             tweet: item
//           })
//
//         })
//       })
//     }
// }
