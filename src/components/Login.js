import React from 'react';
import FormLogin from './FormLogin';
import '../styles/Style.css'
import '../styles/Login.css'

export const Login = (props) => (
  <div className='enclosing-frame'>
    <div className='title-frame'>
      <h1><span className='title'>The Fake Tweeter</span></h1>
    </div>
    <div className='signup'>
      <h1>Login </h1>
      <FormLogin />
    </div>
  </div>
)

// class Login extends React.Component{
//   render(){
//     return(
//       <div>
//         <h1>Login </h1>
//         <FormLogin />
//       </div>
//     )
//   }
// }
//
// export default Login
