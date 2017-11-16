import React from 'react';
import { connect } from 'react-redux';
import { getActiveTweet } from '../reducers/TweetsById';
import { VerticalMenu } from './VerticalMenu';
import { TweetContainer } from './TweetContainer';
import { ThreadTabs } from '../containers/ThreadTabs';

class RootPage extends React.Component {
  render(){
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
  return {
    activeTweet: getActiveTweet(state.tweetsById),
  }
}

export default connect(
  mapStateToProps,
) (RootPage)
