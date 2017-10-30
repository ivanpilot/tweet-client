import React from 'react';
import TextFieldSubmit from './TextFieldSubmit';
// import {editTweet} from '../actions/Tweet'
// import {offEditableTweetMode} from '../actions/EditableTweet'
// import { store } from '../store'

export const EditTweetInput = (props) => (
  <div>
    <TextFieldSubmit
      tweet={props.tweet}
      offEditableTweetMode={props.offEditableTweetMode}
      onSubmitForm={props.onSubmitForm}
    />
  </div>
)

// class EditTweetInput extends React.Component {
//
//   componentDidMount(){
//     store.subscribe(() => this.forceUpdate())
//   }
//
//   onSubmitForm = (tweet) => {
//     const activeEditableTweetId = store.getState().activeEditableTweetId
//     store.dispatch(editTweet(tweet, activeEditableTweetId))
//     store.dispatch(offEditableTweetMode())
//   }
//
//   render(){
//     debugger
//     return(
//       <div>
//         <TextFieldSubmit
//           tweet={this.props.tweet}
//           offEditableTweetMode={this.offEditableTweetMode}
//           onSubmitForm={this.onSubmitForm}
//         />
//       </div>
//     )
//   }
// }
//
// export default EditTweetInput
