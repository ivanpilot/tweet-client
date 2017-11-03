import React from 'react';
import { Redirect } from 'react-router-dom';
import FormSignUp from './FormSignUp';
import { client } from '../Client';
import '../styles/Style.css'
import '../styles/SignUp.css'

export const SignUp = (props) => {
  // debugger
  if(client.isLoggedIn() || props.shouldRedirect){
    // debugger
    return(
      <Redirect to='/tweets' />
    )
  } else {
    // debugger
    return(
      <div className='enclosing-frame'>
        <div className='title-frame'>
          <h1><span className='title'>The Fake Tweeter</span></h1>
        </div>
        { props.loginInProgress ? (
          <div className='ui active centered inline loader' />
        ) : (
          <div className='signup'>
            <h1>SignUp </h1>
            <FormSignUp
              onSubmitForm={props.onSubmitForm}
            />
          </div>
        )}
      </div>
    )
  }
}
