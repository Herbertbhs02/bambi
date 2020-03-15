import React, { Component } from 'react';
import './looks/registration.css';
import swal from 'sweetalert';
class RegisterForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {name:'', surname:'', email:'', password:'', confirm:'', message:''}
      
    }
    
    change = (e)=>{this.setState({[e.target.name]:e.target.value})}

    submit = (e)=>{e.preventDefault();
                     if(this.state.password!==this.state.confirm){return swal("Passwords don't match Click ok and try again")}
                     else{
                this.props.submit(this.state);
                this.setState({name:'',
                              surname:'',
                               email:'',
                               password:'',
                               confirm:'',
                               message:''
                              })   
                                                          
                   }  }

    render() {
        return (
            <div>
              
              <form onSubmit={this.submit}>
              <h4>Enter your details and submit</h4>
              <input type='text' className='regInput' name='name'value={this.state.name.trim()} placeholder='First name' onChange={this.change}/><br/>
              <input type='text' className='regInput' name='surname'value={this.state.surname.trim()} placeholder='Surname' onChange={this.change}/><br/>
              <input type='text' name='email' value={this.state.email.trim()} placeholder='Email' onChange={this.change} /><br/>
              <input type='password' name='password' value={this.state.pass} placeholder='Password' autoComplete='none' onChange={this.change}/><br/>
              <input type='password' name='confirm' value={this.state.confirm} placeholder='Confirm Password' autoComplete='none' onChange={this.change}/><br/>
              <textarea className='textarea' rows="3" cols="25" name='message' value={this.state.message} placeholder="Leave a short message" onChange={this.change}></textarea><br/>
              <button>Submit</button>
              </form>
          
            </div>
        );
    }
}

export default RegisterForm;