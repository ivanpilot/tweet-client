import React from 'react';
import FormSignUp from './FormSignUp';
import '../styles/Style.css'
import '../styles/SignUp.css'

export const SignUp = (props) => (
  <div className='enclosing-frame'>
    <div className='title-frame'>
      <h1><span className='title'>The Fake Tweeter</span></h1>
    </div>
    <div className='signup'>
      <h1>Sign Up </h1>
      <FormSignUp />
    </div>
  </div>
)
