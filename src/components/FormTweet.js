import React from 'react';
import uuid from 'uuid';
import FieldInput from './FieldInput';

class FormTweet extends React.Component{
  state = {
    tweet: {
      id: (this.props.tweet && this.props.tweet.id) || '',
      title: (this.props.tweet && this.props.tweet.title) || '',
      body: (this.props.tweet && this.props.tweet.body) || ''
    },
    fieldErrors: {}
  }

  onInputChange = ({name, value, error}) => {
    const tweet = this.state.tweet;
    const fieldErrors = this.state.fieldErrors;
    tweet[name] = value;
    fieldErrors[name] = error;
    this.setState({tweet, fieldErrors})
  }

  validate(){
    const tweet = this.state.tweet;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if(!tweet.title) return true;
    if(!tweet.body) return true;
    if(errMessages.length) return true;
    return false;
  }

  onSubmitForm = () => {
    const id = this.state.tweet.id || uuid.v4()
    const tweet = {...this.state.tweet, id: id};
    if(this.validate()) return;
    this.props.onSubmitForm(tweet, this.props.editableTweet); //second argument when Form rendered from AddTweetInput
    this.setState({
      tweet: {
        id: '',
        title: '',
        body: ''
      },
      fieldErrors: {}
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
                <label>Title<span style={{color:'red'}}>*</span></label>
                <FieldInput
                  name='title'
                  format='input'
                  value={this.state.tweet.title}
                  onChange={this.onInputChange}
                  validate={(value) => (value ? false : 'Title is required')}
                />
              </div>
              <div className="field">
                <label>Description<span style={{color:'red'}}>*</span></label>
                <FieldInput
                  name='body'
                  format='area'
                  value={this.state.tweet.body}
                  onChange={this.onInputChange}
                  validate={(value) => (value ? false : 'Description is required')}
                />
              </div>
              {
                (tweet && tweet.id) ? (
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
                      onClick={() => this.props.closeEditable(tweet.id)}
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

export default FormTweet;
