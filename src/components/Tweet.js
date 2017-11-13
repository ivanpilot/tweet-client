import React from 'react';
import '../styles/Tweet.css'

export const Tweet = (props) => {
  // debugger
return (
  <div className="ui cards">
    <div
      className="card"
      onClick={() => props.onActiveClick(props.tweet.id)}
    >
      <div className={props.tweet.active ? "content tweet-blue" : "content"}>
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
                onClick={() => props.onEditClick(props.tweet.id, props.editableTweet)}
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
