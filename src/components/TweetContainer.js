import React from 'react';
import EditableTweetList  from '../containers/EditableTweetList';
import EditableCommentList from '../containers/EditableCommentList';
import '../styles/TweetContainer.css';


export const TweetContainer = (props) => {
  const cssClassTweets = ['tweets-col']
  const cssClassComments = ['comments-col']
  if(props.activeTweet) {
    cssClassTweets.push('hide-tweets-col')
    cssClassComments.push('visible-comments-col')
  }
  return(
    <div className="ui grid">
      <div className="row">
          <div className={cssClassTweets.join(' ')}>
            <EditableTweetList />
          </div>
          <div className={cssClassComments.join(' ')}>
            <EditableCommentList />
          </div>
        </div>
    </div>
  )
}
