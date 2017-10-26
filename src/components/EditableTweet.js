import React from 'react';
import Tweet from './Tweet'
import MessageInput from './MessageInput'
import '../styles/EditableTweet.css'

class EditableTweet extends React.Component {

  state = {
    editFormOpen: false
  }

  onOpenForm = () => {
    this.setState({
      editFormOpen: true
    })
  }

  onCloseForm = () => {
    this.setState({
      editFormOpen: false
    })
  }

  render(){
    if(this.props.editableTweet.openForm){
      return(
        <div className='editable-tweet'>
          <MessageInput
            store={this.props.store}
            tweet={this.props.editableTweet.tweet}
            onCloseForm={this.onCloseForm}
          />
        </div>
      )
    } else {
      return(
        <div className='editable-tweet'>
          <Tweet
            store={this.props.store}
            tweet={this.props.editableTweet.tweet}
            onOpenForm={this.onOpenForm}
          />
        </div>
      )
    }
  }
}

export default EditableTweet
