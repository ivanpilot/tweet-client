import React from 'react';
import { AddTweetInput } from '../containers/AddTweetInput';
import { AddCommentInput } from '../containers/AddCommentInput';
import '../styles/VerticalMenu.css';

export const VerticalMenu = (props) => (
  <div className='vertical-menu'>
    <div className='ui header item center aligned'>
      Tweet
    </div>
    <AddTweetInput />
    <br/>
    <div className='ui header item center aligned'>
      Comment
    </div>
    <AddCommentInput />
  </div>
)
