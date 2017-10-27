import React from 'react';
import {client} from './../Client'

class Tweet extends React.Component {

  onTrashClick = () => {
    this.props.store.dispatch({
      type: 'DELETE_TWEET',
      id: this.props.tweet.id
    })
  }

  onOpenFormClick = () => {
    this.props.onOpenForm()
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
            {(user.id === tweet.user_id) ? (
                <div className='extra content'>
                  <span
                    className='right floated trash icon'
                    onClick={this.onTrashClick}
                  >
                    <a><i className='trash icon' /></a>
                  </span>
                  <span
                    className='right floated edit icon'
                    onClick={() => this.props.store.dispatch({
                      type: 'OPEN_FORM',
                      editableTweetId: this.props.editableTweetId
                    })}
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
