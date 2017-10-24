import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {client} from './Client'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
client.setToken({
  id:'1',
  username:'ivan',
  email:'ivanpilot@gmail.com'
})
