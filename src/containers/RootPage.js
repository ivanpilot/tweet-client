import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActiveTweet } from '../reducers/Tweets';
import { getFetchingTweetsError, getFetchingCommentsError } from '../reducers/Errors';
import { VerticalMenu } from '../components/VerticalMenu';
import Thread from './Thread';
import { apiTweet } from '../client/ApiTweet';
import { normalize } from 'normalizr';
import { normalizedTweet } from '../normalizers/Normalizr';
import { addTweet } from '../actions/Tweet';
import { fetchItemFailure } from '../actions/Error';
import { DisplayError } from '../components/DisplayError'


class RootPage extends React.Component {

  state = {
    isFetching: false
  }

  componentDidMount(){
    this.setState({isFetching: true})
    this.fetchingTweets()
  }

  fetchingTweets = () => {
    this.props.fetchTweets().then(
      response => {
        this.setState({isFetching: false})
      },
      error => {
        this.setState({isFetching: false})
        this.props.fetchFailure(error)
      }
    )
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
            onRetry={this.fetchingTweets}
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
              <Thread />
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
      const newTweets = normalizedTweets.entities.tweets || {}
      Object.keys(newTweets).map(newTweet => {
        return dispatch(addTweet(newTweets[newTweet]))
      })
    })
  }
}

function fetchFailure(error) {
  return (dispatch) => {
    dispatch(fetchItemFailure('tweets', error))
  }
}


const mapStateToProps = (state) => {
  return {
    activeTweet: getActiveTweet(state.entities.tweets),
    tweetsError: getFetchingTweetsError(state.errors),
    commentError: getFetchingCommentsError(state.errors)
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
