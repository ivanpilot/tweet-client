import React from 'react';
import Tweet from './Tweet'
import MessageInput from './MessageInput'

class EditableTweet extends React.Component {

  state = {
    editFormOpen: false
  }

  handleEditClick = () => {
    this.setState({
      editFormOpen: true
    })
  }

  render(){
    if(this.state.editFormOpen){
      return(
        <div>
        <MessageInput
          onSubmitForm={this.props.onSubmitForm}
        />
        </div>
      )
    } else {
      return(
        <div>
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
