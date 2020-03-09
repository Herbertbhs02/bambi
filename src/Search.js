import React, { Component } from 'react';
import './looks/Search.css'

class Search extends Component {
    constructor(props) {
      super(props)
      this.state = {name:'', message:''}
      
    }
    
    change = (e)=>{this.setState({surname:e.target.value})}

    message = (e)=>{this.setState({message:e.target.value})}

    search = (e)=>{e.preventDefault();
                 this.setState({name:this.state.name.trim()})
                this.props.search(this.state);
                this.setState({
                               
                              })   
                                                          
                   }
    changeMessage = (e)=>{e.preventDefault();
                    this.props.messageUpdate(this.state);
                    this.setState({
                                   
                                  })   
                                                              
                       }               

    render() {
        return (
            <div >
              <form onSubmit={this.search}>
              <h4 >Welcome <span className='loginName'>{this.props.table.loginName}</span>: Type your search below</h4>
              <input type='text' className='searchInput' name='surname' value={this.state.surname} placeholder='Type surname' onChange={this.change} /><br/>
              <button>Search</button>
              </form>
              <form onSubmit={this.changeMessage}>
              <h4>Update your message</h4>
              <textarea rows="4" cols="50" name='message' value={this.state.message} placeholder="Leave/update your message- You can only update your message" onChange={this.message}></textarea>
              <button>Update</button>
              </form>
              <hr/>
                <h4 >Search results below</h4>
                 {this.props.table.name}
            </div>
        );
    }
}

export default Search;