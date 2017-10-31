import React from 'react';

class FieldInput extends React.Component {

  state = {
    value: this.props.value,
    error: false
  }

  componentWillReceiveProps(update){
    this.setState({value: update.value})
  }

  onChange = (e) => {
    const name = this.props.name;
    const value = e.target.value;
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({value, error})
    this.props.onChange({name, value, error})
  }

  render(){
    return(
      <div>
        {
          (this.props.format === 'input') ? (
            <input
              value={this.state.value}
              onChange={this.onChange}
            />
          ) : (
            <textarea
              rows='3'
              value={this.state.value}
              onChange={this.onChange}
            />
          )
        }
        <span style={{color:'red'}} >{this.state.error}</span>
      </div>
    )
  }

}

export default FieldInput
