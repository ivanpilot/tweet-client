import React from 'react';
import Tweet from './Tweet'
import MessageInput from './MessageInput'
import '../styles/EditableTweet.css'

class EditableTweet extends React.Component {

  state = {
    editFormOpen: false
  }

  handleEditClick = () => {
    this.setState({
      editFormOpen: true
    })
  }

  onCloseForm = () => {
    this.setState({
      editFormOpen: false
    })
  }

  onSubmitForm = (message, id) => {
    this.props.onSubmitForm(message, id);
    this.onCloseForm();
  }

  render(){
    if(this.state.editFormOpen){
      return(
        <div className='editable-tweet'>
          <MessageInput
            id={this.props.tweet.id}
            title={this.props.tweet.title}
            body={this.props.tweet.body}
            onCloseForm={this.onCloseForm}
            onSubmitForm={this.onSubmitForm}
          />
        </div>
      )
    } else {
      return(
        <div className='editable-tweet'>
          <Tweet
            tweet={this.props.tweet}
            handleTrashClick={this.props.handleTrashClick}
            handleEditClick={this.handleEditClick}
          />
        </div>
      )
    }
  }
}

export default EditableTweet
