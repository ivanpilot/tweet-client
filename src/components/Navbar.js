import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'

class Navbar extends React.Component {
  render(){
    return(
      <div className="ui huge top fluid secondary menu navbar">
        <Link
          className="item"
          to='/'
        >
          Tweet - Home
        </Link>

        <div className="right menu">
        <Link
          className="ui item"
          to='/login'
        >
          Login
        </Link>
          <Link
            className="ui item"
            to='/logout'
          >
            Logout
          </Link>
        </div>
      </div>
    )
  }
}

export default Navbar
