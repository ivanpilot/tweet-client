import React from 'react';
import EditableTweetList from './EditableTweetList'
import ThreadTabs from './ThreadTabs'

export const TweetContainer = (props) => (
  <div className="ui center aligned">
    <ThreadTabs />
    <EditableTweetList />
  </div>
)

// class TweetContainer extends React.Component {
//   render(){
//     return (
//       <div className="ui center aligned">
//         <ThreadTabs />
//         <EditableTweetList />
//       </div>
//     )
//   }
// }
//
// export default TweetContainer
