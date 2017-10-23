import React from 'react';

class TweetList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tweets: [
        {
          title: "First tweet",
          description: "This is the first tweet"
        },
        {
          title: "Second tweet",
          description: "This is the second tweet"
        },
        {
          title: "Thirs tweet",
          description: "This is the third tweet"
        },
      ]
    }
  }

  render(){

    const tweets = this.state.tweets.map( (tweet, index) =>
    <div key={index} className="ui cards">
      <div className="card">
        <div className="content">
          <div className="header">{tweet.title}</div>
          <div className="description">{tweet.description}</div>
        </div>
      </div>
    </div>
    )

    return(
      <div>
        <ul>{tweets}</ul>
      </div>
    )
  }



}

export default TweetList;
