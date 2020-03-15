import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import Login from './Login';
import Search from './Search';
import axios from 'axios';
import Navbar from './Navbar';
import swal from 'sweetalert';
import { v4 as uuidv4 } from 'uuid';

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
    submitToregister = (register)=>{ const {confirm, ...reg} = register; console.log(register);console.log(reg);
            axios.post('https://connectbambi.herokuapp.com/api/user/register', reg)
            .then((res) => { if(res.data.status===400){ return swal(res.data.errorMessage,"...Click OK and try again")};
                            this.setState({email:res.data.email, login:1, register:0})
                    });
                                
                                   }
//API to login
    userLogin = (login)=>{this.setState({login:0, register:0,display1:''});
                         axios.post('https://connectbambi.herokuapp.com/api/user/login', login)
                         .then((res)=>{ localStorage.setItem('auth-token', res.data.token);localStorage.setItem('id', res.data.id);
                         if(res.data.status===400){swal(res.data.errorMessage,"...Click OK and try again");this.setState({login:1})}
                         this.setState({loginName:res.data.name});})
                        }
           //API to search a name in the database Note:Table is created within map()                 
     search = async(search)=>{ const headers = {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')
      }
         
      try {

        const res = await axios.post('https://connectbambi.herokuapp.com/api/user/searchdb', search, {headers})
        const searchResult = res.data.map((nun)=><tr className='searchResult'><td key={uuidv4()}>
        {nun.name}</td><td key={uuidv4()}>{nun.surname}</td><td key={uuidv4()}>{nun.email}</td><td key={uuidv4()}>{nun.message}</td></tr>);      
         this.setState({name:searchResult});
                       
      } catch (error){
        throw new Error('No response from server')
     }
}
                 //List all who registered
                 listall = ()=>{ const headers = {
                  'Content-Type': 'application/json',
                  'auth-token':localStorage.getItem('auth-token')
                }
                   
               axios.post('https://connectbambi.herokuapp.com/api/user/listall', {headers})
                           .then((res)=>{const allResult = res.data.map((nun)=><tr className='searchResult'><td key={uuidv4()}>
                           {nun.name}</td><td key={uuidv4()}>{nun.surname}</td><td key={uuidv4()}>{nun.email}</td><td key={uuidv4()}>{nun.message}</td></tr>);
                                         this.setState({name:allResult});
                                          })
                                  } 
                 
                 
      regForm = ()=>{this.setState({register:1,login:0,display:'none'})}

      logout = ()=>{this.setState({login:1,register:0,display1:'none'});localStorage.setItem('auth-token', '')}

      messageUpdate = (messageUpdate)=>{ const headers = {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')}
        Object.assign(messageUpdate, {id:localStorage.getItem('id')})
        
        axios.post('https://connectbambi.herokuapp.com/api/user/messageupdate', messageUpdate, {headers})
      .then((res)=>{ swal(res.data,"...Click OK")})}   
                  
    render() { //Selection of which form to render
        let display ;
        if (this.state.login) {
          display = <Login login ={login =>this.userLogin(login)}/>
        } else if(this.state.register){
          display =  <RegisterForm submit = {register =>this.submitToregister(register)}/>
        }else{display =  <Search search={search =>this.search(search)} listall={this.listall} messageUpdate={messageUpdate =>this.messageUpdate(messageUpdate)} table={this.state}/>}

        return (
            <div>
                <Navbar/>
                 <div className='login-register'>
                <input className='register'type='button' style={{display:this.state.display}} value='register' onClick={this.regForm}/>
                <input className='signout'type='button' style={{display:this.state.display1}}  value='Logout' onClick={this.logout}/>
                </div>
                {display}
                <footer>&copy; Copyright 2020 Herbert Ssevume</footer>
            </div>
        );
    }
}

export default Connect;