import React from 'react';
import { Tweet } from './Tweet';
import { EditTweetInput } from './EditTweetInput';
import '../styles/EditableTweet.css';


export const EditableItem = (props) => {
  // debugger
  return props.items.map((item, index) => {
    // debugger
    return (
    <div key={index} className='tweet-list'>
      <div className='ui center aligned grid'>
          {
            (item.editable) ? (
              <div className='editable-tweet'>
                <EditTweetInput
                  tweet={item}
                  onSubmitForm={props.onSubmitForm}
                  closeEditable={props.closeEditable}
                />
              </div>
            ) : (
              <div className='editable-tweet'>
                <Tweet
                  tweet={item}
                  editableTweet={props.editableTweet}
                  onEditClick={props.onEditClick}
                  onTrashClick={props.onTrashClick}
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
