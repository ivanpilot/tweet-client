import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActiveTweet } from '../reducers/Tweets';
import { getTweetsError, getCommentsError } from '../reducers/Errors';
import { VerticalMenu } from '../components/VerticalMenu';
import { TweetContainer } from '../components/TweetContainer';
import ThreadTabs from './ThreadTabs';
import { apiTweet } from '../client/ApiTweet';
import { normalize } from 'normalizr';
import { normalizedTweet } from '../normalizers/Normalizr';
import { addTweet } from '../actions/Tweet';
import { fetchTweetsFailure } from '../actions/Error';
import { DisplayError } from '../components/DisplayError'


class RootPage extends React.Component {

  state = {
    isFetching: false
  }

  componentDidMount(){
    this.setState({isFetching: true})
    this.props.fetchTweets().then(
      response => {
        this.setState({isFetching: false})
      },
      error => {
        this.setState({isFetching: false})
        this.props.fetchFailure(error)
      }
    );
  }

  render(){
    if(this.state.isFetching){
      return(
        <div className='ui active centered inline loader' />
      )
    } else if(this.props.tweetsError){
      return(
        <div>
          <DisplayError
            message={`Looks like a server issue. Retry in a few sec... 'HTTP status: ${this.props.tweetsError.status}. Error message: ${this.props.tweetsError.message}'`}
            onRetry={() => this.props.fetchTweets().then(
              response => {
                this.setState({isFetching: false})
              },
              error => {
                this.setState({isFetching: false})
                this.props.fetchFailure(error)
              }
            )}
          />
        </div>
      )
    } else {
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
}

function fetchTweets() {
  return (dispatch) => {
    return apiTweet.fetchTweets((tweets) => {
      const normalizedTweets = normalize(tweets, normalizedTweet)
      const newTweets = normalizedTweets.entities.tweets
      Object.keys(newTweets).map(newTweet => {
        return dispatch(addTweet(newTweets[newTweet]))
      })
    })
  }
}

function fetchFailure(error) {
  return (dispatch) => {
    dispatch(fetchTweetsFailure(error))
  }
}


const mapStateToProps = (state) => {
  return {
    activeTweet: getActiveTweet(state.entities.tweets),
    tweetsError: getTweetsError(state.errors),
    commentError: getCommentsError(state.errors)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchTweets,
    fetchFailure
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (RootPage)
