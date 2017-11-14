import React from 'react';
import { Tweet } from './Tweet';
import { EditTweetInput } from './EditTweetInput';
import '../styles/EditableTweet.css';


export const EditableTweet = (props) => {
  // debugger
  return props.tweets.map((tweet, index) => {
    // debugger
    return (
    <div key={index} className='tweet-list'>
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
  })
}

// offEditableTweetMode={props.offEditableTweetMode}
// onSubmitForm={props.onSubmitForm}
