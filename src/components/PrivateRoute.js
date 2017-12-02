import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { client } from '../client/Client';

export const PrivateRoute = ({component, ...rest}) => {
  return (
    <Route {...rest} render={(props) => {
      return (
      client.isLoggedIn() ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: {from: props.location}
        }}
        />
      )
    )}} />
  )
}
