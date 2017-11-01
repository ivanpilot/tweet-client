import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {client} from './Client'
import './styles/index.css';
import {store} from './store'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

client.setToken({
  id:'1',
  username:'ivan',
  email:'ivanpilot@gmail.com'
})
