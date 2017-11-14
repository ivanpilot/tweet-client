import React from 'react';
import { Comment } from './Comment';
import { EditTweetInput } from './EditTweetInput';
import '../styles/EditableTweet.css';


export const EditableComment = (props) => {
  // debugger
  return props.comments.map((comment, index) => {
    // debugger
    return (
    <div key={index} className='tweet-list'>
      <div className='ui center aligned grid'>
          {
            (comment.editable) ? (
              <div className='editable-tweet'>
                <EditTweetInput
                  tweet={comment}
                  onSubmitForm={props.onSubmitForm}
                  closeEditable={props.closeEditable}
                />
              </div>
            ) : (
              <div className='editable-tweet'>
                <Comment
                  comment={comment}
                  editableComment={props.editableComment}
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
