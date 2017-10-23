import React, { Component } from 'react';
import Navbar from './components/Navbar'
import MainContainer from './components/MainContainer'
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className='ui grid container'>
        <div className='ui sixteen wide column'>
          <Navbar />
          <div className='ui divider'></div>
          <MainContainer/>
        </div>
      </div>
    );
  }
}

export default App;
