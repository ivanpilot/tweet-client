import React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { getActiveTweet } from '../reducers/TweetsById';
import EditableTweetList  from '../containers/EditableTweetList';
import EditableCommentList from '../containers/EditableCommentList';
import '../styles/TweetContainer.css';


export const TweetContainer = (props) => {
  const cssClassTweets = ['tweets-col']
  const cssClassComments = ['comments-col']
  if(props.activeTweet) {
    cssClassTweets.push('hide-tweets-col')
    cssClassComments.push('visible-comments-col')
  }
  return(
    <div className="ui grid">
      <div className="row">
          <div className={cssClassTweets.join(' ')}>
            <EditableTweetList />
          </div>
          <div className={cssClassComments.join(' ')}>
            <EditableCommentList />
          </div>
        </div>
    </div>
  )
}


// class TweetContainer extends React.Component {
//   render(){
//     // debugger
//     return(
//       <div className="ui center aligned">
//         <div className={ this.props.activeTweet ? ('ui two column stackable divided grid') : ('')}>
//           <div className="row">
//             <div className={this.props.activeTweet ? ('ui eight wide column') : ('')}>
//               <EditableTweetList />
//             </div>
//             { this.props.activeTweet ? (
//             <div className='ui eight wide column'>
//
//               <EditableCommentList />
//
//             </div>
//             ) : (null)
//             }
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
//
// export default TweetContainer
// const mapStateToProps = (state) => {
//   return {
//     activeTweet: getActiveTweet(state.tweetsById),
//   }
// }
//
// export default connect(
//   mapStateToProps,
// ) (TweetContainer)
