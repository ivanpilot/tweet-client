import React from 'react';
import TweetList from './TweetList'

class MainPage extends React.Component {
  render(){
    return (
      <div className="ui centered grid">
        <TweetList />
      </div>
    )
  }
}

export default MainPage
