// import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEditableTweet, getActiveTweet } from '../reducers/Tweets';
import { addTweet, triggerEditableTweet, createTweet } from '../actions/Tweet';
import FormTweet from '../components/FormTweet';
import { apiTweet } from '../client/ApiTweet';
import { DisplayError } from '../components/DisplayError';
import React from 'react';


function persistTweet(tweet){
  return dispatch => {
    return apiTweet.createTweet(tweet).then(
      response => {
        console.log('NOW INSIDE THE CONTAINER, RESPONSE: ', response)
        return tweet
      },
      error => {
        // debugger
        return(
          <DisplayError
            message={`Looks like a server issue. Retry in a few sec... 'HTTP status: ${error.response.status}. Error message: ${error.response.statusText}'`}
            onRetry={() => persistTweet(tweet)}
          />
        )
      }
    ).then(tweet => {
      // debugger
      return apiTweet.fetchTweetByReactId(tweet.id)
    })
    .then((response) => {
      // debugger
      console.log('NOW INSIDE THE CONTAINER, RESPONSE: ', response)
    })
  }
}

function onSubmitForm(tweet, editableId, activeId){
  if(editableId){
    return (dispatch) => {
      dispatch(triggerEditableTweet(editableId))
      dispatch(addTweet(tweet))
    }
  } else {
    return (dispatch) => {
      // dispatch(addTweet(tweet))
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
