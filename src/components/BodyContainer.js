import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import RootPage from '../containers/RootPage';
import Authenticating from '../containers/Authenticating';
import Logout from './Logout';
import { NotFound } from './NotFound';
import { EyeMe } from './EyeMe';
import '../styles/BodyContainer.css';

class BodyContainer extends React.Component {
  render(){
    return(
      <div className="body-container">
        <Switch>
          <PrivateRoute exact path='/tweets' component={RootPage} />
          <PrivateRoute exact path='/eyeme' component={EyeMe} />
          <Route exact path='/login' component={Authenticating} />
          <Route exact path='/signup' component={Authenticating} />
          <PrivateRoute exact path='/logout' component={Logout} />
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
