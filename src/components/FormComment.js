import React from 'react';
import FieldInput from './FieldInput';

class FormComment extends React.Component{
  state = {
    comment: {
      id: (this.props.comment && this.props.comment.id) || '',
      description: (this.props.comment && this.props.comment.description) || '',
    },
    fieldErrors: {}
  }

  onInputChange = ({name, value, error}) => {
    const comment = this.state.comment;
    const fieldErrors = this.state.fieldErrors;
    comment[name] = value;
    fieldErrors[name] = error;
    this.setState({comment, fieldErrors})
  }

  validate(){
    const comment = this.state.comment;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if(!comment.description) return true;
    if(errMessages.length) return true;
    return false;
  }

  onSubmitForm = () => {
    const activeTweet = (this.props.comment && this.props.comment.tweetId) //to make sure we keep the activeTweetId in case of editing a comment
    const comment = {
      ...this.state.comment,
      activeTweetId: activeTweet || this.props.activeTweet,
    };
    // debugger
    if(this.validate()) return;
    this.props.onSubmitForm(comment, this.props.editableComment); //second argument when Form rendered from AddCommentInput
    this.setState({
      comment: {
        id: '',
        description: ''
      },
      fieldErrors: {}
    })

  }

  render(){
    const comment = this.props.comment
    return(
      <div className={(comment && comment.id) ? ("ui cards") : null}>
        <div className="card">
          <div className="content">
            <div className='ui form'>
              <div className="field">
                <FieldInput
                  name='description'
                  format='area'
                  value={this.state.comment.description}
                  onChange={this.onInputChange}
                  validate={(value) => (value ? false : 'Field can\'t be empty')}
                />
              </div>
              {
                (comment && comment.id) ? (
                  <div>
                    <button
                      className='ui medium blue button'
                      disabled={this.validate()}
                      onClick={this.onSubmitForm}
                    >
                      Edit
                    </button>
                    <button
                      className='ui medium red button'
                      onClick={() => this.props.closeEditable(comment.id)}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <button
                    className='ui medium blue button'
                    disabled={this.validate()}
                    onClick={this.onSubmitForm}
                  >
                    Publish
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }


}

export default FormComment;
