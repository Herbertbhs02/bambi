import React, { Component } from 'react';
import './looks/Navbar.css'
class Login extends Component {
    constructor(props) {
      super(props)
    
      this.state = {email:'', password:''}
      
    }
    
    change = (e)=>{this.setState({[e.target.name]:e.target.value})}

    login = (e)=>{e.preventDefault();
                this.props.login(this.state);
                this.setState({email:'',
                               password:'',
                        
                              })   
                                                          
                   }

    render() {
        return (
            <div>
              <div className='introduction'>
              <p>Have you been thinking recently about your childhood/ school friends and would like to find a way to reconnect with them? Have you relocated and can’t find one of your old friends? 
              Connectbambi.com is a free website that allows you to reconnect with lost friends in a very simple way. All you need to register is an email and your name. you will then be able to see if any of your old friends have done the same. You don’t have to provide any personal details. After getting in touch with your friend through messaging, it will be up to you to take it to the next level and share with him/her your phone number or any other detail that you would like.</p> 
              <p>If you have any issues or would like to give us feedback, please send an email to: <span className='email'>hsev4048@gmail.com</span></p> 
              
              </div>
                <form onSubmit={this.login}>
                  <input type='text' name='email' value={this.state.email.trim()} placeholder='email'  onChange={this.change} /><br/>
                  <input type='password' name='password' value={this.state.pass} placeholder='Password' autoComplete='none' onChange={this.change}/><br/>
                  <button>Sign in</button>
                </form>
            </div>
        );
    }
}

export default Login;