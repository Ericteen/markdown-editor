import React, { Component } from 'react';
import {DEFAULT_VAL} from './constants'
import marked from 'marked'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
       value: DEFAULT_VAL
    }
    this.updateValue = this.updateValue.bind(this);
    this.rawMarkup = this.rawMarkup.bind(this);
  }

  updateValue(modifiedValue) {
    this.setState({
      value: modifiedValue
    })
  }

  rawMarkup(value) {
    let rawMarkup = marked(value, { sanitize: true })
    return {
      __html: rawMarkup
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <RawInput value={this.state.value} updateValue={this.updateValue}/>
        </div>
        <div className="col-md-6">
         <span dangerouslySetInnerHTML={this.rawMarkup(this.state.value)} />
        </div>
      </div>
    )
  }
}

class RawInput extends Component {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this);
  }
  
  update() {
    let modifiedValue = this.textarea.value
    this.props.updateValue(modifiedValue)
  }
  render() {
    return (
      <textarea 
        rows="22" 
        type="text" 
        value={this.props.value}
        onChange={this.update}
        ref={textarea => (this.textarea = textarea)}
        className= "form-control"
      />
    )
  }
}

export default App
