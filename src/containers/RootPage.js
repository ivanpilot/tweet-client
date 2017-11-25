import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActiveTweet } from '../reducers/Tweets';
import { getCommentsError } from '../reducers/Errors';
import { VerticalMenu } from '../components/VerticalMenu';
import { TweetContainer } from '../components/TweetContainer';
import { ThreadTabs } from './ThreadTabs';
import { apiTweet } from '../client/ApiTweet';
import { normalize } from 'normalizr';
import { normalizedTweet } from '../normalizers/Normalizr';
import { addTweet } from '../actions/Tweet';


class RootPage extends React.Component {

  componentDidMount(){
    this.props.fetchTweets();
  }

  render(){
    return(
      <div className='ui two column stackable divided grid'>
        <div className="row">
          <div className='ui four wide column'>
            <VerticalMenu
              activeTweet={this.props.activeTweet}
              commentError={this.props.commentError}
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

function fetchTweets() {
  return (dispatch) => {
    return apiTweet.fetchTweets((tweets) => {
      const normalizedTweets = normalize(tweets, normalizedTweet)
      const newTweets = normalizedTweets.entities.tweets
      Object.keys(newTweets).map(newTweet => {
        dispatch(addTweet(newTweets[newTweet]))
      })
    })
  }
}


const mapStateToProps = (state) => {
  return {
    activeTweet: getActiveTweet(state.entities.tweets),
    commentError: getCommentsError(state.workInProgress.errors)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchTweets,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (RootPage)
