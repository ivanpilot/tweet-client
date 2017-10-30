import React from 'react';
import TextFieldSubmit from './TextFieldSubmit';

export const EditTweetInput = (props) => (
  <div>
    <TextFieldSubmit
      tweet={props.tweet}
      offEditableTweetMode={props.offEditableTweetMode}
      onSubmitForm={props.onSubmitForm}
    />
  </div>
)
