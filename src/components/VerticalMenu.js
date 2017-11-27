import React from 'react';
import AddTweetInput from '../containers/AddTweetInput';
import { AddCommentInput } from '../containers/AddCommentInput';
import '../styles/VerticalMenu.css';

export const VerticalMenu = (props) => {
  const componentClass = ['add-comment-form'];
  if (props.activeTweet && !props.commentError) {componentClass.push('visible-form')}

  return(
  <div className='vertical-menu'>
    <div className='ui header item center aligned'>
      Tweet
    </div>
    <AddTweetInput />
    <div className={componentClass.join(' ')}>
      <br/>
      <div className='ui header item center aligned'>
        Comment
      </div>
      <AddCommentInput />
    </div>
  </div>
)}
