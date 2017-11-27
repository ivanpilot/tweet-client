// import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEditableTweet, getActiveTweet } from '../reducers/Tweets';
import { getActiveThread } from '../reducers/tweetsByThread';
import { addTweet, triggerEditableTweet, createTweet, eraseTweet } from '../actions/Tweet';
import { loadTweets, loadTweet } from '../actions/Thread';
import FormTweet from '../components/FormTweet';
import { apiTweet } from '../client/ApiTweet';
import { DisplayError } from '../components/DisplayError';


// function persistTweet(tweet){
//   return (dispatch, getState) => {
//     return apiTweet.createTweet(tweet).then(response => {
//       return apiTweet.fetchTweetByReactId(tweet.id)
//     }).then(receivedTweets => {
//       receivedTweets.map(tweet => {
//         const tempTweet = getState().workInProgress.tweetsWIP.byId[tweet.react_id]
//         const activeThreadId = getActiveThread(getState().tweetsByThread)
//         if(tempTweet){
//           dispatch(addTweet(tweet))
//           dispatch(eraseTweet(tweet.react_id))
//           dispatch(loadTweet(activeThreadId, tweet.id))
//         }
//       })
//       return receivedTweets
//     })
//     .then(
//       response => {
//         console.log('NOW INSIDE THE CONTAINER, RESPONSE: ', response)
//         return tweet
//       },
//       error => {
//         // debugger
//         return(
//           <DisplayError
//             message={`Looks like a server issue. Retry in a few sec... 'HTTP status: ${error.response.status}. Error message: ${error.response.statusText}'`}
//             onRetry={() => persistTweet(tweet)}
//           />
//         )
//       }
//     )
//   }
// }

function persistTweet(tweet){
  return (dispatch, getState) => {
    return apiTweet.createTweet(tweet).then(
      response => {
        return apiTweet.fetchTweetByReactId(tweet.id).then(
          reponse => {
            return swapOldTweetForNewTweet(dispatch, getState, reponse)
          },
          error => {
            return(
              <DisplayError
                message={`Looks like a server issue. Retry in a few sec... 'HTTP status: ${error.response.status}. Error message: ${error.response.statusText}'`}
                onRetry={() => persistTweet(tweet)}
              />
            )
          }
        )
      },
      error => {
        return(
          <DisplayError
            message={`Looks like a server issue. Retry in a few sec... 'HTTP status: ${error.response.status}. Error message: ${error.response.statusText}'`}
            onRetry={() => persistTweet(tweet)}
          />
        )
      }
    )
  }
}

function swapOldTweetForNewTweet(dispatch, getState, tweets){
  tweets.map(tweet => {
    const tempTweet = getState().workInProgress.tweetsWIP.byId[tweet.react_id]
    const activeThreadId = getActiveThread(getState().tweetsByThread)
    if(tempTweet){
      dispatch(addTweet(tweet))
      dispatch(eraseTweet(tweet.react_id))
      dispatch(loadTweet(activeThreadId, tweet.id))
    }
  })
}

// function persistTweet(tweet){
//   return (dispatch, getState) => {
//     return apiTweet.createTweet(tweet).then(
//       response => {
//         console.log('NOW INSIDE THE CONTAINER, RESPONSE: ', response)
//         return tweet
//       },
//       error => {
//         // debugger
//         return(
//           <DisplayError
//             message={`Looks like a server issue. Retry in a few sec... 'HTTP status: ${error.response.status}. Error message: ${error.response.statusText}'`}
//             onRetry={() => persistTweet(tweet)}
//           />
//         )
//       }
//     ).then(tweet => {
//       // debugger
//       return apiTweet.fetchTweetByReactId(tweet.id)
//     })
//     .then((response) => {
//       // debugger
//       console.log('NOW INSIDE THE CONTAINER, RESPONSE: ', response)
//       return response
//     })
//     .then(response => {
//       const receivedTweets = response
//       receivedTweets.map(tweet => {
//         const tempTweet = getState().workInProgress.tweetsWIP.byId[tweet.react_id]
//         const activeThreadId = getActiveThread(getState().tweetsByThread)
//         if(tempTweet){
//           dispatch(addTweet(tweet))
//           dispatch(eraseTweet(tweet.react_id))
//           // debugger
//           dispatch(loadTweet(activeThreadId, tweet.id))
//         }
//       })
//     })
//   }
// }

function onSubmitForm(tweet, editableId, activeId){
  if(editableId){
    return (dispatch) => {
      dispatch(triggerEditableTweet(editableId))
      dispatch(addTweet(tweet))
    }
  } else {
    return (dispatch) => {
      dispatch(createTweet(tweet))
      dispatch(persistTweet(tweet))
    }
  }
}


const mapStateToProps = (state) => ({
  editableTweet: getEditableTweet(state.entities.tweets),
  activeTweet: getActiveTweet(state.entities.tweets)
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onSubmitForm,
  }, dispatch)
}

export const AddTweetInput = connect(
  mapStateToProps,
  mapDispatchToProps,
) (FormTweet)
