import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Login } from '../components/Login';
import { SignUp } from '../components/SignUp';
import { client } from '../client/Client';
import { connectFailure } from '../actions/Error';
import { getConnectError } from '../reducers/Errors';
import { DisplayError } from '../components/DisplayError';

class Authenticating extends React.Component{
  state = {
    loginInProgress: false,
    shouldRedirect: false
  }

  onSubmitForm = (user) => {
    this.setState({loginInProgress: true})
    this.connectingUser(user)
  }

  connectingUser = (user) => {
    client.login(user).then(
      response => {
        client.setCurrentUser()
        this.setState({shouldRedirect: true})
      },
      error => {
        this.setState({loginInProgress: false})
        this.props.connectionFailure(error)
      }
    )
  }

  redirectPath = () => {
    const locationState = this.props.location.state;
    const pathname = (locationState && locationState.from && locationState.from.pathname)
    return pathname || '/tweets';
  }

  render(){
    if(this.props.connectError && !this.props.connectError.status === 401){
      debugger
      return(
        <div>
          <DisplayError
            message={`Looks like a server issue. Retry in a few sec... 'HTTP status: ${this.props.connectError.status}. Error message: ${this.props.connectError.message}'`}
            onRetry={() => this.connectingUser()}
          />
        </div>
      )
    } else if (!this.props.connectError && this.props.location.pathname === '/signup'){
      return(
        <SignUp
          onSubmitForm={this.onSubmitForm}
          loginInProgress={this.state.loginInProgress}
          shouldRedirect={this.state.shouldRedirect}
        />
      )
    } else if (this.props.location.pathname === '/login'){
      return(
        <Login
          connectError={this.props.connectError}
          onSubmitForm={this.onSubmitForm}
          redirectPath={this.redirectPath()}
          loginInProgress={this.state.loginInProgress}
          shouldRedirect={this.state.shouldRedirect}
        />
      )
    }
  }
}


function connectionFailure(error){
  return (dispatch) => {
    dispatch(connectFailure(error))
  }
}

const mapStateToProps = (state) => {
  return {
    connectError: getConnectError(state.errors)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    connectionFailure,
  }, dispatch)
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Authenticating)
