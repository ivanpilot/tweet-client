import React from 'react';

class MessageInput extends React.Component {

  state = {
    tweet: {
      id: (this.props.tweet && this.props.tweet.id) || '',
      title: (this.props.tweet && this.props.tweet.title) || '',
      body: (this.props.tweet && this.props.tweet.body) || ''
    }
  }

  onChange = (evt) => {
    const tweet = this.state.tweet
    tweet[evt.target.name] = evt.target.value
    this.setState({tweet})
  }

  onEditForm = (tweet) => {
    this.props.store.dispatch({
      type: 'EDIT_TWEET',
      editableTweetId: this.props.editableTweetId,
      tweet: tweet
    })

    this.props.store.dispatch({
      type: 'OFF_EDITABLE_TWEET_MODE'
    })
  }

  onSubmitForm = (tweet) => {
    this.props.store.dispatch({
      type: 'OFF_EDITABLE_TWEET_MODE'
    })
    this.props.store.dispatch({
      type: 'ADD_TWEET',
      tweet: tweet,
      threadId: this.props.activeThreadId
    })
    this.setState({
      tweet: {
        id: '',
        title: '',
        body: ''
      }
    })
  }

  render(){
    const tweet = this.props.tweet

    return(
      <div className={(tweet && tweet.id) ? ("ui cards") : null}>
        <div className="card">
          <div className="content">
            <div className='ui form'>
              <div className="field">
                <label>Title</label>
                <input
                  type="text"
                  name='title'
                  value={this.state.tweet.title}
                  onChange={this.onChange}
                />
              </div>
              <div className="field">
                <label>Description</label>
                <textarea
                  rows='3'
                  type='text'
                  name='body'
                  value={this.state.tweet.body}
                  onChange={this.onChange}
                >
                </textarea>
              </div>

              {(tweet && tweet.id) ? (
                <div>
                  <button
                    className='ui medium blue button'
                    onClick={() => this.onEditForm(this.state.tweet)}
                  >
                    Edit
                  </button>
                  <button
                    className='ui medium red button'
                    onClick={() => this.props.store.dispatch({
                      type: 'OFF_EDITABLE_TWEET_MODE'
                    })}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <button
                  className='ui medium blue button'
                  onClick={() => this.onSubmitForm(this.state.tweet)}
                >
                  Publish
                </button>
              )}

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MessageInput
