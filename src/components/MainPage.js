import React from 'react';
import TweetList from './TweetList'

class MainPage extends React.Component {
  render(){
    return (
      <div className="ui center aligned grid">
        <TweetList />
      </div>
    )
  }
}

export default MainPage
