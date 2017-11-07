// import React from 'react';
import { connect } from 'react-redux';
import FormTweet from '../components/FormTweet';
import { addTweet } from '../actions/Tweet';
import { apiTweet } from '../client/ApiTweet';

import { offEditableTweetMode } from '../actions/EditableTweet';
// import { store } from '../store';


const mapStateToProps = (state) => ({
  activeThreadId: state.activeThreadId
})

const mapDispatchToProps = (dispatch) => ({
  dispatch
})


const mergeProps = (stateProps, dispatchProps) => ({
  onSubmitForm: (tweet) => {
    dispatchProps.dispatch(offEditableTweetMode())
    dispatchProps.dispatch(addTweet(tweet, stateProps.activeThreadId))
    apiTweet.addNewTweet(tweet)
  }
})

export const AddTweetInput = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
) (FormTweet)



// class AddTweetInput extends React.Component {
//
//   // componentDidMount(){
//   //   store.subscribe(() => this.forceUpdate())
//   // }
//
//   onSubmitForm = (tweet) => {
//     const activeThreadId = store.getState().activeThreadId
//     store.dispatch(offEditableTweetMode())
//     store.dispatch(addTweet(tweet, activeThreadId))
//   }
//
//   render(){
//     return(
//       <div>
//         <FormTweet
//           onSubmitForm={this.onSubmitForm}
//         />
//       </div>
//     )
//   }
// }
//
// export default AddTweetInput
