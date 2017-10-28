import React from 'react';
import VerticalMenu from './VerticalMenu';
import TweetContainer from './TweetContainer';
import {createStore} from 'redux';
import {reducer} from '../reducers/Reducer'

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class RootPage extends React.Component {

  componentDidMount(){
    store.subscribe(() => this.forceUpdate())
  }

  render(){
    return (
      <div className='ui two column stackable divided grid'>
        <div className="row">
          <div className='ui four wide column'>
            <VerticalMenu
              store={store}
            />
          </div>
          <div className='ui twelve wide column'>
            <TweetContainer
              store={store}
              activeThreadId={store.getState().activeThreadId}
              activeEditableTweetId={store.getState().activeEditableTweetId}
              threads={store.getState().threads}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default RootPage
