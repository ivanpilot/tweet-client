//will have router and routes to select the page like login / signup / root

import React from 'react';
import RootPage from './RootPage'
import '../styles/BodyContainer.css'

class BodyContainer extends React.Component {
  render(){
    return(
      <div className="body-container">
        <RootPage />
      </div>
    )
  }
}

export default BodyContainer
