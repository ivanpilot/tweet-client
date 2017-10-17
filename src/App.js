import React, { Component } from 'react';
import Tweet from './components/tweets'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tweet/>
      </div>
    );
  }
}

export default App;
