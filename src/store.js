import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reducer } from './reducers/Reducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(logger)
  // other store enhancers if any
);
export const store = createStore(reducer, enhancer);

// export const store = createStore(reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__&&
//   window.__REDUX_DEVTOOLS_EXTENSION__()
// )
