import React from 'react';
import ReactDOM from 'react-dom';
// import {createStore} from 'redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {client} from './Client'
import './styles/index.css';
//
//
// const initialState = {
//   activeThreadId: 'user-v1',
//   threads: [
//     {
//       id: 'user-v1',
//       name: 'My Tweets',
//       tweets: [
//         {
//           id: 1,
//           title: "First tweet",
//           body: "This is the first tweet",
//           user_id: "1"
//         },
//         {
//           id: 2,
//           title: "Second tweet",
//           body: "This is the second tweet",
//           user_id: "1"
//         },
//       ]
//     },
//     {
//       id: 'all',
//       name: 'Wall',
//       tweets: [
//         {
//           id: 1,
//           title: "First tweet",
//           body: "This is the first tweet",
//           user_id: "1"
//         },
//         {
//           id: 2,
//           title: "Second tweet",
//           body: "This is the second tweet",
//           user_id: "1"
//         },
//         {
//           id: 3,
//           title: "Third tweet",
//           body: "This is the third tweet",
//           user_id: "2"
//         },
//       ]
//     }
//   ]
// }
//
// const store = createStore(reducer, initialState)

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
registerServiceWorker();
client.setToken({
  id:'1',
  username:'ivan',
  email:'ivanpilot@gmail.com'
})
