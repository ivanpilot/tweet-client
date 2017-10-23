import React from 'react';
import VerticalMenu from './VerticalMenu';
import TweetContainer from './TweetContainer';


class RootPage extends React.Component {

  state = {
    activeThreadId: 'user-v1',
    threads: [
      {
        id: 'user-v1',
        name: 'My Tweets',
        tweets: [
          {
            id: 1,
            title: "First tweet",
            description: "This is the first tweet",
            user_id: 1
          },
          {
            id: 2,
            title: "Second tweet",
            description: "This is the second tweet",
            user_id: 1
          },
        ]
      },
      {
        id: 'all',
        name: 'Wall',
        tweets: [
          {
            id: 1,
            title: "First tweet",
            description: "This is the first tweet",
            user_id: 1
          },
          {
            id: 2,
            title: "Second tweet",
            description: "This is the second tweet",
            user_id: 1
          },
          {
            id: 3,
            title: "Third tweet",
            description: "This is the third tweet",
            user_id: 2
          },
        ]
      }
    ]
  }

  render(){
    return (
      <div className='ui two column stackable divided grid'>
        <div className="row">
          <div className='ui four wide column'>
            <VerticalMenu />
          </div>
          <div className='ui twelve wide column'>
            <TweetContainer
              activeThreadId={this.state.activeThreadId}
              threads={this.state.threads}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default RootPage
