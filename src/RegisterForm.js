import React, { Component } from 'react';

class RegisterForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {firstName:'', email:'', password:''}
      
    }
    
    change = (e)=>{this.setState({[e.target.name]:e.target.value})}

    submit = (e)=>{e.preventDefault();
                this.props.submit(this.state);
                this.setState({firstName:'',
                              secondName:'',
                              email:'',
                              password:'',
                              location:'',
                              message:''})   
                                                          
                   }

    render() {
        return (
            <div>
              <form onSubmit={this.submit}>
              
              <h4>Enter your contact details and submit</h4>
              <input type='text' name='firstName'value={this.state.firstName} placeholder='First name' onChange={this.change}/><br/>
              <input type='text' name='email' value={this.state.email} placeholder='email' onChange={this.change} /><br/>
              <input type='password' name='password' value={this.state.pass} placeholder='Password' onChange={this.change}/><br/>
             
             
              <button>Submit</button>
              
              </form>
            </div>
        );
    }
}

export default RegisterForm;