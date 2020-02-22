import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
      super(props)
    
      this.state = {email:'', password:''}
      
    }
    
    change = (e)=>{this.setState({[e.target.name]:e.target.value})}

    login = (e)=>{e.preventDefault();
                this.props.login(this.state);
                this.setState({email:'',
                               password:''
                              })   
                                                          
                   }

    render() {
        return (
            <div>
              <form onSubmit={this.login}>
              <h4>Enter your login details below</h4>
              <input type='text' name='email' value={this.state.email} placeholder='email' onChange={this.change} /><br/>
              <input type='password' name='password' value={this.state.pass} placeholder='Password' onChange={this.change}/><br/>
              <button>Login</button>
              </form>
            </div>
        );
    }
}

export default Login;