import React from 'react';
import '../styles/Error.css';

export const DisplayError = ({message, onRetry}) => (
  <div>
    <div className="ui compact red message error">
      <p>{message}</p>
      {onRetry ? (
        <button
          className='mini ui red button'
          onClick={onRetry}
        >
          Retry
        </button>
      ) : (
        null
      )}
    </div>
  </div>
)
