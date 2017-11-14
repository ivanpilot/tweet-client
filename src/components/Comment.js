import React from 'react';
import '../styles/Comment.css'

export const Comment = (props) => {
  // debugger
  return (
    <div className="ui cards border-blue">
      <div className="card ">
        <div className="content comment-blue">
          <div className="description ">{props.comment.description}</div>
          {
            (props.comment.ownership) ? (
              <div className='extra content'>
                <span
                  className='right floated trash icon'
                  onClick={() => props.onTrashClick(props.comment.id)}
                >
                  <a><i className='trash icon' /></a>
                </span>
                <span
                  className='right floated edit icon'
                  onClick={() => props.onEditClick(props.comment.id, props.editableComment)}
                >
                  <a><i className='edit icon' /></a>
                </span>
              </div>
            ) : (null)
          }
        </div>
      </div>
    </div>
  )
}
