import React from 'react';
import { Link } from 'react-router-dom';
import { client } from '../Client';
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
          <Link
            className="ui item"
            to='/logout'
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className="right menu">
          <Link
            className="ui item"
            to='/signup'
          >
            Sign up
          </Link>
          <Link
            className="ui item"
            to='/login'
          >
            Login
          </Link>
        </div>
      )
    }
    
  </div>
)

//
//
// class Navbar extends React.Component {
//   render(){
//     return(
//       <div className="ui huge top fluid secondary menu navbar">
//         <Link
//           className="item"
//           to='/'
//         >
//           Fake Tweeter
//         </Link>
//
//         <div className="right menu">
//           <Link
//             className="ui item"
//             to='/signup'
//           >
//             Sign up
//           </Link>
//           <Link
//             className="ui item"
//             to='/login'
//           >
//             Login
//           </Link>
//           <Link
//             className="ui item"
//             to='/logout'
//           >
//             Logout
//           </Link>
//         </div>
//       </div>
//     )
//   }
// }
//
// export default Navbar
