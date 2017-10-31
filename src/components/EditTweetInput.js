import React from 'react';
import FormTweet from './FormTweet';

export const EditTweetInput = (props) => (
  <div>
    <FormTweet
      tweet={props.tweet}
      offEditableTweetMode={props.offEditableTweetMode}
      onSubmitForm={props.onSubmitForm}
    />
  </div>
)
