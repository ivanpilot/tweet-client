import React from 'react';
import { Comment } from './Comment';
import { EditCommentInput } from './EditCommentInput';
import { DisplayError } from '../components/DisplayError';
import '../styles/EditableComment.css';


export const EditableComment = (props) => {
  return props.comments.map((comment, index) => {
    if(props.commentError && ((props.commentError.id === comment.react_id) || (props.commentError.id === comment.id))){
      return(
        <div>
          <DisplayError
            message={`Ooops... seems there is an issue. Try reload the page. 'HTTP status: ${props.commentError.status}. Error message: ${props.commentError.message}'`}
          />
        </div>
      )
    } else {
      return (
      <div key={index}>
        <div className='ui center aligned grid'>
            {
              (comment.editable) ? (
                <div className='editable-comment'>
                  <EditCommentInput
                    comment={comment}
                    activeTweet={props.activeTweet}
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
    }
  })
}
