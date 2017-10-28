import React from 'react';
import {client} from './../Client'

class Tweet extends React.Component {

  // constructor(props){
  //   super(props)
  //   this.onTrashClick = this.onTrashClick.bind(this)
  // }

  onEditClick = () => {
    this.props.store.dispatch({
      type: 'ON_EDITABLE_TWEET_MODE',
      id: this.props.tweet.id
    })
  }



  onTrashClick = () => {
    this.props.store.dispatch({
      type: 'DELETE_TWEET',
      id: this.props.tweet.id
    })
  }

  render () {
    const tweet = this.props.tweet
    const user = client.currentUser()
    // debugger
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
