import React from 'react';
import {client} from './../Client'

class Tweet extends React.Component {

  onTrashClick = () => {
    this.props.handleTrashClick(this.props.tweet.id)
  }

  onEditClick = () => {
    this.props.handleEditClick(this.props.tweet.id)
  }

  // componentWillMount(){
  //   this.getCurrentUser()
  // }
  //
  // getCurrentUser = () => {
  //   client.currentUser()
  // }



  render () {
    const tweet = this.props.tweet

    const user = client.currentUser()
// debugger

    return(
      <div className="ui cards">
        <div className="card">
          <div className="content">
            <div className="header">{tweet.title}</div>
            <div className="description">{tweet.description}</div>
            {(user.id == tweet.user_id) ? (
                <div className='extra content'>
                  <span
                    className='right floated trash icon'
                    onClick={this.onTrashClick}
                  >
                    <a><i className='trash icon' /></a>
                  </span>
                  <span
                    className='right floated edit icon'
                    onClick={this.onEditClick}>
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
