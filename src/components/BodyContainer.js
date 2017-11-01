//will have router and routes to select the page like login / signup / root

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RootPage } from './RootPage';
import Login from './Login';
import { NotFound } from './NotFound';
import '../styles/BodyContainer.css';

class BodyContainer extends React.Component {
  render(){
    return(
      <div className="body-container">
        <Switch>
          <Route exact={true} path='/' component={RootPage} />
          <Route path='/login' component={Login} />
          <Route component={NotFound} />

        </Switch>
      </div>
    )
  }
}

export default BodyContainer
