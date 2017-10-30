import React from 'react';
// import {client} from './../Client'
// import {onEditableTweetMode} from '../actions/EditableTweet'
// import {deleteTweet} from '../actions/Tweet'

// class Tweet extends React.Component {
//
//   onEditClick = (editableTweetId) => {
//     // debugger
//     this.props.store.dispatch(onEditableTweetMode(editableTweetId))
//   }
//
//   onTrashClick = (editableTweetId) => {
//     this.props.store.dispatch(deleteTweet(editableTweetId))
//   }
//
//   render () {
//     const tweet = this.props.tweet
//     const user = client.currentUser()
//
//     return(
//       <div className="ui cards">
//         <div className="card">
//           <div className="content">
//             <div className="header">{tweet.title}</div>
//             <div className="description">{tweet.body}</div>
//             {(user.id === tweet.userId) ? (
//                 <div className='extra content'>
//                   <span
//                     className='right floated trash icon'
//                     onClick={() => this.onTrashClick(this.props.editableTweetId)}
//                   >
//                     <a><i className='trash icon' /></a>
//                   </span>
//                   <span
//                     className='right floated edit icon'
//                     onClick={() => this.onEditClick(this.props.editableTweetId)}
//                   >
//                     <a><i className='edit icon' /></a>
//                   </span>
//                 </div>
//               ) : (null)
//             }
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
// export default Tweet

export const Tweet = (props) => (
  <div className="ui cards">
    <div className="card">
      <div className="content">
        <div className="header">{props.tweet.title}</div>
        <div className="description">{props.tweet.body}</div>
        {
          (props.currentUserId === props.tweet.userId) ? (
            <div className='extra content'>
              <span
                className='right floated trash icon'
                onClick={() => props.onTrashClick(props.editableTweetId)}
              >
                <a><i className='trash icon' /></a>
              </span>
              <span
                className='right floated edit icon'
                onClick={() => props.onEditClick(props.editableTweetId)}
              >
                <a><i className='edit icon' /></a>
              </span>
            </div>
          ) : (null)
        }
      </div>
    </div>
  </div>
)
