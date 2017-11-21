import React from 'react';

export const DisplayError = ({message, onRetry}) => (
  <div>
    <div className="ui compact red message">
      <p>{message}</p>
      <button
        className='mini ui red button'
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  </div>
)
