import React from 'react';
// import TextFieldSubmit from './TextFieldSubmit';
import FormTweet from './FormTweet';
import {addTweet} from '../actions/Tweet';
import {offEditableTweetMode} from '../actions/EditableTweet';
import { store } from '../store';

class AddTweetInput extends React.Component {

  // componentDidMount(){
  //   store.subscribe(() => this.forceUpdate())
  // }

  onSubmitForm = (tweet) => {
    const activeThreadId = store.getState().activeThreadId
    store.dispatch(offEditableTweetMode())
    store.dispatch(addTweet(tweet, activeThreadId))
  }

  render(){
    return(
      <div>
        <FormTweet
          onSubmitForm={this.onSubmitForm}
        />
      </div>
    )
  }
}

export default AddTweetInput
