import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActiveTweet } from '../reducers/TweetsById';
import EditableTweetList  from '../containers/EditableTweetList';
import EditableCommentList from '../containers/EditableCommentList';


class TweetContainer extends React.Component {
  render(){
    // debugger
    return(
      <div className="ui center aligned">
        <div className={ this.props.activeTweet ? ('ui two column stackable divided grid') : ('')}>
          <div className="row">
            <div className={this.props.activeTweet ? ('ui eight wide column') : ('')}>
              <EditableTweetList />
            </div>
            { this.props.activeTweet ? (
            <div className='ui eight wide column'>
              <EditableCommentList />
            </div>
            ) : (null)
            }
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
) (TweetContainer)
