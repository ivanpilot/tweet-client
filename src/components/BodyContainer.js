import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute'
import { RootPage } from './RootPage';
import { Login } from './Login';
import Logout from './Logout';
import { SignUp } from './SignUp';
import { NotFound } from './NotFound';
import '../styles/BodyContainer.css';

class BodyContainer extends React.Component {
  render(){
    if(true){
      return(
        <div className="body-container">
          <Switch>
            <PrivateRoute exact={true} path='/' component={RootPage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/logout' component={Logout} />
            <Route component={NotFound} />
          </Switch>
        </div>
      )
    } else {
      return (
        <div className='ui active centered inline loader' ></div>
      )
    }
  }
}

export default BodyContainer
