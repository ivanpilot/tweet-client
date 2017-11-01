import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RootPage } from './RootPage';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { NotFound } from './NotFound';
import '../styles/BodyContainer.css';

class BodyContainer extends React.Component {
  render(){
    return(
      <div className="body-container">
        <Switch>
          <Route exact={true} path='/' component={RootPage} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route component={NotFound} />

        </Switch>
      </div>
    )
  }
}

export default BodyContainer
