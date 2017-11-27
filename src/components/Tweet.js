import React from 'react';
import '../styles/Tweet.css'

export const Tweet = (props) => {
  // debugger
  if(props.tweet.id === props.tweet.react_id){
    return(
      <div className="ui cards">
        <div className="card">
          <div className={props.tweet.active ? "content tweet-blue" : "content tweet"}>
            <div className="header">
              {props.tweet.title}
            </div>
            <div className="description">
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
  } else {
  return (
    <div
      className="ui cards"
      onClick={() => props.onActiveClick(props.tweet.id, props.activeTweet, props.editableTweet)}
    >
      <div className="card">
        <div className={props.tweet.active ? "content tweet-blue" : "content tweet"}>
          <div className="header">
            {props.tweet.title}
          </div>
          <div className="description">
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
}
