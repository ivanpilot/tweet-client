import React from 'react';
import { connect } from 'react-redux';
import { getActiveTweet } from '../reducers/Tweets';
import { VerticalMenu } from '../components/VerticalMenu';
import { TweetContainer } from '../components/TweetContainer';
import { ThreadTabs } from './ThreadTabs';

class RootPage extends React.Component {
  render(){
    // debugger
    return(
      <div className='ui two column stackable divided grid'>
        <div className="row">
          <div className='ui four wide column'>
            <VerticalMenu
              activeTweet={this.props.activeTweet}
            />
          </div>
          <div className='ui twelve wide column'>
            <ThreadTabs />
            <TweetContainer
              activeTweet={this.props.activeTweet}
            />
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  // debugger
  return {
    activeTweet: getActiveTweet(state.tweets),
  }
}

export default connect(
  mapStateToProps,
) (RootPage)
