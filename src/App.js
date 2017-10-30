import React, { Component } from 'react';
import Navbar from './components/Navbar'
import BodyContainer from './components/BodyContainer'

import './styles/App.css';

class App extends Component {

  componentDidMount(){
    this.props.store.subscribe(() => this.forceUpdate())
  }


  render() {
    return (
      <div>
        <div className='ui grid container'>
          <Navbar />
        </div>
        <div className='ui divider'></div>
        <div className='ui grid container'>
          <div className='ui sixteen wide column'>
            <BodyContainer
              store={this.props.store}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
