import React from 'react'

class ThreadTabs extends React.Component {
  render(){
    return(
      <div className="ui tabular menu">
        <a className="active item">
          Wall
        </a>
        <a className="item">
        My Tweets
        </a>
      </div>
    )
  }
}

export default ThreadTabs
