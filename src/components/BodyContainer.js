import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute'
import { RootPage } from './RootPage';
import Login from './Login';
import Logout from './Logout';
import { SignUp } from './SignUp';
import { NotFound } from './NotFound';
import { Boo } from './Boo';
import '../styles/BodyContainer.css';

class BodyContainer extends React.Component {
  render(){
    return(
      <div className="body-container">
        <Switch>
          <PrivateRoute exact path='/tweets' component={RootPage} />
          <PrivateRoute exact path='/boo' component={Boo} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/' render={() => (
            <Redirect to='/tweets' />
          )} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default BodyContainer
