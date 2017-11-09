import React from 'react';
import FormTweet from './FormTweet';

export const EditTweetInput = (props) => (
  <div>
    <FormTweet
      tweet={props.tweet}
      closeEditable={props.closeEditable}
      onSubmitForm={props.onSubmitForm}
    />
  </div>
)
