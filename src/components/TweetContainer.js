import React from 'react';
import EditableTweetList  from '../containers/EditableTweetList';
import EditableCommentList from '../containers/EditableCommentList';
import '../styles/TweetContainer.css';


// class TweetContainer extends React.Component {
//   // componentDidMount(){
//   //   apiTweet.loadTweets((tweets) => {
//   //     console.log(tweets)
//   //     // return this.props.loadsTweets(tweets)
//   //     const normalizedData = normalize(tweets, normalizedTweet)
//   //     console.log(normalizedData)
//   //     return this.props.loadsTweets(normalizedData)
//   //
//   //   })
//   // }
//
//   render(){
//     const cssClassTweets = ['tweets-col']
//     const cssClassComments = ['comments-col']
//     if(this.props.activeTweet) {
//       cssClassTweets.push('hide-tweets-col')
//       cssClassComments.push('visible-comments-col')
//     }
//     return(
//       <div className="ui grid">
//         <div className="row">
//             <div className={cssClassTweets.join(' ')}>
//               <EditableTweetList />
//             </div>
//             <div className={cssClassComments.join(' ')}>
//               <EditableCommentList />
//             </div>
//           </div>
//       </div>
//     )
//   }
// }
//
// export default TweetContainer
// //
// // function loadRawTweets(tweets){
// //   return (dispatch) => {
// //     dispatch(loadTweets(tweets))
// //   }
// // }
// //
// // function loadRawComments(comments){
// //   return (dispatch) => {
// //     dispatch(loadComments(comments))
// //   }
// // }
// //
// //
// // const mapDispatchToProps = (dispatch) => {
// //   return bindActionCreators({
// //     loadTweets,
// //     loadComments
// //   }, dispatch)
// // }
// //
// // export default connect(
// //   null,
// //   mapDispatchToProps
// // )(TweetContainer)


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
