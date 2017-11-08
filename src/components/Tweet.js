import React from 'react';

export const Tweet = (props) => (
  <div className="ui cards">
    <div className="card">
      <div className="content">
        <div className="header">{props.tweet.title}</div>
        <div className="description">{props.tweet.body}</div>
        {
          (props.tweet.ownership) ? (
            <div className='extra content'>
              <span
                className='right floated trash icon'
                onClick={() => props.onTrashClick(props.tweet.id)}
              >
                <a><i className='trash icon' /></a>
              </span>
              <span
                className='right floated edit icon'
                onClick={() => props.onEditClick(props.tweet.id)}
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
