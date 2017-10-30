import React from 'react';
import {VerticalMenu} from './VerticalMenu';
import {TweetContainer} from './TweetContainer';

export const RootPage = (props) => (
  <div className='ui two column stackable divided grid'>
    <div className="row">
      <div className='ui four wide column'>
        <VerticalMenu />
      </div>
      <div className='ui twelve wide column'>
        <TweetContainer />
      </div>
    </div>
  </div>
)
