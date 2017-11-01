import React from 'react';
import FieldInput from './FieldInput';
import '../styles/FormLogin.css'

class FormLogin extends React.Component{
  state = {
    user: {
      email: '',
      password: '',
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
    if(errMessages.length) return true;
    return false;
  }

  onSubmitForm = () => {
    // const user = this.state.user;
    if(this.validate()) return;

    // this.props.onSubmitForm(user);
    console.log("email = " + this.state.user.email + " | password = " + this.state.user.password)
    this.setState({
      user: {
        email: '',
        password: '',
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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


}

export default FormLogin;
