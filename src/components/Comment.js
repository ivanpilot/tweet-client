import React from 'react';
import '../styles/Comment.css'

export const Comment = (props) => {
  if(props.comment.isFetching){
    return (
      <div className="ui cards">
        <div className="card">
          <div className="content comment-saving">
            ... saving ...
            <div className="description ">{props.comment.description}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="ui cards">
        <div className="card">
          <div className={!props.comment.ownership ? ("content comment-not-mine") : ("content comment-blue")}>
            <div className="meta">Written by: {props.comment.commenter_name}</div>
            <div className="description ">{props.comment.description}</div>
            {
              (props.comment.ownership) ? (
                <div className='extra content'>
                  <span
                    className='right floated trash icon'
                    onClick={() => props.onTrashClick(props.comment.id, props.activeTweet)}
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
}
