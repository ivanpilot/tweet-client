import React from 'react';

class MessageInput extends React.Component {

  state = {
    title: this.props.title || '',
    body: this.props.body || ''
  }

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  onSubmitForm = () => {
    // this.props.onSubmitForm(this.state, this.props.id)
    this.props.store.dispatch({
      type: 'ADD_TWEET',
      title: this.state.title,
      body: this.state.body
    })
    this.setState({
      title: '',
      body: ''
    })
  }

  render(){
    return(
      <div className={(this.props.id) ? ("ui cards") : null}>
        <div className="card">
          <div className="content">
            <div className='ui form'>
              <div className="field">
                <label>Title</label>
                <input
                  type="text"
                  name='title'
                  value={this.state.title}
                  onChange={this.onChange}
                />
              </div>
              <div className="field">
                <label>Description</label>
                <textarea
                  rows='3'
                  type='text'
                  name='body'
                  value={this.state.body}
                  onChange={this.onChange}
                >
                </textarea>
              </div>
              <button
                className='ui medium blue button'
                onClick={this.onSubmitForm}
              >
                {(this.props.id) ? ('Edit') : ('Publish')}
              </button>
              {(this.props.id) ? (
                <button
                  className='ui medium red button'
                  onClick={this.props.onCloseForm}
                >
                  Close
                </button>
              ) : (
                null
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MessageInput
