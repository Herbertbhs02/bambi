import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import Login from './Login';
import Search from './Search';
import axios from 'axios';
import Navbar from './Navbar'

class Connect extends Component {
    constructor(props) {
      super(props)
      this.state = {
            name:'',
            email:'' ,
            none:'',
            login:1,
            register:0,
            display:'',
            display1:'none'
            
                    }
    }
    //API to register your details on Server
    submitToregister = (register)=>{ 
            axios.post('http://localhost:5000/api/user/register', register)
            .then((res) => {
                console.log(res.data.user.email)
               
                this.setState({email:res.data.user.email, login:1, register:0})
            }).catch((error) => {
                console.log(error)
            });
                                
                                   }
//API to login
    userLogin = (login)=>{this.setState({login:0, register:0,display1:''});
                         axios.post('http://localhost:5000/api/user/login', login)
                         .then((res)=>{ localStorage.setItem('auth-token', res.data.token);console.log(res.data)})
                        }
           //API to search a name in the database                    
     search = (search)=>{ const headers = {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')
      }
         
     axios.post('http://localhost:5000/api/search', search, {headers})
                 .then((res)=>{this.setState({name:res.data.name,email:res.data.email});  console.log(res.data)})
                        } 
      regForm = ()=>{this.setState({register:1,login:0,display:'none'})}

      logout = ()=>{this.setState({login:1,register:0,display1:'none'});localStorage.setItem('auth-token', '')}
                  
    render() { //Selection of which form to render
        let display ;
        if (this.state.login) {
          display = <Login login ={login =>this.userLogin(login)}/>
        } else if(this.state.register){
          display =  <RegisterForm submit = {register =>this.submitToregister(register)}/>
        }else{display =  <Search search={search =>this.search(search)} table={this.state}/>}

        return (
            <div>
                <Navbar/>
                 <div className='login-register'>
                <input className='register'type='button' style={{display:this.state.display}} value='register' onClick={this.regForm}/>
                <input className='signout'type='button' style={{display:this.state.display1}}  value='Signout' onClick={this.logout}/>
                </div>
                {display}
            </div>
        );
    }
}

export default Connect;