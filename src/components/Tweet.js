import React from 'react';

class Tweet extends React.Component {
  render () {
    const tweets = this.props.tweets.map( (tweet, index) => (
      <div key={index} className="ui cards">
        <div className="card">
          <div className="content">
            <div className="header">{tweet.title}</div>
            <div className="description">{tweet.description}</div>
            <div className='extra content'>
            <span className='right floated trash icon' onClick={this.handleTrashClick}>
              <i className='trash icon' />
            </span>
            <span className='right floated edit icon' onClick={this.props.onEditClick}>
              <i className='edit icon' />
            </span>
          </div>
          </div>
        </div>
      </div>
    ))

    return(
      <div>
        {tweets}
      </div>
    )
  }
}

export default Tweet
