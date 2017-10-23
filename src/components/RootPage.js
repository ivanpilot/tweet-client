import React from 'react';
import VerticalMenu from './VerticalMenu';
import TweetContainer from './TweetContainer';


class RootPage extends React.Component {
  render(){
    return (
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
  }
}

export default RootPage
