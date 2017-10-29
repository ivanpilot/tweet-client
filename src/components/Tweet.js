import React from 'react';
import {client} from './../Client'

class Tweet extends React.Component {

  onEditClick = () => {
    this.props.store.dispatch({
      type: 'ON_EDITABLE_TWEET_MODE',
      editableTweetId: this.props.editableTweetId
    })
  }

  onTrashClick = () => {
    this.props.store.dispatch({
      type: 'DELETE_TWEET',
      editableTweetId: this.props.editableTweetId
    })
  }

  render () {
    const tweet = this.props.tweet
    const user = client.currentUser()

    return(
      <div className="ui cards">
        <div className="card">
          <div className="content">
            <div className="header">{tweet.title}</div>
            <div className="description">{tweet.body}</div>
            {(user.id === tweet.userId) ? (
                <div className='extra content'>
                  <span
                    className='right floated trash icon'
                    onClick={() => this.onTrashClick()}
                  >
                    <a><i className='trash icon' /></a>
                  </span>
                  <span
                    className='right floated edit icon'
                    onClick={() => this.onEditClick()}
                  >
                    <a><i className='edit icon' /></a>
                  </span>
                </div>
              ) : (null)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Tweet
