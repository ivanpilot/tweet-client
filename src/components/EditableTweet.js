import React from 'react';
import { Tweet } from './Tweet';
import { EditTweetInput } from './EditTweetInput';
import '../styles/EditableTweet.css';


export const EditableTweet = (props) => {
  return props.editableTweets.map((editableTweet, index) => {
    return (
    <div key={index} className='tweet-list'>
      <div className='ui center aligned grid'>
          {
            (editableTweet.id === props.activeEditableTweetId) ? (
              <div className='editable-tweet'>
                <EditTweetInput
                  tweet={editableTweet.tweet}
                  offEditableTweetMode={props.offEditableTweetMode}
                  onSubmitForm={props.onSubmitForm}
                />
              </div>
            ) : (
              <div className='editable-tweet'>
                <Tweet
                  tweet={editableTweet.tweet}
                  editableTweetId={editableTweet.id}
                  currentUserId={props.currentUserId}
                  onEditClick={props.onEditClick}
                  onTrashClick={props.onTrashClick}
                />
              </div>
            )
          }
      </div>
    </div>
    )
  })
}


// export const EditableTweet = (props) => //{
//   // debugger
//   //return
// (
//   <div className='tweet-list'>
//     <div className='ui center aligned grid'>
//         {
//           (props.editableTweet.id === props.activeEditableTweetId) ? (
//             <div className='editable-tweet'>
//               <EditTweetInput
//                 tweet={props.editableTweet.tweet}
//                 offEditableTweetMode={props.offEditableTweetMode}
//                 onSubmitForm={props.onSubmitForm}
//               />
//             </div>
//           ) : (
//             <div className='editable-tweet'>
//               <Tweet
//                 tweet={props.editableTweet.tweet}
//                 editableTweetId={props.editableTweet.id}
//                 currentUserId={props.currentUserId}
//                 onEditClick={props.onEditClick}
//                 onTrashClick={props.onTrashClick}
//               />
//             </div>
//           )
//         }
//     </div>
//   </div>
// )
// //}
