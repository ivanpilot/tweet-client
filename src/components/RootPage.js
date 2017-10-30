import React from 'react';
import VerticalMenu from './VerticalMenu';
import TweetContainer from './TweetContainer';

class RootPage extends React.Component {

  render(){
    return (
      <div className='ui two column stackable divided grid'>
        <div className="row">
          <div className='ui four wide column'>
            <VerticalMenu
              store={this.props.store}
              activeThreadId={this.props.store.getState().activeThreadId}
            />
          </div>
          <div className='ui twelve wide column'>
            <TweetContainer
              store={this.props.store}
              activeThreadId={this.props.store.getState().activeThreadId}
              activeEditableTweetId={this.props.store.getState().activeEditableTweetId}
              threads={this.props.store.getState().threads}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default RootPage
