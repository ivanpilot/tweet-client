import React from 'react';
import {EditableTweetList} from './EditableTweetList'
import { ThreadTabs } from './ThreadTabs'

export const TweetContainer = (props) => (
  <div className="ui center aligned">
    <ThreadTabs />
    <EditableTweetList />
  </div>
)
