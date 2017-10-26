import React from 'react';
import VerticalMenu from './VerticalMenu';
import TweetContainer from './TweetContainer';
import uuid from 'uuid';
import {client} from '../Client';
import {createStore} from 'redux';
import {reducer} from '../reducers/Reducer'

const store = createStore(reducer, {
  activeThreadId: 'user-v1',
  threads: [
    {
      id: 'user-v1',
      name: 'My Tweets',
      tweets: [
        {
          id: 1,
          title: "First tweet",
          body: "This is the first tweet",
          user_id: "1"
        },
        {
          id: 2,
          title: "Second tweet",
          body: "This is the second tweet",
          user_id: "1"
        },
      ]
    },
    {
      id: 'all',
      name: 'Wall',
      tweets: [
        {
          id: 1,
          title: "First tweet",
          body: "This is the first tweet",
          user_id: "1"
        },
        {
          id: 2,
          title: "Second tweet",
          body: "This is the second tweet",
          user_id: "1"
        },
        {
          id: 3,
          title: "Third tweet",
          body: "This is the third tweet",
          user_id: "2"
        },
      ]
    }
  ]
})

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
              threads={store.getState().threads}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default RootPage
