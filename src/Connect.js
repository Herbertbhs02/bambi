import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import Login from './Login';
import Search from './Search';
import axios from 'axios';
import Navbar from './Navbar';
import swal from 'sweetalert';
import { v4 as uuidv4 } from 'uuid';
import Posts from './Posts';
import Delete from './Delete';

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
            loginName:'',
            loginId:'',
            post:'',
            messagedelete:''
                    }
    }
    //API to register your details on Server
    submitToregister = (register)=>{ const {confirm, ...reg} = register;
            axios.post('https://connectbambi.herokuapp.com/api/user/register', reg)
            .then((res) => { if(res.data.status===400){ return swal(res.data.errorMessage,"...Click OK and try again")};
                            this.setState({email:res.data.email, login:1, register:0})
                    });
                                
                                   }
//API to login
    userLogin = (login)=>{this.setState({login:0, register:0,display1:''});
                         axios.post('https://connectbambi.herokuapp.com/api/user/login', login)
                         .then((res)=>{ localStorage.setItem('auth-token', res.data.token);localStorage.setItem('id', res.data.id);
                         if(res.data.status===400){swal(res.data.errorMessage,"...Click OK and try again");this.setState({login:1,display:'',display1:'none'})}
                         this.setState({loginName:res.data.name,loginId:res.data.id,surname:res.data.surname})})
                        }
           //API to search a name in the database Note:Table is created within map()                 
     search = async(search)=>{ const headers = {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')
      }
         
      try {

        const res = await axios.post('https://connectbambi.herokuapp.com/api/user/searchdb', search, {headers})
        if(res.data.length===0){return this.setState({name:<div className='messages'>A person not found. Search is case sensitive </div>})};
        const searchResult = res.data.map((nun)=><tr className='searchResult'><td key={uuidv4()}>
        {nun.name}</td><td key={uuidv4()}>{nun.surname}</td><td key={uuidv4()}>{nun.email}</td><td key={uuidv4()}>{nun.message}</td>
        <td><Posts name={nun.name} id={nun._id} senderId={this.state.loginId} sendername={this.state.loginName} sendersurname={this.state.surname} sendermessage={sendermessage=>this.sendermessage(sendermessage)}/></td></tr>);      
        const element = (<div><table border='1'> 
        <thead>
           <tr>
              <th>First Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Message</th>
              <th>Send personal message</th>
           </tr>
         </thead>
         <tbody>   
          {searchResult}
         </tbody>
       </table></div>)
         this.setState({name:element});
                       
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
                           {nun.name}</td><td>{nun.surname}</td><td>{nun.email}</td><td>{nun.message}</td>
                          <td><Posts name={nun.name} id={nun._id} senderId={this.state.loginId} sendermessage={sendermessage=>this.sendermessage(sendermessage)}/></td></tr>)
                          const element = (<div><table border='1'> 
                                                  <thead>
                                                     <tr>
                                                        <th>First Name</th>
                                                        <th>Surname</th>
                                                        <th>Email</th>
                                                        <th>Message</th>
                                                        <th>Send personal message</th>
                                                     </tr>
                                                   </thead>
                                                   <tbody>   
                                                    {allResult}
                                                   </tbody>
                                                 </table></div>)
                                         this.setState({name:element});
                                          })
                                  } 
                 
                 
      regForm = ()=>{this.setState({register:1,login:0,display:'none'})}

      logout = ()=>{this.setState({login:1,register:0,display1:'none',name:''});localStorage.setItem('auth-token', '')}
      
      //Update user message
      messageUpdate = (messageUpdate)=>{ const headers = {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')}
        Object.assign(messageUpdate, {id:localStorage.getItem('id')})
        console.log(messageUpdate)
        axios.post('https://connectbambi.herokuapp.com/api/user/messageupdate', messageUpdate, {headers})
      .then((res)=>{ swal(res.data,"...Click OK")})} 
      
      //sender's message is saved to the saved server
      sendermessage = (sendermessage)=>{ 
        axios.post('https://connectbambi.herokuapp.com/api/messages/posts', sendermessage)
        .then((res)=>{ })
                                     }

                  //view messages left for you
                  view = (receiverId)=>{
                    axios.post('https://connectbambi.herokuapp.com/api/retrieve', receiverId)
                    .then((res)=>{ if(res.data.length===0){return this.setState({name:<div className='messages'>You have no messages</div>})};
                              const result = res.data.map(item =><div className='messages' key={uuidv4()}>
                                                                     <div><h4>{item.sendername} {item.sendersurname}</h4></div>
                                                                     <div>{item.value}</div>
                                                                     <div className='date'>{item.date}</div><Delete d={item._id} delete={(d)=>this.delete(d)}/>
                                                                  </div>);
                                                                   this.setState({name:result,messagedelete:res.data})      
                                })
                  }

        //delete a message and update the DOM with left messages
        delete = async(d)=>{ const res = await axios.post('https://connectbambi.herokuapp.com/api/delete',{d:d})
                                     this.setState({redundat:res.data})//Just used to get rid of error message
              const left = this.state.messagedelete.filter(item => item._id!==d);this.setState({messagedelete:left});
          //render after filter
          const filteredresults = left.map(item =><div className='messages' key={uuidv4()}>
                                                      <div><h4>{item.sendername} {item.sendersurname}</h4></div>
                                                      <div>{item.value}</div>
                                                      <div className='date'>{item.date}</div><Delete d={item._id} delete={(d)=>this.delete(d)}/>
                                                   </div>);
                                this.setState({name:filteredresults})
                               }

    render() { //Selection of a form to render
        let display ;
        if (this.state.login) {
          display = <Login login ={login =>this.userLogin(login)}/>
        } else if(this.state.register){
          display =  <RegisterForm submit = {register =>this.submitToregister(register)}/>
        }else{display =  <Search search={search =>this.search(search)} listall={this.listall} receiverId={this.state.loginId} view ={receiverId=>this.view(receiverId)} messageUpdate={messageUpdate =>this.messageUpdate(messageUpdate)} table={this.state}/>}

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