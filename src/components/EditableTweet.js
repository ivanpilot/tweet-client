import React from 'react';
import { Tweet } from './Tweet';
import { EditTweetInput } from './EditTweetInput';
import { DisplayError } from './DisplayError';
import '../styles/EditableTweet.css';

export const EditableTweet = (props) => {
  return props.tweets.map((tweet, index) => {
    if(props.tweetError && ((props.tweetError.id === tweet.react_id) || (props.tweetError.id === tweet.id))){
      return(
        <div>
          <DisplayError
            message={`Ooops... seems there is an issue. Try reload the page. 'HTTP status: ${props.tweetError.status}. Error message: ${props.tweetError.message}'`}
          />
        </div>
      )
    } else {
      return (
        <div key={index}>
          <div className='ui center aligned grid'>
              {
                (tweet.editable) ? (
                  <div className='editable-tweet'>
                    <EditTweetInput
                      tweet={tweet}
                      onSubmitForm={props.onSubmitForm}
                      closeEditable={props.closeEditable}
                    />
                  </div>
                ) : (
                  <div className='editable-tweet'>
                    <Tweet
                      tweet={tweet}
                      activeTweet={props.activeTweet}
                      editableTweet={props.editableTweet}
                      onEditClick={props.onEditClick}
                      onTrashClick={props.onTrashClick}
                      onActiveClick={props.onActiveClick}
                    />
                  </div>
                )
              }
          </div>
        </div>
      )
    }
  })
}
