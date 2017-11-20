import React from 'react';
import { Comment } from './Comment';
import { EditCommentInput } from './EditCommentInput';
import '../styles/EditableComment.css';


export const EditableComment = (props) => {
  // debugger

  return props.comments.map((comment, index) => {
    // debugger
    return (
    <div key={index}>
      <div className='ui center aligned grid'>
          {
            (comment.editable) ? (
              <div className='editable-comment'>
                <EditCommentInput
                  comment={comment}
                  onSubmitForm={props.onSubmitForm}
                  closeEditable={props.closeEditable}
                />
              </div>
            ) : (
              <div className='editable-comment'>
                <Comment
                  comment={comment}
                  editableComment={props.editableComment}
                  activeTweet={props.activeTweet}
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
