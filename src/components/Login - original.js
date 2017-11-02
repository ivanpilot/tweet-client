import React from 'react';
import { Redirect } from 'react-router-dom';
import FormLogin from './FormLogin';
import { client } from '../Client';
import '../styles/Style.css'
import '../styles/Login.css'

class Login extends React.Component{
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

  redirectPath = () => {
    const locationState = this.props.location.state;
    const pathname = (locationState && locationState.from && locationState.from.pathname)
    return pathname || '/tweets';
  }


  render(){
    // debugger
    if(client.isLoggedIn() || this.state.shouldRedirect){
      return(
        <Redirect to={this.redirectPath()} />
      )
    } else {
      return(
        <div className='enclosing-frame'>
          <div className='title-frame'>
            <h1><span className='title'>The Fake Tweeter</span></h1>
          </div>
          { this.state.loginInProgress ? (
            <div className='ui active centered inline loader' />
          ) : (
            <div className='signup'>
              <h1>Login </h1>
              <FormLogin
                onSubmitForm={this.onSubmitForm}
              />
            </div>
          )}
        </div>
      )
    }
  }
}

export default Login

//
// export const Login = (props) => (
//   <div>
//     { client.isLoggedIn() ? (
//       <Redirect to='/' />
//     ) : (
//       <div className='enclosing-frame'>
//         <div className='title-frame'>
//           <h1><span className='title'>The Fake Tweeter</span></h1>
//         </div>
//         <div className='signup'>
//           <h1>Login </h1>
//           <FormLogin />
//         </div>
//       </div>
//     )}
//   </div>
// )
