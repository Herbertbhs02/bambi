import React, { Component } from 'react';
import './looks/Search.css'

class Search extends Component {
    constructor(props) {
      super(props)
      this.state = {name:'',surname:'', message:''}
      
    }
    
    change = (e)=>{this.setState({surname:e.target.value})}

    message = (e)=>{this.setState({message:e.target.value})}

    search = (e)=>{e.preventDefault();
                 this.setState({name:this.state.name.trim()})
                this.props.search(this.state);
                this.setState({
                               
                              })}  

        listall = ()=>{
          this.props.listall()}
                                    
          view = ()=>{ this.props.view({receiverId:this.props.receiverId})
            }
                   
    changeMessage = (e)=>{e.preventDefault();
                    this.props.messageUpdate(this.state);
                    this.setState({
                                   
                                  })   
                                                              
                       }               

            
    render() {
    
        return (
            <div>
               {this.props.table.post}
              <form onSubmit={this.search}>
              <h4>Welcome<span className='loginName'> {this.props.table.loginName}</span>. Enter a name and click on search</h4>
              <input type='text' className='searchInput' name='surname' value={this.state.surname} placeholder='Type surname' onChange={this.change}/><br/>
              <button>Search</button>
              </form>
              
              <form onSubmit={this.changeMessage}>
              <h4>Update your message</h4>
              <textarea rows="2" cols="50" name='message' value={this.state.message} placeholder="Leave/update your personal message/status" onChange={this.message}></textarea>
              <button>Update</button>
              </form>

              <hr/>
              <button onClick={this.listall}>List all registered</button>  <button onClick={this.view}>View your messages</button>
              {this.props.table.name}
            </div>
        );
    }
}

export default Search;