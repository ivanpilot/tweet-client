import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { client } from '../client/Client';
import '../styles/Navbar.css'


export const Navbar = (props) => (
  <div className="ui huge top fluid secondary menu navbar">
    <Link
      className="item"
      to='/'
    >
      Fake Tweeter
    </Link>
    { client.isLoggedIn() ?
      (
        <div className="right menu">
          <NavLink
            className="ui item"
            to='/houston'
          >
            Houston
          </NavLink>
          <NavLink
            className="ui item"
            to='/boo'
          >
            Boo
          </NavLink>
          <Link
            className="ui item"
            to='/logout'
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className="right menu">
          <NavLink
            className="ui item"
            to='/signup'
          >
            Sign up
          </NavLink>
          <NavLink
            className="ui item"
            to='/login'
          >
            Login
          </NavLink>
        </div>
      )
    }
  </div>
)
