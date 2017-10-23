import React, { Component } from 'react';
import Navbar from './components/Navbar'
import BodyContainer from './components/BodyContainer'
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className='ui grid container'>
          <Navbar />
        </div>
        <div className='ui divider'></div>
        <div className='ui grid container'>
          <div className='ui sixteen wide column'>
            <BodyContainer/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
