import React from 'react';
import FormComment from './FormComment';

export const EditCommentInput = (props) => {
return(
  <div>
    <FormComment
      comment={props.comment}
      closeEditable={props.closeEditable}
      onSubmitForm={props.onSubmitForm}
    />
  </div>
)
}
