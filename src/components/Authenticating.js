import React from 'react';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { client } from '../Client';

class Authenticating extends React.Component{
  state = {
    loginInProgress: false,
    shouldRedirect: false
  }

  onSubmitForm = (user) => {
    this.setState({loginInProgress: true})
    this.login(user);
    this.setState({shouldRedirect: true})
  }

  login = (user) => {
    client.setToken({
      id:'1',
      email: user.email,
      password: user.password
    })
  }

  clientIsLoggedIn = () => {
    return client.isLoggedIn()
  }

  redirectPath = () => {
    const locationState = this.props.location.state;
    const pathname = (locationState && locationState.from && locationState.from.pathname)
    return pathname || '/tweets';
  }

  render(){
    if(this.props.location.pathname === '/login'){
      return(
        <Login
          onSubmitForm={this.onSubmitForm}
          redirectPath={this.redirectPath()}
          loginInProgress={this.state.loginInProgress}
          shouldRedirect={this.state.shouldRedirect}
        />
      )
    } else if (this.props.location.pathname === '/signup'){
      return(
        <SignUp
          onSubmitForm={this.onSubmitForm}
          loginInProgress={this.state.loginInProgress}
          shouldRedirect={this.state.shouldRedirect}
        />
      )
    }
  }
}

export default Authenticating
