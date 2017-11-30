import React from 'react';
import '../styles/Tweet.css'

export const Tweet = (props) => {
  if(props.tweet.isFetching){
    return(
      <div className="ui cards">
        <div className="card">
          <div className="content tweet-saving">
            ... saving ...
            <div className="header">
              {props.tweet.title}
            </div>
            <div className="description">
              {props.tweet.body}
            </div>
          </div>
        </div>
      </div>
    )
  } else {
  return (
    <div className="ui cards">
      <div className="card">
        <div className={props.tweet.active ? "content tweet-blue" : "content tweet"}>
          <div
            className="header"
            onClick={() => props.onActiveClick(props.tweet.id, props.activeTweet, props.editableTweet)}
          >
            {props.tweet.title}
          </div>
          <div
            className="description"
            onClick={() => props.onActiveClick(props.tweet.id, props.activeTweet, props.editableTweet)}
          >
            {props.tweet.body}
          </div>
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
                  onClick={() => props.onEditClick(props.tweet.id, props.activeTweet, props.editableTweet)}
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
