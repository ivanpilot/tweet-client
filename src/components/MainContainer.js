import React from 'react';
import VerticalMenu from './VerticalMenu';
import MainPage from './MainPage';
import '../styles/MainContainer.css'

class MainContainer extends React.Component {
  render(){
    return (
      <div className="main-container">
      <div className='ui two column stackable divided grid'>
        <div className="row">
          <div className='ui four wide column'>
            <VerticalMenu />
          </div>
          <div className='ui twelve wide column'>  
            <MainPage />
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default MainContainer
