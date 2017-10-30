import React from 'react';
import { Tweet } from './Tweet'
// import MessageInput from './MessageInput'
import { EditTweetInput } from './EditTweetInput'
import '../styles/EditableTweet.css'

export const EditableTweet = (props) => (
  <div className='tweet-list'>
    <div className='ui center aligned grid'>
      <div className='editable-tweet'>
        {
          (props.editableTweet.id === props.activeEditableTweetId) ? (
            <EditTweetInput
              tweet={props.editableTweet.tweet}
              offEditableTweetMode={props.offEditableTweetMode}
              onSubmitForm={props.onSubmitForm}
            />
          ) : (
            <Tweet
              tweet={props.editableTweet.tweet}
              editableTweetId={props.editableTweet.id}
              currentUserId={props.currentUserId}
              onEditClick={props.onEditClick}
              onTrashClick={props.onTrashClick}
            />
          )
        }
      </div>
    </div>
  </div>
)


// class EditableTweet extends React.Component {
//
//   render(){
//     // debugger
//     if(this.props.editableTweet.id === this.props.activeEditableTweetId){
//       return(
//         <div className='editable-tweet'>
//           <EditTweetInput
//             tweet={this.props.editableTweet.tweet}
//           />
//         </div>
//       )
//     } else {
//       return(
//         <div className='editable-tweet'>
//           <Tweet
//             store={this.props.store}
//             editableTweetId={this.props.editableTweet.id}
//             tweet={this.props.editableTweet.tweet}
//           />
//         </div>
//       )
//     }
//   }
// }
//
// export default EditableTweet
