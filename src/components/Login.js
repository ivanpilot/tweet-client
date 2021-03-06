import React from 'react';
import { Redirect } from 'react-router-dom';
import FormLogin from './FormLogin';
import { client } from '../client/Client';
import '../styles/Style.css'
import '../styles/Login.css'

export const Login = (props) => {
  if(client.isLoggedIn() || props.shouldRedirect){
    return(
      <Redirect to={props.redirectPath} />
    )
  } else {
    return(
      <div className='enclosing-frame'>
        <div className='title-frame'>
          <h1><span className='title'>Tweetter</span></h1>
        </div>
        { props.loginInProgress ? (
          <div className='ui active centered inline loader' />
        ) : (
          <div className='signup'>
            {props.connectError ? (
              <h2>Invalid credentials, please try again</h2>
            ) : (null)}
            <h1>Login </h1>
            <FormLogin
              onSubmitForm={props.onSubmitForm}
            />
          </div>
        )}
      </div>
    )
  }
}
