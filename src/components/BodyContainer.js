import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import RootPage from '../containers/RootPage';
import Authenticating from './Authenticating';
import Logout from './Logout';
import { NotFound } from './NotFound';
import { Boo } from './Boo';
import '../styles/BodyContainer.css';

class BodyContainer extends React.Component {
  render(){
    return(
      <div className="body-container">
        <Switch>
          <Route exact path='/tweets' component={RootPage} />
          <Route exact path='/boo' component={Boo} />
          <Route exact path='/login' component={Authenticating} />
          <Route exact path='/signup' component={Authenticating} />
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
