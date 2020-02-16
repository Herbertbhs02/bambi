import React, { Component } from 'react';
import RegisterForm from './RegisterForm'
import axios from 'axios';

class Connect extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
      register:{}
      
      }
    }
    submitToregister = (register)=>{ 
            axios.post('http://localhost:5000/api/user/register', register)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
                                
                                   }
                                   
    render() {
        
        
        return (
            <div>
                
                <RegisterForm submit = {register =>this.submitToregister(register)}/>
                
            </div>
        );
    }
}

export default Connect;