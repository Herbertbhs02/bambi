import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import Login from './Login';
import Search from './Search';
import axios from 'axios';

class Connect extends Component {
    constructor(props) {
      super(props)
      this.state = {
            name:'',
            email:'' ,
            none:''
                    }
    }
    //API to register your details on Server
    submitToregister = (register)=>{ 
            axios.post('http://localhost:5000/api/user/register', register)
            .then((res) => {
                console.log(res.data.user.email)
                this.setState({email:res.data.user.email})
            }).catch((error) => {
                console.log(error)
            });
                                
                                   }
//API to login
    userLogin = (login)=>{
                         axios.post('http://localhost:5000/api/user/login', login)
                         .then((res)=>{ localStorage.setItem('auth-token', res.data.token)})
                        }
           //API to search a name in the database                    
     search = (search)=>{ const headers = {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')
      }
         
     axios.post('http://localhost:5000/api/search', search, {headers})
                 .then((res)=>{this.setState({name:res.data.name,email:res.data.email});  console.log(res.data)})
                        } 

    render() {
        
        
        return (
            <div>
                <RegisterForm submit = {register =>this.submitToregister(register)}/>
                <Login login ={login =>this.userLogin(login)}/>
                <Search search={search =>this.search(search)}/>
                <hr/>
                <table border='1'>
                 <thead>
                     <tr>
                     <th>Name</th>
                     <th>Email</th>
                     </tr>
                 </thead>
                  <tbody>
                   <tr>
                     <td>{this.state.name}</td>
                     <td>{this.state.email}</td>
                   </tr>
                  </tbody>  
                </table>
            </div>
        );
    }
}

export default Connect;