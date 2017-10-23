import React from 'react';

class MessageInput extends React.Component {

  state = {
    title: '',
    description: ''
  }

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
    // console.log('title is: ' + this.state.title)
    // console.log('description is: ' + this.state.description)
  }

  render(){
    return(
      <div className='ui form'>
        <div className="field">
          <label style={{textAlign: 'left'}}>Title</label>
          <input
            type="text"
            name='title'
            value={this.state.title}
            onChange={this.onChange}
          />
        </div>
        <div className="field">
          <label style={{textAlign: 'left'}}>Description</label>
          <textarea
            rows='3'
            type='text'
            name='description'
            value={this.state.description}
            onChange={this.onChange}
          >
          </textarea>
        </div>
        <button className='ui medium blue button'>
          Submit
        </button>
      </div>
    )
  }
}

export default MessageInput
