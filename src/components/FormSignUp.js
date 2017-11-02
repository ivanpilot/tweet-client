import React from 'react';
import { Link } from 'react-router-dom';
import FieldInput from './FieldInput';
import '../styles/FormLogin.css'

class FormSignUp extends React.Component{
  state = {
    user: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    fieldErrors: {}
  }

  onInputChange = ({name, value, error}) => {
    const user = this.state.user;
    const fieldErrors = this.state.fieldErrors;
    user[name] = value;
    fieldErrors[name] = error;
    this.setState({user, fieldErrors})
  }

  validate(){
    const user = this.state.user;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if(!user.email) return true;
    if(!user.password) return true;
    if(!user.passwordConfirmation) return true;
    if(errMessages.length) return true;
    return false;
  }

  onSubmitForm = () => {
    const user = this.state.user;
    if(this.validate()) return;

    this.props.onSubmitForm(user);
    console.log("email = " + this.state.user.email + " | password = " + this.state.user.password)
    this.setState({
      user: {
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      fieldErrors: {}
    })

  }

  render(){
    return(
      <div className="ui cards">
        <div className="card">
          <div className="content">
            <div className='ui form'>
              <div className="field">
                <label>Email</label>
                <FieldInput
                  name='email'
                  type='email'
                  format='input'
                  value={this.state.user.email}
                  onChange={this.onInputChange}
                  validate={(value) => (value ? false : 'Email is required')}
                />
              </div>
              <div className="field">
                <label>Password</label>
                <FieldInput
                  name='password'
                  type='password'
                  format='input'
                  value={this.state.user.password}
                  onChange={this.onInputChange}
                  validate={(value) => (value ? false : 'Password is required')}
                />
              </div>
              <div className="field">
                <label>Password Confirmation</label>
                <FieldInput
                  name='passwordConfirmation'
                  type='password'
                  format='input'
                  value={this.state.user.passwordConfirmation}
                  onChange={this.onInputChange}
                  validate={(value) => (value ? false : 'Password Confirmation is required')}
                />
              </div>
              <div className='space'>
                <div className='ui grid centered align'>
                  <button
                    className='ui medium green button'
                    disabled={this.validate()}
                    onClick={this.onSubmitForm}
                  >
                    Submit
                  </button>
                </div>
                <div className='login-member'>
                  <p>Already a member?<span> </span>
                    <Link
                      to='/login'
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


}

export default FormSignUp;
