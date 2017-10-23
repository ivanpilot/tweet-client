import React from 'react';
import '../styles/Navbar.css'

class Navbar extends React.Component {
  render(){
    return(
      <div className="ui huge top fluid secondary menu navbar">
        <a className="item">
          Tweet - Home
        </a>
        <div className="right menu">
          <a className="ui item">
            Logout
          </a>
        </div>
      </div>
    )
  }
}

export default Navbar
