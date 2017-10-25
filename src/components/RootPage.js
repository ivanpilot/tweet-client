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

  onTabClick = (threadId) => {
    this.setState({
      activeThreadId: threadId,
      threads: [...this.state.threads]
    })
  }

  // addMessage = (message, id = null) => {
  //   // debugger
  //   const newMessage = {
  //     id: uuid.v4(),
  //     title: message.title,
  //     body: message.body,
  //     user_id: client.currentUser().id
  //   }
  //   const activeThreadId = this.state.activeThreadId
  //   const threadIndex = this.state.threads.findIndex(thread => thread.id === activeThreadId)
  //   const oldThread = this.state.threads[threadIndex]
  //   const newThread = {
  //     ...oldThread,
  //     tweets: [
  //       newMessage,
  //       ...oldThread.tweets
  //     ]
  //   }
  //   this.setState({
  //     activeThreadId: this.state.activeThreadId,
  //     threads: [
  //       ...this.state.threads.slice(0, threadIndex),
  //       newThread,
  //       ...this.state.threads.slice(threadIndex + 1, this.state.threads.length)
  //     ]
  //   })
  // }

  editMessage = (message, id) => {
    const activeThreadId = this.state.activeThreadId
    const threadIndex = this.state.threads.findIndex(thread => thread.id === activeThreadId)
    const oldThread = this.state.threads[threadIndex]
    const messageIndex = oldThread.tweets.findIndex(tweet => tweet.id === id)
    const oldMessage = oldThread.tweets[messageIndex]
    const newMessage = {
      ...oldMessage,
      title: message.title,
      body: message.body
    }
    const newThread = {
      ...oldThread,
      tweets: [
        ...oldThread.tweets.slice(0, messageIndex),
        newMessage,
        ...oldThread.tweets.slice(messageIndex + 1, oldThread.tweets.length)
      ]
    }
    this.setState({
      activeThreadId: this.state.activeThreadId,
      threads: [
        ...this.state.threads.slice(0, threadIndex),
        newThread,
        ...this.state.threads.slice(threadIndex + 1, this.state.threads.length)
      ]
    })
  }

  deleteMessage = (id) => {
    const activeThreadId = this.state.activeThreadId
    const threadIndex = this.state.threads.findIndex(thread => thread.id === activeThreadId)
    const oldThread = this.state.threads[threadIndex]
    const newThread = {
      ...oldThread,
      tweets: oldThread.tweets.filter(t => t.id !== id)
    }
    this.setState({
      activeThreadId: this.state.activeThreadId,
      threads: [
        ...this.state.threads.slice(0, threadIndex),
        newThread,
        ...this.state.threads.slice(threadIndex + 1, this.state.threads.length)
      ]
    })
  }

  render(){
    return (
      <div className='ui two column stackable divided grid'>
        <div className="row">
          <div className='ui four wide column'>
            <VerticalMenu
              store={store}
              onSubmitForm={this.addMessage}
            />
          </div>
          <div className='ui twelve wide column'>
            <TweetContainer
              store={store}
              activeThreadId={store.getState().activeThreadId}
              threads={store.getState().threads}
              onTabClick={this.onTabClick}
              handleTrashClick={this.deleteMessage}
              onSubmitForm={this.editMessage}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default RootPage
