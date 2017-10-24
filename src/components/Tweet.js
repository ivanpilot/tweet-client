import React from 'react';

class Tweet extends React.Component {

  onTrashClick = () => {
    this.props.handleTrashClick(this.props.tweet.id)
  }

  onEditClick = () => {
    this.props.handleEditClick(this.props.tweet.id)
  }

  render () {
    const tweet = this.props.tweet

    return(
      <div className="ui cards">
        <div className="card">
          <div className="content">
            <div className="header">{tweet.title}</div>
            <div className="description">{tweet.description}</div>
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
          </div>
        </div>
      </div>
    )
  }
}

export default Tweet
