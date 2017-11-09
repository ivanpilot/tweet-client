// import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormTweet from '../components/FormTweet';
import { addTweet } from '../actions/Tweet';
// import { apiTweet } from '../client/ApiTweet';


// const mapStateToProps = (state) => ({
//   activeThreadId: state.activeThreadId
// })

function onSubmitForm(tweet){
  return (dispatch) => {
    dispatch(addTweet(tweet))
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onSubmitForm
  }, dispatch)
}

export const AddTweetInput = connect(
  null,
  mapDispatchToProps,
) (FormTweet)
