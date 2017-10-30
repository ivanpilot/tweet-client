import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {createStore} from 'redux';
import {reducer} from './reducers/Reducer'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {client} from './Client'
import './styles/index.css';

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__&&
  window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <App
      store={store}
    />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

client.setToken({
  id:'1',
  username:'ivan',
  email:'ivanpilot@gmail.com'
})
