import React from 'react';
import { AddTweetInput } from './AddTweetInput';
import '../styles/VerticalMenu.css';

export const VerticalMenu = (props) => (
  <div className='vertical-menu'>
    <div className='ui header item center aligned'>
      Tweet
    </div>
    <AddTweetInput />
  </div>
)
