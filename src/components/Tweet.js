import React from 'react';

class Tweet extends React.Component {
  render () {

    const tweets = this.props.tweets.map( (tweet, index) => (
      <div key={index} className="ui cards">
        <div className="card">
          <div className="content">
            <div className="header">{tweet.title}</div>
            <div className="description">{tweet.description}</div>
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
