import React from "react";
import { useForm } from 'react-hook-form'

class FormTest extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.isLoading= false;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
   
   
    this.isLoading = true;
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
     
    <form onSubmit={this.handleSubmit}>
          <div className="mt-2">
              <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <button disabled={this.isLoading} onClick={this.isLoading ? this.handleSubmit:null} className="btn btn-danger">
               
                {this.isLoading ? 'Loading…' : 'Click to load'}
              </button>
          </div>
    </form>
    
      
    );
  }
}
export default FormTest;