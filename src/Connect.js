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
            surname:'',
            email:'' ,
            message:'',
            none:'',
            login:1,
            register:0,
            display:'',
            display1:'none',
            result:'',
            loginName:''
                    }
    }
    //API to register your details on Server
    submitToregister = (register)=>{
            axios.post('https://connectbambi.herokuapp.com/api/user/register', register)
            .then((res) => { if(res.data.status===400){alert(res.data.errorMessage)};this.setState({display:''});console.log(register);
                
               console.log(res.data.email);
                this.setState({email:res.data.email, login:1, register:0})
            });
                                
                                   }
//API to login
    userLogin = (login)=>{this.setState({login:0, register:0,display1:''});
                         axios.post('https://connectbambi.herokuapp.com/api/user/login', login)
                         .then((res)=>{ localStorage.setItem('auth-token', res.data.token);localStorage.setItem('id', res.data.id);
                         if(res.data.status===400){alert(res.data.errorMessage);this.setState({login:1})}
                         this.setState({loginName:res.data.name})})
                        }
           //API to search a name in the database Note:Table is created within map()                 
     search = (search)=>{ const headers = {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')
      }
         
     axios.post('https://connectbambi.herokuapp.com/api/user/searchdb', search, {headers})
                 .then((res)=>{const searchResult = res.data.map((nun)=><table border='1'> <thead>
                 <tr>
                 <th>First Name</th>
                 <th>Surname</th>
                 <th>Email</th>
                 <th>Message</th>
                 </tr>
             </thead><tbody><tr className='searchResult'><td key={nun._id}>
                 {nun.name}</td><td>{nun.surname}</td><td>{nun.email}</td><td>{nun.message}</td></tr></tbody></table>);
                               
                               this.setState({name:searchResult});
                                })
                        } 
      regForm = ()=>{this.setState({register:1,login:0,display:'none'})}

      logout = ()=>{this.setState({login:1,register:0,display1:'none'});localStorage.setItem('auth-token', '')}

      messageUpdate = (messageUpdate)=>{ const headers = {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')}
        Object.assign(messageUpdate, {id:localStorage.getItem('id')})
        
        axios.post('https://connectbambi.herokuapp.com/api/user/messageupdate', messageUpdate, {headers})
      .then((res)=>{ alert(res.data)})}   
                  
    render() { //Selection of which form to render
        let display ;
        if (this.state.login) {
          display = <Login login ={login =>this.userLogin(login)}/>
        } else if(this.state.register){
          display =  <RegisterForm submit = {register =>this.submitToregister(register)}/>
        }else{display =  <Search search={search =>this.search(search)} messageUpdate={messageUpdate =>this.messageUpdate(messageUpdate)} table={this.state}/>}

        return (
            <div>
                <Navbar/>
                 <div className='login-register'>
                <input className='register'type='button' style={{display:this.state.display}} value='register' onClick={this.regForm}/>
                <input className='signout'type='button' style={{display:this.state.display1}}  value='Signout' onClick={this.logout}/>
                </div>
                {display}
                <footer>&copy; Copyright 2020 Herbert Ssevume</footer>

            </div>
        );
    }
}

export default Connect;